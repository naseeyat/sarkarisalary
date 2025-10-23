// SEO-Optimized Template Generator for Government Jobs
const fs = require('fs');
const path = require('path');

// Real Government Job Data (Accurate as per official sources)
const realJobData = {
  "ias": {
    name: "Indian Administrative Service",
    shortName: "IAS",
    sector: "UPSC Civil Services",
    basicPay: 56100,
    totalSalary: 85000,
    maxSalary: 250000,
    payLevel: "10-18",
    recruitmentExam: "UPSC Civil Services Examination",
    currentVacancies: 180,
    totalApplications: 1800000,
    successRate: 0.1,
    cadreStrength: 4926,
    averageAge: 26,
    trainingDuration: "2 years",
    trainingLocation: "LBSNAA, Mussoorie",
    keywords: ["ias salary", "district collector salary", "ias officer pay scale", "civil services salary"],
    challenges: ["political-pressure", "remote-posting", "transfer-stress", "media-scrutiny"],
    allowances: {
      hra: { X: 24, Y: 16, Z: 8 },
      da: 53,
      ta: 3200,
      cityAllowance: { metro: 3600, nonMetro: 1800 }
    },
    careerProgression: [
      { stage: "SDM", years: "0-2", salary: "56,100-67,700", level: 10 },
      { stage: "ADM", years: "2-4", salary: "67,700-78,800", level: 11 },
      { stage: "DC", years: "4-8", salary: "78,800-1,18,500", level: 12 },
      { stage: "JS", years: "12-16", salary: "1,18,500-1,44,200", level: 13 },
      { stage: "AS", years: "16-20", salary: "1,44,200-2,18,200", level: 14 },
      { stage: "Secretary", years: "20+", salary: "2,25,000-2,50,000", level: 17-18 }
    ]
  },
  "ssc_cgl": {
    name: "SSC Combined Graduate Level",
    shortName: "SSC CGL",
    sector: "Staff Selection Commission",
    basicPay: 25500,
    totalSalary: 35000,
    maxSalary: 151100,
    payLevel: "4-8",
    recruitmentExam: "SSC CGL Examination",
    currentVacancies: 17323,
    totalApplications: 2800000,
    successRate: 0.62,
    keywords: ["ssc cgl salary", "assistant audit officer salary", "inspector salary", "ssc pay scale"],
    postWise: {
      "Assistant Audit Officer": { level: 8, salary: "47,600-1,51,100", vacancies: 1218 },
      "Inspector (CBEC)": { level: 7, salary: "44,900-1,42,400", vacancies: 3259 },
      "Sub Inspector": { level: 6, salary: "35,400-1,12,400", vacancies: 2980 },
      "Assistant Section Officer": { level: 6, salary: "35,400-1,12,400", vacancies: 4587 }
    }
  },
  "banking_po": {
    name: "Bank Probationary Officer",
    shortName: "Bank PO",
    sector: "Banking",
    basicPay: 41960,
    totalSalary: 65000,
    maxSalary: 150000,
    payLevel: "JMGS-I to SMGS-V",
    recruitmentExam: "IBPS PO / SBI PO",
    currentVacancies: 6135,
    totalApplications: 2000000,
    successRate: 0.31,
    banks: ["SBI", "PNB", "Bank of Baroda", "Canara Bank", "Union Bank"],
    keywords: ["bank po salary", "sbi po salary", "ibps po pay scale", "banking job salary"]
  }
};

// SEO Template Generator
class SEOTemplateGenerator {
  constructor() {
    this.baseTemplate = this.getBaseTemplate();
    this.currentYear = new Date().getFullYear();
  }

  generateJobSalaryPage(jobKey) {
    const job = realJobData[jobKey];
    if (!job) return null;

    const template = this.baseTemplate
      .replace(/{{JOB_NAME}}/g, job.name)
      .replace(/{{JOB_SHORT}}/g, job.shortName)
      .replace(/{{SECTOR}}/g, job.sector)
      .replace(/{{CURRENT_YEAR}}/g, this.currentYear)
      .replace(/{{MIN_SALARY}}/g, job.basicPay.toLocaleString())
      .replace(/{{MAX_SALARY}}/g, job.maxSalary.toLocaleString())
      .replace(/{{TOTAL_SALARY}}/g, job.totalSalary.toLocaleString())
      .replace(/{{BASIC_PAY}}/g, job.basicPay.toLocaleString())
      .replace(/{{VACANCIES}}/g, job.currentVacancies.toLocaleString())
      .replace(/{{APPLICATIONS}}/g, job.totalApplications.toLocaleString())
      .replace(/{{SUCCESS_RATE}}/g, job.successRate)
      .replace(/{{KEYWORDS}}/g, job.keywords.join(', '))
      .replace(/{{JOB_SLUG}}/g, jobKey.replace('_', '-'))
      .replace(/{{SCHEMA_JSON}}/g, this.generateSchema(job))
      .replace(/{{FAQ_CONTENT}}/g, this.generateFAQ(job))
      .replace(/{{CAREER_TIMELINE}}/g, this.generateCareerTimeline(job))
      .replace(/{{SALARY_TABLE}}/g, this.generateSalaryTable(job));

    return template;
  }

  generateSchema(job) {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "JobPosting",
      "title": job.name,
      "description": `Complete salary guide for ${job.name} including pay scale, allowances and career progression`,
      "hiringOrganization": {
        "@type": "Organization",
        "name": "Government of India"
      },
      "jobLocation": {
        "@type": "Place",
        "addressCountry": "IN"
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "INR",
        "value": {
          "@type": "QuantitativeValue",
          "value": job.basicPay,
          "unitText": "MONTH"
        }
      },
      "employmentType": "FULL_TIME",
      "validThrough": "2024-12-31"
    }, null, 2);
  }

  generateFAQ(job) {
    return `
    <div class="faq-section">
      <div class="faq-item" itemscope itemtype="https://schema.org/Question">
        <h3 itemprop="name">What is the starting salary of ${job.name} in ${this.currentYear}?</h3>
        <div itemscope itemtype="https://schema.org/Answer" itemprop="acceptedAnswer">
          <div itemprop="text">The starting salary of ${job.name} is ₹${job.basicPay.toLocaleString()} per month as basic pay, with total in-hand salary of approximately ₹${job.totalSalary.toLocaleString()} including allowances.</div>
        </div>
      </div>
      
      <div class="faq-item" itemscope itemtype="https://schema.org/Question">
        <h3 itemprop="name">How many vacancies are there for ${job.name}?</h3>
        <div itemscope itemtype="https://schema.org/Answer" itemprop="acceptedAnswer">
          <div itemprop="text">There are ${job.currentVacancies} vacancies for ${job.name} in ${this.currentYear}, with ${job.totalApplications.toLocaleString()} applications received.</div>
        </div>
      </div>
      
      <div class="faq-item" itemscope itemtype="https://schema.org/Question">
        <h3 itemprop="name">What is the success rate for ${job.name}?</h3>
        <div itemscope itemtype="https://schema.org/Answer" itemprop="acceptedAnswer">
          <div itemprop="text">The success rate for ${job.name} is approximately ${job.successRate}%, making it one of the most competitive government jobs in India.</div>
        </div>
      </div>
    </div>`;
  }

  generateCareerTimeline(job) {
    if (!job.careerProgression) return '';
    
    return job.careerProgression.map(stage => `
      <div class="career-stage">
        <h3>${stage.stage} (${stage.years})</h3>
        <p>Salary: ₹${stage.salary}</p>
        <p>Pay Level: ${stage.level}</p>
      </div>
    `).join('');
  }

  generateSalaryTable(job) {
    const allowances = job.allowances || {};
    return `
    <table class="salary-table">
      <thead>
        <tr><th>Component</th><th>Amount (₹)</th><th>Percentage</th></tr>
      </thead>
      <tbody>
        <tr><td>Basic Pay</td><td>${job.basicPay.toLocaleString()}</td><td>Base</td></tr>
        <tr><td>HRA (City X/Y/Z)</td><td>${allowances.hra ? `${Math.round(job.basicPay * allowances.hra.X / 100).toLocaleString()}/${Math.round(job.basicPay * allowances.hra.Y / 100).toLocaleString()}/${Math.round(job.basicPay * allowances.hra.Z / 100).toLocaleString()}` : 'Variable'}</td><td>${allowances.hra ? `${allowances.hra.X}%/${allowances.hra.Y}%/${allowances.hra.Z}%` : 'Variable'}</td></tr>
        <tr><td>Dearness Allowance</td><td>${allowances.da ? Math.round(job.basicPay * allowances.da / 100).toLocaleString() : 'Variable'}</td><td>${allowances.da || 'Variable'}%</td></tr>
        <tr><td>Transport Allowance</td><td>${allowances.ta || 'Variable'}</td><td>Fixed</td></tr>
        <tr><td><strong>Total In-Hand</strong></td><td><strong>${job.totalSalary.toLocaleString()}</strong></td><td><strong>Approximate</strong></td></tr>
      </tbody>
    </table>`;
  }

  getBaseTemplate() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{JOB_NAME}} Salary {{CURRENT_YEAR}}: ₹{{MIN_SALARY}} to ₹{{MAX_SALARY}} Monthly | Complete Guide</title>
  <meta name="description" content="Complete {{JOB_NAME}} salary structure with allowances, benefits & career progression. Get accurate {{CURRENT_YEAR}} pay scale details for {{JOB_SHORT}} officers.">
  <meta name="keywords" content="{{KEYWORDS}}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="{{JOB_NAME}} Salary {{CURRENT_YEAR}} - Complete Breakdown">
  <meta property="og:description" content="{{JOB_NAME}} officers earn ₹{{MIN_SALARY}} to ₹{{MAX_SALARY}} per month. Complete salary structure with allowances.">
  <meta property="og:image" content="/images/{{JOB_SLUG}}-salary-guide.jpg">
  <meta property="og:type" content="article">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{JOB_NAME}} Salary {{CURRENT_YEAR}}">
  <meta name="twitter:description" content="Complete salary breakdown: ₹{{MIN_SALARY}} to ₹{{MAX_SALARY}} monthly">
  
  <!-- Schema Markup -->
  <script type="application/ld+json">{{SCHEMA_JSON}}</script>
  
  <link rel="canonical" href="https://sarkarisalary.de/{{JOB_SLUG}}-salary/">
  
  <style>
    body { font-family: Inter, sans-serif; line-height: 1.6; max-width: 1200px; margin: 0 auto; padding: 20px; }
    .salary-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .salary-table th, .salary-table td { padding: 12px; border: 1px solid #ddd; text-align: left; }
    .salary-table th { background: #f8f9fa; font-weight: 600; }
    .faq-section { margin: 40px 0; }
    .faq-item { margin: 20px 0; padding: 20px; border: 1px solid #e5e5e5; border-radius: 8px; }
    .faq-item h3 { color: #2563eb; margin-bottom: 10px; }
    .career-stage { background: #f8fafc; padding: 16px; margin: 12px 0; border-radius: 8px; }
    .highlight-box { background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
    .stat-card { background: #ffffff; border: 1px solid #e5e5e5; padding: 20px; border-radius: 8px; text-align: center; }
  </style>
</head>
<body>
  <nav>
    <a href="/">Home</a> → <a href="/government-jobs/">Government Jobs</a> → {{JOB_NAME}} Salary
  </nav>
  
  <h1>{{JOB_NAME}} Salary {{CURRENT_YEAR}} - Complete Breakdown</h1>
  
  <div class="highlight-box">
    <strong>Quick Summary:</strong> {{JOB_NAME}} officers earn between ₹{{MIN_SALARY}} to ₹{{MAX_SALARY}} per month. Starting salary is ₹{{BASIC_PAY}} with total in-hand around ₹{{TOTAL_SALARY}} including allowances.
  </div>
  
  <div class="stats-grid">
    <div class="stat-card">
      <h3>Current Vacancies</h3>
      <p><strong>{{VACANCIES}}</strong> positions</p>
    </div>
    <div class="stat-card">
      <h3>Total Applications</h3>
      <p><strong>{{APPLICATIONS}}</strong> candidates</p>
    </div>
    <div class="stat-card">
      <h3>Success Rate</h3>
      <p><strong>{{SUCCESS_RATE}}%</strong> selection</p>
    </div>
  </div>
  
  <h2>Monthly Salary Structure</h2>
  {{SALARY_TABLE}}
  
  <h2>Career Progression Timeline</h2>
  {{CAREER_TIMELINE}}
  
  <h2>Frequently Asked Questions</h2>
  {{FAQ_CONTENT}}
  
  <h2>Related Government Jobs</h2>
  <ul>
    <li><a href="/ias-salary/">IAS Officer Salary</a></li>
    <li><a href="/ips-salary/">IPS Officer Salary</a></li>
    <li><a href="/ssc-cgl-salary/">SSC CGL Salary</a></li>
    <li><a href="/banking-po-salary/">Banking PO Salary</a></li>
  </ul>
  
  <script>
    // Analytics tracking
    console.log('Page loaded: {{JOB_NAME}} Salary Guide');
  </script>
</body>
</html>`;
  }

  // Generate multiple pages
  generateAllPages() {
    const pages = {};
    Object.keys(realJobData).forEach(jobKey => {
      pages[jobKey] = this.generateJobSalaryPage(jobKey);
    });
    return pages;
  }

  // Generate sitemap
  generateSitemap() {
    const baseUrl = 'https://sarkarisalary.de';
    const urls = Object.keys(realJobData).map(jobKey => ({
      url: `${baseUrl}/${jobKey.replace('_', '-')}-salary/`,
      lastmod: new Date().toISOString().split('T')[0],
      priority: '0.8'
    }));

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  }
}

// Usage Example
const generator = new SEOTemplateGenerator();

// Generate individual page
const iasPage = generator.generateJobSalaryPage('ias');
console.log('Generated IAS Salary Page');

// Generate all pages
const allPages = generator.generateAllPages();
console.log(`Generated ${Object.keys(allPages).length} salary pages`);

// Generate sitemap
const sitemap = generator.generateSitemap();
console.log('Generated sitemap.xml');

module.exports = { SEOTemplateGenerator, realJobData };