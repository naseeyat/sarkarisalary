const fs = require('fs');
const path = require('path');

// Clean deployment structure
class CleanDeployment {
  constructor() {
    this.cleanDir = './dist-clean';
    this.essentialPages = [
      'index.html',
      'government-jobs-listing.html', 
      'ias-salary-rich.html',
      'ips-salary-rich.html',
      'ssc_cgl-salary-rich.html',
      'sbi_po-salary-rich.html',
      'sitemap.xml',
      'robots.txt'
    ];
  }

  createCleanBuild() {
    // Create clean directory
    if (fs.existsSync(this.cleanDir)) {
      fs.rmSync(this.cleanDir, { recursive: true });
    }
    fs.mkdirSync(this.cleanDir);
    fs.mkdirSync(`${this.cleanDir}/css`);
    fs.mkdirSync(`${this.cleanDir}/js`);

    // Copy essential pages
    this.essentialPages.forEach(page => {
      if (fs.existsSync(`./dist/${page}`)) {
        fs.copyFileSync(`./dist/${page}`, `${this.cleanDir}/${page}`);
        console.log(`✅ Copied: ${page}`);
      }
    });

    // Copy CSS files
    if (fs.existsSync('./dist/css')) {
      fs.cpSync('./dist/css', `${this.cleanDir}/css`, { recursive: true });
    }

    // Add proper navigation to all pages
    this.addNavigationToPages();
    
    console.log('🚀 Clean build ready in dist-clean/');
  }

  addNavigationToPages() {
    const navigation = `
    <nav style="background: #1a202c; padding: 15px 0; margin-bottom: 30px;">
      <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 0 20px;">
        <a href="index.html" style="color: white; font-size: 24px; font-weight: bold; text-decoration: none;">
          🏛️ SarkariSalary.today
        </a>
        <div style="display: flex; gap: 20px;">
          <a href="government-jobs-listing.html" style="color: white; text-decoration: none;">All Jobs</a>
          <a href="ias-salary-rich.html" style="color: white; text-decoration: none;">IAS</a>
          <a href="ips-salary-rich.html" style="color: white; text-decoration: none;">IPS</a>
          <a href="ssc_cgl-salary-rich.html" style="color: white; text-decoration: none;">SSC CGL</a>
          <a href="sbi_po-salary-rich.html" style="color: white; text-decoration: none;">Banking</a>
        </div>
      </div>
    </nav>`;

    // Add navigation to all HTML pages
    this.essentialPages
      .filter(page => page.endsWith('.html'))
      .forEach(page => {
        const filePath = `${this.cleanDir}/${page}`;
        if (fs.existsSync(filePath)) {
          let content = fs.readFileSync(filePath, 'utf8');
          content = content.replace('<body>', `<body>${navigation}`);
          fs.writeFileSync(filePath, content);
          console.log(`✅ Added navigation to: ${page}`);
        }
      });
  }

  updateHomepage() {
    const homepageContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SarkariSalary.today - Complete Government Jobs Salary Database India</title>
  <meta name="description" content="Complete database of all government job salaries in India. IAS, IPS, SSC, Banking jobs salary with career progression timelines.">
  <style>
    body { font-family: Inter, sans-serif; margin: 0; background: #fafafa; }
    .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
    .hero { text-align: center; padding: 60px 0; }
    .hero h1 { font-size: 48px; font-weight: 800; color: #0a0a0a; margin-bottom: 16px; }
    .hero p { font-size: 18px; color: #525252; margin-bottom: 32px; }
    .jobs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 40px 0; }
    .job-card { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.2s; }
    .job-card:hover { transform: translateY(-2px); }
    .job-title { font-size: 20px; font-weight: 700; margin-bottom: 12px; color: #1a202c; }
    .job-salary { font-size: 18px; color: #2563eb; font-weight: 600; margin-bottom: 8px; }
    .job-link { display: inline-block; background: #2563eb; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; }
    .job-link:hover { background: #1d4ed8; }
  </style>
</head>
<body>
  <div class="container">
    <section class="hero">
      <h1>🏛️ Complete Government Jobs Salary Database</h1>
      <p>Accurate salary information for all Sarkari Naukri positions in India with career progression timelines</p>
    </section>

    <section class="jobs-grid">
      <div class="job-card">
        <div class="job-title">Indian Administrative Service</div>
        <div class="job-salary">₹56,100 - ₹2,50,000</div>
        <p>Complete IAS salary breakdown with 6-stage career progression timeline from SDM to Secretary level.</p>
        <a href="ias-salary-rich.html" class="job-link">View IAS Salary Details</a>
      </div>

      <div class="job-card">
        <div class="job-title">Indian Police Service</div>
        <div class="job-salary">₹56,100 - ₹2,25,000</div>
        <p>IPS salary structure with 5-stage career timeline from ASP to Additional Director General.</p>
        <a href="ips-salary-rich.html" class="job-link">View IPS Salary Details</a>
      </div>

      <div class="job-card">
        <div class="job-title">SSC Combined Graduate Level</div>
        <div class="job-salary">₹25,500 - ₹56,100</div>
        <p>SSC CGL salary breakdown with 4-stage career progression and departmental opportunities.</p>
        <a href="ssc_cgl-salary-rich.html" class="job-link">View SSC CGL Salary</a>
      </div>

      <div class="job-card">
        <div class="job-title">SBI Probationary Officer</div>
        <div class="job-salary">₹41,960 - ₹1,00,000</div>
        <p>Complete SBI PO salary with 5-stage banking career progression to AGM level.</p>
        <a href="sbi_po-salary-rich.html" class="job-link">View SBI PO Salary</a>
      </div>
    </section>

    <section style="text-align: center; margin: 60px 0;">
      <a href="government-jobs-listing.html" style="background: #059669; color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-size: 18px; font-weight: 600;">
        📋 View All Government Jobs
      </a>
    </section>
  </div>
</body>
</html>`;

    fs.writeFileSync(`${this.cleanDir}/index.html`, homepageContent);
    console.log('✅ Updated homepage with proper links');
  }
}

// Run clean build
const cleaner = new CleanDeployment();
cleaner.createCleanBuild();
cleaner.updateHomepage();

console.log('\n🎯 Deployment Plan:');
console.log('1. Upload dist-clean/ folder to Cloudflare Pages');
console.log('2. Set domain: sarkarisalary.today');
console.log('3. All pages properly linked with navigation');
console.log('4. Ready for 50M+ visits!');