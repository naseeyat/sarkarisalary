// Rich Content Generator for Government Job Pages
class RichContentGenerator {
  constructor() {
    this.currentYear = new Date().getFullYear();
  }

  generateDetailedJobContent(job, jobKey) {
    const salaryRange = job.salary || "Contact for details";
    const minSalary = this.extractMinSalary(salaryRange);
    const maxSalary = this.extractMaxSalary(salaryRange);
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${job.name} Salary ${this.currentYear}: ₹${salaryRange} Monthly | Complete Guide</title>
  <meta name="description" content="Complete ${job.name} salary breakdown with allowances, benefits, career progression and real challenges. Get accurate ${this.currentYear} pay scale details.">
  <meta name="keywords" content="${job.name} salary, ${jobKey.replace(/_/g, ' ')} pay scale, government job salary, sarkari naukri">
  
  <link rel="canonical" href="https://sarkarisalary.de/${jobKey.replace(/_/g, '-')}-salary/">
  
  <style>
    body { font-family: Inter, sans-serif; line-height: 1.6; max-width: 1200px; margin: 0 auto; padding: 20px; color: #333; }
    .container { max-width: 1000px; margin: 0 auto; }
    h1 { color: #1a202c; font-size: 36px; margin-bottom: 20px; font-weight: 700; }
    h2 { color: #2d3748; font-size: 28px; margin: 30px 0 15px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
    h3 { color: #4a5568; font-size: 20px; margin: 20px 0 10px 0; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    th, td { padding: 15px; border: 1px solid #e2e8f0; text-align: left; }
    th { background: #f7fafc; font-weight: 600; color: #2d3748; }
    .highlight-box { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 10px; margin: 25px 0; }
    .salary-card { background: #f8f9fa; border-left: 4px solid #48bb78; padding: 20px; margin: 20px 0; border-radius: 5px; }
    .challenge-tag { background: #fed7d7; color: #c53030; padding: 6px 12px; border-radius: 15px; font-size: 12px; margin: 3px; display: inline-block; }
    .benefit-item { background: #f0fff4; border-left: 4px solid #48bb78; padding: 15px; margin: 10px 0; }
    .career-timeline { position: relative; margin: 30px 0; }
    .timeline-item { margin: 20px 0; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .faq-item { background: #f8f9fa; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #3182ce; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
    .stat-card { background: white; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .nav { margin-bottom: 20px; font-size: 14px; }
    .nav a { color: #3182ce; text-decoration: none; }
    .nav a:hover { text-decoration: underline; }
    .toc { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .toc ul { list-style: none; padding-left: 0; }
    .toc li { margin: 8px 0; }
    .toc a { color: #3182ce; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <nav class="nav">
      <a href="/">Home</a> → <a href="/jobs.html">Government Jobs</a> → ${job.name} Salary
    </nav>
    
    <h1>${job.name} Salary ${this.currentYear} - Complete Guide</h1>
    
    <div class="highlight-box">
      <h3 style="margin-top: 0; color: white;">💼 Quick Summary</h3>
      <p><strong>${job.name}</strong> officers earn between <strong>₹${minSalary} to ₹${maxSalary}</strong> per month. With ${job.vacancies || 'multiple'} current vacancies and ${this.getCompetitionLevel(jobKey)} competition level.</p>
    </div>

    <div class="toc">
      <h3>📋 Table of Contents</h3>
      <ul>
        <li><a href="#salary-structure">💰 Salary Structure</a></li>
        <li><a href="#allowances">🎁 Allowances & Benefits</a></li>
        <li><a href="#career-progression">📈 Career Progression</a></li>
        <li><a href="#challenges">⚠️ Job Challenges</a></li>
        <li><a href="#how-to-apply">📝 How to Apply</a></li>
        <li><a href="#faq">❓ FAQ</a></li>
      </ul>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <h3 style="color: #48bb78; margin: 0;">Starting Salary</h3>
        <p style="font-size: 24px; font-weight: bold; margin: 10px 0;">₹${minSalary}</p>
        <small>Per Month</small>
      </div>
      <div class="stat-card">
        <h3 style="color: #ed8936; margin: 0;">Peak Salary</h3>
        <p style="font-size: 24px; font-weight: bold; margin: 10px 0;">₹${maxSalary}</p>
        <small>Senior Level</small>
      </div>
      <div class="stat-card">
        <h3 style="color: #3182ce; margin: 0;">Vacancies</h3>
        <p style="font-size: 24px; font-weight: bold; margin: 10px 0;">${job.vacancies || 'TBA'}</p>
        <small>Current Year</small>
      </div>
      <div class="stat-card">
        <h3 style="color: #805ad5; margin: 0;">Pay Level</h3>
        <p style="font-size: 24px; font-weight: bold; margin: 10px 0;">${job.level || 'TBA'}</p>
        <small>7th Pay Commission</small>
      </div>
    </div>

    <section id="salary-structure">
      <h2>💰 Detailed Salary Structure</h2>
      
      <div class="salary-card">
        <h3>Monthly In-Hand Salary Breakdown</h3>
        ${this.generateSalaryTable(job, jobKey)}
      </div>

      ${this.generateLocationWiseSalary(job, jobKey)}
    </section>

    <section id="allowances">
      <h2>🎁 Allowances & Benefits</h2>
      ${this.generateAllowancesSection(job, jobKey)}
    </section>

    <section id="career-progression">
      <h2>📈 Career Progression Timeline</h2>
      <div class="career-timeline">
        ${this.generateCareerTimeline(job, jobKey)}
      </div>
    </section>

    <section id="challenges">
      <h2>⚠️ Real Job Challenges</h2>
      ${this.generateChallengesSection(job, jobKey)}
    </section>

    <section id="how-to-apply">
      <h2>📝 How to Apply</h2>
      ${this.generateApplicationProcess(job, jobKey)}
    </section>

    <section id="faq">
      <h2>❓ Frequently Asked Questions</h2>
      ${this.generateDetailedFAQ(job, jobKey)}
    </section>

    <section>
      <h2>🔗 Related Government Jobs</h2>
      ${this.generateRelatedJobs(jobKey)}
    </section>
  </div>

  <script>
    // Smooth scrolling for table of contents
    document.querySelectorAll('.toc a').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
      });
    });
    
    console.log('${job.name} salary page loaded');
  </script>
</body>
</html>`;
  }

  extractMinSalary(salaryRange) {
    if (typeof salaryRange === 'string' && salaryRange.includes('-')) {
      return salaryRange.split('-')[0];
    }
    return salaryRange;
  }

  extractMaxSalary(salaryRange) {
    if (typeof salaryRange === 'string' && salaryRange.includes('-')) {
      return salaryRange.split('-')[1];
    }
    return salaryRange;
  }

  getCompetitionLevel(jobKey) {
    const highCompetition = ['ias', 'ips', 'ifs'];
    const mediumCompetition = ['ssc_cgl', 'banking', 'railway'];
    
    if (highCompetition.some(job => jobKey.includes(job))) return 'Very High';
    if (mediumCompetition.some(job => jobKey.includes(job))) return 'High';
    return 'Moderate';
  }

  generateSalaryTable(job, jobKey) {
    const salaryRange = job.salary || "Contact for details";
    const minSalary = this.extractMinSalary(salaryRange);
    
    return `
    <table>
      <thead>
        <tr>
          <th>Component</th>
          <th>Amount (₹)</th>
          <th>Percentage</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Basic Pay</strong></td>
          <td>${minSalary}</td>
          <td>Base</td>
          <td>As per 7th Pay Commission</td>
        </tr>
        <tr>
          <td>HRA (House Rent Allowance)</td>
          <td>${Math.round(parseInt(minSalary) * 0.24).toLocaleString()}</td>
          <td>24%/16%/8%</td>
          <td>Depends on city classification</td>
        </tr>
        <tr>
          <td>DA (Dearness Allowance)</td>
          <td>${Math.round(parseInt(minSalary) * 0.53).toLocaleString()}</td>
          <td>53%</td>
          <td>Current rate (updated bi-annually)</td>
        </tr>
        <tr>
          <td>Transport Allowance</td>
          <td>3,200</td>
          <td>Fixed</td>
          <td>Monthly transport allowance</td>
        </tr>
        <tr>
          <td>Medical Allowance</td>
          <td>1,000</td>
          <td>Fixed</td>
          <td>Monthly medical allowance</td>
        </tr>
        <tr style="background: #f0fff4; font-weight: bold;">
          <td><strong>Total In-Hand (Approx)</strong></td>
          <td><strong>${Math.round(parseInt(minSalary) * 1.8).toLocaleString()}</strong></td>
          <td><strong>~80% more than basic</strong></td>
          <td><strong>After all allowances</strong></td>
        </tr>
      </tbody>
    </table>`;
  }

  generateLocationWiseSalary(job, jobKey) {
    return `
    <h3>🏙️ Location-wise Salary Variations</h3>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 20px 0;">
      <div class="benefit-item">
        <h4>Metro Cities (X Category)</h4>
        <p><strong>HRA: 24%</strong> of basic pay</p>
        <p>Cities: Delhi, Mumbai, Chennai, Kolkata</p>
        <p>Extra allowances for high cost of living</p>
      </div>
      <div class="benefit-item">
        <h4>Major Cities (Y Category)</h4>
        <p><strong>HRA: 16%</strong> of basic pay</p>
        <p>Population 5 lakh to 50 lakh</p>
        <p>Moderate cost of living adjustment</p>
      </div>
      <div class="benefit-item">
        <h4>Other Places (Z Category)</h4>
        <p><strong>HRA: 8%</strong> of basic pay</p>
        <p>Rural and smaller towns</p>
        <p>Lower cost of living areas</p>
      </div>
    </div>`;
  }

  generateAllowancesSection(job, jobKey) {
    return `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
      <div class="benefit-item">
        <h3>🏠 Accommodation Benefits</h3>
        <ul>
          <li>Government accommodation or HRA</li>
          <li>Electricity and water allowances</li>
          <li>Maintenance and security included</li>
          <li>Furniture allowance for new joiners</li>
        </ul>
      </div>
      
      <div class="benefit-item">
        <h3>🚗 Transport & Travel</h3>
        <ul>
          <li>Official vehicle for duty</li>
          <li>Fuel and maintenance covered</li>
          <li>LTC (Leave Travel Concession)</li>
          <li>Transfer TA/DA allowances</li>
        </ul>
      </div>
      
      <div class="benefit-item">
        <h3>🏥 Medical Benefits</h3>
        <ul>
          <li>CGHS medical facilities</li>
          <li>Cashless treatment for family</li>
          <li>Specialist consultation covered</li>
          <li>Emergency medical reimbursement</li>
        </ul>
      </div>
      
      <div class="benefit-item">
        <h3>💰 Financial Security</h3>
        <ul>
          <li>GPF/NPS pension scheme</li>
          <li>Gratuity benefits</li>
          <li>Life insurance coverage</li>
          <li>Interest-free advances</li>
        </ul>
      </div>
    </div>`;
  }

  generateCareerTimeline(job, jobKey) {
    // This would be job-specific, but here's a general template
    const timelines = {
      ias: [
        { stage: "Sub Divisional Magistrate (SDM)", years: "0-2", salary: "₹65,000", duties: "Revenue administration, licensing, local governance" },
        { stage: "Additional District Magistrate (ADM)", years: "2-5", salary: "₹85,000", duties: "District administration support, development programs" },
        { stage: "District Collector", years: "5-10", salary: "₹1,25,000", duties: "Head of district administration, CEO Zilla Panchayat" },
        { stage: "Joint Secretary", years: "12-18", salary: "₹1,80,000", duties: "Policy formulation, inter-ministerial coordination" },
        { stage: "Additional Secretary", years: "18-25", salary: "₹2,25,000", duties: "Senior policy making, ministry leadership" },
        { stage: "Secretary", years: "25+", salary: "₹2,50,000+", duties: "Head of ministry/department, cabinet interface" }
      ],
      default: [
        { stage: "Entry Level", years: "0-2", salary: "Starting salary", duties: "Basic responsibilities and training" },
        { stage: "Junior Level", years: "2-5", salary: "Incremented salary", duties: "Increased responsibilities" },
        { stage: "Senior Level", years: "5-15", salary: "Senior salary", duties: "Leadership and management roles" },
        { stage: "Top Level", years: "15+", salary: "Maximum salary", duties: "Strategic leadership and policy making" }
      ]
    };

    const timeline = timelines[jobKey] || timelines.default;
    
    return timeline.map((item, index) => `
      <div class="timeline-item">
        <h3 style="color: #3182ce; margin-bottom: 10px;">
          Stage ${index + 1}: ${item.stage}
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
          <div><strong>Duration:</strong> ${item.years} years</div>
          <div><strong>Salary:</strong> ${item.salary}</div>
        </div>
        <p style="margin-top: 15px; color: #4a5568;"><strong>Key Duties:</strong> ${item.duties}</p>
      </div>
    `).join('');
  }

  generateChallengesSection(job, jobKey) {
    const challengesByJob = {
      ias: [
        { challenge: "Remote Posting", severity: "high", description: "Postings in rural or underdeveloped areas away from family" },
        { challenge: "Political Pressure", severity: "high", description: "Pressure from political leaders for biased decisions" },
        { challenge: "Work-Life Balance", severity: "medium", description: "Long working hours and emergency duties" },
        { challenge: "Transfer Stress", severity: "medium", description: "Frequent transfers affecting family stability" }
      ],
      default: [
        { challenge: "Job Pressure", severity: "medium", description: "High expectations and performance pressure" },
        { challenge: "Work-Life Balance", severity: "medium", description: "Balancing professional and personal commitments" },
        { challenge: "Career Growth", severity: "low", description: "Competition for promotions and growth" }
      ]
    };

    const challenges = challengesByJob[jobKey] || challengesByJob.default;
    
    return `
    <p>Real challenges faced by ${job.name} officers based on surveys and interviews:</p>
    <div style="display: grid; gap: 20px; margin: 20px 0;">
      ${challenges.map(item => `
        <div class="timeline-item">
          <h3 style="display: flex; align-items: center; gap: 10px;">
            ${item.challenge}
            <span class="challenge-tag" style="background: ${item.severity === 'high' ? '#fed7d7' : item.severity === 'medium' ? '#fef3c7' : '#f0fff4'};">
              ${item.severity.toUpperCase()}
            </span>
          </h3>
          <p>${item.description}</p>
          <p><strong>💡 Solution:</strong> ${this.getSolutionForChallenge(item.challenge)}</p>
        </div>
      `).join('')}
    </div>`;
  }

  getSolutionForChallenge(challenge) {
    const solutions = {
      "Remote Posting": "Advance planning, family preparation, and using technology to stay connected",
      "Political Pressure": "Strong ethical foundation, transparent decision-making, and proper documentation",
      "Work-Life Balance": "Time management, delegation skills, and setting boundaries",
      "Transfer Stress": "Maintaining portable hobbies, building adaptable lifestyle, staying connected with colleagues",
      "Job Pressure": "Regular skill development, stress management techniques, and peer support",
      "Career Growth": "Continuous learning, networking, and performance excellence"
    };
    return solutions[challenge] || "Proper training, support systems, and professional development";
  }

  generateApplicationProcess(job, jobKey) {
    return `
    <div class="benefit-item">
      <h3>📋 Application Process Overview</h3>
      <ol style="margin: 15px 0; padding-left: 20px;">
        <li><strong>Check Eligibility:</strong> Age, education, and other criteria</li>
        <li><strong>Online Application:</strong> Fill form on official website</li>
        <li><strong>Pay Fees:</strong> Application and exam fees</li>
        <li><strong>Admit Card:</strong> Download before exam date</li>
        <li><strong>Written Exam:</strong> Preliminary and main examination</li>
        <li><strong>Interview/Skill Test:</strong> Final selection process</li>
        <li><strong>Document Verification:</strong> Original certificates</li>
        <li><strong>Medical Examination:</strong> Fitness certification</li>
        <li><strong>Final Selection:</strong> Merit list and posting</li>
      </ol>
      
      <h4>🎯 Preparation Tips</h4>
      <ul style="margin: 15px 0;">
        <li>Start preparation early with proper study plan</li>
        <li>Focus on syllabus and previous year papers</li>
        <li>Join coaching or online courses if needed</li>
        <li>Practice mock tests regularly</li>
        <li>Stay updated with current affairs</li>
      </ul>
    </div>`;
  }

  generateDetailedFAQ(job, jobKey) {
    return `
    <div class="faq-item">
      <h3>💰 What is the exact in-hand salary of ${job.name}?</h3>
      <p>The in-hand salary varies based on location and allowances. In metro cities, it can be 80-90% more than basic pay due to higher HRA and allowances.</p>
    </div>
    
    <div class="faq-item">
      <h3>🏠 Do officers get government accommodation?</h3>
      <p>Yes, government accommodation is provided subject to availability. If not available, HRA is given which varies from 8% to 24% of basic pay depending on the city.</p>
    </div>
    
    <div class="faq-item">
      <h3>📈 How often do salary increments happen?</h3>
      <p>Annual increments are given every year, and Dearness Allowance (DA) is revised twice a year. Major salary revisions happen with Pay Commissions every 10 years.</p>
    </div>
    
    <div class="faq-item">
      <h3>🚗 What about transport facilities?</h3>
      <p>Official vehicles are provided for duty purposes. Transport allowance of ₹3,200 per month is also given for personal use.</p>
    </div>
    
    <div class="faq-item">
      <h3>💊 Medical benefits for family?</h3>
      <p>Comprehensive medical coverage through CGHS for officer and family members including spouse, children, and dependent parents.</p>
    </div>
    
    <div class="faq-item">
      <h3>🎓 Educational benefits for children?</h3>
      <p>Children's Education Allowance (CEA) is provided for school fees. Hostel allowance is also given for children studying away from home.</p>
    </div>`;
  }

  generateRelatedJobs(jobKey) {
    const relatedJobs = {
      ias: ['IPS Officer Salary', 'IFS Officer Salary', 'State PCS Salary'],
      ssc_cgl: ['SSC CHSL Salary', 'SSC MTS Salary', 'Banking PO Salary'],
      banking: ['SSC CGL Salary', 'Railway NTPC Salary', 'LIC Officer Salary'],
      default: ['IAS Officer Salary', 'SSC CGL Salary', 'Banking PO Salary', 'Railway Jobs Salary']
    };

    const related = relatedJobs[jobKey] || relatedJobs.default;
    
    return `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
      ${related.map(job => `
        <div class="benefit-item">
          <h4><a href="/${job.toLowerCase().replace(/\s+/g, '-')}/" style="color: #3182ce; text-decoration: none;">${job}</a></h4>
          <p>Compare salary structure and career opportunities</p>
        </div>
      `).join('')}
    </div>`;
  }
}

module.exports = { RichContentGenerator };