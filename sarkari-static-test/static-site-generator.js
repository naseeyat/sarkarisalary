#!/usr/bin/env node

// Static Site Generator for Sarkari Salary
const fs = require('fs');
const path = require('path');

// Job data structure
const jobDatabase = {
    ias: {
        title: "IAS Officer Career Path",
        subtitle: "Indian Administrative Service",
        urlSlug: "ias-salary"
    },
    ips: {
        title: "IPS Officer Career Path", 
        subtitle: "Indian Police Service",
        urlSlug: "ips-salary"
    },
    sbi_po: {
        title: "SBI PO Career Path",
        subtitle: "State Bank of India - Probationary Officer",
        urlSlug: "sbi-po-salary"
    },
    ssc_cgl: {
        title: "SSC CGL Officer Career Path",
        subtitle: "Staff Selection Commission - Combined Graduate Level",
        urlSlug: "ssc-cgl-salary"
    },
    railway: {
        title: "Railway Officer Career Path",
        subtitle: "Indian Railways",
        urlSlug: "railway-officer-salary"
    }
};

// Analytics code
const analyticsCode = `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-VCKVNDH46X"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-VCKVNDH46X');
    </script>`;

// Generate static pages from template
function generateStaticPages() {
    console.log('🏗️  Starting static site generation...');
    
    // Read template file
    const templatePath = './prod/job-template-basic.html';
    if (!fs.existsSync(templatePath)) {
        console.error('❌ Template file not found:', templatePath);
        return;
    }
    
    const template = fs.readFileSync(templatePath, 'utf8');
    
    // Create dist directory
    const distDir = './dist';
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }
    
    // Generate page for each job
    Object.entries(jobDatabase).forEach(([jobKey, jobData]) => {
        console.log(`📄 Generating ${jobData.urlSlug}.html...`);
        
        let pageContent = template;
        
        // Replace job data in template
        pageContent = pageContent.replace(
            'loadJobData(\'ias\')', 
            `loadJobData('${jobKey}')`
        );
        
        // Update page title
        pageContent = pageContent.replace(
            '<title id="pageTitle">Government Job Salary Guide</title>',
            `<title>${jobData.title} - Salary Calculator & Pay Scale Guide</title>`
        );
        
        // Add analytics if not present
        if (!pageContent.includes('gtag.js?id=G-VCKVNDH46X')) {
            pageContent = pageContent.replace('</head>', `    ${analyticsCode}\n</head>`);
        }
        
        // Update meta description
        pageContent = pageContent.replace(
            /<meta name="description"[^>]*>/g,
            `<meta name="description" content="${jobData.title} salary calculator. Check pay scale, allowances, DA, HRA and complete career progression for ${jobData.subtitle}.">`
        );
        
        // Write to dist directory
        const outputPath = path.join(distDir, `${jobData.urlSlug}.html`);
        fs.writeFileSync(outputPath, pageContent);
        
        console.log(`✅ Generated: ${jobData.urlSlug}.html`);
    });
    
    // Copy other assets
    copyAssets();
    
    console.log('🎉 Static site generation complete!');
    console.log(`📁 Output directory: ${path.resolve(distDir)}`);
}

// Copy supporting files
function copyAssets() {
    const assets = [
        'index.html',
        'dropdown-system.js',
        'job-data.js'
    ];
    
    assets.forEach(asset => {
        const srcPath = `./prod/${asset}`;
        const distPath = `./dist/${asset}`;
        
        if (fs.existsSync(srcPath)) {
            let content = fs.readFileSync(srcPath, 'utf8');
            
            // Add analytics to index.html if not present
            if (asset === 'index.html' && !content.includes('gtag.js?id=G-VCKVNDH46X')) {
                content = content.replace('</head>', `    ${analyticsCode}\n</head>`);
            }
            
            fs.writeFileSync(distPath, content);
            console.log(`📄 Copied: ${asset}`);
        }
    });
}

// Clean dist directory
function cleanDist() {
    const distDir = './dist';
    if (fs.existsSync(distDir)) {
        fs.rmSync(distDir, { recursive: true, force: true });
        console.log('🧹 Cleaned dist directory');
    }
}

// Command line interface
const command = process.argv[2];

switch (command) {
    case 'build':
        generateStaticPages();
        break;
    case 'clean':
        cleanDist();
        break;
    case 'deploy':
        generateStaticPages();
        console.log('\n🚀 Ready for deployment!');
        console.log('Next steps:');
        console.log('1. cd dist');
        console.log('2. git init && git add . && git commit -m "Static build"');
        console.log('3. Deploy to Cloudflare Pages / Railway / Vercel');
        break;
    case 'help':
    default:
        console.log(`
🏗️  Static Site Generator for Sarkari Salary

Usage:
  node static-site-generator.js build   - Generate static pages
  node static-site-generator.js clean   - Clean dist directory  
  node static-site-generator.js deploy  - Build and prepare for deployment
  node static-site-generator.js help    - Show this help

Features:
✅ Generates SEO-friendly URLs (/ias-salary.html)
✅ Automatic analytics injection
✅ Template-based generation
✅ Meta tag optimization
✅ Asset copying

Output: ./dist/ directory ready for static hosting
        `);
        break;
}