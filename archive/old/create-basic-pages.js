// Quick script to create all missing pages
const fs = require('fs');

const pageTemplate = (title, category, desc) => `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | SarkariSalary.de</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f0f2f5; margin: 0; padding: 40px 20px; }
    .container { max-width: 800px; margin: 0 auto; }
    .card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); text-align: center; }
    h1 { color: #0866ff; margin-bottom: 20px; font-size: 32px; }
    p { color: #65676b; margin-bottom: 30px; line-height: 1.6; }
    .btn { background: #0866ff; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>${title}</h1>
      <p>${desc}</p>
      <a href="/" class="btn">← Back to Home</a>
    </div>
  </div>
</body>
</html>`;

const pages = [
  ['state-government/index.html', 'State Government Jobs', 'State government job salaries, pay scales, and benefits. Police, teachers, clerks, and administrative positions.'],
  ['public-sector/index.html', 'Public Sector Jobs', 'PSU job salaries including ONGC, NTPC, BHEL, SAIL. Complete salary structure and benefits.'],
  ['defense/index.html', 'Defense Services', 'Military job salaries for Army, Navy, Air Force. Officer and enlisted personnel pay scales.'],
  ['banking/index.html', 'Banking Jobs', 'Banking sector salaries including SBI, IBPS, RBI positions. Comprehensive benefits and allowances.'],
  ['railway/index.html', 'Railway Jobs', 'Indian Railways job salaries for all groups - A, B, C, D. Complete breakdown with allowances.'],
  ['latest/index.html', 'Latest Updates', 'Latest government salary updates, pay commission news, and recent announcements.']
];

pages.forEach(([path, title, desc]) => {
  const fullPath = `dist/${path}`;
  const dir = fullPath.split('/').slice(0, -1).join('/');
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, pageTemplate(title, title.toLowerCase(), desc));
  console.log(`✅ Created: ${path}`);
});

console.log('🎉 All missing pages created!');