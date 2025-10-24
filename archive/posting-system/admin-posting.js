class AdminPosting {
    constructor() {
        this.selectedTags = [];
        this.allTags = {};
        this.initializeApp();
    }

    async initializeApp() {
        // Wait for data manager to load
        await new Promise(resolve => {
            const checkData = () => {
                if (window.dataManager && window.dataManager.data) {
                    resolve();
                } else {
                    setTimeout(checkData, 100);
                }
            };
            checkData();
        });

        this.populateTagsFromData();
        this.loadRecentPosts();
        this.setupEventListeners();
    }

    populateTagsFromData() {
        const data = window.dataManager.data;
        
        // Location Tags from states and departments
        this.allTags.location = [
            { id: 'all-states', label: '🇮🇳 All India', description: 'Show in all states' },
            { id: 'all-districts', label: '🏢 All Districts', description: 'Show in all districts' }
        ];

        // Add states
        if (data.states) {
            data.states.forEach(state => {
                this.allTags.location.push({
                    id: `${state.id}-only`,
                    label: `🏛️ ${state.name} Only`,
                    description: `Only in ${state.name} state`
                });
            });
        }

        // Add union territories
        if (data.unionTerritories) {
            data.unionTerritories.forEach(ut => {
                this.allTags.location.push({
                    id: `${ut.id}-only`,
                    label: `🏛️ ${ut.name} Only`,
                    description: `Only in ${ut.name}`
                });
            });
        }

        // Category Tags from departments
        this.allTags.category = [];
        if (data.departments) {
            // Central departments
            data.departments.central.forEach(dept => {
                this.allTags.category.push({
                    id: `${dept.id}-category`,
                    label: `${this.getDeptIcon(dept.id)} ${dept.name}`,
                    description: `${dept.description}`
                });
            });

            // Add generic categories
            this.allTags.category.push(
                { id: 'police-category', label: '👮 Police Jobs', description: 'Law enforcement positions' },
                { id: 'psc-category', label: '🏛️ PSC Jobs', description: 'Public Service Commission' },
                { id: 'municipal-category', label: '🏢 Municipal Jobs', description: 'Local government' },
                { id: 'teaching-category', label: '👨‍🏫 Teaching Jobs', description: 'Education sector' },
                { id: 'medical-category', label: '⚕️ Medical Jobs', description: 'Healthcare sector' }
            );
        }

        // Level Tags from job levels
        this.allTags.level = [];
        if (data.jobLevels) {
            Object.keys(data.jobLevels).forEach(levelKey => {
                const level = data.jobLevels[levelKey];
                this.allTags.level.push({
                    id: `${levelKey}-jobs`,
                    label: `📊 ${level.name}`,
                    description: `${level.description} (${level.salaryRange})`
                });
            });
        }

        // Priority Tags
        this.allTags.priority = [
            { id: 'homepage-trending', label: '🔥 Homepage Trending', description: 'Show in trending section' },
            { id: 'homepage-featured', label: '⭐ Homepage Featured', description: 'Show in featured section' },
            { id: 'homepage-local', label: '📍 Homepage Local', description: 'Show in local section' },
            { id: 'urgent', label: '⚡ Urgent', description: 'Mark as urgent posting' },
            { id: 'high-priority', label: '🚨 High Priority', description: 'High priority display' }
        ];

        this.renderTags();
    }

    getDeptIcon(deptId) {
        const icons = {
            'railway': '🚂',
            'banking': '🏦',
            'defence': '🛡️',
            'upsc': '🏛️',
            'ssc': '📝',
            'ongc': '⛽',
            'ntpc': '⚡'
        };
        return icons[deptId] || '🏢';
    }

    renderTags() {
        this.renderTagCategory('location', 'locationGrid');
        this.renderTagCategory('category', 'categoryGrid');
        this.renderTagCategory('level', 'levelGrid');
        this.renderTagCategory('priority', 'priorityGrid');
    }

    renderTagCategory(categoryName, containerId) {
        const container = document.getElementById(containerId);
        const tags = this.allTags[categoryName] || [];
        
        container.innerHTML = tags.map(tag => `
            <div class="tag-option" data-tag="${tag.id}" onclick="adminPosting.toggleTag('${tag.id}')" title="${tag.description}">
                ${tag.label}
            </div>
        `).join('');
    }

    toggleTag(tagId) {
        const tagElement = document.querySelector(`[data-tag="${tagId}"]`);
        
        if (this.selectedTags.includes(tagId)) {
            // Remove tag
            this.selectedTags = this.selectedTags.filter(id => id !== tagId);
            tagElement.classList.remove('selected');
        } else {
            // Add tag
            this.selectedTags.push(tagId);
            tagElement.classList.add('selected');
        }
        
        this.updateSelectedTagsDisplay();
        this.updatePreview();
        this.updateDistributionPreview();
    }

    updateSelectedTagsDisplay() {
        const container = document.getElementById('selectedTagsDisplay');
        
        if (this.selectedTags.length === 0) {
            container.innerHTML = '<span style="color: #a0aec0; font-style: italic;">No tags selected</span>';
            return;
        }

        const selectedTagsHtml = this.selectedTags.map(tagId => {
            const tag = this.findTagById(tagId);
            return `
                <span class="selected-tag">
                    ${tag ? tag.label : tagId}
                    <span class="remove" onclick="adminPosting.toggleTag('${tagId}')">×</span>
                </span>
            `;
        }).join('');

        container.innerHTML = selectedTagsHtml;
    }

    findTagById(tagId) {
        for (const category of Object.values(this.allTags)) {
            const found = category.find(tag => tag.id === tagId);
            if (found) return found;
        }
        return null;
    }

    filterTags() {
        const searchTerm = document.getElementById('tagSearch').value.toLowerCase();
        
        ['locationGrid', 'categoryGrid', 'levelGrid', 'priorityGrid'].forEach(gridId => {
            const grid = document.getElementById(gridId);
            const tags = grid.querySelectorAll('.tag-option');
            
            tags.forEach(tag => {
                const text = tag.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    tag.style.display = 'block';
                } else {
                    tag.style.display = 'none';
                }
            });
        });
    }

    autoSuggestJob() {
        const title = document.getElementById('jobTitle').value.toLowerCase();
        const suggestContainer = document.getElementById('autoSuggest');
        const suggestedInfo = document.getElementById('suggestedInfo');
        const deptField = document.getElementById('jobDepartment');

        // Clear previous selections
        this.selectedTags = [];
        document.querySelectorAll('.tag-option.selected').forEach(el => el.classList.remove('selected'));

        let suggestions = [];
        let department = '';

        // Auto-detect patterns
        if (title.includes('railway') || title.includes('rrb') || title.includes('ntpc')) {
            suggestions = ['all-states', 'railway-category', 'level2-jobs'];
            department = 'Indian Railways';
        } else if (title.includes('sbi') || title.includes('bank')) {
            suggestions = ['all-states', 'banking-category', 'level3-jobs'];
            department = 'State Bank of India';
        } else if (title.includes('up police') || title.includes('uttar pradesh police')) {
            suggestions = ['uttar-pradesh-only', 'police-category', 'level1-jobs'];
            department = 'Uttar Pradesh Police';
        } else if (title.includes('delhi police')) {
            suggestions = ['delhi-only', 'police-category', 'level1-jobs'];
            department = 'Delhi Police';
        } else if (title.includes('bihar') && title.includes('psc')) {
            suggestions = ['bihar-only', 'psc-category', 'level2-jobs'];
            department = 'Bihar Public Service Commission';
        } else if (title.includes('upsc')) {
            suggestions = ['all-states', 'upsc-category', 'level3-jobs'];
            department = 'Union Public Service Commission';
        }

        if (suggestions.length > 0) {
            // Auto-select suggested tags
            suggestions.forEach(tagId => {
                const tagElement = document.querySelector(`[data-tag="${tagId}"]`);
                if (tagElement) {
                    this.selectedTags.push(tagId);
                    tagElement.classList.add('selected');
                }
            });

            deptField.value = department;
            suggestedInfo.textContent = `${department} → Auto-selected: ${suggestions.join(', ')}`;
            suggestContainer.classList.add('show');

            this.updateSelectedTagsDisplay();
            this.updatePreview();
            this.updateDistributionPreview();
        } else {
            suggestContainer.classList.remove('show');
        }
    }

    updatePreview() {
        const title = document.getElementById('jobTitle').value;
        const department = document.getElementById('jobDepartment').value;
        const posts = document.getElementById('jobPosts').value;
        const lastDate = document.getElementById('lastDate').value;
        const salary = document.getElementById('salaryRange').value;

        const previewContainer = document.getElementById('jobPreview');

        if (!title && !department && !posts) {
            previewContainer.innerHTML = '<div class="empty-state">Fill the form to see live preview</div>';
            return;
        }

        const hasNewBadge = this.selectedTags.includes('homepage-trending') || 
                           this.selectedTags.includes('homepage-featured');

        previewContainer.innerHTML = `
            <div style="position: relative;">
                ${hasNewBadge ? '<span class="status-indicator">✨ NEW</span>' : ''}
                <h4>${title || 'Job Title'}</h4>
                <div class="job-meta">
                    <span>🏢 ${department || 'Department'}</span>
                    <span>👥 ${posts || '0'} Posts</span>
                    <span>💰 ${salary}</span>
                    ${lastDate ? `<span>📅 Last Date: ${lastDate}</span>` : ''}
                </div>
                <div style="margin-top: 10px; font-size: 11px; color: #718096;">
                    Tags: ${this.selectedTags.length} selected
                </div>
            </div>
        `;
    }

    updateDistributionPreview() {
        const container = document.getElementById('distributionPreview');
        
        if (this.selectedTags.length === 0) {
            container.innerHTML = '<div class="empty-state">Select tags to see distribution</div>';
            return;
        }

        const pages = ['Homepage'];
        
        this.selectedTags.forEach(tag => {
            if (tag === 'all-states') {
                pages.push('All 28 State Pages', 'All 780+ District Pages');
            } else if (tag.endsWith('-only')) {
                const location = tag.replace('-only', '').replace('-', ' ');
                pages.push(`${location.toUpperCase()} State Page`);
            } else if (tag.endsWith('-category')) {
                const category = tag.replace('-category', '').toUpperCase();
                pages.push(`${category} Jobs Category Page`);
            } else if (tag.startsWith('homepage-')) {
                const section = tag.replace('homepage-', '');
                pages.push(`Homepage ${section.toUpperCase()} Section`);
            }
        });

        const uniquePages = [...new Set(pages)];
        
        container.innerHTML = `
            <div style="background: #f0fff4; border: 2px solid #38a169; border-radius: 8px; padding: 15px;">
                <h5 style="color: #38a169; margin-bottom: 10px; font-size: 14px;">
                    📍 Will appear on ${uniquePages.length} page locations:
                </h5>
                <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                    ${uniquePages.map(page => `
                        <span style="background: #38a169; color: white; padding: 4px 8px; border-radius: 12px; font-size: 10px;">
                            ${page}
                        </span>
                    `).join('')}
                </div>
            </div>
        `;
    }

    async loadRecentPosts() {
        const container = document.getElementById('recentPosts');
        
        try {
            const jobs = window.dataManager.jobPostings?.activeJobs || [];
            
            if (jobs.length === 0) {
                container.innerHTML = '<div class="empty-state">No recent posts found</div>';
                return;
            }

            const recentJobs = jobs.slice(0, 5);
            
            container.innerHTML = recentJobs.map(job => `
                <div style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; margin-bottom: 10px;">
                    <div style="font-weight: 600; font-size: 14px; color: #2d3748;">${job.title}</div>
                    <div style="font-size: 12px; color: #718096; margin-top: 4px;">
                        ${job.department} • ${job.positions} posts • ${job.postedDate}
                    </div>
                    <div style="margin-top: 6px; font-size: 10px;">
                        ${(job.tags || []).slice(0, 3).map(tag => `
                            <span style="background: #edf2f7; padding: 2px 6px; border-radius: 8px; margin-right: 4px;">
                                ${tag}
                            </span>
                        `).join('')}
                    </div>
                </div>
            `).join('');
            
        } catch (error) {
            container.innerHTML = '<div style="color: #e53e3e;">Error loading recent posts</div>';
        }
    }

    setupEventListeners() {
        // Auto-update preview when form fields change
        ['jobTitle', 'jobDepartment', 'jobPosts', 'lastDate', 'salaryRange'].forEach(fieldId => {
            document.getElementById(fieldId).addEventListener('input', () => {
                this.updatePreview();
            });
        });
    }

    // Quick action methods
    selectAllIndia() {
        this.clearAll();
        ['all-states', 'all-districts', 'homepage-featured'].forEach(tag => {
            const element = document.querySelector(`[data-tag="${tag}"]`);
            if (element) {
                this.selectedTags.push(tag);
                element.classList.add('selected');
            }
        });
        this.updateSelectedTagsDisplay();
        this.updateDistributionPreview();
    }

    selectTopStates() {
        this.clearAll();
        const topStates = ['uttar-pradesh-only', 'maharashtra-only', 'bihar-only', 'rajasthan-only', 'west-bengal-only'];
        topStates.forEach(tag => {
            const element = document.querySelector(`[data-tag="${tag}"]`);
            if (element) {
                this.selectedTags.push(tag);
                element.classList.add('selected');
            }
        });
        this.updateSelectedTagsDisplay();
        this.updateDistributionPreview();
    }

    selectHomepage() {
        ['homepage-trending', 'homepage-featured'].forEach(tag => {
            if (!this.selectedTags.includes(tag)) {
                const element = document.querySelector(`[data-tag="${tag}"]`);
                if (element) {
                    this.selectedTags.push(tag);
                    element.classList.add('selected');
                }
            }
        });
        this.updateSelectedTagsDisplay();
        this.updateDistributionPreview();
    }

    clearAll() {
        this.selectedTags = [];
        document.querySelectorAll('.tag-option.selected').forEach(el => el.classList.remove('selected'));
        this.updateSelectedTagsDisplay();
        this.updateDistributionPreview();
    }

    async submitJob() {
        const title = document.getElementById('jobTitle').value;
        const department = document.getElementById('jobDepartment').value;
        const posts = document.getElementById('jobPosts').value;
        const lastDate = document.getElementById('lastDate').value;
        const examDate = document.getElementById('examDate').value;
        const salary = document.getElementById('salaryRange').value;

        if (!title || !posts) {
            alert('⚠️ Please fill required fields: Job Title and Total Posts');
            return;
        }

        if (this.selectedTags.length === 0) {
            alert('⚠️ Please select at least one tag for distribution');
            return;
        }

        const submitBtn = document.querySelector('.post-btn');
        submitBtn.textContent = '⏳ POSTING JOB...';
        submitBtn.disabled = true;

        const jobData = {
            title,
            department: department || 'Government Department',
            positions: parseInt(posts),
            lastDate: lastDate || '2024-12-31',
            examDate: examDate || '2024-12-15',
            salaryRange: salary,
            eligibility: 'As per notification',
            tags: this.selectedTags
        };

        try {
            const result = await window.dataManager.addNewJob(jobData);
            
            if (result.success) {
                // Show detailed success message
                const storageType = result.mode === 'local' ? 'LOCAL DEMO MODE' : 'LIVE SERVER';
                alert(`✅ JOB POSTED SUCCESSFULLY!\n\n📝 Job ID: ${result.jobId}\n💾 Storage: ${storageType}\n📍 Distributed to: ${result.distributedTo.join(', ')}\n\n🔄 Job will appear on all relevant pages automatically!`);
                
                // Reset form
                document.getElementById('jobForm').reset();
                this.clearAll();
                this.updatePreview();
                this.loadRecentPosts();
            }
        } catch (error) {
            alert('❌ ERROR POSTING JOB. Please check console and try again.');
            console.error('Job posting error:', error);
        } finally {
            submitBtn.textContent = '🚀 POST JOB & AUTO-DISTRIBUTE';
            submitBtn.disabled = false;
        }
    }
}

// Initialize when page loads
const adminPosting = new AdminPosting();