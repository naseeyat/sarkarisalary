// Complete Government Jobs Vacancy Database (2019-2024)
const vacancyDatabase = {
  // UPSC Jobs - Yearly Data
  "upsc": {
    "ias": {
      name: "Indian Administrative Service",
      totalCadreStrength: 4926,
      yearlyData: {
        2024: { vacancies: 180, filled: 175, pending: 5, applications: 180000 },
        2023: { vacancies: 172, filled: 170, pending: 2, applications: 165000 },
        2022: { vacancies: 157, filled: 155, pending: 2, applications: 175000 },
        2021: { vacancies: 123, filled: 120, pending: 3, applications: 145000 },
        2020: { vacancies: 180, filled: 175, pending: 5, applications: 160000 },
        2019: { vacancies: 196, filled: 190, pending: 6, applications: 158000 }
      },
      stateWise: {
        "uttar-pradesh": { cadreStrength: 310, currentVacancy: 45 },
        "madhya-pradesh": { cadreStrength: 247, currentVacancy: 38 },
        "bihar": { cadreStrength: 244, currentVacancy: 42 },
        "rajasthan": { cadreStrength: 222, currentVacancy: 35 },
        "west-bengal": { cadreStrength: 235, currentVacancy: 28 },
        "maharashtra": { cadreStrength: 258, currentVacancy: 22 },
        "tamil-nadu": { cadreStrength: 203, currentVacancy: 25 },
        "karnataka": { cadreStrength: 177, currentVacancy: 20 },
        "gujarat": { cadreStrength: 158, currentVacancy: 18 },
        "assam-meghalaya": { cadreStrength: 126, currentVacancy: 15 }
      }
    },
    "ips": {
      name: "Indian Police Service",
      totalCadreStrength: 4608,
      yearlyData: {
        2024: { vacancies: 150, filled: 148, pending: 2, applications: 160000 },
        2023: { vacancies: 147, filled: 145, pending: 2, applications: 155000 },
        2022: { vacancies: 132, filled: 130, pending: 2, applications: 165000 },
        2021: { vacancies: 125, filled: 122, pending: 3, applications: 140000 },
        2020: { vacancies: 150, filled: 145, pending: 5, applications: 148000 },
        2019: { vacancies: 165, filled: 160, pending: 5, applications: 152000 }
      },
      stateWise: {
        "uttar-pradesh": { cadreStrength: 288, currentVacancy: 42 },
        "madhya-pradesh": { cadreStrength: 230, currentVacancy: 35 },
        "bihar": { cadreStrength: 227, currentVacancy: 38 },
        "rajasthan": { cadreStrength: 207, currentVacancy: 32 },
        "maharashtra": { cadreStrength: 240, currentVacancy: 25 },
        "west-bengal": { cadreStrength: 218, currentVacancy: 28 },
        "tamil-nadu": { cadreStrength: 189, currentVacancy: 22 },
        "karnataka": { cadreStrength: 165, currentVacancy: 18 },
        "gujarat": { cadreStrength: 147, currentVacancy: 15 },
        "assam-meghalaya": { cadreStrength: 117, currentVacancy: 12 }
      }
    },
    "ifs": {
      name: "Indian Foreign Service",
      totalCadreStrength: 900,
      yearlyData: {
        2024: { vacancies: 25, filled: 24, pending: 1, applications: 45000 },
        2023: { vacancies: 23, filled: 22, pending: 1, applications: 42000 },
        2022: { vacancies: 20, filled: 19, pending: 1, applications: 48000 },
        2021: { vacancies: 18, filled: 17, pending: 1, applications: 38000 },
        2020: { vacancies: 25, filled: 24, pending: 1, applications: 40000 },
        2019: { vacancies: 30, filled: 28, pending: 2, applications: 39000 }
      }
    },
    "irs": {
      name: "Indian Revenue Service", 
      totalCadreStrength: 5500,
      yearlyData: {
        2024: { vacancies: 385, filled: 380, pending: 5, applications: 220000 },
        2023: { vacancies: 342, filled: 340, pending: 2, applications: 205000 },
        2022: { vacancies: 323, filled: 320, pending: 3, applications: 235000 },
        2021: { vacancies: 312, filled: 308, pending: 4, applications: 195000 },
        2020: { vacancies: 300, filled: 295, pending: 5, applications: 185000 },
        2019: { vacancies: 394, filled: 388, pending: 6, applications: 192000 }
      }
    }
  },

  // SSC Jobs - Massive Scale
  "ssc": {
    "cgl": {
      name: "SSC Combined Graduate Level",
      yearlyData: {
        2024: { vacancies: 17323, filled: 16800, pending: 523, applications: 2800000 },
        2023: { vacancies: 14925, filled: 14200, pending: 725, applications: 2650000 },
        2022: { vacancies: 11271, filled: 10800, pending: 471, applications: 3200000 },
        2021: { vacancies: 8500, filled: 8200, pending: 300, applications: 2100000 },
        2020: { vacancies: 7035, filled: 6800, pending: 235, applications: 1950000 },
        2019: { vacancies: 8121, filled: 7900, pending: 221, applications: 2080000 }
      },
      postWise: {
        "assistant-audit-officer": { level: 8, vacancies2024: 1218, salary: "₹47,600-₹1,51,100" },
        "assistant-accounts-officer": { level: 8, vacancies2024: 1055, salary: "₹47,600-₹1,51,100" },
        "inspector-cbe": { level: 7, vacancies2024: 3259, salary: "₹44,900-₹1,42,400" },
        "inspector-examiner": { level: 7, vacancies2024: 1186, salary: "₹44,900-₹1,42,400" },
        "assistant-enforcement-officer": { level: 7, vacancies2024: 1512, salary: "₹44,900-₹1,42,400" },
        "sub-inspector": { level: 6, vacancies2024: 2980, salary: "₹35,400-₹1,12,400" },
        "assistant-section-officer": { level: 6, vacancies2024: 4587, salary: "₹35,400-₹1,12,400" },
        "statistical-investigator": { level: 6, vacancies2024: 1526, salary: "₹35,400-₹1,12,400" }
      }
    },
    "chsl": {
      name: "SSC Combined Higher Secondary Level",
      yearlyData: {
        2024: { vacancies: 4500, filled: 4200, pending: 300, applications: 1200000 },
        2023: { vacancies: 4207, filled: 4000, pending: 207, applications: 1150000 },
        2022: { vacancies: 4500, filled: 4300, pending: 200, applications: 1350000 },
        2021: { vacancies: 4000, filled: 3800, pending: 200, applications: 980000 },
        2020: { vacancies: 4893, filled: 4700, pending: 193, applications: 1050000 },
        2019: { vacancies: 3259, filled: 3100, pending: 159, applications: 875000 }
      },
      postWise: {
        "lower-division-clerk": { level: 2, vacancies2024: 2000, salary: "₹19,900-₹63,200" },
        "postal-assistant": { level: 4, vacancies2024: 1200, salary: "₹25,500-₹81,100" },
        "sorting-assistant": { level: 4, vacancies2024: 800, salary: "₹25,500-₹81,100" },
        "data-entry-operator": { level: 4, vacancies2024: 500, salary: "₹25,500-₹81,100" }
      }
    },
    "mts": {
      name: "SSC Multi Tasking Staff",
      yearlyData: {
        2024: { vacancies: 8500, filled: 8200, pending: 300, applications: 950000 },
        2023: { vacancies: 7502, filled: 7300, pending: 202, applications: 890000 },
        2022: { vacancies: 8000, filled: 7800, pending: 200, applications: 1100000 },
        2021: { vacancies: 5500, filled: 5300, pending: 200, applications: 650000 },
        2020: { vacancies: 9500, filled: 9200, pending: 300, applications: 785000 },
        2019: { vacancies: 10000, filled: 9700, pending: 300, applications: 820000 }
      }
    }
  },

  // Banking Sector - Huge Recruitment
  "banking": {
    "sbi": {
      name: "State Bank of India",
      yearlyData: {
        2024: { 
          po: { vacancies: 2000, applications: 800000 },
          clerk: { vacancies: 8500, applications: 1500000 },
          so: { vacancies: 600, applications: 450000 }
        },
        2023: {
          po: { vacancies: 1673, applications: 750000 },
          clerk: { vacancies: 5237, applications: 1200000 },
          so: { vacancies: 545, applications: 380000 }
        },
        2022: {
          po: { vacancies: 2056, applications: 820000 },
          clerk: { vacancies: 5455, applications: 1350000 },
          so: { vacancies: 698, applications: 420000 }
        }
      }
    },
    "ibps": {
      name: "IBPS Banking",
      yearlyData: {
        2024: {
          po: { vacancies: 4135, applications: 1200000 },
          clerk: { vacancies: 11560, applications: 2500000 },
          so: { vacancies: 896, applications: 650000 },
          rrb: { 
            officer: { vacancies: 9500, applications: 850000 },
            clerk: { vacancies: 15000, applications: 1800000 }
          }
        },
        2023: {
          po: { vacancies: 4100, applications: 1150000 },
          clerk: { vacancies: 11000, applications: 2300000 },
          so: { vacancies: 850, applications: 600000 }
        }
      }
    }
  },

  // Railway Jobs - Massive Employer
  "railway": {
    "rrb_ntpc": {
      name: "RRB Non-Technical Popular Categories",
      yearlyData: {
        2024: { vacancies: 35208, filled: 32000, pending: 3208, applications: 3500000 },
        2023: { vacancies: 35000, filled: 33500, pending: 1500, applications: 3200000 },
        2022: { vacancies: 35277, filled: 34000, pending: 1277, applications: 3800000 },
        2021: { vacancies: 35208, filled: 32000, pending: 3208, applications: 1250000 },
        2020: { vacancies: 35208, filled: 30000, pending: 5208, applications: 1150000 }
      },
      zoneWise: {
        "northern": { vacancies2024: 4200, headquarters: "New Delhi" },
        "western": { vacancies2024: 3800, headquarters: "Mumbai" },
        "eastern": { vacancies2024: 3500, headquarters: "Kolkata" },
        "southern": { vacancies2024: 4100, headquarters: "Chennai" },
        "central": { vacancies2024: 3200, headquarters: "Mumbai" },
        "south-eastern": { vacancies2024: 2800, headquarters: "Kolkata" },
        "south-central": { vacancies2024: 3400, headquarters: "Secunderabad" },
        "east-central": { vacancies2024: 2900, headquarters: "Hajipur" },
        "west-central": { vacancies2024: 2600, headquarters: "Jabalpur" },
        "north-central": { vacancies2024: 2400, headquarters: "Prayagraj" },
        "northeast-frontier": { vacancies2024: 1800, headquarters: "Guwahati" },
        "east-coast": { vacancies2024: 2200, headquarters: "Bhubaneswar" },
        "south-west": { vacancies2024: 1900, headquarters: "Hubli" },
        "north-western": { vacancies2024: 1700, headquarters: "Jaipur" },
        "south-east-central": { vacancies2024: 1600, headquarters: "Bilaspur" },
        "north-central": { vacancies2024: 1400, headquarters: "Prayagraj" }
      }
    },
    "rrb_group_d": {
      name: "RRB Group D",
      yearlyData: {
        2024: { vacancies: 103769, filled: 95000, pending: 8769, applications: 4500000 },
        2023: { vacancies: 35000, filled: 33000, pending: 2000, applications: 2800000 },
        2022: { vacancies: 103769, filled: 85000, pending: 18769, applications: 1900000 },
        2021: { vacancies: 103769, filled: 70000, pending: 33769, applications: 1050000 }
      }
    },
    "rrb_je": {
      name: "RRB Junior Engineer",
      yearlyData: {
        2024: { vacancies: 13000, filled: 12500, pending: 500, applications: 850000 },
        2023: { vacancies: 14000, filled: 13200, pending: 800, applications: 780000 },
        2022: { vacancies: 14033, filled: 13500, pending: 533, applications: 920000 }
      }
    }
  },

  // Teaching Jobs - Education Sector
  "teaching": {
    "kvs": {
      name: "Kendriya Vidyalaya Sangathan",
      yearlyData: {
        2024: {
          pgt: { vacancies: 7598, applications: 450000 },
          tgt: { vacancies: 13404, applications: 680000 },
          prt: { vacancies: 4994, applications: 320000 }
        },
        2023: {
          pgt: { vacancies: 6000, applications: 380000 },
          tgt: { vacancies: 11000, applications: 580000 },
          prt: { vacancies: 4000, applications: 280000 }
        }
      }
    },
    "dsssb": {
      name: "Delhi Subordinate Services Selection Board",
      yearlyData: {
        2024: {
          pgt: { vacancies: 3552, applications: 285000 },
          tgt: { vacancies: 7236, applications: 425000 },
          prt: { vacancies: 8300, applications: 380000 }
        }
      }
    },
    "net_jrf": {
      name: "UGC NET JRF",
      yearlyData: {
        2024: { qualified: 45000, jrf: 8000, applications: 1200000 },
        2023: { qualified: 42000, jrf: 7500, applications: 1100000 },
        2022: { qualified: 40000, jrf: 7200, applications: 1350000 }
      }
    }
  },

  // Defense Services
  "defense": {
    "nda": {
      name: "National Defence Academy",
      yearlyData: {
        2024: { vacancies: 400, applications: 650000 },
        2023: { vacancies: 370, applications: 580000 },
        2022: { vacancies: 400, applications: 620000 }
      }
    },
    "cds": {
      name: "Combined Defence Services",
      yearlyData: {
        2024: { vacancies: 341, applications: 480000 },
        2023: { vacancies: 339, applications: 420000 },
        2022: { vacancies: 344, applications: 450000 }
      }
    }
  },

  // PSU Jobs
  "psu": {
    "coal_india": {
      name: "Coal India Limited",
      yearlyData: {
        2024: { vacancies: 8000, applications: 850000 },
        2023: { vacancies: 6500, applications: 720000 },
        2022: { vacancies: 7500, applications: 800000 }
      }
    },
    "ongc": {
      name: "Oil and Natural Gas Corporation",
      yearlyData: {
        2024: { vacancies: 3500, applications: 650000 },
        2023: { vacancies: 3200, applications: 580000 },
        2022: { vacancies: 2800, applications: 620000 }
      }
    }
  },

  // State Government - Sample States
  "state_govt": {
    "up_govt": {
      name: "Uttar Pradesh Government",
      yearlyData: {
        2024: {
          pcs: { vacancies: 500, applications: 280000 },
          police: { vacancies: 25000, applications: 1200000 },
          teacher: { vacancies: 68500, applications: 2800000 },
          clerk: { vacancies: 15000, applications: 950000 }
        }
      }
    },
    "bihar_govt": {
      name: "Bihar Government", 
      yearlyData: {
        2024: {
          bpsc: { vacancies: 865, applications: 485000 },
          police: { vacancies: 21000, applications: 950000 },
          teacher: { vacancies: 94000, applications: 2200000 }
        }
      }
    }
  }
};

// Trends and Analytics
const vacancyTrends = {
  overall: {
    2024: { totalVacancies: 450000, totalApplications: 45000000 },
    2023: { totalVacancies: 380000, totalApplications: 38000000 },
    2022: { totalVacancies: 420000, totalApplications: 42000000 },
    2021: { totalVacancies: 320000, totalApplications: 28000000 },
    2020: { totalVacancies: 280000, totalApplications: 25000000 },
    2019: { totalVacancies: 360000, totalApplications: 32000000 }
  },
  sectorWise: {
    2024: {
      central: 45000,
      railway: 52000,
      banking: 35000,
      ssc: 30000,
      teaching: 85000,
      state: 150000,
      psu: 25000,
      defense: 8000
    }
  },
  competitionLevel: {
    highest: ["IFS", "IAS", "IPS"], // 0.05% - 0.1%
    high: ["Banking PO", "SSC CGL", "UPSC Other"], // 1% - 3%
    medium: ["Railway NTPC", "SSC CHSL", "Banking Clerk"], // 3% - 5%
    moderate: ["Teaching Jobs", "State PCS", "PSU"], // 5% - 15%
    accessible: ["Group D", "MTS", "State Police"] // 15%+
  }
};

export { vacancyDatabase, vacancyTrends };