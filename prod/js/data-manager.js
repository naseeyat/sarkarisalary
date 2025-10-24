class DataManager {
    constructor() {
        this.data = null;
        this.jobPostings = null;
        this.loadData();
    }

    async loadData() {
        try {
            const [unifiedResponse, jobsResponse] = await Promise.all([
                fetch('/data/unified-data.json'),
                fetch('/data/job-postings.json')
            ]);
            
            this.data = await unifiedResponse.json();
            this.jobPostings = await jobsResponse.json();
            
            console.log('Data loaded successfully:', this.data.metadata);
            console.log('Active jobs loaded:', this.jobPostings.activeJobs.length);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    getDepartments(type = 'all') {
        if (!this.data) return [];
        
        if (type === 'all') {
            return [
                ...this.data.departments.central,
                ...this.data.departments.state,
                ...this.data.departments.psu
            ];
        }
        
        return this.data.departments[type] || [];
    }

    getStates() {
        return this.data?.states || [];
    }

    getUnionTerritories() {
        return this.data?.unionTerritories || [];
    }

    getAllStatesAndUTs() {
        return [
            ...(this.data?.states || []),
            ...(this.data?.unionTerritories || [])
        ];
    }

    getJobLevels() {
        return this.data?.jobLevels || {};
    }

    getPayScales() {
        return this.data?.payScales || {};
    }

    getExamCategories() {
        return this.data?.examCategories || [];
    }

    getTotalJobCount() {
        return this.data?.metadata?.totalJobs || 0;
    }

    getStateByCode(code) {
        const allStates = this.getAllStatesAndUTs();
        return allStates.find(state => state.code === code || state.id === code);
    }

    getDepartmentById(id) {
        const allDepts = this.getDepartments();
        return allDepts.find(dept => dept.id === id);
    }

    searchDepartments(query) {
        const allDepts = this.getDepartments();
        const searchTerm = query.toLowerCase();
        
        return allDepts.filter(dept => 
            dept.name.toLowerCase().includes(searchTerm) ||
            dept.fullName.toLowerCase().includes(searchTerm) ||
            dept.description.toLowerCase().includes(searchTerm)
        );
    }

    searchStates(query) {
        const allStates = this.getAllStatesAndUTs();
        const searchTerm = query.toLowerCase();
        
        return allStates.filter(state => 
            state.name.toLowerCase().includes(searchTerm) ||
            state.code.toLowerCase().includes(searchTerm)
        );
    }

    getJobsByState(stateId) {
        const state = this.getStateByCode(stateId);
        return state?.jobCount || 0;
    }

    getJobsByDepartment(deptId) {
        const dept = this.getDepartmentById(deptId);
        return dept?.jobCount || 0;
    }

    getPopularJobs(limit = 10) {
        const allDepts = this.getDepartments();
        return allDepts
            .sort((a, b) => b.jobCount - a.jobCount)
            .slice(0, limit)
            .map(dept => ({
                name: dept.name,
                count: dept.jobCount,
                id: dept.id
            }));
    }

    getStatesForMap() {
        return this.getAllStatesAndUTs().map(state => ({
            id: state.id,
            name: state.name,
            code: state.code,
            jobCount: state.jobCount,
            size: state.size,
            position: state.position
        }));
    }

    calculateSalary(level, allowances = {}) {
        const payScale = this.data?.payScales?.payBands?.find(band => band.level === level);
        if (!payScale) return null;

        const basicPay = parseInt(payScale.currentPay.replace(/[₹,]/g, ''));
        const da = allowances.da || this.data.payScales.allowances.da.current;
        const hra = allowances.hra || 16; // Default Y city
        const ta = allowances.ta || this.data.payScales.allowances.ta.amount;

        const daAmount = (basicPay * da) / 100;
        const hraAmount = (basicPay * hra) / 100;
        const grossSalary = basicPay + daAmount + hraAmount + ta;

        return {
            basic: basicPay,
            da: daAmount,
            hra: hraAmount,
            ta: ta,
            gross: grossSalary,
            formatted: {
                basic: `₹${basicPay.toLocaleString()}`,
                gross: `₹${Math.round(grossSalary).toLocaleString()}`
            }
        };
    }

    getJobsForLocation(locationId, locationType = 'state') {
        if (!this.data) return [];
        
        const rules = this.data.jobPostings?.smartCategorization?.rules || {};
        const allDepts = this.getDepartments();
        
        let relevantJobs = [];
        
        // Always include All-India jobs
        const allIndiaJobs = allDepts.filter(dept => 
            rules.railway === "Show in ALL states (all-India posting)" && dept.id === 'railway' ||
            rules.banking === "Show in ALL states (all-India posting)" && dept.id === 'banking' ||
            rules.upsc === "Show in ALL states (all-India posting)" && dept.id === 'upsc' ||
            dept.id === 'ssc' || dept.id === 'defence'
        );
        
        relevantJobs.push(...allIndiaJobs);
        
        // Add state-specific jobs if viewing state/district
        if (locationType === 'state' || locationType === 'district') {
            const stateJobs = allDepts.filter(dept => 
                dept.id === 'state-psc' || dept.id === 'police'
            );
            relevantJobs.push(...stateJobs);
        }
        
        // Add district-specific jobs if viewing district
        if (locationType === 'district') {
            // Add district-specific jobs here
        }
        
        return relevantJobs;
    }

    categorizeJobByPosting(jobId) {
        const rules = this.data?.jobPostings?.smartCategorization?.rules || {};
        
        if (rules[jobId]) {
            if (rules[jobId].includes('ALL states')) return 'allIndia';
            if (rules[jobId].includes('ONLY in specific')) return 'stateSpecific';
        }
        
        // Default categorization
        const allIndiaJobs = ['railway', 'banking', 'upsc', 'ssc', 'defence', 'central-police'];
        const stateJobs = ['state-psc', 'state-police', 'state-education'];
        
        if (allIndiaJobs.includes(jobId)) return 'allIndia';
        if (stateJobs.includes(jobId)) return 'stateSpecific';
        
        return 'multiState';
    }

    // Job Posting System Functions
    getJobsForPage(pageType, pageId = null) {
        if (!this.jobPostings) return [];
        
        const mapping = this.jobPostings.pageMapping;
        let jobIds = [];
        
        switch(pageType) {
            case 'homepage':
                return this.getHomepageJobs();
            case 'state':
                jobIds = mapping.statePages[pageId] || [];
                break;
            case 'district':
                jobIds = mapping.districtPages[pageId] || [];
                break;
            case 'category':
                jobIds = mapping.categoryPages[pageId] || [];
                break;
            default:
                return [];
        }
        
        return this.getJobsByIds(jobIds);
    }

    getHomepageJobs() {
        if (!this.jobPostings) return {};
        
        const sections = this.jobPostings.pageMapping.homepage.sections;
        return {
            trending: this.getJobsByIds(sections.trending),
            featured: this.getJobsByIds(sections.featured), 
            local: this.getJobsByIds(sections.local),
            latest: this.getJobsByIds(sections.latest)
        };
    }

    getJobsByIds(jobIds) {
        if (!this.jobPostings || !jobIds) return [];
        
        return jobIds.map(id => 
            this.jobPostings.activeJobs.find(job => job.id === id)
        ).filter(job => job !== undefined);
    }

    async addNewJob(jobData) {
        if (!this.jobPostings) return false;
        
        // Auto-generate distribution based on tags
        const autoDistribution = this.generateAutoDistribution(jobData.tags);
        jobData.autoDistribution = autoDistribution;
        jobData.isNew = true;
        
        try {
            // Send to Cloudflare Pages Function
            const response = await fetch('/functions/update-jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'addJob',
                    jobData: jobData
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (result.success) {
                // Update local data
                jobData.id = result.jobId;
                this.jobPostings.activeJobs.push(jobData);
                this.updatePageMappings(jobData);
                
                console.log('✅ Job posted to server:', jobData.title);
                console.log('📍 Distributed to:', result.distributedTo.join(', '));
                
                // Refresh data from server to ensure sync
                await this.refreshJobData();
                
                return {
                    success: true,
                    jobId: result.jobId,
                    distributedTo: result.distributedTo
                };
            } else {
                throw new Error(result.error || 'Unknown error');
            }
            
        } catch (error) {
            console.error('❌ Failed to post job:', error);
            
            // Fallback to local storage for demo
            jobData.id = `job_${Date.now()}`;
            jobData.postedDate = new Date().toISOString().split('T')[0];
            this.jobPostings.activeJobs.push(jobData);
            this.updatePageMappings(jobData);
            
            console.log('📝 Job added locally (demo mode):', jobData.title);
            return {
                success: true,
                jobId: jobData.id,
                distributedTo: this.calculateDistributionFromTags(jobData.tags),
                mode: 'local'
            };
        }
    }

    async refreshJobData() {
        try {
            const response = await fetch('/data/job-postings.json');
            if (response.ok) {
                this.jobPostings = await response.json();
                console.log('🔄 Job data refreshed from server');
            }
        } catch (error) {
            console.log('⚠️ Could not refresh from server, using local data');
        }
    }

    calculateDistributionFromTags(tags) {
        const pages = ['Homepage'];
        
        tags.forEach(tag => {
            if (tag === 'all-states') {
                pages.push('All State Pages', 'All District Pages');
            } else if (tag.endsWith('-only')) {
                const location = tag.replace('-only', '');
                pages.push(location.replace('-', ' ').toUpperCase() + ' Page');
            } else if (tag.endsWith('-category')) {
                const category = tag.replace('-category', '');
                pages.push(category.toUpperCase() + ' Jobs Page');
            }
        });
        
        return [...new Set(pages)];
    }

    generateAutoDistribution(tags) {
        const showOnPages = [];
        let scope = 'local';
        let priority = 'medium';
        
        // Determine scope and pages based on tags
        if (tags.includes('all-states')) {
            scope = 'national';
            showOnPages.push('homepage', 'all-state-pages', 'all-district-pages');
            priority = 'high';
        } else if (tags.includes('state-only') || tags.some(tag => tag.endsWith('-only'))) {
            scope = 'state';
            showOnPages.push('homepage');
        } else if (tags.includes('district-only')) {
            scope = 'district';
            showOnPages.push('homepage');
        }
        
        // Add category pages
        tags.forEach(tag => {
            if (tag.endsWith('-category')) {
                showOnPages.push(tag.replace('-category', '-jobs'));
            }
        });
        
        return { scope, showOnPages, priority };
    }

    updatePageMappings(job) {
        const mapping = this.jobPostings.pageMapping;
        
        // Add to homepage based on priority
        if (job.autoDistribution.priority === 'high') {
            mapping.homepage.sections.trending.unshift(job.id);
            mapping.homepage.sections.featured.unshift(job.id);
        } else {
            mapping.homepage.sections.latest.unshift(job.id);
        }
        
        // Add to relevant state/district pages based on tags
        job.tags.forEach(tag => {
            if (tag.endsWith('-only')) {
                const location = tag.replace('-only', '');
                if (mapping.statePages[location]) {
                    mapping.statePages[location].unshift(job.id);
                }
                if (mapping.districtPages[location]) {
                    mapping.districtPages[location].unshift(job.id);
                }
            }
        });
        
        // Add to category pages
        job.tags.forEach(tag => {
            if (tag.endsWith('-category')) {
                const category = tag.replace('-category', '-jobs');
                if (!mapping.categoryPages[category]) {
                    mapping.categoryPages[category] = [];
                }
                mapping.categoryPages[category].unshift(job.id);
            }
        });
    }

    isJobNew(job) {
        if (!job || !job.postedDate) return false;
        
        const postedDate = new Date(job.postedDate);
        const now = new Date();
        const diffHours = (now - postedDate) / (1000 * 60 * 60);
        
        return diffHours <= (this.jobPostings?.newJobThreshold || 168); // Default 7 days
    }

    renderJobCard(job, showNewBadge = true) {
        const isNew = showNewBadge && this.isJobNew(job);
        
        return `
            <div class="job-card ${isNew ? 'new-job' : ''}">
                ${isNew ? '<span class="new-badge">NEW</span>' : ''}
                <h3>${job.title}</h3>
                <div class="job-meta">
                    <span class="department">${job.department}</span>
                    <span class="positions">${job.positions} Posts</span>
                    <span class="salary">${job.salaryRange}</span>
                </div>
                <div class="job-dates">
                    <span class="last-date">Last Date: ${job.lastDate}</span>
                    <span class="exam-date">Exam: ${job.examDate}</span>
                </div>
                <div class="job-tags">
                    ${job.tags.slice(0, 3).map(tag => 
                        `<span class="tag">${tag.replace('-', ' ')}</span>`
                    ).join('')}
                </div>
            </div>
        `;
    }
}

// Create global instance
window.dataManager = new DataManager();