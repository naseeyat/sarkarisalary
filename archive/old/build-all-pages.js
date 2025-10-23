#!/usr/bin/env node

// Automated Build Script for Complete Government Jobs Website
const { ProgrammaticSEOGenerator } = require('./programmatic-seo-generator.js');
const { SEOTemplateGenerator } = require('./template-generator.js');
const fs = require('fs').promises;
const path = require('path');

class WebsiteBuilder {
  constructor() {
    this.outputDir = './dist';
    this.pagesGenerated = 0;
    this.startTime = Date.now();
  }

  async buildComplete() {
    console.log('🚀 Starting Complete Website Build...\n');
    
    // Create output directory
    await this.ensureDirectory(this.outputDir);
    
    // Generate all pages
    await this.generateHomepage();
    await this.generateJobListings();
    await this.generateIndividualJobPages();
    await this.generateComparisonPages();
    await this.generateLocationPages();
    await this.generateSitemap();
    await this.generateRobotsTxt();
    
    const duration = (Date.now() - this.startTime) / 1000;
    console.log(`\n✅ Build Complete!`);
    console.log(`📊 Pages Generated: ${this.pagesGenerated}`);
    console.log(`⏱️  Build Time: ${duration}s`);
    console.log(`📁 Output Directory: ${this.outputDir}`);
  }

  async ensureDirectory(dir) {
    try {
      await fs.mkdir(dir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }
  }

  async generateHomepage() {
    console.log('📄 Generating Homepage...');
    
    const homepage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SarkariSalary.de - Complete Government Jobs Salary Database India</title>
  <meta name="description" content="Complete database of all government job salaries in India. IAS, IPS, SSC, Banking, Railway, Teaching jobs salary structure with career progression.">
  <meta name="keywords" content="sarkari job salary, government job salary, ias salary, ssc salary, bank po salary, railway job salary">
  
  <!-- Open Graph -->
  <meta property="og:title" content="SarkariSalary.de - Government Jobs Salary Database">
  <meta property="og:description" content="Complete salary information for all government jobs in India with career progression and benefits.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://sarkarisalary.de/">
  
  <link rel="canonical" href="https://sarkarisalary.de/">
  <style>
    body { font-family: Inter, sans-serif; margin: 0; background: #fafafa; }
    .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
    .hero { text-align: center; padding: 60px 0; }
    .hero h1 { font-size: 48px; font-weight: 800; color: #0a0a0a; margin-bottom: 16px; }
    .hero p { font-size: 18px; color: #525252; margin-bottom: 32px; }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 40px 0; }
    .stat-card { background: white; padding: 20px; border-radius: 8px; text-align: center; }
    .categories-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
    .category-card { background: white; padding: 24px; border-radius: 12px; border: 1px solid #e5e5e5; }
    .category-title { font-size: 20px; font-weight: 700; margin-bottom: 12px; }
    .job-link { display: block; color: #2563eb; text-decoration: none; margin: 4px 0; }
    .job-link:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <section class="hero">
      <h1>Complete Government Jobs Salary Database</h1>
      <p>Accurate salary information for all Sarkari Naukri positions in India with career progression and benefits</p>
      
      <div class="stats-grid">
        <div class="stat-card">
          <h3>500+</h3>
          <p>Job Types</p>
        </div>
        <div class="stat-card">
          <h3>₹18K-₹2.5L</h3>
          <p>Salary Range</p>
        </div>
        <div class="stat-card">
          <h3>5L+</h3>
          <p>Current Vacancies</p>
        </div>
        <div class="stat-card">
          <h3>All States</h3>
          <p>Coverage</p>
        </div>
      </div>
    </section>

    <section>
      <h2 style="text-align: center; margin-bottom: 40px;">Browse Jobs by Category</h2>
      <div class="categories-grid">
        <div class="category-card">
          <div class="category-title">🎯 Central Services (UPSC)</div>
          <a href="/ias-salary/" class="job-link">IAS Officer Salary</a>
          <a href="/ips-salary/" class="job-link">IPS Officer Salary</a>
          <a href="/ifs-salary/" class="job-link">IFS Officer Salary</a>
          <a href="/irs-salary/" class="job-link">IRS Officer Salary</a>
        </div>
        
        <div class="category-card">
          <div class="category-title">📋 SSC Jobs</div>
          <a href="/ssc-cgl-salary/" class="job-link">SSC CGL Salary</a>
          <a href="/ssc-chsl-salary/" class="job-link">SSC CHSL Salary</a>
          <a href="/ssc-mts-salary/" class="job-link">SSC MTS Salary</a>
          <a href="/ssc-cpo-salary/" class="job-link">SSC CPO Salary</a>
        </div>
        
        <div class="category-card">
          <div class="category-title">🏦 Banking Jobs</div>
          <a href="/sbi-po-salary/" class="job-link">SBI PO Salary</a>
          <a href="/ibps-po-salary/" class="job-link">IBPS PO Salary</a>
          <a href="/sbi-clerk-salary/" class="job-link">SBI Clerk Salary</a>
          <a href="/ibps-clerk-salary/" class="job-link">IBPS Clerk Salary</a>
        </div>
        
        <div class="category-card">
          <div class="category-title">🚂 Railway Jobs</div>
          <a href="/rrb-ntpc-salary/" class="job-link">RRB NTPC Salary</a>
          <a href="/rrb-group-d-salary/" class="job-link">RRB Group D Salary</a>
          <a href="/rrb-je-salary/" class="job-link">RRB JE Salary</a>
          <a href="/rrb-alp-salary/" class="job-link">RRB ALP Salary</a>
        </div>
        
        <div class="category-card">
          <div class="category-title">👨‍🏫 Teaching Jobs</div>
          <a href="/kvs-pgt-salary/" class="job-link">KVS PGT Salary</a>
          <a href="/kvs-tgt-salary/" class="job-link">KVS TGT Salary</a>
          <a href="/kvs-prt-salary/" class="job-link">KVS PRT Salary</a>
          <a href="/ugc-net-salary/" class="job-link">UGC NET Salary</a>
        </div>
        
        <div class="category-card">
          <div class="category-title">🏛️ State Government</div>
          <a href="/uppsc-salary/" class="job-link">UPPSC Salary</a>
          <a href="/bpsc-salary/" class="job-link">BPSC Salary</a>
          <a href="/mpsc-salary/" class="job-link">MPSC Salary</a>
          <a href="/wbpsc-salary/" class="job-link">WBPSC Salary</a>
        </div>
      </div>
    </section>
  </div>
</body>
</html>`;

    await fs.writeFile(path.join(this.outputDir, 'index.html'), homepage);
    this.pagesGenerated++;
  }

  async generateJobListings() {
    console.log('📋 Generating Job Listings Page...');
    
    // Copy the existing job listings file
    try {
      const existingListings = await fs.readFile('./government-jobs-listing.html', 'utf8');
      await fs.writeFile(path.join(this.outputDir, 'jobs.html'), existingListings);
      this.pagesGenerated++;
    } catch (error) {
      console.log('⚠️  Job listings template not found, skipping...');
    }
  }

  async generateIndividualJobPages() {
    console.log('💼 Generating Individual Job Pages...');
    
    const generator = new ProgrammaticSEOGenerator();
    const result = generator.executeFullGeneration();
    
    // Generate HTML for each page
    for (const page of result.pages) {
      const html = this.createPageHTML(page);
      const fileName = page.url.replace(/^\//, '').replace(/\/$/, '') + '.html';
      const filePath = path.join(this.outputDir, fileName);
      
      // Create subdirectories if needed
      const dir = path.dirname(filePath);
      await this.ensureDirectory(dir);
      
      await fs.writeFile(filePath, html);
      this.pagesGenerated++;
    }
    
    console.log(`   Generated ${result.pages.length} job-specific pages`);
  }

  createPageHTML(page) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title}</title>
  <meta name="description" content="${page.title.substring(0, 160)}">
  <meta name="keywords" content="${page.keywords ? page.keywords.join(', ') : ''}">
  
  <link rel="canonical" href="https://sarkarisalary.de${page.url}">
  
  <style>
    body { font-family: Inter, sans-serif; line-height: 1.6; max-width: 1000px; margin: 0 auto; padding: 20px; }
    h1 { color: #0a0a0a; font-size: 32px; margin-bottom: 20px; }
    h2 { color: #2563eb; font-size: 24px; margin: 30px 0 15px 0; }
    h3 { color: #374151; font-size: 18px; margin: 20px 0 10px 0; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 12px; border: 1px solid #e5e5e5; text-align: left; }
    th { background: #f8fafc; font-weight: 600; }
    .highlight-box { background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .nav { margin-bottom: 20px; }
    .nav a { color: #2563eb; text-decoration: none; }
    .nav a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <nav class="nav">
    <a href="/">Home</a> → <a href="/jobs.html">Jobs</a> → ${page.title}
  </nav>
  
  ${page.content || `
  <h1>${page.title}</h1>
  
  <div class="highlight-box">
    <p><strong>Complete information about ${page.title.split(' ')[0]} coming soon!</strong> This page will include detailed salary breakdown, allowances, career progression, and application process.</p>
  </div>
  
  <h2>Quick Overview</h2>
  <p>This page provides comprehensive information about ${page.title.split(' ')[0]} including salary structure, benefits, and career opportunities.</p>
  
  <h2>Related Jobs</h2>
  <ul>
    <li><a href="/ias-salary.html">IAS Officer Salary</a></li>
    <li><a href="/ssc-cgl-salary.html">SSC CGL Salary</a></li>
    <li><a href="/sbi-po-salary.html">SBI PO Salary</a></li>
    <li><a href="/rrb-ntpc-salary.html">RRB NTPC Salary</a></li>
  </ul>
  `}
  
  <script>
    console.log('Page loaded: ${page.title}');
  </script>
</body>
</html>`;
  }

  async generateComparisonPages() {
    console.log('⚖️  Generating Comparison Pages...');
    
    const comparisons = [
      { url: '/ias-vs-ips-salary-comparison.html', title: 'IAS vs IPS Salary Comparison 2024' },
      { url: '/central-vs-state-government-salary.html', title: 'Central vs State Government Salary Comparison' },
      { url: '/ssc-cgl-vs-banking-jobs-salary.html', title: 'SSC CGL vs Banking Jobs Salary Comparison' }
    ];
    
    for (const comp of comparisons) {
      const html = this.createPageHTML(comp);
      await fs.writeFile(path.join(this.outputDir, comp.url.replace('/', '')), html);
      this.pagesGenerated++;
    }
  }

  async generateLocationPages() {
    console.log('🗺️  Generating Location-based Pages...');
    
    const states = ['uttar-pradesh', 'bihar', 'maharashtra', 'west-bengal', 'rajasthan'];
    
    for (const state of states) {
      const page = {
        url: `/${state}-government-jobs-salary.html`,
        title: `${state.replace(/-/g, ' ').toUpperCase()} Government Jobs Salary 2024`,
        keywords: [`${state} government jobs`, `${state} sarkari naukri`]
      };
      
      const html = this.createPageHTML(page);
      await fs.writeFile(path.join(this.outputDir, page.url.replace('/', '')), html);
      this.pagesGenerated++;
    }
  }

  async generateSitemap() {
    console.log('🗺️  Generating Sitemap...');
    
    const generator = new ProgrammaticSEOGenerator();
    const result = generator.executeFullGeneration();
    const sitemap = generator.generateSitemap(result.pages);
    
    await fs.writeFile(path.join(this.outputDir, 'sitemap.xml'), sitemap);
    console.log('   Generated sitemap.xml');
  }

  async generateRobotsTxt() {
    console.log('🤖 Generating robots.txt...');
    
    const robots = `User-agent: *
Allow: /

Sitemap: https://sarkarisalary.de/sitemap.xml

# Block crawling of search and filter parameters
Disallow: /*?search=
Disallow: /*?filter=
Disallow: /*?sort=

# Allow all salary pages
Allow: /*-salary/
Allow: /*-salary-*

# Block admin areas
Disallow: /admin/
Disallow: /wp-admin/
Disallow: /private/`;

    await fs.writeFile(path.join(this.outputDir, 'robots.txt'), robots);
  }
}

// Execute build if run directly
if (require.main === module) {
  const builder = new WebsiteBuilder();
  builder.buildComplete().catch(console.error);
}

module.exports = { WebsiteBuilder };