// Practical Job Categorization System
// Automatically categorizes government jobs for website organization

class JobCategorizer {
  constructor() {
    this.categories = {
      // Main navigation categories
      primary: {
        'civil-services': {
          name: 'Civil Services',
          jobs: ['IAS', 'IPS', 'IFS', 'IRS', 'IES'],
          icon: '🏛️',
          priority: 1,
          description: 'Premium administrative services'
        },
        'banking-finance': {
          name: 'Banking & Finance',
          jobs: ['SBI PO', 'IBPS', 'RBI', 'LIC', 'NABARD'],
          icon: '🏦',
          priority: 2,
          description: 'Banking and financial services'
        },
        'ssc-railways': {
          name: 'SSC & Railways',
          jobs: ['SSC CGL', 'SSC CHSL', 'Railway', 'Group D'],
          icon: '🚂',
          priority: 3,
          description: 'Central recruitment boards'
        },
        'defense-police': {
          name: 'Defense & Police',
          jobs: ['Army', 'Navy', 'Air Force', 'Police', 'CAPF'],
          icon: '⚔️',
          priority: 4,
          description: 'Defense and law enforcement'
        },
        'state-services': {
          name: 'State Services',
          jobs: ['BPSC', 'UPPSC', 'MPSC', 'State Police', 'State Teacher'],
          icon: '🏢',
          priority: 5,
          description: 'State government services'
        },
        'teaching-research': {
          name: 'Teaching & Research',
          jobs: ['UGC NET', 'KVS', 'NVS', 'CSIR', 'ICMR'],
          icon: '📚',
          priority: 6,
          description: 'Education and research roles'
        }
      },

      // By salary range
      salary: {
        'premium': {
          name: 'Premium Jobs (₹1L+)',
          range: [100000, 500000],
          jobs: ['IAS', 'IPS', 'Bank PO', 'IES'],
          color: '#gold'
        },
        'high': {
          name: 'High Paying (₹50K-1L)',
          range: [50000, 100000], 
          jobs: ['SSC CGL', 'Railway Officer', 'Inspector'],
          color: '#silver'
        },
        'moderate': {
          name: 'Moderate Pay (₹25K-50K)',
          range: [25000, 50000],
          jobs: ['Clerk', 'Stenographer', 'Constable'],
          color: '#bronze'
        },
        'entry': {
          name: 'Entry Level (₹18K-25K)',
          range: [18000, 25000],
          jobs: ['MTS', 'Group D', 'Helper'],
          color: '#gray'
        }
      },

      // By education level
      education: {
        'graduation': {
          name: 'Graduate Level',
          requirement: 'Bachelor\'s Degree',
          jobs: ['IAS', 'Bank PO', 'SSC CGL'],
          percentage: 60
        },
        'post-graduation': {
          name: 'Post Graduate',
          requirement: 'Master\'s Degree',
          jobs: ['Professor', 'Research Officer'],
          percentage: 15
        },
        'intermediate': {
          name: '12th Pass',
          requirement: 'Higher Secondary',
          jobs: ['SSC CHSL', 'Clerk', 'Stenographer'],
          percentage: 20
        },
        'matriculation': {
          name: '10th Pass',
          requirement: 'Secondary',
          jobs: ['MTS', 'Constable', 'Helper'],
          percentage: 5
        }
      },

      // By exam difficulty
      difficulty: {
        'extremely-hard': {
          name: 'Extremely Difficult',
          level: 5,
          jobs: ['IAS', 'IPS', 'IFS'],
          success_rate: '0.1%',
          preparation: '2-3 years'
        },
        'very-hard': {
          name: 'Very Difficult', 
          level: 4,
          jobs: ['IRS', 'IES', 'Bank PO'],
          success_rate: '0.5%',
          preparation: '1-2 years'
        },
        'hard': {
          name: 'Difficult',
          level: 3,
          jobs: ['SSC CGL', 'Railway Officer'],
          success_rate: '2%',
          preparation: '8-12 months'
        },
        'moderate': {
          name: 'Moderate',
          level: 2,
          jobs: ['Clerk', 'Stenographer'],
          success_rate: '5%',
          preparation: '4-6 months'
        },
        'easy': {
          name: 'Relatively Easy',
          level: 1,
          jobs: ['MTS', 'Group D'],
          success_rate: '10%',
          preparation: '2-3 months'
        }
      }
    };
  }

  // Categorize a single job
  categorizeJob(jobData) {
    const categories = {
      primary: this.getPrimaryCategory(jobData),
      salary: this.getSalaryCategory(jobData),
      education: this.getEducationCategory(jobData),
      difficulty: this.getDifficultyCategory(jobData),
      tags: this.generateTags(jobData)
    };

    return categories;
  }

  getPrimaryCategory(jobData) {
    const title = jobData.title.toLowerCase();
    
    for (const [key, category] of Object.entries(this.categories.primary)) {
      if (category.jobs.some(job => title.includes(job.toLowerCase()))) {
        return {
          key,
          name: category.name,
          icon: category.icon,
          priority: category.priority
        };
      }
    }
    
    return { key: 'other', name: 'Other Services', icon: '📋', priority: 10 };
  }

  getSalaryCategory(jobData) {
    const salary = parseInt(jobData.basicSalary || 0);
    
    for (const [key, category] of Object.entries(this.categories.salary)) {
      if (salary >= category.range[0] && salary <= category.range[1]) {
        return {
          key,
          name: category.name,
          range: category.range,
          color: category.color
        };
      }
    }
    
    return { key: 'unknown', name: 'Salary Not Specified', color: '#gray' };
  }

  getEducationCategory(jobData) {
    const education = jobData.education?.toLowerCase() || '';
    
    if (education.includes('master') || education.includes('post grad')) {
      return this.categories.education['post-graduation'];
    } else if (education.includes('bachelor') || education.includes('graduation')) {
      return this.categories.education['graduation'];
    } else if (education.includes('12th') || education.includes('intermediate')) {
      return this.categories.education['intermediate'];
    } else if (education.includes('10th') || education.includes('matric')) {
      return this.categories.education['matriculation'];
    }
    
    return this.categories.education['graduation']; // Default
  }

  getDifficultyCategory(jobData) {
    const title = jobData.title.toLowerCase();
    
    // Extremely hard
    if (['ias', 'ips', 'ifs'].some(job => title.includes(job))) {
      return this.categories.difficulty['extremely-hard'];
    }
    
    // Very hard  
    if (['irs', 'ies', 'bank po', 'sbi po'].some(job => title.includes(job))) {
      return this.categories.difficulty['very-hard'];
    }
    
    // Hard
    if (['ssc cgl', 'railway officer', 'inspector'].some(job => title.includes(job))) {
      return this.categories.difficulty['hard'];
    }
    
    // Moderate
    if (['clerk', 'stenographer', 'assistant'].some(job => title.includes(job))) {
      return this.categories.difficulty['moderate'];
    }
    
    // Easy
    return this.categories.difficulty['easy'];
  }

  generateTags(jobData) {
    const tags = [];
    
    // Add primary category tag
    const primaryCat = this.getPrimaryCategory(jobData);
    tags.push(primaryCat.name.toLowerCase().replace(/\s+/g, '-'));
    
    // Add salary range tag
    const salaryCat = this.getSalaryCategory(jobData);
    tags.push(salaryCat.key + '-salary');
    
    // Add education tag
    const educationCat = this.getEducationCategory(jobData);
    tags.push(educationCat.name.toLowerCase().replace(/\s+/g, '-'));
    
    // Add authority tag
    if (jobData.authority) {
      tags.push(jobData.authority.toLowerCase());
    }
    
    // Add state tag if applicable
    if (jobData.state) {
      tags.push(jobData.state.toLowerCase() + '-government');
    } else {
      tags.push('central-government');
    }
    
    return tags;
  }

  // Generate category pages data
  generateCategoryPages() {
    const pages = [];
    
    // Primary category pages
    Object.entries(this.categories.primary).forEach(([key, category]) => {
      pages.push({
        slug: key,
        title: `${category.name} Jobs Salary Guide`,
        description: category.description,
        jobs: category.jobs,
        template: 'category-page',
        priority: category.priority
      });
    });
    
    // Salary range pages
    Object.entries(this.categories.salary).forEach(([key, category]) => {
      pages.push({
        slug: `${key}-salary-jobs`,
        title: `${category.name} Government Jobs`,
        description: `Government jobs in ${category.name.toLowerCase()} range`,
        salaryRange: category.range,
        template: 'salary-category'
      });
    });
    
    return pages.sort((a, b) => (a.priority || 10) - (b.priority || 10));
  }

  // Generate navigation menu
  generateNavigation() {
    return Object.entries(this.categories.primary)
      .sort(([,a], [,b]) => a.priority - b.priority)
      .map(([key, category]) => ({
        title: category.name,
        icon: category.icon,
        href: `/${key}`,
        jobs: category.jobs.slice(0, 5) // Top 5 jobs for dropdown
      }));
  }

  // Get trending jobs by category
  getTrendingJobs(category = 'all', limit = 10) {
    const trending = {
      'civil-services': ['IAS', 'IPS', 'IRS', 'IFS', 'IES'],
      'banking-finance': ['SBI PO', 'IBPS PO', 'RBI Grade B', 'LIC AAO'],
      'ssc-railways': ['SSC CGL', 'SSC CHSL', 'Railway ALP', 'Group D'],
      'defense-police': ['Indian Army', 'Navy', 'Air Force', 'Police Constable'],
      'state-services': ['BPSC', 'UPPSC', 'MPSC', 'State Police'],
      'teaching-research': ['UGC NET', 'KVS PGT', 'NVS TGT', 'CSIR NET']
    };
    
    if (category === 'all') {
      return Object.values(trending).flat().slice(0, limit);
    }
    
    return trending[category]?.slice(0, limit) || [];
  }
}

// Usage example
const categorizer = new JobCategorizer();

// Example job data
const sampleJobs = [
  {
    title: "IAS Officer",
    basicSalary: 99000,
    education: "Graduation",
    authority: "UPSC",
    state: null
  },
  {
    title: "SBI PO",
    basicSalary: 82000,
    education: "Graduation", 
    authority: "IBPS",
    state: null
  },
  {
    title: "SSC CGL",
    basicSalary: 44900,
    education: "Graduation",
    authority: "SSC",
    state: null
  }
];

// Categorize jobs
const categorizedJobs = sampleJobs.map(job => ({
  ...job,
  categories: categorizer.categorizeJob(job)
}));

console.log("Categorized Jobs:", categorizedJobs);

// Generate category pages
const categoryPages = categorizer.generateCategoryPages();
console.log("Category Pages:", categoryPages);

// Generate navigation
const navigation = categorizer.generateNavigation();
console.log("Navigation:", navigation);

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = JobCategorizer;
}