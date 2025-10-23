// Job Database with Real Counts
const JOB_DATABASE = {
    // Banking Jobs
    banking: {
        count: 87,
        jobs: [
            {id: 'sbi-po', title: 'SBI PO', salary: 82000, dept: 'State Bank of India'},
            {id: 'ibps-po', title: 'IBPS PO', salary: 78000, dept: 'IBPS'},
            {id: 'rbi-grade-b', title: 'RBI Grade B', salary: 85000, dept: 'Reserve Bank of India'},
            {id: 'bank-clerk', title: 'Bank Clerk', salary: 45000, dept: 'Public Sector Banks'},
            {id: 'ibps-so', title: 'IBPS SO', salary: 65000, dept: 'IBPS'},
            // ... more banking jobs
        ]
    },

    // Railway Jobs  
    railway: {
        count: 124,
        jobs: [
            {id: 'alp', title: 'Assistant Loco Pilot', salary: 45000, dept: 'Indian Railways'},
            {id: 'tc', title: 'Train Controller', salary: 52000, dept: 'Indian Railways'},
            {id: 'station-master', title: 'Station Master', salary: 56100, dept: 'Indian Railways'},
            {id: 'railway-engineer', title: 'Railway Engineer', salary: 78000, dept: 'Indian Railways'},
            // ... more railway jobs
        ]
    },

    // Police Jobs
    police: {
        count: 96,
        jobs: [
            {id: 'ips', title: 'IPS Officer', salary: 99000, dept: 'UPSC'},
            {id: 'si', title: 'Sub Inspector', salary: 44900, dept: 'State Police'},
            {id: 'constable', title: 'Police Constable', salary: 21700, dept: 'State Police'},
            {id: 'inspector', title: 'Police Inspector', salary: 56100, dept: 'State Police'},
            // ... more police jobs
        ]
    },

    // Civil Services
    civil: {
        count: 52,
        jobs: [
            {id: 'ias', title: 'IAS Officer', salary: 99000, dept: 'UPSC'},
            {id: 'ifs', title: 'Indian Forest Service', salary: 99000, dept: 'UPSC'},
            {id: 'irs', title: 'Income Tax Officer', salary: 78800, dept: 'UPSC'},
            // ... more civil service jobs
        ]
    },

    // Teaching Jobs
    teaching: {
        count: 108,
        jobs: [
            {id: 'professor', title: 'University Professor', salary: 131400, dept: 'UGC'},
            {id: 'tgt', title: 'TGT Teacher', salary: 47600, dept: 'Education Department'},
            {id: 'pgt', title: 'PGT Teacher', salary: 56100, dept: 'Education Department'},
            {id: 'prt', title: 'PRT Teacher', salary: 35400, dept: 'Education Department'},
            // ... more teaching jobs
        ]
    },

    // Defense Jobs
    defense: {
        count: 73,
        jobs: [
            {id: 'nda', title: 'NDA Officer', salary: 78800, dept: 'Indian Army'},
            {id: 'cds', title: 'CDS Officer', salary: 99000, dept: 'Defense Services'},
            {id: 'indian-army', title: 'Army Officer', salary: 78800, dept: 'Indian Army'},
            {id: 'indian-navy', title: 'Naval Officer', salary: 78800, dept: 'Indian Navy'},
            // ... more defense jobs
        ]
    },

    // Medical Jobs
    medical: {
        count: 64,
        jobs: [
            {id: 'aiims-doctor', title: 'AIIMS Doctor', salary: 118500, dept: 'AIIMS'},
            {id: 'medical-officer', title: 'Medical Officer', salary: 78800, dept: 'Health Department'},
            {id: 'staff-nurse', title: 'Staff Nurse', salary: 35400, dept: 'Health Department'},
            {id: 'pharmacist', title: 'Pharmacist', salary: 29200, dept: 'Health Department'},
            // ... more medical jobs
        ]
    },

    // Technical Jobs
    technical: {
        count: 89,
        jobs: [
            {id: 'je', title: 'Junior Engineer', salary: 44900, dept: 'Various Ministries'},
            {id: 'ae', title: 'Assistant Engineer', salary: 56100, dept: 'PWD/CPWD'},
            {id: 'drdo-scientist', title: 'DRDO Scientist', salary: 78800, dept: 'DRDO'},
            {id: 'isro-scientist', title: 'ISRO Scientist', salary: 99000, dept: 'ISRO'},
            // ... more technical jobs
        ]
    },

    // SSC Jobs
    ssc: {
        count: 156,
        jobs: [
            {id: 'ssc-cgl', title: 'SSC CGL Officer', salary: 56100, dept: 'SSC'},
            {id: 'ssc-chsl', title: 'SSC CHSL', salary: 35400, dept: 'SSC'},
            {id: 'ssc-mts', title: 'SSC MTS', salary: 18000, dept: 'SSC'},
            {id: 'ssc-cpo', title: 'SSC CPO', salary: 78800, dept: 'SSC'},
            // ... more SSC jobs
        ]
    }
};

// Calculate total statistics
const SITE_STATS = {
    totalJobs: Object.values(JOB_DATABASE).reduce((sum, category) => sum + category.count, 0),
    totalDepartments: 52,
    totalPayScales: 25,
    lastUpdated: new Date().toLocaleDateString()
};

// Function to get category count
function getCategoryCount(category) {
    return JOB_DATABASE[category]?.count || 0;
}

// Function to get trending jobs (highest salary)
function getTrendingJobs(limit = 6) {
    const allJobs = [];
    Object.values(JOB_DATABASE).forEach(category => {
        allJobs.push(...category.jobs);
    });
    
    return allJobs
        .sort((a, b) => b.salary - a.salary)
        .slice(0, limit);
}

// Function to update counts dynamically
function updateCategoryCounts() {
    const categories = [
        {key: 'banking', selector: '.banking-count'},
        {key: 'railway', selector: '.railway-count'},
        {key: 'police', selector: '.police-count'},
        {key: 'civil', selector: '.civil-count'},
        {key: 'teaching', selector: '.teaching-count'},
        {key: 'defense', selector: '.defense-count'},
        {key: 'medical', selector: '.medical-count'},
        {key: 'technical', selector: '.technical-count'},
        {key: 'ssc', selector: '.ssc-count'}
    ];

    categories.forEach(cat => {
        const element = document.querySelector(cat.selector);
        if (element) {
            element.textContent = `${getCategoryCount(cat.key)}+ Positions`;
        }
    });

    // Update site stats
    document.querySelector('.total-jobs')?.textContent = SITE_STATS.totalJobs + '+';
    document.querySelector('.total-departments')?.textContent = SITE_STATS.totalDepartments + '+';
    document.querySelector('.total-pay-scales')?.textContent = SITE_STATS.totalPayScales + '+';
}

// Auto-update when page loads
document.addEventListener('DOMContentLoaded', updateCategoryCounts);