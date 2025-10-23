// Comprehensive Government Job Classification System
// All possible ways to classify and organize government jobs

const ComprehensiveJobClassification = {

  // 1. SKILL-WISE CLASSIFICATION
  skillBased: {
    "technical": {
      name: "Technical/Engineering Jobs",
      skills: ["Engineering", "IT", "Technical", "Research"],
      jobs: ["IES", "Junior Engineer", "Assistant Engineer", "Technical Assistant", "DRDO Scientist"],
      subCategories: {
        "civil-engineering": ["PWD", "CPWD", "Railway Engineering", "Irrigation"],
        "mechanical": ["BHEL", "HAL", "Railway Mechanical", "Defense"],
        "electrical": ["NTPC", "Power Grid", "Railway Electrical"],
        "computer-science": ["NIC", "Software Developer", "System Analyst", "Cyber Security"],
        "electronics": ["BSNL", "MTNL", "Telecom", "Electronics Engineer"]
      },
      requiredSkills: ["Problem solving", "Technical expertise", "Innovation", "Analysis"]
    },
    
    "administrative": {
      name: "Administrative/Management Jobs",
      skills: ["Leadership", "Management", "Policy Making", "Coordination"],
      jobs: ["IAS", "IPS", "Section Officer", "Assistant", "Under Secretary"],
      subCategories: {
        "policy-making": ["IAS", "IPS", "IFS", "Policy Analyst"],
        "general-admin": ["Section Officer", "Assistant", "Clerk"],
        "finance-admin": ["Accounts Officer", "Audit Officer", "Finance Manager"],
        "hr-admin": ["Personnel Officer", "Training Officer", "Welfare Officer"]
      },
      requiredSkills: ["Communication", "Leadership", "Decision making", "Public relations"]
    },
    
    "financial": {
      name: "Finance/Accounts Jobs",
      skills: ["Financial Analysis", "Accounting", "Taxation", "Auditing"],
      jobs: ["Bank PO", "Bank Clerk", "Accounts Officer", "Auditor", "Tax Officer"],
      subCategories: {
        "banking": ["SBI PO", "IBPS PO", "Bank Manager", "Credit Officer"],
        "taxation": ["Income Tax Officer", "GST Inspector", "Excise Officer"],
        "accounts": ["Accounts Officer", "Finance Officer", "Budget Officer"],
        "audit": ["CAG", "Internal Auditor", "Audit Assistant"]
      },
      requiredSkills: ["Numerical ability", "Financial analysis", "Attention to detail", "Compliance"]
    },
    
    "legal": {
      name: "Legal/Judicial Jobs", 
      skills: ["Legal Knowledge", "Judgment", "Research", "Advocacy"],
      jobs: ["Civil Judge", "Magistrate", "Public Prosecutor", "Legal Officer"],
      subCategories: {
        "judicial": ["District Judge", "Magistrate", "Judicial Officer"],
        "legal-advisory": ["Legal Officer", "Law Officer", "Legal Consultant"],
        "prosecution": ["Public Prosecutor", "Assistant Prosecutor"]
      },
      requiredSkills: ["Legal reasoning", "Research", "Communication", "Ethics"]
    },
    
    "medical": {
      name: "Medical/Healthcare Jobs",
      skills: ["Medical Knowledge", "Patient Care", "Diagnosis", "Treatment"],
      jobs: ["AIIMS Doctor", "Medical Officer", "Staff Nurse", "Pharmacist"],
      subCategories: {
        "medical-officers": ["Medical Officer", "Specialist Doctor", "Surgeon"],
        "nursing": ["Staff Nurse", "ANM", "GNM"],
        "paramedical": ["Lab Technician", "X-Ray Technician", "Pharmacist"],
        "public-health": ["Health Inspector", "Epidemiologist", "Health Educator"]
      },
      requiredSkills: ["Medical expertise", "Empathy", "Critical thinking", "Emergency handling"]
    },
    
    "teaching": {
      name: "Teaching/Education Jobs",
      skills: ["Subject Expertise", "Communication", "Student Management", "Curriculum"],
      jobs: ["Professor", "TGT", "PGT", "PRT", "Principal"],
      subCategories: {
        "higher-education": ["Professor", "Associate Professor", "Assistant Professor"],
        "school-education": ["TGT", "PGT", "PRT", "Head Teacher"],
        "research": ["Research Fellow", "Scientist", "Research Associate"],
        "educational-admin": ["Principal", "Education Officer", "Academic Coordinator"]
      },
      requiredSkills: ["Subject knowledge", "Communication", "Patience", "Innovation"]
    },
    
    "security": {
      name: "Security/Defense Jobs",
      skills: ["Physical Fitness", "Security", "Law Enforcement", "Defense"],
      jobs: ["Police Constable", "Army Officer", "Security Guard", "CRPF"],
      subCategories: {
        "armed-forces": ["Army", "Navy", "Air Force", "Coast Guard"],
        "paramilitary": ["CRPF", "BSF", "CISF", "ITBP", "SSB"],
        "police": ["Police Constable", "SI", "Inspector", "SP"],
        "intelligence": ["Intelligence Officer", "Security Analyst"]
      },
      requiredSkills: ["Physical fitness", "Discipline", "Quick thinking", "Courage"]
    }
  },

  // 2. STATE-WISE CLASSIFICATION
  stateBased: {
    "central-government": {
      name: "Central Government Jobs",
      authority: "Central Ministries",
      jobs: ["IAS", "IPS", "SSC CGL", "Railway", "Bank PO"],
      benefits: ["All India posting", "Higher pay", "Central benefits"],
      states: "All India"
    },
    
    "uttar-pradesh": {
      name: "Uttar Pradesh Government Jobs",
      authority: "UPPSC, UP Subordinate Services",
      jobs: ["UPPSC PCS", "UP Police", "UP Teacher", "Lekhpal", "VDO"],
      localBenefits: ["Local posting", "UP domicile advantage"],
      majorRecruitments: ["UPPSC", "UP Police Recruitment Board", "UP Basic Education Board"],
      annualVacancies: 50000
    },
    
    "bihar": {
      name: "Bihar Government Jobs",
      authority: "BPSC, Bihar SSC",
      jobs: ["BPSC", "Bihar Police", "Bihar Teacher", "Panchayat Secretary"],
      localBenefits: ["Bihar domicile required", "Local language preference"],
      majorRecruitments: ["BPSC", "Bihar Police", "Bihar Education Department"]
    },
    
    "maharashtra": {
      name: "Maharashtra Government Jobs", 
      authority: "MPSC, Maharashtra Subordinate Services",
      jobs: ["MPSC", "Maharashtra Police", "Zilla Panchayat", "MSRTC"],
      localBenefits: ["Marathi language advantage", "Local knowledge required"],
      majorRecruitments: ["MPSC", "Maharashtra Police Recruitment"]
    },
    
    "rajasthan": {
      name: "Rajasthan Government Jobs",
      authority: "RPSC, Rajasthan Subordinate Selection Board", 
      jobs: ["RPSC RAS", "Rajasthan Police", "Rajasthan Teacher", "Patwari"],
      localBenefits: ["Rajasthan domicile", "Hindi/Rajasthani preference"],
      majorRecruitments: ["RPSC", "Rajasthan Police"]
    },
    
    "west-bengal": {
      name: "West Bengal Government Jobs",
      authority: "WBPSC, West Bengal SSC",
      jobs: ["WBPSC", "WB Police", "WB Teacher", "Clerk"],
      localBenefits: ["Bengali language preference", "Local posting"],
      majorRecruitments: ["WBPSC", "WB Police Recruitment Board"]
    }
  },

  // 3. CATEGORY-WISE (Detailed)
  categoryBased: {
    "by-recruitment-type": {
      "direct-recruitment": {
        name: "Direct Recruitment",
        description: "Fresh graduates can apply directly",
        jobs: ["IAS", "Bank PO", "SSC CGL", "Railway ALP"],
        process: "Written exam + Interview"
      },
      "promotion-based": {
        name: "Promotion Based",
        description: "Internal candidates get promoted",
        jobs: ["Senior positions", "Departmental promotions"],
        process: "Departmental exams + Seniority"
      },
      "deputation": {
        name: "Deputation",
        description: "Transfer from other departments",
        jobs: ["Joint Secretary", "Director level"],
        process: "Selection committee"
      }
    },
    
    "by-job-security": {
      "permanent": {
        name: "Permanent Jobs",
        security: "Lifetime job security",
        jobs: ["IAS", "Bank PO", "Railway", "PSU"],
        benefits: ["Pension", "Medical", "Job security"]
      },
      "contractual": {
        name: "Contractual Jobs", 
        security: "Fixed term contracts",
        jobs: ["Project Officer", "Consultant", "Temporary Teacher"],
        benefits: ["Higher initial pay", "Flexibility"]
      },
      "outsourced": {
        name: "Outsourced Jobs",
        security: "Through agencies",
        jobs: ["Security Guards", "Cleaning staff", "Data entry"],
        benefits: ["Easy entry", "Less competition"]
      }
    }
  },

  // 4. PAY GRADE WISE (7th Pay Commission)
  payGradeBased: {
    "grade-a1": {
      name: "Grade A1 (Top Executive)",
      payLevels: [17, 16, 15],
      salaryRange: "₹2,25,000 - ₹2,50,000",
      positions: ["Secretary", "Additional Secretary", "Special Secretary"],
      eligibility: "Senior IAS/IPS with 20+ years",
      perks: ["Official residence", "Car", "Security"]
    },
    
    "grade-a": {
      name: "Grade A (Senior Officers)",
      payLevels: [14, 13, 12, 11, 10],
      salaryRange: "₹56,100 - ₹2,25,000", 
      positions: ["IAS", "IPS", "IRS", "Bank PO", "IES"],
      eligibility: "UPSC/Banking exams",
      perks: ["HRA", "Medical", "LTC", "Car loan"]
    },
    
    "grade-b": {
      name: "Grade B (Middle Management)",
      payLevels: [9, 8, 7, 6],
      salaryRange: "₹35,400 - ₹56,100",
      positions: ["Assistant Manager", "Section Officer", "Inspector"],
      eligibility: "Graduation + competitive exam",
      perks: ["Standard government benefits"]
    },
    
    "grade-c": {
      name: "Grade C (Junior Officers)",
      payLevels: [5, 4, 3, 2],
      salaryRange: "₹19,900 - ₹35,400",
      positions: ["Clerk", "Stenographer", "Assistant"],
      eligibility: "12th pass + exam",
      perks: ["Basic benefits", "PF", "Medical"]
    },
    
    "grade-d": {
      name: "Grade D (Support Staff)",
      payLevels: [1],
      salaryRange: "₹18,000 - ₹19,900",
      positions: ["MTS", "Peon", "Helper", "Sweeper"],
      eligibility: "10th pass",
      perks: ["Basic salary", "Medical"]
    }
  },

  // 5. ADDITIONAL CLASSIFICATIONS
  additionalClassifications: {
    
    // By Work Location
    "by-location": {
      "field-jobs": {
        name: "Field Jobs",
        description: "Outdoor/travelling work",
        jobs: ["Police", "Forest Officer", "Tax Inspector", "Survey Officer"],
        characteristics: ["Travel required", "Outdoor work", "Field allowances"]
      },
      "office-jobs": {
        name: "Office Jobs", 
        description: "Desk/indoor work",
        jobs: ["Clerk", "Accounts Officer", "Computer Operator"],
        characteristics: ["Fixed location", "Regular hours", "Office environment"]
      },
      "mixed-jobs": {
        name: "Mixed Jobs",
        description: "Both office and field work",
        jobs: ["IAS", "Bank Manager", "Inspector"],
        characteristics: ["Varied work", "Leadership roles", "Both environments"]
      }
    },
    
    // By Working Hours
    "by-working-hours": {
      "regular-hours": {
        name: "Regular Office Hours (9-5)",
        jobs: ["Clerk", "Officer", "Teacher"],
        schedule: "Monday to Friday, 8 hours"
      },
      "shift-based": {
        name: "Shift Based",
        jobs: ["Police", "Railway", "Hospital staff"],
        schedule: "Rotating shifts, 24x7 operations"
      },
      "flexible-hours": {
        name: "Flexible Hours",
        jobs: ["Research positions", "Consultants"],
        schedule: "Project based, flexible timing"
      }
    },
    
    // By Career Growth
    "by-career-growth": {
      "fast-track": {
        name: "Fast Track Growth",
        jobs: ["IAS", "IPS", "Bank PO"],
        growth: "Rapid promotions, high positions",
        timeline: "5-10 years to senior roles"
      },
      "steady-growth": {
        name: "Steady Growth",
        jobs: ["Teacher", "Clerk", "Inspector"],
        growth: "Regular increments, moderate growth",
        timeline: "10-20 years for senior positions"
      },
      "limited-growth": {
        name: "Limited Growth",
        jobs: ["MTS", "Helper", "Grade D"],
        growth: "Basic increments, limited positions",
        timeline: "Slow progression"
      }
    },
    
    // By Competition Level
    "by-competition": {
      "extremely-competitive": {
        name: "Extremely Competitive",
        jobs: ["IAS", "IPS", "IFS"],
        ratio: "1:1000+",
        preparation: "2-3 years full time"
      },
      "highly-competitive": {
        name: "Highly Competitive", 
        jobs: ["Bank PO", "SSC CGL", "Railway Officer"],
        ratio: "1:200-500",
        preparation: "1-2 years"
      },
      "moderately-competitive": {
        name: "Moderately Competitive",
        jobs: ["Clerk", "Stenographer", "Constable"],
        ratio: "1:50-200",
        preparation: "6-12 months"
      },
      "less-competitive": {
        name: "Less Competitive",
        jobs: ["MTS", "Helper", "Sweeper"],
        ratio: "1:10-50",
        preparation: "3-6 months"
      }
    }
  },

  // Helper functions to classify jobs
  classificationHelpers: {
    
    // Get all classifications for a job
    getFullClassification: function(jobData) {
      return {
        skill: this.getSkillCategory(jobData.title),
        state: this.getStateCategory(jobData.state),
        payGrade: this.getPayGradeCategory(jobData.salary),
        competition: this.getCompetitionLevel(jobData.title),
        location: this.getLocationCategory(jobData.workType),
        growth: this.getGrowthCategory(jobData.title),
        security: this.getSecurityType(jobData.type)
      };
    },
    
    // Generate comprehensive tags
    generateComprehensiveTags: function(jobData) {
      const classification = this.getFullClassification(jobData);
      
      return [
        // Skill tags
        classification.skill?.name.toLowerCase().replace(/\s+/g, '-'),
        
        // State tags  
        classification.state?.name.toLowerCase().replace(/\s+/g, '-'),
        
        // Pay grade tags
        classification.payGrade?.name.toLowerCase().replace(/\s+/g, '-'),
        
        // Additional descriptive tags
        `${classification.competition?.level}-competition`,
        `${classification.growth?.type}-growth`,
        `${classification.location?.type}-work`,
        `${classification.security?.type}-job`
      ].filter(Boolean);
    },
    
    // Generate SEO-friendly URLs
    generateSEOUrls: function(jobData) {
      const classification = this.getFullClassification(jobData);
      
      return {
        main: `/${jobData.slug}`,
        skillPage: `/jobs/${classification.skill?.slug}`,
        statePage: `/jobs/${classification.state?.slug}`,
        salaryPage: `/salary/${classification.payGrade?.slug}`,
        categoryPage: `/category/${classification.category?.slug}`
      };
    }
  }
};

// Export the comprehensive classification system
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ComprehensiveJobClassification;
}

console.log("Comprehensive Job Classification System loaded!");
console.log("Available classifications:", Object.keys(ComprehensiveJobClassification));