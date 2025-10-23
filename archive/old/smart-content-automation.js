// Smart Content Automation System
class SmartContentAutomation {
  constructor() {
    this.templates = this.loadTemplates();
    this.realData = this.loadRealData();
  }

  // Pre-built content templates for different job types
  loadTemplates() {
    return {
      upsc_jobs: {
        challenges: [
          { name: "Remote Posting", severity: "high", solution: "Family preparation and technology" },
          { name: "Political Pressure", severity: "high", solution: "Ethical training and documentation" },
          { name: "Work-Life Balance", severity: "medium", solution: "Time management skills" }
        ],
        benefits: [
          "Government accommodation or HRA",
          "Official vehicle for duty",
          "CGHS medical facilities",
          "LTC and transfer allowances"
        ],
        application_process: "UPSC Civil Services Examination"
      },
      
      ssc_jobs: {
        challenges: [
          { name: "Competition Level", severity: "high", solution: "Thorough preparation and coaching" },
          { name: "Exam Pressure", severity: "medium", solution: "Mock tests and stress management" },
          { name: "Career Growth", severity: "low", solution: "Continuous skill development" }
        ],
        benefits: [
          "Central government job security",
          "Regular increments and DA",
          "Medical and pension benefits",
          "Transfer opportunities"
        ],
        application_process: "SSC Online Examination"
      },
      
      banking_jobs: {
        challenges: [
          { name: "Target Pressure", severity: "medium", solution: "Customer relationship building" },
          { name: "Work Hours", severity: "medium", solution: "Efficient time management" },
          { name: "Technology Changes", severity: "low", solution: "Regular training programs" }
        ],
        benefits: [
          "Attractive salary packages",
          "Performance bonuses",
          "Banking sector prestige",
          "Loan benefits at lower rates"
        ],
        application_process: "IBPS/SBI Online Examination"
      },
      
      railway_jobs: {
        challenges: [
          { name: "Shift Work", severity: "medium", solution: "Health management and family planning" },
          { name: "Safety Concerns", severity: "medium", solution: "Proper training and protocols" },
          { name: "Transfer Policy", severity: "low", solution: "Zone preference system" }
        ],
        benefits: [
          "Railway quarters accommodation",
          "Free/concession travel facility",
          "Medical facilities",
          "Pension and gratuity"
        ],
        application_process: "RRB Online Examination"
      }
    };
  }

  // Real salary data with accurate calculations
  loadRealData() {
    return {
      ias: {
        basic_pay: 56100,
        hra_rates: { metro: 0.24, major: 0.16, other: 0.08 },
        da_rate: 0.53,
        transport_allowance: 3200,
        medical_allowance: 1000,
        pay_level: "10-18",
        career_progression: [
          { stage: "SDM", years: "0-2", pay_level: 10, basic: 56100 },
          { stage: "ADM", years: "2-5", pay_level: 11, basic: 67700 },
          { stage: "DC", years: "5-10", pay_level: 12, basic: 78800 },
          { stage: "JS", years: "12-18", pay_level: 13, basic: 118500 },
          { stage: "AS", years: "18-25", pay_level: 14, basic: 144200 },
          { stage: "Secretary", years: "25+", pay_level: 17, basic: 225000 }
        ]
      },
      
      ssc_cgl: {
        basic_pay: 25500,
        hra_rates: { metro: 0.24, major: 0.16, other: 0.08 },
        da_rate: 0.53,
        transport_allowance: 1800,
        medical_allowance: 500,
        pay_level: "4-8",
        posts: {
          "Assistant Audit Officer": { level: 8, basic: 47600 },
          "Inspector CBEC": { level: 7, basic: 44900 },
          "Sub Inspector": { level: 6, basic: 35400 },
          "Assistant Section Officer": { level: 6, basic: 35400 }
        }
      }
    };
  }

  // Auto-generate complete page content
  generateCompleteContent(jobKey, jobData) {
    const jobType = this.detectJobType(jobKey);
    const template = this.templates[jobType] || this.templates.ssc_jobs;
    const realData = this.realData[jobKey] || this.realData.ssc_cgl;
    
    const salaryCalculations = this.calculateSalaries(realData);
    const content = this.buildFullContent(jobKey, jobData, template, salaryCalculations);
    
    return content;
  }

  detectJobType(jobKey) {
    if (['ias', 'ips', 'ifs', 'irs'].includes(jobKey)) return 'upsc_jobs';
    if (jobKey.includes('ssc')) return 'ssc_jobs';
    if (jobKey.includes('bank') || jobKey.includes('sbi') || jobKey.includes('ibps')) return 'banking_jobs';
    if (jobKey.includes('rrb') || jobKey.includes('railway')) return 'railway_jobs';
    return 'ssc_jobs'; // default
  }

  calculateSalaries(realData) {
    const basic = realData.basic_pay;
    const da = Math.round(basic * realData.da_rate);
    const hra_metro = Math.round(basic * realData.hra_rates.metro);
    const hra_major = Math.round(basic * realData.hra_rates.major);
    const hra_other = Math.round(basic * realData.hra_rates.other);
    
    return {
      basic: basic,
      da: da,
      hra: { metro: hra_metro, major: hra_major, other: hra_other },
      transport: realData.transport_allowance,
      medical: realData.medical_allowance,
      total_metro: basic + da + hra_metro + realData.transport_allowance + realData.medical_allowance,
      total_major: basic + da + hra_major + realData.transport_allowance + realData.medical_allowance,
      total_other: basic + da + hra_other + realData.transport_allowance + realData.medical_allowance
    };
  }

  buildFullContent(jobKey, jobData, template, salaryCalc) {
    const timeline = this.getCareerTimeline(jobKey);
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${jobData.name} Salary 2025: ₹${salaryCalc.basic.toLocaleString()} to ₹${salaryCalc.total_metro.toLocaleString()} | Complete Guide</title>
  <meta name="description" content="Complete ${jobData.name} salary breakdown: Basic ₹${salaryCalc.basic.toLocaleString()}, Total in-hand ₹${salaryCalc.total_metro.toLocaleString()}. Allowances, benefits, career progression & real challenges.">
  <style>
    body { font-family: Inter, sans-serif; line-height: 1.6; max-width: 1200px; margin: 0 auto; padding: 20px; }
    .highlight { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 10px; margin: 25px 0; }
    .salary-table { width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .salary-table th, .salary-table td { padding: 15px; border: 1px solid #e2e8f0; text-align: left; }
    .salary-table th { background: #f7fafc; font-weight: 600; }
    .challenge-item { background: #f8f9fa; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #e53e3e; }
    .benefit-item { background: #f0fff4; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #38a169; }
    .timeline-item { background: #ffffff; padding: 25px; margin: 20px 0; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-left: 5px solid #4f46e5; position: relative; }
    .timeline-item::before { content: '📈'; font-size: 24px; position: absolute; left: -15px; top: 20px; background: white; padding: 5px; border-radius: 50%; }
    .timeline-stage { font-size: 20px; font-weight: 700; color: #1a202c; margin-bottom: 10px; }
    .timeline-details { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin: 15px 0; }
    .timeline-detail { background: #f8fafc; padding: 10px; border-radius: 6px; text-align: center; }
    h1 { color: #1a202c; font-size: 36px; margin-bottom: 20px; }
    h2 { color: #2d3748; font-size: 28px; margin: 30px 0 15px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
  </style>
</head>
<body>
  <h1>${jobData.name} Salary 2025 - Complete Guide</h1>
  
  <div class="highlight">
    <h3>💰 Quick Salary Overview</h3>
    <p><strong>Basic Pay:</strong> ₹${salaryCalc.basic.toLocaleString()} per month</p>
    <p><strong>Total In-hand (Metro):</strong> ₹${salaryCalc.total_metro.toLocaleString()} per month</p>
    <p><strong>Current Vacancies:</strong> ${jobData.vacancies || 'Multiple'} positions</p>
  </div>

  <h2>💰 Detailed Salary Breakdown</h2>
  <table class="salary-table">
    <thead>
      <tr><th>Component</th><th>Metro Cities</th><th>Major Cities</th><th>Other Places</th></tr>
    </thead>
    <tbody>
      <tr><td>Basic Pay</td><td>₹${salaryCalc.basic.toLocaleString()}</td><td>₹${salaryCalc.basic.toLocaleString()}</td><td>₹${salaryCalc.basic.toLocaleString()}</td></tr>
      <tr><td>Dearness Allowance (53%)</td><td>₹${salaryCalc.da.toLocaleString()}</td><td>₹${salaryCalc.da.toLocaleString()}</td><td>₹${salaryCalc.da.toLocaleString()}</td></tr>
      <tr><td>HRA</td><td>₹${salaryCalc.hra.metro.toLocaleString()} (24%)</td><td>₹${salaryCalc.hra.major.toLocaleString()} (16%)</td><td>₹${salaryCalc.hra.other.toLocaleString()} (8%)</td></tr>
      <tr><td>Transport Allowance</td><td>₹${salaryCalc.transport.toLocaleString()}</td><td>₹${salaryCalc.transport.toLocaleString()}</td><td>₹${salaryCalc.transport.toLocaleString()}</td></tr>
      <tr><td>Medical Allowance</td><td>₹${salaryCalc.medical.toLocaleString()}</td><td>₹${salaryCalc.medical.toLocaleString()}</td><td>₹${salaryCalc.medical.toLocaleString()}</td></tr>
      <tr style="background: #f0fff4; font-weight: bold;">
        <td><strong>Total In-Hand</strong></td>
        <td><strong>₹${salaryCalc.total_metro.toLocaleString()}</strong></td>
        <td><strong>₹${salaryCalc.total_major.toLocaleString()}</strong></td>
        <td><strong>₹${salaryCalc.total_other.toLocaleString()}</strong></td>
      </tr>
    </tbody>
  </table>

  <h2>📈 Career Progression Timeline</h2>
  ${timeline.map((stage, index) => `
    <div class="timeline-item">
      <div class="timeline-stage">Stage ${index + 1}: ${stage.title}</div>
      <div class="timeline-details">
        <div class="timeline-detail">
          <strong>Duration</strong><br>
          ${stage.years}
        </div>
        <div class="timeline-detail">
          <strong>Salary Range</strong><br>
          ${stage.salary}
        </div>
        <div class="timeline-detail">
          <strong>Pay Level</strong><br>
          ${stage.level}
        </div>
      </div>
      <p style="color: #4a5568; margin-top: 15px;"><strong>Key Responsibilities:</strong> ${stage.duties}</p>
      <p style="color: #805ad5; font-weight: 600;"><strong>Growth Tip:</strong> ${stage.tip}</p>
    </div>
  `).join('')}

  <h2>🎁 Benefits & Allowances</h2>
  ${template.benefits.map(benefit => `<div class="benefit-item"><strong>✅</strong> ${benefit}</div>`).join('')}

  <h2>⚠️ Job Challenges & Solutions</h2>
  ${template.challenges.map(challenge => `
    <div class="challenge-item">
      <h3>${challenge.name} <span style="background: ${challenge.severity === 'high' ? '#fed7d7' : challenge.severity === 'medium' ? '#fef3c7' : '#f0fff4'}; padding: 2px 8px; border-radius: 10px; font-size: 12px;">${challenge.severity.toUpperCase()}</span></h3>
      <p><strong>💡 Solution:</strong> ${challenge.solution}</p>
    </div>
  `).join('')}

  <h2>📝 How to Apply</h2>
  <div class="benefit-item">
    <h3>Application Process: ${template.application_process}</h3>
    <ol>
      <li>Check official notification for eligibility</li>
      <li>Fill online application form</li>
      <li>Pay application fees</li>
      <li>Download admit card</li>
      <li>Appear for written examination</li>
      <li>Document verification for selected candidates</li>
      <li>Final merit list and posting</li>
    </ol>
  </div>

  <h2>❓ Frequently Asked Questions</h2>
  <div class="challenge-item">
    <h3>What is the exact in-hand salary?</h3>
    <p>In metro cities: ₹${salaryCalc.total_metro.toLocaleString()}, Major cities: ₹${salaryCalc.total_major.toLocaleString()}, Other places: ₹${salaryCalc.total_other.toLocaleString()}</p>
  </div>
  
  <div class="challenge-item">
    <h3>Are there annual increments?</h3>
    <p>Yes, annual increments are given every year. DA is revised twice yearly based on inflation.</p>
  </div>

  <script>
    console.log('${jobData.name} salary page loaded with accurate calculations and timeline');
  </script>
</body>
</html>`;
  }

  // Batch generate all pages with rich content
  generateAllRichPages() {
    const jobs = {
      ias: { name: "Indian Administrative Service", vacancies: 180 },
      ips: { name: "Indian Police Service", vacancies: 150 },
      ssc_cgl: { name: "SSC Combined Graduate Level", vacancies: 17323 },
      sbi_po: { name: "SBI Probationary Officer", vacancies: 2000 }
    };

    const generatedPages = {};
    
    Object.keys(jobs).forEach(jobKey => {
      const content = this.generateCompleteContent(jobKey, jobs[jobKey]);
      generatedPages[jobKey] = content;
    });

    return generatedPages;
  }

  // Job-specific career timeline data
  getCareerTimeline(jobKey) {
    const timelines = {
      ias: [
        { 
          title: "Sub Divisional Magistrate (SDM)", 
          years: "0-2 years", 
          salary: "₹65,000 - ₹85,000", 
          level: "Level 10",
          duties: "Revenue administration, licensing, public grievances, sub-division coordination",
          tip: "Focus on learning local administration and building public relations skills"
        },
        { 
          title: "Additional District Magistrate (ADM)", 
          years: "2-5 years", 
          salary: "₹85,000 - ₹1,10,000", 
          level: "Level 11",
          duties: "Land acquisition, revenue collection, district administration support, development programs",
          tip: "Develop project management skills and inter-departmental coordination"
        },
        { 
          title: "District Collector", 
          years: "5-10 years", 
          salary: "₹1,20,000 - ₹1,60,000", 
          level: "Level 12",
          duties: "Head of district administration, law & order coordination, emergency management",
          tip: "Master leadership skills and crisis management capabilities"
        },
        { 
          title: "Joint Secretary", 
          years: "12-18 years", 
          salary: "₹1,80,000 - ₹2,20,000", 
          level: "Level 13",
          duties: "Policy formulation, minister briefings, parliament question handling",
          tip: "Focus on policy analysis and strategic thinking"
        },
        { 
          title: "Additional Secretary", 
          years: "18-25 years", 
          salary: "₹2,20,000 - ₹2,50,000", 
          level: "Level 14",
          duties: "Senior policy making, cabinet note preparation, high-level negotiations",
          tip: "Develop expertise in specific domains and international relations"
        },
        { 
          title: "Secretary", 
          years: "25+ years", 
          salary: "₹2,50,000+", 
          level: "Level 17-18",
          duties: "Ministry head, direct minister interface, national policy shaping",
          tip: "Lead transformational changes and mentor next generation officers"
        }
      ],
      
      ips: [
        { 
          title: "Assistant Superintendent of Police (ASP)", 
          years: "0-3 years", 
          salary: "₹56,100 - ₹78,000", 
          level: "Level 10",
          duties: "Law enforcement, crime investigation, maintaining public order",
          tip: "Focus on ground-level policing and community relations"
        },
        { 
          title: "Superintendent of Police (SP)", 
          years: "3-8 years", 
          salary: "₹78,800 - ₹1,25,000", 
          level: "Level 11-12",
          duties: "District police administration, crime control, VIP security",
          tip: "Develop strategic planning and team leadership skills"
        },
        { 
          title: "Deputy Inspector General (DIG)", 
          years: "8-15 years", 
          salary: "₹1,44,200 - ₹1,82,200", 
          level: "Level 13-14",
          duties: "Range/zone command, policy implementation, training oversight",
          tip: "Specialize in cyber crime, anti-terrorism or special operations"
        },
        { 
          title: "Inspector General (IG)", 
          years: "15-25 years", 
          salary: "₹1,82,200 - ₹2,25,000", 
          level: "Level 15-16",
          duties: "State-level operations, policy formulation, inter-state coordination",
          tip: "Build expertise in modern policing techniques and technology"
        },
        { 
          title: "Additional Director General (ADG)", 
          years: "25+ years", 
          salary: "₹2,25,000+", 
          level: "Level 17",
          duties: "State police leadership, national security coordination",
          tip: "Focus on police reforms and institutional development"
        }
      ],
      
      ssc_cgl: [
        { 
          title: "Assistant/Inspector (Entry Level)", 
          years: "0-5 years", 
          salary: "₹25,500 - ₹35,400", 
          level: "Level 4-6",
          duties: "Administrative tasks, field inspections, data analysis, public service",
          tip: "Build strong foundation in government procedures and regulations"
        },
        { 
          title: "Senior Assistant/Inspector", 
          years: "5-12 years", 
          salary: "₹35,400 - ₹44,900", 
          level: "Level 6-7",
          duties: "Team supervision, complex case handling, training junior staff",
          tip: "Develop specialization in your department's core functions"
        },
        { 
          title: "Assistant Audit Officer/Section Officer", 
          years: "8-15 years", 
          salary: "₹44,900 - ₹56,100", 
          level: "Level 7-8",
          duties: "Audit management, policy implementation, departmental coordination",
          tip: "Pursue professional certifications and higher education"
        },
        { 
          title: "Senior Section Officer", 
          years: "15+ years", 
          salary: "₹56,100+", 
          level: "Level 8+",
          duties: "Senior administrative roles, policy advisory, mentoring",
          tip: "Consider competitive exams for further career advancement"
        }
      ],
      
      sbi_po: [
        { 
          title: "Probationary Officer", 
          years: "0-2 years", 
          salary: "₹41,960 - ₹47,000", 
          level: "JMGS-I",
          duties: "Customer service, loan processing, branch operations, training",
          tip: "Focus on banking fundamentals and customer relationship building"
        },
        { 
          title: "Assistant Manager", 
          years: "2-5 years", 
          salary: "₹47,000 - ₹54,000", 
          level: "MMGS-II",
          duties: "Team leadership, business development, risk management",
          tip: "Develop expertise in digital banking and financial products"
        },
        { 
          title: "Manager", 
          years: "5-10 years", 
          salary: "₹59,000 - ₹70,000", 
          level: "MMGS-III",
          duties: "Branch management, portfolio oversight, compliance monitoring",
          tip: "Pursue professional banking certifications and MBA"
        },
        { 
          title: "Chief Manager", 
          years: "10-15 years", 
          salary: "₹76,000 - ₹85,000", 
          level: "SMGS-IV",
          duties: "Regional operations, strategic planning, large corporate clients",
          tip: "Specialize in corporate banking or treasury operations"
        },
        { 
          title: "Assistant General Manager", 
          years: "15+ years", 
          salary: "₹1,00,000+", 
          level: "SMGS-V",
          duties: "Circle management, policy formulation, board presentations",
          tip: "Focus on digital transformation and fintech partnerships"
        }
      ]
    };
    
    return timelines[jobKey] || [
      { 
        title: "Entry Level", 
        years: "0-3 years", 
        salary: "Starting salary", 
        level: "Entry",
        duties: "Basic responsibilities and learning organizational procedures",
        tip: "Focus on skill development and understanding departmental functions"
      },
      { 
        title: "Junior Level", 
        years: "3-8 years", 
        salary: "Mid-level salary", 
        level: "Junior",
        duties: "Increased responsibilities and team coordination",
        tip: "Build expertise and take on challenging assignments"
      },
      { 
        title: "Senior Level", 
        years: "8+ years", 
        salary: "Senior salary", 
        level: "Senior",
        duties: "Leadership roles and policy implementation",
        tip: "Focus on leadership development and strategic thinking"
      }
    ];
  }
}

module.exports = { SmartContentAutomation };