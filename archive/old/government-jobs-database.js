// Comprehensive Government Jobs Database
const governmentJobs = {
  // Central Government Services
  "central-services": {
    "ias": {
      name: "Indian Administrative Service",
      category: "All India Service",
      recruitment: "UPSC CSE",
      startingSalary: "₹56,100",
      peakSalary: "₹2,50,000+",
      duration: "30-35 years",
      payLevel: "10-18",
      quickStats: {
        vacancies: "180/year",
        successRate: "0.1%",
        trainingPeriod: "2 years",
        postingType: "All India"
      }
    },
    "ips": {
      name: "Indian Police Service", 
      category: "All India Service",
      recruitment: "UPSC CSE",
      startingSalary: "₹56,100",
      peakSalary: "₹2,25,000+",
      duration: "30-35 years",
      payLevel: "10-18",
      quickStats: {
        vacancies: "150/year",
        successRate: "0.1%", 
        trainingPeriod: "18 months",
        postingType: "State cadre"
      }
    },
    "ifs": {
      name: "Indian Foreign Service",
      category: "Central Service A",
      recruitment: "UPSC CSE",
      startingSalary: "₹56,100",
      peakSalary: "₹2,25,000+", 
      duration: "30-35 years",
      payLevel: "10-17",
      quickStats: {
        vacancies: "20-30/year",
        successRate: "0.05%",
        trainingPeriod: "1 year",
        postingType: "Global"
      }
    },
    "irs": {
      name: "Indian Revenue Service",
      category: "Central Service A",
      recruitment: "UPSC CSE",
      startingSalary: "₹56,100",
      peakSalary: "₹2,25,000+",
      duration: "30-35 years", 
      payLevel: "10-16",
      quickStats: {
        vacancies: "300-400/year",
        successRate: "0.3%",
        trainingPeriod: "9 months",
        postingType: "Pan India"
      }
    }
  },

  // SSC Jobs
  "ssc-jobs": {
    "ssc-cgl": {
      name: "SSC Combined Graduate Level",
      category: "Group B & C",
      recruitment: "SSC CGL Exam",
      startingSalary: "₹25,500",
      peakSalary: "₹1,51,100", 
      duration: "25-30 years",
      payLevel: "4-8",
      quickStats: {
        vacancies: "15,000+/year",
        successRate: "2%",
        trainingPeriod: "3-6 months",
        postingType: "Central Govt"
      }
    },
    "ssc-chsl": {
      name: "SSC Combined Higher Secondary Level",
      category: "Group C",
      recruitment: "SSC CHSL Exam", 
      startingSalary: "₹19,900",
      peakSalary: "₹81,100",
      duration: "25-30 years",
      payLevel: "2-5",
      quickStats: {
        vacancies: "4,500+/year",
        successRate: "3%",
        trainingPeriod: "1-3 months", 
        postingType: "Central Govt"
      }
    },
    "ssc-mts": {
      name: "SSC Multi Tasking Staff",
      category: "Group C",
      recruitment: "SSC MTS Exam",
      startingSalary: "₹18,000",
      peakSalary: "₹62,000",
      duration: "25-30 years",
      payLevel: "1-3",
      quickStats: {
        vacancies: "8,000+/year",
        successRate: "5%",
        trainingPeriod: "2 weeks",
        postingType: "Central Govt"
      }
    }
  },

  // Banking Jobs
  "banking-jobs": {
    "sbi-po": {
      name: "State Bank of India - Probationary Officer",
      category: "Officer Scale I",
      recruitment: "SBI PO Exam",
      startingSalary: "₹41,960",
      peakSalary: "₹1,50,000+",
      duration: "25-30 years",
      payLevel: "JMGS-I to SMGS-V",
      quickStats: {
        vacancies: "2,000/year",
        successRate: "1%",
        trainingPeriod: "6 months",
        postingType: "Pan India"
      }
    },
    "ibps-po": {
      name: "IBPS Bank PO",
      category: "Officer Scale I", 
      recruitment: "IBPS PO Exam",
      startingSalary: "₹41,960",
      peakSalary: "₹1,30,000+",
      duration: "25-30 years",
      payLevel: "JMGS-I to SMGS-IV",
      quickStats: {
        vacancies: "4,000/year",
        successRate: "1.5%",
        trainingPeriod: "6 months",
        postingType: "State/Region"
      }
    },
    "bank-clerk": {
      name: "Bank Clerk",
      category: "Clerical Cadre",
      recruitment: "IBPS Clerk/SBI Clerk",
      startingSalary: "₹19,900",
      peakSalary: "₹45,000",
      duration: "25-30 years",
      payLevel: "2-5",
      quickStats: {
        vacancies: "12,000/year",
        successRate: "3%",
        trainingPeriod: "3 months",
        postingType: "Local/State"
      }
    }
  },

  // Railway Jobs
  "railway-jobs": {
    "rrb-ntpc": {
      name: "RRB Non-Technical Popular Categories",
      category: "Graduate Level",
      recruitment: "RRB NTPC Exam",
      startingSalary: "₹35,400",
      peakSalary: "₹1,12,400",
      duration: "25-30 years", 
      payLevel: "5-6",
      quickStats: {
        vacancies: "35,000/year",
        successRate: "2%",
        trainingPeriod: "3-6 months",
        postingType: "Zone wise"
      }
    },
    "rrb-je": {
      name: "RRB Junior Engineer",
      category: "Technical Grade III",
      recruitment: "RRB JE Exam",
      startingSalary: "₹35,400",
      peakSalary: "₹1,12,400",
      duration: "25-30 years",
      payLevel: "6",
      quickStats: {
        vacancies: "14,000/year", 
        successRate: "1.5%",
        trainingPeriod: "6 months",
        postingType: "Zone wise"
      }
    },
    "rrb-group-d": {
      name: "RRB Group D",
      category: "Level 1",
      recruitment: "RRB Group D Exam",
      startingSalary: "₹18,000",
      peakSalary: "₹56,900",
      duration: "25-30 years",
      payLevel: "1",
      quickStats: {
        vacancies: "1,03,000/year",
        successRate: "5%",
        trainingPeriod: "4 weeks",
        postingType: "Zone wise"
      }
    }
  },

  // Teaching Jobs
  "teaching-jobs": {
    "kvs-pgt": {
      name: "KVS Post Graduate Teacher",
      category: "Central Govt Teacher",
      recruitment: "KVS Recruitment",
      startingSalary: "₹47,600",
      peakSalary: "₹1,51,100",
      duration: "25-30 years",
      payLevel: "7",
      quickStats: {
        vacancies: "8,000/year",
        successRate: "4%",
        trainingPeriod: "1 month",
        postingType: "Transfer liable"
      }
    },
    "kvs-tgt": {
      name: "KVS Trained Graduate Teacher", 
      category: "Central Govt Teacher",
      recruitment: "KVS Recruitment",
      startingSalary: "₹44,900",
      peakSalary: "₹1,42,400",
      duration: "25-30 years",
      payLevel: "6",
      quickStats: {
        vacancies: "12,000/year",
        successRate: "5%",
        trainingPeriod: "1 month",
        postingType: "Transfer liable"
      }
    },
    "net-jrf": {
      name: "UGC NET JRF Assistant Professor",
      category: "Higher Education",
      recruitment: "UGC NET",
      startingSalary: "₹57,700",
      peakSalary: "₹1,82,200+",
      duration: "25-30 years",
      payLevel: "10-14",
      quickStats: {
        vacancies: "Variable",
        successRate: "8%",
        trainingPeriod: "PhD/Research",
        postingType: "University based"
      }
    }
  },

  // Defense Services  
  "defense-jobs": {
    "army-officer": {
      name: "Indian Army Officer",
      category: "Commissioned Officer",
      recruitment: "NDA/CDS/OTA",
      startingSalary: "₹56,100",
      peakSalary: "₹2,50,000+",
      duration: "20+ years",
      payLevel: "10-18",
      quickStats: {
        vacancies: "400/year",
        successRate: "2%",
        trainingPeriod: "1-1.5 years",
        postingType: "All India"
      }
    },
    "navy-officer": {
      name: "Indian Navy Officer",
      category: "Commissioned Officer", 
      recruitment: "NDA/CDS/INET",
      startingSalary: "₹56,100",
      peakSalary: "₹2,50,000+",
      duration: "20+ years",
      payLevel: "10-18",
      quickStats: {
        vacancies: "200/year",
        successRate: "1.5%",
        trainingPeriod: "1-2 years",
        postingType: "Naval stations"
      }
    },
    "air-force-officer": {
      name: "Indian Air Force Officer",
      category: "Commissioned Officer",
      recruitment: "NDA/CDS/AFCAT", 
      startingSalary: "₹56,100",
      peakSalary: "₹2,50,000+",
      duration: "20+ years",
      payLevel: "10-18",
      quickStats: {
        vacancies: "300/year",
        successRate: "1%",
        trainingPeriod: "1.5-2 years",
        postingType: "Air bases"
      }
    }
  },

  // PSU Jobs
  "psu-jobs": {
    "coal-india": {
      name: "Coal India Limited",
      category: "Maharatna PSU",
      recruitment: "GATE/Direct", 
      startingSalary: "₹50,000",
      peakSalary: "₹1,60,000+",
      duration: "25-30 years",
      payLevel: "E1-E9",
      quickStats: {
        vacancies: "8,000/year",
        successRate: "3%",
        trainingPeriod: "6 months",
        postingType: "Mining areas"
      }
    },
    "ongc": {
      name: "Oil and Natural Gas Corporation",
      category: "Maharatna PSU",
      recruitment: "GATE",
      startingSalary: "₹60,000", 
      peakSalary: "₹1,80,000+",
      duration: "25-30 years",
      payLevel: "E1-E9",
      quickStats: {
        vacancies: "3,000/year",
        successRate: "2%", 
        trainingPeriod: "1 year",
        postingType: "Oil fields"
      }
    },
    "ntpc": {
      name: "National Thermal Power Corporation",
      category: "Maharatna PSU",
      recruitment: "GATE",
      startingSalary: "₹50,000",
      peakSalary: "₹1,60,000+",
      duration: "25-30 years",
      payLevel: "E1-E8",
      quickStats: {
        vacancies: "2,500/year",
        successRate: "2.5%",
        trainingPeriod: "8 months",
        postingType: "Power plants"
      }
    }
  },

  // State Government Jobs
  "state-jobs": {
    "state-pcs": {
      name: "State Public Service Commission",
      category: "State Civil Services",
      recruitment: "State PCS Exam",
      startingSalary: "₹35,400",
      peakSalary: "₹2,25,000",
      duration: "30-35 years",
      payLevel: "9-18",
      quickStats: {
        vacancies: "500-2000/state",
        successRate: "0.5%",
        trainingPeriod: "1 year",
        postingType: "Within state"
      }
    },
    "state-police": {
      name: "State Police Service",
      category: "State Service",
      recruitment: "State Police Exam",
      startingSalary: "₹25,000",
      peakSalary: "₹1,50,000",
      duration: "25-30 years",
      payLevel: "5-15",
      quickStats: {
        vacancies: "5,000-10,000/state",
        successRate: "3%",
        trainingPeriod: "9 months",
        postingType: "Within state"
      }
    },
    "state-teacher": {
      name: "State Government Teacher",
      category: "Education Service",
      recruitment: "State TET/CTET",
      startingSalary: "₹23,700",
      peakSalary: "₹78,800",
      duration: "25-30 years", 
      payLevel: "5-12",
      quickStats: {
        vacancies: "20,000-50,000/state",
        successRate: "10%",
        trainingPeriod: "3 months",
        postingType: "District wise"
      }
    }
  },

  // Judicial Services
  "judicial-jobs": {
    "judicial-magistrate": {
      name: "Judicial Magistrate",
      category: "Judicial Service",
      recruitment: "State Judicial Service Exam",
      startingSalary: "₹77,840",
      peakSalary: "₹2,25,000",
      duration: "25-30 years",
      payLevel: "11-18",
      quickStats: {
        vacancies: "200-500/state",
        successRate: "1%",
        trainingPeriod: "1 year",
        postingType: "District courts"
      }
    }
  },

  // Medical Services
  "medical-jobs": {
    "government-doctor": {
      name: "Government Medical Officer", 
      category: "Medical Service",
      recruitment: "NEET PG/State Medical",
      startingSalary: "₹67,700",
      peakSalary: "₹2,18,200",
      duration: "25-30 years",
      payLevel: "10-15",
      quickStats: {
        vacancies: "10,000/year",
        successRate: "15%",
        trainingPeriod: "6 months",
        postingType: "Hospital based"
      }
    }
  }
};

// Challenge Tags Database
const challengeTags = {
  "#political-pressure": {
    severity: "high",
    description: "Political interference in decision making",
    commonIn: ["IAS", "IPS", "State PCS", "District Collector"]
  },
  "#remote-posting": {
    severity: "high", 
    description: "Postings in remote/rural areas away from family",
    commonIn: ["IAS", "IPS", "Forest Service", "ONGC", "Coal India"]
  },
  "#work-life-balance": {
    severity: "medium",
    description: "Long working hours and irregular schedules", 
    commonIn: ["Banking", "Railway", "PSU", "Teaching"]
  },
  "#transfer-stress": {
    severity: "medium",
    description: "Frequent transfers affecting family stability",
    commonIn: ["Central Services", "Banking", "Railway", "Defense"]
  },
  "#night-shifts": {
    severity: "medium",
    description: "Night duty and irregular working hours",
    commonIn: ["Railway", "Banking", "Police", "Medical"]
  },
  "#exam-pressure": {
    severity: "high",
    description: "Highly competitive entrance examinations",
    commonIn: ["UPSC", "SSC", "Banking", "Railway", "State PCS"]
  },
  "#physical-demands": {
    severity: "medium",
    description: "Physical fitness and field work requirements",
    commonIn: ["Police", "Defense", "Forest", "Railway"]
  },
  "#corruption-exposure": {
    severity: "high",
    description: "Exposure to corruption and ethical dilemmas",
    commonIn: ["Revenue", "Police", "Customs", "Income Tax"]
  }
};

export { governmentJobs, challengeTags };