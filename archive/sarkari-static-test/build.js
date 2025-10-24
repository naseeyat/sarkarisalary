#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Job database
const jobs = {
  ias: {
    title: "IAS Officer Salary Calculator",
    subtitle: "Indian Administrative Service - Complete Pay Scale Guide",
    basicSalary: 99000,
    dept: "UPSC - All India Service"
  },
  ips: {
    title: "IPS Officer Salary Calculator", 
    subtitle: "Indian Police Service - Complete Pay Scale Guide",
    basicSalary: 99000,
    dept: "UPSC - Police Service"
  },
  sbi_po: {
    title: "SBI PO Salary Calculator",
    subtitle: "State Bank of India - Probationary Officer",
    basicSalary: 82000,
    dept: "State Bank of India"
  }
};

// Base template
const pageTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}}</title>
    <meta name="description" content="{{DESCRIPTION}}">
    
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-VCKVNDH46X"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-VCKVNDH46X');
    </script>
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: ui-monospace, SFMono-Regular, monospace;
            background: #ffffff;
            color: #333333;
            line-height: 1.4;
            font-size: 14px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
            border: 3px solid #333333;
            padding: 40px;
            background: #ffffff;
            box-shadow: 8px 8px 0px #333333;
        }
        .title {
            font-size: 28px;
            font-weight: 900;
            color: #333333;
            margin-bottom: 12px;
        }
        .subtitle {
            font-size: 16px;
            color: #666666;
            margin-bottom: 20px;
        }
        .salary-box {
            border: 3px solid #333333;
            padding: 30px;
            margin: 20px 0;
            background: #f8f8f8;
            box-shadow: 6px 6px 0px #333333;
        }
        .salary-amount {
            font-size: 36px;
            font-weight: 900;
            color: #333333;
            text-align: center;
        }
        .salary-label {
            font-size: 14px;
            color: #666666;
            text-align: center;
            margin-top: 8px;
        }
        .back-link {
            display: inline-block;
            margin-top: 30px;
            padding: 12px 20px;
            background: #333333;
            color: #ffffff;
            text-decoration: none;
            font-weight: 700;
            font-size: 12px;
            text-transform: uppercase;
        }
        .back-link:hover {
            background: #000000;
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1 class="title">{{JOB_TITLE}}</h1>
            <p class="subtitle">{{JOB_SUBTITLE}}</p>
            <div style="font-size: 12px; color: #999;">{{DEPARTMENT}}</div>
        </header>

        <div class="salary-box">
            <div class="salary-amount">₹{{BASIC_SALARY}}/month</div>
            <div class="salary-label">Basic Salary (Starting)</div>
        </div>

        <div class="salary-box">
            <div class="salary-amount">₹{{GROSS_SALARY}}/month</div>
            <div class="salary-label">Gross Salary (with allowances)</div>
        </div>

        <a href="/" class="back-link">← Back to Home</a>
    </div>
</body>
</html>`;

// Homepage template
const homepageTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sarkari Salary - Government Job Salary Calculator</title>
    <meta name="description" content="Complete government job salary calculator. Check pay scale for IAS, IPS, Banking, Railway jobs.">
    
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-VCKVNDH46X"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-VCKVNDH46X');
    </script>
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: ui-monospace, SFMono-Regular, monospace;
            background: #ffffff;
            color: #333333;
            line-height: 1.4;
            font-size: 14px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
            border: 3px solid #333333;
            padding: 40px;
            background: #ffffff;
            box-shadow: 8px 8px 0px #333333;
        }
        .main-title {
            font-size: 36px;
            font-weight: 900;
            color: #333333;
            margin-bottom: 12px;
        }
        .job-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin: 40px 0;
        }
        .job-card {
            border: 3px solid #333333;
            background: #ffffff;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .job-card:hover {
            box-shadow: 6px 6px 0px #333333;
            transform: translateY(-2px);
        }
        .job-header {
            padding: 20px;
            background: #f8f8f8;
            border-bottom: 1px solid #333333;
        }
        .job-title {
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 5px;
        }
        .job-dept {
            font-size: 12px;
            color: #666666;
        }
        .job-body {
            padding: 20px;
            text-align: center;
        }
        .salary-amount {
            font-size: 24px;
            font-weight: 900;
            color: #333333;
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1 class="main-title">SARKARI SALARY</h1>
            <p>Government Job Salary Calculator</p>
        </header>

        <div class="job-grid">
            {{JOB_CARDS}}
        </div>
    </div>
</body>
</html>`;

// Build function
function build() {
    console.log('🏗️  Building static site...');
    
    // Clean and recreate dist directory
    if (fs.existsSync('dist')) {
        fs.rmSync('dist', { recursive: true, force: true });
        console.log('🧹 Cleaned old dist folder');
    }
    fs.mkdirSync('dist');
    console.log('📁 Created fresh dist folder');
    
    // Generate job pages
    Object.entries(jobs).forEach(([key, job]) => {
        const grossSalary = Math.round(job.basicSalary * 1.8); // Rough calculation
        
        let page = pageTemplate
            .replace(/{{TITLE}}/g, job.title)
            .replace(/{{DESCRIPTION}}/g, job.subtitle)
            .replace(/{{JOB_TITLE}}/g, job.title)
            .replace(/{{JOB_SUBTITLE}}/g, job.subtitle)
            .replace(/{{DEPARTMENT}}/g, job.dept)
            .replace(/{{BASIC_SALARY}}/g, job.basicSalary.toLocaleString())
            .replace(/{{GROSS_SALARY}}/g, grossSalary.toLocaleString());
        
        const filename = key.replace('_', '-') + '.html';
        fs.writeFileSync(`dist/${filename}`, page);
        console.log(`✅ Generated: ${filename}`);
    });
    
    // Generate homepage
    const jobCards = Object.entries(jobs).map(([key, job]) => {
        const filename = key.replace('_', '-') + '.html';
        return `
            <div class="job-card" onclick="window.location.href='${filename}'">
                <div class="job-header">
                    <div class="job-title">${job.title.replace(' Salary Calculator', '')}</div>
                    <div class="job-dept">${job.dept}</div>
                </div>
                <div class="job-body">
                    <div class="salary-amount">₹${job.basicSalary.toLocaleString()}/month</div>
                </div>
            </div>`;
    }).join('');
    
    const homepage = homepageTemplate.replace('{{JOB_CARDS}}', jobCards);
    fs.writeFileSync('dist/index.html', homepage);
    console.log('✅ Generated: index.html');
    
    // Generate sitemap.xml automatically
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sarkarisalary.today/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${Object.keys(jobs).map(key => {
    const filename = key.replace('_', '-') + '.html';
    return `  <url>
    <loc>https://sarkarisalary.today/${filename}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
}).join('\n')}
</urlset>`;
    
    fs.writeFileSync('dist/sitemap.xml', sitemap);
    console.log('✅ Generated: sitemap.xml');
    
    // Copy robots.txt
    fs.writeFileSync('dist/robots.txt', `User-agent: *
Allow: /
Sitemap: https://sarkarisalary.today/sitemap.xml`);
    console.log('✅ Generated: robots.txt');
    
    console.log('🎉 Build complete! Files in dist/ folder');
    console.log(`📄 Generated ${Object.keys(jobs).length + 1} pages`);
}

// Run build
build();