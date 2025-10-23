// Robust Template System for Government Jobs
// Standardized data structure for dynamic content loading

const TEMPLATE_SCHEMA = {
    // Job metadata
    jobId: 'string',
    category: 'string', // central, state, banking, railway, defence
    grade: 'string',    // A, B, C, Class1, Class2
    
    // Display information
    display: {
        title: 'string',
        subtitle: 'string',
        shortName: 'string',
        fullName: 'string',
        department: 'string'
    },
    
    // Navigation tags (clickable and non-clickable)
    tags: [
        {
            text: 'string',
            type: 'grade|category|service|level', // for filtering
            clickable: 'boolean',
            link: 'string', // only if clickable
            bgColor: 'string' // optional styling
        }
    ],
    
    // Quick statistics for overview
    stats: [
        {
            number: 'string', // e.g., "30+ Years", "₹99K"
            label: 'string',
            type: 'duration|salary|vacancy|benefit'
        }
    ],
    
    // Career progression stages
    stages: [
        {
            number: 'string|number',
            title: 'string',
            years: 'string',
            salary: 'number', // base salary in rupees
            description: 'string',
            level: 'number',  // 1-17 for pay matrix
            grade: 'string'   // for additional context
        }
    ],
    
    // Calculator dropdown options
    calculatorOptions: [
        {
            value: 'number', // salary amount
            text: 'string',  // display text
            level: 'number', // pay matrix level
            experience: 'number' // years
        }
    ],
    
    // Salary calculation parameters
    salaryParams: {
        basePayMatrix: 'number', // starting level
        daRate: 'number',        // DA percentage (default 53%)
        allowances: {
            transport: 'number',
            medical: 'number',
            other: 'number'
        },
        pfContribution: 'number', // default 12%
        incrementRate: 'number'   // annual increment %
    },
    
    // Related jobs for navigation
    relatedJobs: [
        {
            jobId: 'string',
            title: 'string',
            category: 'string'
        }
    ],
    
    // SEO and content metadata
    seo: {
        metaTitle: 'string',
        metaDescription: 'string',
        keywords: ['string'],
        canonicalUrl: 'string'
    }
};

// Database structure for all government jobs
const JOB_DATABASE = {
    // Central Government Jobs
    ias: {
        jobId: 'ias',
        category: 'central',
        grade: 'A',
        display: {
            title: 'IAS Officer Career Path',
            subtitle: 'Indian Administrative Service',
            shortName: 'IAS',
            fullName: 'Indian Administrative Service',
            department: 'UPSC - All India Service'
        },
        tags: [
            { text: 'Grade A', type: 'grade', clickable: true, link: 'grade-a-jobs.html' },
            { text: 'All India Service', type: 'service', clickable: false },
            { text: 'Class 1', type: 'level', clickable: true, link: 'class-1-jobs.html' },
            { text: 'Central Service', type: 'category', clickable: true, link: 'central-jobs.html' }
        ],
        stats: [
            { number: '30+ Years', label: 'Career Length', type: 'duration' },
            { number: '₹99K', label: 'Starting Pay', type: 'salary' },
            { number: '₹2.8L', label: 'Peak Salary', type: 'salary' },
            { number: '180/Year', label: 'Vacancies', type: 'vacancy' }
        ],
        stages: [
            {
                number: '1',
                title: 'Sub Divisional Magistrate',
                years: '0-2 years',
                salary: 99000,
                description: 'Entry-level position handling revenue administration, licensing, and sub-division management.',
                level: 10,
                grade: 'Junior Scale'
            },
            {
                number: '2',
                title: 'Assistant Collector',
                years: '2-4 years',
                salary: 120000,
                description: 'District-level coordination, land acquisition projects, and development scheme management.',
                level: 11,
                grade: 'Junior Scale'
            },
            {
                number: '3',
                title: 'District Collector',
                years: '4-8 years',
                salary: 160000,
                description: 'Head of district administration, law & order coordination, and crisis management.',
                level: 12,
                grade: 'Selection Grade'
            },
            {
                number: '4',
                title: 'Deputy Secretary',
                years: '8-12 years',
                salary: 180000,
                description: 'Central government policy work, inter-ministerial coordination.',
                level: 13,
                grade: 'Senior Scale'
            },
            {
                number: '5',
                title: 'Joint Secretary',
                years: '12-16 years',
                salary: 200000,
                description: 'Senior policy leadership, minister briefings, national direction formulation.',
                level: 14,
                grade: 'Higher Administrative Grade'
            },
            {
                number: '6',
                title: 'Additional Secretary',
                years: '16-22 years',
                salary: 240000,
                description: 'Pre-secretary leadership, cabinet notes preparation, administrative reforms.',
                level: 15,
                grade: 'Higher Administrative Grade+'
            },
            {
                number: '★',
                title: 'Secretary to Government',
                years: '22+ years',
                salary: 280000,
                description: 'Ministry leadership, cabinet interactions, transformational policy changes.',
                level: 17,
                grade: 'Apex Scale'
            }
        ],
        calculatorOptions: [
            { value: 99000, text: 'SDM (₹99,000)', level: 10, experience: 0 },
            { value: 120000, text: 'Assistant Collector (₹1,20,000)', level: 11, experience: 2 },
            { value: 160000, text: 'District Collector (₹1,60,000)', level: 12, experience: 4 },
            { value: 180000, text: 'Deputy Secretary (₹1,80,000)', level: 13, experience: 8 },
            { value: 200000, text: 'Joint Secretary (₹2,00,000)', level: 14, experience: 12 },
            { value: 240000, text: 'Additional Secretary (₹2,40,000)', level: 15, experience: 16 },
            { value: 280000, text: 'Secretary (₹2,80,000)', level: 17, experience: 22 }
        ],
        salaryParams: {
            basePayMatrix: 10,
            daRate: 53,
            allowances: {
                transport: 3600,
                medical: 1000,
                other: 400
            },
            pfContribution: 12,
            incrementRate: 3
        },
        relatedJobs: [
            { jobId: 'ips', title: 'IPS Officer', category: 'central' },
            { jobId: 'ifs', title: 'Indian Forest Service', category: 'central' },
            { jobId: 'irs', title: 'Income Tax Officer', category: 'central' }
        ],
        seo: {
            metaTitle: 'IAS Salary 2025: Complete Pay Scale, Allowances & Career Growth',
            metaDescription: 'Complete IAS salary structure 2025 - Starting ₹99,000 to ₹2.8L. DA, HRA, allowances, promotion timeline, retirement benefits calculator.',
            keywords: ['ias salary', 'ias pay scale', 'ias allowances', 'administrative service salary'],
            canonicalUrl: 'https://sarkarisalary.today/ias-salary'
        }
    },

    ips: {
        jobId: 'ips',
        category: 'central',
        grade: 'A',
        display: {
            title: 'IPS Officer Career Path',
            subtitle: 'Indian Police Service',
            shortName: 'IPS',
            fullName: 'Indian Police Service',
            department: 'UPSC - All India Service'
        },
        tags: [
            { text: 'Grade A', type: 'grade', clickable: true, link: 'grade-a-jobs.html' },
            { text: 'All India Service', type: 'service', clickable: false },
            { text: 'Class 1', type: 'level', clickable: true, link: 'class-1-jobs.html' },
            { text: 'Law Enforcement', type: 'category', clickable: true, link: 'police-jobs.html' }
        ],
        stats: [
            { number: '30+ Years', label: 'Career Length', type: 'duration' },
            { number: '₹99K', label: 'Starting Pay', type: 'salary' },
            { number: '₹2.8L', label: 'Peak Salary', type: 'salary' },
            { number: '150/Year', label: 'Vacancies', type: 'vacancy' }
        ],
        stages: [
            {
                number: '1',
                title: 'Assistant Superintendent of Police',
                years: '0-2 years',
                salary: 99000,
                description: 'Training period and initial postings, sub-division police command.',
                level: 10,
                grade: 'Junior Scale'
            },
            {
                number: '2',
                title: 'Deputy Superintendent of Police',
                years: '2-5 years',
                salary: 120000,
                description: 'Sub-division command, specialized units, investigation teams.',
                level: 11,
                grade: 'Junior Scale'
            },
            {
                number: '3',
                title: 'Superintendent of Police',
                years: '5-9 years',
                salary: 160000,
                description: 'District police chief, law & order, crime investigation.',
                level: 12,
                grade: 'Selection Grade'
            },
            {
                number: '4',
                title: 'Deputy Inspector General',
                years: '9-14 years',
                salary: 180000,
                description: 'Range/zone command, specialized operations, policy implementation.',
                level: 13,
                grade: 'Senior Scale'
            },
            {
                number: '5',
                title: 'Inspector General',
                years: '14-18 years',
                salary: 200000,
                description: 'State-level operations, strategic planning, inter-state coordination.',
                level: 14,
                grade: 'Higher Administrative Grade'
            },
            {
                number: '6',
                title: 'Additional Director General',
                years: '18-24 years',
                salary: 240000,
                description: 'State police leadership, central deputation, specialized commands.',
                level: 15,
                grade: 'Higher Administrative Grade+'
            },
            {
                number: '★',
                title: 'Director General of Police',
                years: '24+ years',
                salary: 280000,
                description: 'State police chief, policy formulation, national security roles.',
                level: 17,
                grade: 'Apex Scale'
            }
        ],
        calculatorOptions: [
            { value: 99000, text: 'ASP (₹99,000)', level: 10, experience: 0 },
            { value: 120000, text: 'DSP (₹1,20,000)', level: 11, experience: 2 },
            { value: 160000, text: 'SP (₹1,60,000)', level: 12, experience: 5 },
            { value: 180000, text: 'DIG (₹1,80,000)', level: 13, experience: 9 },
            { value: 200000, text: 'IG (₹2,00,000)', level: 14, experience: 14 },
            { value: 240000, text: 'ADG (₹2,40,000)', level: 15, experience: 18 },
            { value: 280000, text: 'DGP (₹2,80,000)', level: 17, experience: 24 }
        ],
        salaryParams: {
            basePayMatrix: 10,
            daRate: 53,
            allowances: {
                transport: 3600,
                medical: 1000,
                other: 400
            },
            pfContribution: 12,
            incrementRate: 3
        },
        relatedJobs: [
            { jobId: 'ias', title: 'IAS Officer', category: 'central' },
            { jobId: 'crpf', title: 'CRPF Officer', category: 'central' },
            { jobId: 'cisf', title: 'CISF Officer', category: 'central' }
        ],
        seo: {
            metaTitle: 'IPS Salary 2025: Complete Pay Scale, Allowances & Career Progression',
            metaDescription: 'IPS officer salary structure 2025 - ASP to DGP pay scale. Complete allowances, promotion timeline, benefits calculator.',
            keywords: ['ips salary', 'ips pay scale', 'police officer salary', 'ips allowances'],
            canonicalUrl: 'https://sarkarisalary.today/ips-salary'
        }
    },

    ssc_cgl: {
        jobId: 'ssc_cgl',
        category: 'central',
        grade: 'B',
        display: {
            title: 'SSC CGL Officer Positions',
            subtitle: 'Combined Graduate Level',
            shortName: 'SSC CGL',
            fullName: 'Staff Selection Commission - Combined Graduate Level',
            department: 'SSC - Multiple Ministries'
        },
        tags: [
            { text: 'Grade B', type: 'grade', clickable: true, link: 'grade-b-jobs.html' },
            { text: 'Central Government', type: 'category', clickable: true, link: 'central-jobs.html' },
            { text: 'Graduate Level', type: 'level', clickable: true, link: 'graduate-jobs.html' },
            { text: 'Multiple Departments', type: 'service', clickable: false }
        ],
        stats: [
            { number: '30+ Years', label: 'Career Length', type: 'duration' },
            { number: '₹44K', label: 'Starting Pay', type: 'salary' },
            { number: '₹1.4L', label: 'Peak Salary', type: 'salary' },
            { number: '8000+/Year', label: 'Vacancies', type: 'vacancy' }
        ],
        stages: [
            {
                number: '1',
                title: 'Assistant Section Officer',
                years: '0-3 years',
                salary: 44900,
                description: 'File handling, administrative support, data management in government offices.',
                level: 6,
                grade: 'Group B'
            },
            {
                number: '2',
                title: 'Section Officer',
                years: '3-6 years',
                salary: 56100,
                description: 'Section management, policy implementation, team coordination.',
                level: 7,
                grade: 'Group B'
            },
            {
                number: '3',
                title: 'Under Secretary',
                years: '6-10 years',
                salary: 67700,
                description: 'Departmental coordination, project management, senior administrative role.',
                level: 8,
                grade: 'Group A'
            },
            {
                number: '4',
                title: 'Deputy Secretary',
                years: '10-15 years',
                salary: 78800,
                description: 'Policy formulation, inter-ministerial coordination, senior management.',
                level: 9,
                grade: 'Group A'
            },
            {
                number: '5',
                title: 'Director',
                years: '15-20 years',
                salary: 118500,
                description: 'Directorial responsibilities, strategic planning, department leadership.',
                level: 12,
                grade: 'Group A'
            },
            {
                number: '★',
                title: 'Joint Secretary',
                years: '20+ years',
                salary: 144200,
                description: 'Senior policy leadership, ministry coordination, cabinet support.',
                level: 13,
                grade: 'Group A'
            }
        ],
        calculatorOptions: [
            { value: 44900, text: 'ASO (₹44,900)', level: 6, experience: 0 },
            { value: 56100, text: 'Section Officer (₹56,100)', level: 7, experience: 3 },
            { value: 67700, text: 'Under Secretary (₹67,700)', level: 8, experience: 6 },
            { value: 78800, text: 'Deputy Secretary (₹78,800)', level: 9, experience: 10 },
            { value: 118500, text: 'Director (₹1,18,500)', level: 12, experience: 15 },
            { value: 144200, text: 'Joint Secretary (₹1,44,200)', level: 13, experience: 20 }
        ],
        salaryParams: {
            basePayMatrix: 6,
            daRate: 53,
            allowances: {
                transport: 1600,
                medical: 500,
                other: 300
            },
            pfContribution: 12,
            incrementRate: 3
        },
        relatedJobs: [
            { jobId: 'ssc_chsl', title: 'SSC CHSL', category: 'central' },
            { jobId: 'ssc_mts', title: 'SSC MTS', category: 'central' },
            { jobId: 'ssc_cpo', title: 'SSC CPO', category: 'central' }
        ],
        seo: {
            metaTitle: 'SSC CGL Salary 2025: Pay Scale, Allowances & Career Growth',
            metaDescription: 'SSC CGL salary structure 2025 - Complete pay scale from ASO to Joint Secretary. DA, HRA, promotions, benefits calculator.',
            keywords: ['ssc cgl salary', 'ssc cgl pay scale', 'central government salary'],
            canonicalUrl: 'https://sarkarisalary.today/ssc-cgl-salary'
        }
    }
};

// Template loading and management functions
class JobTemplateManager {
    constructor() {
        this.currentJob = null;
        this.currentMode = 'basic';
    }

    // Load job data by ID
    loadJob(jobId, mode = 'basic') {
        if (!JOB_DATABASE[jobId]) {
            console.error(`Job ${jobId} not found in database`);
            return false;
        }

        this.currentJob = JOB_DATABASE[jobId];
        this.currentMode = mode;
        
        // Update page metadata
        this.updatePageMetadata();
        
        // Load content based on mode
        switch(mode) {
            case 'basic':
                this.loadBasicTemplate();
                break;
            case 'advanced':
                this.loadAdvancedTemplate();
                break;
            case 'retirement':
                this.loadRetirementTemplate();
                break;
        }

        return true;
    }

    // Update page metadata for SEO
    updatePageMetadata() {
        document.title = this.currentJob.seo.metaTitle;
        
        // Update meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = this.currentJob.seo.metaDescription;

        // Update canonical URL
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = this.currentJob.seo.canonicalUrl;
    }

    // Load basic template content
    loadBasicTemplate() {
        const job = this.currentJob;
        
        // Update header
        document.getElementById('jobTitle').textContent = job.display.title;
        document.getElementById('jobSubtitle').textContent = job.display.subtitle + ' - Basic salary calculator';
        
        // Update tags
        const tagsContainer = document.getElementById('jobTags');
        tagsContainer.innerHTML = job.tags.map(tag => 
            `<div class="tag ${tag.clickable ? 'clickable' : ''}" 
                ${tag.clickable ? `onclick="navigateToTag('${tag.link}')"` : ''}>
                ${tag.text}
            </div>`
        ).join('');
        
        // Update stats
        const statsContainer = document.getElementById('jobStats');
        statsContainer.innerHTML = job.stats.map(stat =>
            `<div class="stat-box">
                <div class="stat-number">${stat.number}</div>
                <div class="stat-label">${stat.label}</div>
            </div>`
        ).join('');
        
        // Update timeline
        const timelineContainer = document.getElementById('jobTimeline');
        timelineContainer.innerHTML = job.stages.map(stage =>
            `<div class="stage" onclick="toggleStage(this)">
                <div class="stage-main">
                    <div class="stage-number">${stage.number}</div>
                    <div class="stage-info">
                        <div class="stage-title">${stage.title}</div>
                        <div class="stage-years">${stage.years}</div>
                    </div>
                    <div class="stage-salary">₹${stage.salary.toLocaleString()}</div>
                    <div class="expand-indicator">▼</div>
                </div>
                <div class="stage-description hidden">
                    ${stage.description}
                </div>
            </div>`
        ).join('');
        
        // Update calculator options
        const stageSelect = document.getElementById('stage');
        stageSelect.innerHTML = '<option value="">Choose your position</option>' + 
            job.calculatorOptions.map(option =>
                `<option value="${option.value}">${option.text}</option>`
            ).join('');
    }

    // Generate URLs for different job types
    getJobUrl(jobId, mode = 'basic') {
        const templates = {
            basic: 'job-template-basic.html',
            advanced: 'job-template-advanced.html',
            retirement: 'job-template-retirement.html'
        };
        return `${templates[mode]}?job=${jobId}`;
    }

    // Get related jobs for navigation
    getRelatedJobs(limit = 3) {
        return this.currentJob.relatedJobs.slice(0, limit);
    }

    // Get jobs by category/grade for tag navigation
    getJobsByTag(tagType, tagValue) {
        return Object.values(JOB_DATABASE).filter(job => {
            switch(tagType) {
                case 'grade':
                    return job.grade === tagValue;
                case 'category':
                    return job.category === tagValue;
                default:
                    return false;
            }
        });
    }
}

// Initialize template manager
const templateManager = new JobTemplateManager();

// Navigation functions
function navigateToTag(link) {
    window.open(link, '_blank');
}

function setMode(mode) {
    const currentJobId = getCurrentJobId();
    window.location.href = templateManager.getJobUrl(currentJobId, mode);
}

function getCurrentJobId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('job') || 'ias'; // default to IAS
}

// Auto-load job data on page load
document.addEventListener('DOMContentLoaded', function() {
    const jobId = getCurrentJobId();
    const mode = getCurrentMode();
    templateManager.loadJob(jobId, mode);
});

function getCurrentMode() {
    const path = window.location.pathname;
    if (path.includes('advanced')) return 'advanced';
    if (path.includes('retirement')) return 'retirement';
    return 'basic';
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { JOB_DATABASE, JobTemplateManager, TEMPLATE_SCHEMA };
}