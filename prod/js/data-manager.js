class DataManager {
    constructor() {
        this.data = null;
        this.loadData();
    }

    async loadData() {
        try {
            const response = await fetch('/data/unified-data.json');
            this.data = await response.json();
            console.log('Data loaded successfully:', this.data.metadata);
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
}

// Create global instance
window.dataManager = new DataManager();