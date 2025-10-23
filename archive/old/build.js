#!/usr/bin/env node

/**
 * Static Site Builder
 * Combines templates with data to generate final HTML pages
 * Usage: node build.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  templates: './templates',
  includes: './includes',
  output: './dist',
  data: './data'
};

// Utility functions
function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content);
}

function processIncludes(content) {
  const includeRegex = /<!-- INCLUDE: (.+?) -->/g;
  return content.replace(includeRegex, (match, includePath) => {
    try {
      const includeContent = readFile(path.join(CONFIG.includes, includePath));
      return processIncludes(includeContent); // Recursive for nested includes
    } catch (error) {
      console.warn(`Warning: Could not include ${includePath}`);
      return '';
    }
  });
}

function processPlaceholders(content, data) {
  // Replace {{PLACEHOLDER}} with data values
  const placeholderRegex = /\{\{([^}]+)\}\}/g;
  return content.replace(placeholderRegex, (match, key) => {
    return data[key] || '';
  });
}

function buildPage(templateName, data, outputPath) {
  try {
    // Read base template
    let content = readFile(path.join(CONFIG.templates, 'base.html'));
    
    // Read page template if different from base
    if (templateName !== 'base') {
      const pageTemplate = readFile(path.join(CONFIG.templates, `${templateName}.html`));
      data.CONTENT = pageTemplate;
    }
    
    // Process includes
    content = processIncludes(content);
    
    // Process placeholders
    content = processPlaceholders(content, data);
    
    // Write output
    writeFile(path.join(CONFIG.output, outputPath), content);
    console.log(`✅ Built: ${outputPath}`);
    
  } catch (error) {
    console.error(`❌ Error building ${outputPath}:`, error.message);
  }
}

// Build functions
function buildHomepage() {
  const data = {
    TITLE: 'Sarkari Salary | Government Job Salaries, Pay Scale, Grade Pay',
    META_DESCRIPTION: 'Complete government salary information for all sarkari jobs in Germany. Check pay scale, grade pay, allowances, and in-hand salary calculations.',
    META_KEYWORDS: 'sarkari salary, government job salary, pay scale, grade pay, sarkari result, government jobs germany',
    CANONICAL_URL: 'https://sarkarisalary.de/',
    OG_TITLE: 'Sarkari Salary - Government Job Salary Information',
    OG_DESCRIPTION: 'Complete salary information for all government jobs',
    OG_URL: 'https://sarkarisalary.de/',
    OG_IMAGE: 'https://sarkarisalary.de/assets/images/og-image.png',
    BODY_CLASS: 'homepage',
    
    HERO_TITLE: 'Government Job Salaries',
    HERO_SUBTITLE: 'Complete salary information for all sarkari jobs. Check pay scale, grade pay, allowances, and calculate your in-hand salary.',
    SEARCH_PLACEHOLDER: 'Search job title, department, or pay scale...',
    
    CATEGORIES_TITLE: 'Popular Categories',
    UPDATES_TITLE: 'Recent Salary Updates',
    
    STATS_CARDS: `
      <div class="stat-card">
        <span class="stat-number">1000+</span>
        <div class="stat-label">Government Jobs</div>
      </div>
      <div class="stat-card">
        <span class="stat-number">50+</span>
        <div class="stat-label">Departments</div>
      </div>
      <div class="stat-card">
        <span class="stat-number">25+</span>
        <div class="stat-label">Pay Scales</div>
      </div>
      <div class="stat-card">
        <span class="stat-number">Daily</span>
        <div class="stat-label">Updates</div>
      </div>
    `,
    
    CATEGORY_CARDS: `
      <a href="/central-government/" class="card">
        <div class="card-title">Central Government</div>
        <div class="card-content">IAS, IPS, Railway, Banking jobs</div>
      </a>
      <a href="/state-government/" class="card">
        <div class="card-title">State Government</div>
        <div class="card-content">Police, Teacher, Clerk positions</div>
      </a>
      <a href="/public-sector/" class="card">
        <div class="card-title">Public Sector</div>
        <div class="card-content">PSU, ONGC, NTPC, BHEL jobs</div>
      </a>
      <a href="/defense/" class="card">
        <div class="card-title">Defense</div>
        <div class="card-content">Army, Navy, Air Force careers</div>
      </a>
      <a href="/banking/" class="card">
        <div class="card-title">Banking</div>
        <div class="card-content">SBI, IBPS, RBI positions</div>
      </a>
      <a href="/railway/" class="card">
        <div class="card-title">Railway</div>
        <div class="card-content">Group A, B, C, D posts</div>
      </a>
    `,
    
    UPDATE_ITEMS: `
      <div style="border-bottom: 1px solid #eee; padding: var(--spacing-md) 0;">
        <div style="font-size: 0.75rem; color: var(--color-text-light); margin-bottom: var(--spacing-xs);">19 Oct 2025</div>
        <div style="font-weight: 600;">7th Pay Commission: New allowance rates announced</div>
      </div>
      <div style="border-bottom: 1px solid #eee; padding: var(--spacing-md) 0;">
        <div style="font-size: 0.75rem; color: var(--color-text-light); margin-bottom: var(--spacing-xs);">18 Oct 2025</div>
        <div style="font-weight: 600;">Railway Group D salary structure revised</div>
      </div>
      <div style="border-bottom: 1px solid #eee; padding: var(--spacing-md) 0;">
        <div style="font-size: 0.75rem; color: var(--color-text-light); margin-bottom: var(--spacing-xs);">17 Oct 2025</div>
        <div style="font-weight: 600;">Banking sector DA increase approved</div>
      </div>
      <div style="padding: var(--spacing-md) 0;">
        <div style="font-size: 0.75rem; color: var(--color-text-light); margin-bottom: var(--spacing-xs);">16 Oct 2025</div>
        <div style="font-weight: 600;">Police constable pay scale updated</div>
      </div>
    `,
    
    SCHEMA_MARKUP: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Sarkari Salary",
      "url": "https://sarkarisalary.de",
      "description": "Government job salary information portal",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://sarkarisalary.de/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    })
  };
  
  buildPage('homepage', data, 'index.html');
}

function buildIASPage() {
  const data = {
    TITLE: 'IAS Salary 2025 | IAS Officer Salary Pay Scale Grade Pay Allowances',
    META_DESCRIPTION: 'Complete IAS salary details 2025: pay scale, grade pay, allowances, in-hand salary, perks for Indian Administrative Service officers. Latest 7th pay commission rates.',
    META_KEYWORDS: 'IAS salary, IAS officer salary, IAS pay scale, IAS grade pay, IAS allowances, IAS in hand salary, indian administrative service salary',
    CANONICAL_URL: 'https://sarkarisalary.de/ias-salary/',
    OG_TITLE: 'IAS Salary 2025 - Complete Salary Structure',
    OG_DESCRIPTION: 'Detailed IAS officer salary information including pay scale, allowances, and career progression',
    OG_URL: 'https://sarkarisalary.de/ias-salary/',
    OG_IMAGE: 'https://sarkarisalary.de/assets/images/ias-salary-og.png',
    BODY_CLASS: 'salary-page ias-page',
    
    BREADCRUMB: `
      <div class="container">
        <div class="breadcrumb">
          <a href="/">Home</a> > <a href="/central-government/">Central Government</a> > IAS Salary
        </div>
      </div>
    `,
    
    JOB_TITLE: 'IAS',
    CURRENT_YEAR: '2025',
    JOB_DESCRIPTION: 'Complete salary structure for Indian Administrative Service officers including pay scale, allowances, perks and career progression details',
    
    SALARY_FACTS: `
      <div class="stat-card">
        <span class="stat-number">₹56,100</span>
        <div class="stat-label">Starting Basic Pay</div>
      </div>
      <div class="stat-card">
        <span class="stat-number">₹2,25,000</span>
        <div class="stat-label">Maximum Basic Pay</div>
      </div>
      <div class="stat-card">
        <span class="stat-number">₹1,10,000+</span>
        <div class="stat-label">Average In-hand</div>
      </div>
      <div class="stat-card">
        <span class="stat-number">30+ Years</span>
        <div class="stat-label">Service Period</div>
      </div>
    `,
    
    SALARY_BREAKDOWN: `
      <tr>
        <td>Basic Pay</td>
        <td>56,100</td>
        <td>-</td>
        <td>As per 7th Pay Commission</td>
      </tr>
      <tr>
        <td>Dearness Allowance (DA)</td>
        <td>28,050</td>
        <td>50%</td>
        <td>Based on current DA rate</td>
      </tr>
      <tr>
        <td>House Rent Allowance (HRA)</td>
        <td>13,464</td>
        <td>24%</td>
        <td>For X class cities</td>
      </tr>
      <tr>
        <td>Transport Allowance</td>
        <td>3,200</td>
        <td>-</td>
        <td>For official transport</td>
      </tr>
      <tr>
        <td>Medical Allowance</td>
        <td>1,000</td>
        <td>-</td>
        <td>Medical expenses</td>
      </tr>
      <tr class="table-total">
        <td><strong>Gross Salary</strong></td>
        <td><strong>1,01,814</strong></td>
        <td>-</td>
        <td>Before deductions</td>
      </tr>
      <tr>
        <td>Provident Fund</td>
        <td>6,732</td>
        <td>12%</td>
        <td>Of basic pay</td>
      </tr>
      <tr>
        <td>Professional Tax</td>
        <td>200</td>
        <td>-</td>
        <td>State dependent</td>
      </tr>
      <tr>
        <td>Income Tax</td>
        <td>8,000</td>
        <td>-</td>
        <td>Approximate</td>
      </tr>
      <tr class="table-total">
        <td><strong>Net In-hand Salary</strong></td>
        <td><strong>86,882</strong></td>
        <td>-</td>
        <td>Take home amount</td>
      </tr>
    `,
    
    CAREER_PROGRESSION: `
      <div class="card">
        <h3 style="font-weight: 700; margin-bottom: var(--spacing-sm); color: var(--color-text);">Sub Divisional Magistrate</h3>
        <div style="font-size: 1.5rem; font-weight: 900; color: var(--color-text); margin: var(--spacing-sm) 0;">₹86,000 - ₹1,10,000</div>
        <div style="font-size: 0.875rem; color: var(--color-text-light); margin-bottom: var(--spacing-sm);">0-4 years experience</div>
        <p style="color: var(--color-text-light);">Entry level position with basic administrative responsibilities</p>
      </div>
      <div class="card">
        <h3 style="font-weight: 700; margin-bottom: var(--spacing-sm); color: var(--color-text);">District Collector</h3>
        <div style="font-size: 1.5rem; font-weight: 900; color: var(--color-text); margin: var(--spacing-sm) 0;">₹1,40,000 - ₹1,80,000</div>
        <div style="font-size: 0.875rem; color: var(--color-text-light); margin-bottom: var(--spacing-sm);">8-15 years experience</div>
        <p style="color: var(--color-text-light);">Head of district administration with executive powers</p>
      </div>
      <div class="card">
        <h3 style="font-weight: 700; margin-bottom: var(--spacing-sm); color: var(--color-text);">Secretary</h3>
        <div style="font-size: 1.5rem; font-weight: 900; color: var(--color-text); margin: var(--spacing-sm) 0;">₹2,50,000+</div>
        <div style="font-size: 0.875rem; color: var(--color-text-light); margin-bottom: var(--spacing-sm);">25+ years experience</div>
        <p style="color: var(--color-text-light);">Highest administrative position in government</p>
      </div>
    `,
    
    RELATED_LINKS: `
      <a href="/ips-salary/" class="card">
        <div class="card-title">IPS Salary</div>
        <div class="card-content">Indian Police Service salary structure</div>
      </a>
      <a href="/ifs-salary/" class="card">
        <div class="card-title">IFS Salary</div>
        <div class="card-content">Indian Foreign Service salary details</div>
      </a>
      <a href="/salary-calculator/" class="card">
        <div class="card-title">Salary Calculator</div>
        <div class="card-content">Calculate your government salary</div>
      </a>
      <a href="/7th-pay-commission/" class="card">
        <div class="card-title">7th Pay Commission</div>
        <div class="card-content">Latest pay commission updates</div>
      </a>
      <a href="/upsc-preparation/" class="card">
        <div class="card-title">UPSC Preparation</div>
        <div class="card-content">Complete UPSC exam guide</div>
      </a>
      <a href="/government-job-benefits/" class="card">
        <div class="card-title">Job Benefits</div>
        <div class="card-content">Perks and benefits of IAS officers</div>
      </a>
    `,
    
    SCHEMA_MARKUP: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "IAS Salary 2025 - Complete Salary Structure for IAS Officers",
      "description": "Detailed information about IAS officer salary including pay scale, allowances, and career progression",
      "author": {
        "@type": "Organization",
        "name": "Sarkari Salary"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Sarkari Salary"
      },
      "dateModified": "2025-10-19"
    })
  };
  
  buildPage('salary-page', data, 'ias-salary/index.html');
}

// Main build function
function build() {
  console.log('🚀 Building static site...\n');
  
  // Create output directory
  if (!fs.existsSync(CONFIG.output)) {
    fs.mkdirSync(CONFIG.output, { recursive: true });
  }
  
  // Copy static assets
  const staticDirs = ['css', 'js', 'assets'];
  staticDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      fs.cpSync(dir, path.join(CONFIG.output, dir), { recursive: true });
      console.log(`📁 Copied: ${dir}/`);
    }
  });
  
  // Copy static files
  const staticFiles = ['sitemap.xml', 'robots.txt'];
  staticFiles.forEach(file => {
    if (fs.existsSync(file)) {
      fs.copyFileSync(file, path.join(CONFIG.output, file));
      console.log(`📄 Copied: ${file}`);
    }
  });
  
  console.log();
  
  // Build pages
  buildHomepage();
  buildIASPage();
  
  console.log('\n✅ Build completed! Files are in ./dist/');
  console.log('🌐 Ready to deploy to CDN');
}

// Run build
if (require.main === module) {
  build();
}

module.exports = { build, buildPage };