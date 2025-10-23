// Government Jobs Classification System
// Complete taxonomy for organizing 500+ government jobs

const jobClassificationSystem = {
  
  // 1. By Service Type (Primary Classification)
  serviceTypes: {
    "all-india-services": {
      name: "All India Services",
      description: "Central services with all-India postings",
      jobs: ["IAS", "IPS", "IFS (Indian Forest Service)"],
      payScale: "Level 10-17",
      authority: "UPSC",
      characteristics: ["Central posting", "State cadre", "High prestige"]
    },
    
    "central-services": {
      name: "Central Civil Services",
      description: "Central government departments",
      jobs: ["IRS", "IES", "IRAS", "IRPS", "IRTS", "IAAS"],
      payScale: "Level 6-14",
      authority: "UPSC/SSC",
      characteristics: ["Central posting", "Specialized domains"]
    },
    
    "state-services": {
      name: "State Civil Services", 
      description: "State government services",
      jobs: ["BPSC", "UPPSC", "MPSC", "WBPSC", "RPSC"],
      payScale: "State specific",
      authority: "State PSCs",
      characteristics: ["State-specific", "Local posting"]
    },
    
    "defense-services": {
      name: "Defense Services",
      description: "Armed forces and paramilitary",
      jobs: ["Indian Army", "Navy", "Air Force", "Coast Guard", "CAPF"],
      payScale: "Military pay scales",
      authority: "UPSC/SSB",
      characteristics: ["Uniform services", "Physical standards"]
    },
    
    "banking-financial": {
      name: "Banking & Financial Services",
      description: "Public sector banks and financial institutions",
      jobs: ["SBI PO", "IBPS PO", "RBI Grade B", "NABARD", "LIC"],
      payScale: "Bank specific",
      authority: "IBPS/Bank specific",
      characteristics: ["Commercial orientation", "Performance based"]
    },
    
    "railway-services": {
      name: "Railway Services",
      description: "Indian Railways departments",
      jobs: ["IRTS", "IRSE", "IRSME", "IRSS", "Group C & D"],
      payScale: "Level 6-14",
      authority: "Railway Board/UPSC",
      characteristics: ["Transport domain", "Technical roles"]
    },
    
    "psu-services": {
      name: "Public Sector Undertakings",
      description: "Government-owned enterprises",
      jobs: ["ONGC", "NTPC", "BHEL", "SAIL", "Coal India"],
      payScale: "CDA scales",
      authority: "Company specific",
      characteristics: ["Commercial operations", "Technical expertise"]
    }
  },

  // 2. By Recruitment Authority
  recruitmentAuthorities: {
    "upsc": {
      name: "Union Public Service Commission",
      exams: ["Civil Services", "Engineering Services", "Forest Service"],
      jobs: ["IAS", "IPS", "IES", "IFS"],
      prestige: "Very High",
      difficulty: "Very High"
    },
    
    "ssc": {
      name: "Staff Selection Commission", 
      exams: ["CGL", "CHSL", "MTS", "JE", "CPO"],
      jobs: ["Tax Assistant", "Auditor", "Inspector", "Stenographer"],
      prestige: "High",
      difficulty: "High"
    },
    
    "ibps": {
      name: "Institute of Banking Personnel Selection",
      exams: ["PO", "Clerk", "SO", "RRB"],
      jobs: ["Bank PO", "Bank Clerk", "Specialist Officer"],
      prestige: "High", 
      difficulty: "Moderate to High"
    },
    
    "state-psc": {
      name: "State Public Service Commissions",
      exams: ["State PCS", "State Services"],
      jobs: ["State civil services", "Police", "Teachers"],
      prestige: "High",
      difficulty: "High"
    }
  },

  // 3. By Pay Scale/Grade
  payGrades: {
    "grade-a": {
      name: "Grade A (Gazetted Officers)",
      payLevels: ["Level 10", "Level 11", "Level 12", "Level 13", "Level 14"],
      salaryRange: "₹56,100 - ₹2,25,000",
      jobs: ["IAS", "IPS", "IRS", "Bank PO", "AAO"],
      characteristics: ["Decision making", "Administrative powers", "High responsibility"]
    },
    
    "grade-b": {
      name: "Grade B (Gazetted/Non-Gazetted)",
      payLevels: ["Level 6", "Level 7", "Level 8", "Level 9"],
      salaryRange: "₹35,400 - ₹56,100", 
      jobs: ["Assistant Manager", "Section Officer", "Inspector"],
      characteristics: ["Supervisory roles", "Specialized work"]
    },
    
    "grade-c": {
      name: "Grade C (Non-Gazetted)",
      payLevels: ["Level 2", "Level 3", "Level 4", "Level 5"],
      salaryRange: "₹19,900 - ₹35,400",
      jobs: ["Clerk", "Stenographer", "Assistant", "Operator"],
      characteristics: ["Clerical work", "Support functions"]
    },
    
    "grade-d": {
      name: "Grade D (Non-Gazetted)",
      payLevels: ["Level 1"],
      salaryRange: "₹18,000 - ₹19,900",
      jobs: ["Peon", "Sweeper", "Watchman", "Helper"],
      characteristics: ["Manual work", "Support services"]
    }
  },

  // 4. By Educational Qualification
  educationLevels: {
    "graduation": {
      name: "Graduate Level",
      qualification: "Bachelor's degree",
      jobs: ["IAS", "IPS", "Bank PO", "SSC CGL"],
      examLevel: "Competitive"
    },
    
    "post-graduation": {
      name: "Post Graduate Level", 
      qualification: "Master's degree",
      jobs: ["University Professor", "Research positions"],
      examLevel: "Specialized"
    },
    
    "intermediate": {
      name: "12th Pass",
      qualification: "Higher Secondary",
      jobs: ["SSC CHSL", "Clerk", "Stenographer"],
      examLevel: "Moderate"
    },
    
    "matriculation": {
      name: "10th Pass",
      qualification: "Secondary Education",
      jobs: ["MTS", "Constable", "Helper"],
      examLevel: "Basic"
    }
  },

  // 5. By Job Function/Department
  departments: {
    "administrative": {
      name: "General Administration",
      jobs: ["IAS", "State PCS", "Section Officer"],
      functions: ["Policy making", "Implementation", "Coordination"]
    },
    
    "law-enforcement": {
      name: "Law & Order",
      jobs: ["IPS", "State Police", "CAPF", "Constable"],
      functions: ["Crime prevention", "Investigation", "Security"]
    },
    
    "revenue": {
      name: "Revenue & Taxation",
      jobs: ["IRS", "Tax Inspector", "Excise Inspector"],
      functions: ["Tax collection", "Revenue administration"]
    },
    
    "technical": {
      name: "Technical Services",
      jobs: ["IES", "JE", "AE", "Technical Assistant"],
      functions: ["Engineering", "Maintenance", "Projects"]
    },
    
    "education": {
      name: "Education Services",
      jobs: ["KVS", "NVS", "UGC-NET", "State Teachers"],
      functions: ["Teaching", "Research", "Educational administration"]
    },
    
    "medical": {
      name: "Medical Services",
      jobs: ["AIIMS", "State Medical", "ESIC", "Railway Medical"],
      functions: ["Healthcare", "Medical research", "Public health"]
    },
    
    "judicial": {
      name: "Judicial Services",
      jobs: ["Civil Judge", "Magistrate", "Higher Judicial"],
      functions: ["Justice delivery", "Legal interpretation"]
    }
  },

  // 6. By Age Limits
  ageGroups: {
    "young-entry": {
      name: "Early Career (21-27)",
      maxAge: 27,
      jobs: ["IAS", "IPS", "Bank PO"],
      relaxations: "SC/ST/OBC applicable"
    },
    
    "mid-career": {
      name: "Mid Career (21-32)",
      maxAge: 32,
      jobs: ["SSC CGL", "State Services"],
      relaxations: "Category wise relaxation"
    },
    
    "experienced": {
      name: "Experienced (21-40)",
      maxAge: 40,
      jobs: ["Specialist positions", "Lateral entry"],
      relaxations: "Experience based"
    }
  },

  // 7. Classification Helper Functions
  classificationHelpers: {
    
    // Get job category
    getJobCategory: function(jobTitle) {
      for (const [categoryKey, category] of Object.entries(this.serviceTypes)) {
        if (category.jobs.some(job => jobTitle.includes(job))) {
          return {
            category: categoryKey,
            name: category.name,
            characteristics: category.characteristics
          };
        }
      }
      return { category: "other", name: "Other Services" };
    },

    // Get pay grade
    getPayGrade: function(salaryAmount) {
      const salary = parseInt(salaryAmount);
      
      if (salary >= 56100) return "grade-a";
      if (salary >= 35400) return "grade-b"; 
      if (salary >= 19900) return "grade-c";
      return "grade-d";
    },

    // Get recruitment difficulty
    getDifficultyLevel: function(authority) {
      const difficultyMap = {
        "upsc": "Very High",
        "ssc": "High", 
        "ibps": "Moderate to High",
        "state-psc": "High",
        "direct": "Low to Moderate"
      };
      return difficultyMap[authority] || "Moderate";
    },

    // Generate SEO categories
    generateSEOCategories: function(job) {
      return {
        primary: this.getJobCategory(job.title).name,
        secondary: this.getPayGrade(job.salary),
        tags: [
          job.authority,
          job.department,
          `${job.state || 'central'}-government`,
          `level-${job.payLevel || 'unknown'}`
        ]
      };
    }
  }
};

// Usage Examples:
const exampleClassifications = {
  
  // Example 1: IAS Officer
  ias: {
    title: "IAS Officer",
    classification: {
      serviceType: "all-india-services",
      authority: "upsc", 
      payGrade: "grade-a",
      department: "administrative",
      education: "graduation",
      ageGroup: "young-entry"
    },
    seoCategories: ["All India Services", "Grade A", "UPSC", "Administrative", "Central Government"]
  },

  // Example 2: SBI PO
  sbi_po: {
    title: "SBI PO",
    classification: {
      serviceType: "banking-financial",
      authority: "ibps",
      payGrade: "grade-a", 
      department: "banking",
      education: "graduation",
      ageGroup: "young-entry"
    },
    seoCategories: ["Banking Services", "Grade A", "IBPS", "Financial", "Public Sector"]
  },

  // Example 3: SSC CGL
  ssc_cgl: {
    title: "SSC CGL",
    classification: {
      serviceType: "central-services",
      authority: "ssc",
      payGrade: "grade-b",
      department: "various",
      education: "graduation", 
      ageGroup: "mid-career"
    },
    seoCategories: ["Central Services", "Grade B", "SSC", "Multi-Department", "Central Government"]
  }
};

// Auto-classification function for new jobs
function classifyJob(jobData) {
  const classification = {};
  
  // Determine service type
  classification.serviceType = jobClassificationSystem.classificationHelpers.getJobCategory(jobData.title).category;
  
  // Determine pay grade
  classification.payGrade = jobClassificationSystem.classificationHelpers.getPayGrade(jobData.basicSalary);
  
  // Determine difficulty
  classification.difficulty = jobClassificationSystem.classificationHelpers.getDifficultyLevel(jobData.authority);
  
  // Generate SEO categories
  classification.seoCategories = jobClassificationSystem.classificationHelpers.generateSEOCategories(jobData);
  
  return classification;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { jobClassificationSystem, classifyJob };
}