// Government Job Data Scraper
// Extract job data from popular government job websites

const JobDataScraper = {
  
  // Target websites for data extraction
  targetSites: {
    sarkariresults: {
      name: "Sarkari Results",
      baseUrl: "https://www.sarkariresults.com",
      selectors: {
        jobTitle: ".jobtitle",
        salary: ".salary-info",
        department: ".dept-name", 
        lastDate: ".last-date",
        jobLinks: "a[href*='job']"
      },
      patterns: {
        salary: /₹[\d,]+/g,
        posts: /(\d+)\s*Posts?/i,
        age: /Age.*?(\d+).*?(\d+)/i
      }
    },
    
    indgovtjobs: {
      name: "IndGovtJobs",
      baseUrl: "https://www.indgovtjobs.in",
      selectors: {
        jobTitle: "h2.entry-title",
        details: ".job-details",
        salary: ".salary-range",
        eligibility: ".eligibility"
      },
      patterns: {
        salary: /Rs\.?\s*[\d,]+/g,
        qualification: /(Graduate|Post Graduate|12th|10th)/i,
        experience: /(\d+)\s*years?\s*experience/i
      }
    },
    
    govtjobguru: {
      name: "GovtJobGuru", 
      baseUrl: "https://www.govtjobguru.in",
      selectors: {
        jobCard: ".job-card",
        title: ".job-title",
        organization: ".org-name",
        salary: ".salary-info"
      },
      patterns: {
        payScale: /Pay Scale.*?₹[\d,]+.*?₹[\d,]+/i,
        vacancy: /Vacancy.*?(\d+)/i
      }
    }
  },

  // Common job extraction patterns
  extractionPatterns: {
    // Salary patterns
    salary: {
      basic: /Basic.*?₹([\d,]+)/i,
      gross: /Gross.*?₹([\d,]+)/i,
      scale: /₹([\d,]+)\s*-\s*₹([\d,]+)/g,
      level: /Level[- ](\d+)/i,
      grade: /Grade[- ]([A-D])/i
    },
    
    // Job categories
    categories: {
      civil: /(IAS|IPS|IFS|IRS|Civil Services)/i,
      banking: /(Bank|PO|Clerk|IBPS|SBI|RBI)/i,
      railway: /(Railway|RRBS?|ALP|TC|RPF)/i,
      ssc: /(SSC|CGL|CHSL|MTS|JE|CPO)/i,
      defense: /(Army|Navy|Air Force|NDA|CDS)/i,
      police: /(Police|Constable|SI|Inspector)/i,
      teaching: /(Teacher|Professor|TGT|PGT|PRT)/i
    },
    
    // Educational qualifications
    education: {
      graduation: /(Graduate|Bachelor|Degree|B\.[A-Z]+)/i,
      postGrad: /(Post Graduate|Master|M\.[A-Z]+|MBA|MCA)/i,
      twelfth: /(12th|Higher Secondary|Intermediate|\+2)/i,
      tenth: /(10th|Matriculation|Secondary)/i
    },
    
    // Age limits
    age: {
      pattern: /Age.*?(\d+).*?(\d+)|(\d+)\s*to\s*(\d+)\s*years/i,
      relaxation: /(SC|ST|OBC).*?(\d+)\s*years/i
    }
  },

  // Scraping functions (Note: This is conceptual - actual implementation would need server-side)
  scrapingMethods: {
    
    // Extract job listings from a page
    extractJobListings: function(html, siteConfig) {
      const jobs = [];
      
      // Parse job cards/listings
      const jobElements = this.parseHTML(html, siteConfig.selectors.jobCard || siteConfig.selectors.jobTitle);
      
      jobElements.forEach(element => {
        const job = this.extractJobDetails(element, siteConfig);
        if (job && job.title) {
          jobs.push(job);
        }
      });
      
      return jobs;
    },

    // Extract details from individual job posting
    extractJobDetails: function(element, siteConfig) {
      const job = {
        title: this.extractText(element, siteConfig.selectors.jobTitle),
        department: this.extractText(element, siteConfig.selectors.department),
        salary: this.extractSalary(element, siteConfig),
        posts: this.extractPosts(element),
        ageLimit: this.extractAgeLimit(element),
        education: this.extractEducation(element),
        lastDate: this.extractLastDate(element, siteConfig),
        source: siteConfig.name,
        scrapedAt: new Date().toISOString()
      };

      // Categorize job
      job.category = this.categorizeJob(job.title);
      
      // Generate additional metadata
      job.payGrade = this.determinePayGrade(job.salary);
      job.difficulty = this.assessDifficulty(job.category, job.education);
      
      return job;
    },

    // Extract salary information
    extractSalary: function(element, siteConfig) {
      const salaryText = this.extractText(element, siteConfig.selectors.salary);
      const salaryData = {};
      
      // Extract different salary components
      const basicMatch = salaryText.match(this.extractionPatterns.salary.basic);
      if (basicMatch) salaryData.basic = parseInt(basicMatch[1].replace(/,/g, ''));
      
      const scaleMatch = salaryText.match(this.extractionPatterns.salary.scale);
      if (scaleMatch) {
        salaryData.min = parseInt(scaleMatch[1].replace(/,/g, ''));
        salaryData.max = parseInt(scaleMatch[2].replace(/,/g, ''));
      }
      
      const levelMatch = salaryText.match(this.extractionPatterns.salary.level);
      if (levelMatch) salaryData.level = parseInt(levelMatch[1]);
      
      return salaryData;
    },

    // Categorize job based on title
    categorizeJob: function(title) {
      const titleLower = title.toLowerCase();
      
      for (const [category, pattern] of Object.entries(this.extractionPatterns.categories)) {
        if (pattern.test(title)) {
          return category;
        }
      }
      
      return 'other';
    },

    // Determine pay grade from salary
    determinePayGrade: function(salaryData) {
      const basic = salaryData.basic || salaryData.min || 0;
      
      if (basic >= 56100) return 'A';
      if (basic >= 35400) return 'B';
      if (basic >= 19900) return 'C';
      return 'D';
    }
  },

  // Sample scraped data structure
  sampleScrapedData: [
    {
      title: "UPSC Civil Services Examination 2024",
      department: "Union Public Service Commission",
      salary: {
        basic: 99000,
        level: 10,
        scale: "₹56,100 - ₹1,77,500"
      },
      posts: 180,
      ageLimit: {
        general: { min: 21, max: 32 },
        obc: { min: 21, max: 35 },
        sc_st: { min: 21, max: 37 }
      },
      education: "Bachelor's Degree",
      lastDate: "2024-05-30",
      category: "civil",
      payGrade: "A",
      difficulty: "extremely-hard",
      source: "Sarkari Results",
      scrapedAt: "2024-01-15T10:30:00Z"
    },
    {
      title: "SBI PO Recruitment 2024",
      department: "State Bank of India",
      salary: {
        basic: 82000,
        scale: "₹36,000 - ₹1,55,000"
      },
      posts: 1500,
      ageLimit: {
        general: { min: 21, max: 30 }
      },
      education: "Graduation",
      category: "banking",
      payGrade: "A",
      difficulty: "very-hard",
      source: "IndGovtJobs"
    },
    {
      title: "SSC CGL 2024 Notification",
      department: "Staff Selection Commission",
      salary: {
        basic: 44900,
        level: 4,
        scale: "₹25,500 - ₹81,100"
      },
      posts: 17727,
      ageLimit: {
        general: { min: 18, max: 27 }
      },
      education: "Bachelor's Degree",
      category: "ssc",
      payGrade: "B",
      difficulty: "hard",
      source: "GovtJobGuru"
    }
  ],

  // Data processing and normalization
  dataProcessing: {
    
    // Normalize scraped data
    normalizeJobData: function(rawJobs) {
      return rawJobs.map(job => {
        return {
          // Standardized fields
          id: this.generateJobId(job),
          title: this.cleanTitle(job.title),
          organization: job.department,
          
          // Salary standardization
          salaryInfo: {
            basicPay: job.salary?.basic || null,
            payLevel: job.salary?.level || null,
            payScale: job.salary?.scale || null,
            grade: job.payGrade
          },
          
          // Vacancy info
          totalPosts: job.posts || null,
          
          // Eligibility
          eligibility: {
            education: job.education,
            ageLimit: job.ageLimit,
            experience: job.experience || null
          },
          
          // Meta information
          category: job.category,
          difficulty: job.difficulty,
          applicationDeadline: job.lastDate,
          
          // Source tracking
          dataSource: {
            website: job.source,
            scrapedDate: job.scrapedAt,
            lastUpdated: new Date().toISOString()
          }
        };
      });
    },

    // Generate unique job ID
    generateJobId: function(job) {
      const titleSlug = job.title.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');
      const year = new Date().getFullYear();
      return `${titleSlug}-${year}`;
    },

    // Clean and standardize job titles
    cleanTitle: function(title) {
      return title
        .replace(/\s*\d{4}\s*/, ' ') // Remove years
        .replace(/recruitment|notification|exam/gi, '') // Remove common words
        .replace(/\s+/g, ' ') // Normalize spaces
        .trim();
    },

    // Deduplicate jobs from multiple sources
    deduplicateJobs: function(jobs) {
      const seen = new Set();
      return jobs.filter(job => {
        const key = `${job.title}-${job.organization}`.toLowerCase();
        if (seen.has(key)) {
          return false;
        }
        seen.add(key);
        return true;
      });
    }
  },

  // Integration with our classification system
  integration: {
    
    // Convert scraped data to our job database format
    convertToJobDatabase: function(scrapedJobs) {
      const jobDatabase = {};
      
      scrapedJobs.forEach(job => {
        const jobKey = this.generateJobKey(job.title);
        
        jobDatabase[jobKey] = {
          title: job.title,
          subtitle: job.organization,
          
          // Tags for SEO
          tags: [
            { text: job.category.toUpperCase(), clickable: true },
            { text: `Grade ${job.salaryInfo.grade}`, clickable: true },
            { text: job.difficulty.replace('-', ' '), clickable: false },
            { text: `${job.totalPosts || 'Multiple'} Posts`, clickable: false }
          ],
          
          // Stats for dashboard
          stats: [
            { number: `${job.totalPosts || 'Multiple'}`, label: "Vacancies" },
            { number: `₹${(job.salaryInfo.basicPay / 1000)}K`, label: "Starting Pay" },
            { number: job.eligibility.ageLimit?.general?.max || 'N/A', label: "Max Age" },
            { number: job.difficulty.split('-')[0], label: "Difficulty" }
          ],
          
          // Career stages (dummy data - would need additional processing)
          stages: this.generateCareerStages(job),
          
          // Calculator options
          calculatorOptions: this.generateCalculatorOptions(job)
        };
      });
      
      return jobDatabase;
    },

    generateJobKey: function(title) {
      return title.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '_');
    },

    generateCareerStages: function(job) {
      // This would need more sophisticated logic based on job type
      return [
        {
          number: "1",
          title: `Entry Level ${job.title}`,
          years: "0-2 years",
          salary: `₹${job.salaryInfo.basicPay?.toLocaleString() || 'TBD'}`,
          description: `Starting position in ${job.organization}`
        }
      ];
    },

    generateCalculatorOptions: function(job) {
      return [
        {
          value: job.salaryInfo.basicPay?.toString() || "50000",
          text: `${job.title} (₹${job.salaryInfo.basicPay?.toLocaleString() || 'TBD'})`
        }
      ];
    }
  }
};

// Usage example for actual implementation
const jobScrapingPipeline = {
  
  // Step 1: Scrape data from multiple sources
  scrapeAllSources: async function() {
    const allJobs = [];
    
    for (const [siteKey, siteConfig] of Object.entries(JobDataScraper.targetSites)) {
      try {
        console.log(`Scraping ${siteConfig.name}...`);
        // const scrapedJobs = await scrapeWebsite(siteConfig);
        // allJobs.push(...scrapedJobs);
        
        // For demo, using sample data
        allJobs.push(...JobDataScraper.sampleScrapedData);
      } catch (error) {
        console.error(`Error scraping ${siteConfig.name}:`, error);
      }
    }
    
    return allJobs;
  },

  // Step 2: Process and normalize data
  processScrapedData: function(rawJobs) {
    const normalizedJobs = JobDataScraper.dataProcessing.normalizeJobData(rawJobs);
    const uniqueJobs = JobDataScraper.dataProcessing.deduplicateJobs(normalizedJobs);
    return uniqueJobs;
  },

  // Step 3: Convert to our database format
  generateJobDatabase: function(processedJobs) {
    return JobDataScraper.integration.convertToJobDatabase(processedJobs);
  },

  // Complete pipeline
  run: async function() {
    console.log("Starting job scraping pipeline...");
    
    const rawJobs = await this.scrapeAllSources();
    console.log(`Scraped ${rawJobs.length} jobs`);
    
    const processedJobs = this.processScrapedData(rawJobs);
    console.log(`Processed ${processedJobs.length} unique jobs`);
    
    const jobDatabase = this.generateJobDatabase(processedJobs);
    console.log(`Generated database with ${Object.keys(jobDatabase).length} job types`);
    
    return {
      rawJobs,
      processedJobs,
      jobDatabase
    };
  }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { JobDataScraper, jobScrapingPipeline };
}

// Demo run
console.log("Job Data Scraper loaded. Run jobScrapingPipeline.run() to extract data.");