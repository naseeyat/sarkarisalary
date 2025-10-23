# 📈 Time-Series Salary Architecture Design

## 🎯 **Requirements**
- Historical salary data (2010-2024)
- Future predictions (2025-2035)
- Year selector component
- Pay commission impact visualization
- Inflation-adjusted comparisons

## 📊 **Data Structure Design**

### **Historical Salary Data Model**
```javascript
{
  "ias": {
    "position": "District Collector",
    "salaryHistory": {
      "2010": {
        "basic": 37400,
        "grade": 8700,
        "total": 65000,
        "payCommission": "6th",
        "inflationRate": 6.2,
        "realValue2024": 120000 // inflation-adjusted
      },
      "2016": {
        "basic": 56100,
        "grade": 8700, 
        "total": 95000,
        "payCommission": "7th",
        "inflationRate": 4.5,
        "realValue2024": 125000
      },
      "2024": {
        "basic": 78800,
        "grade": 8700,
        "total": 145000,
        "payCommission": "7th-revised",
        "inflationRate": 5.1,
        "realValue2024": 145000
      }
    },
    "predictions": {
      "2025": {
        "basic": 83000,
        "total": 152000,
        "confidence": 95,
        "basis": "inflation-adjustment"
      },
      "2026": {
        "basic": 87000,
        "total": 160000,
        "confidence": 90,
        "basis": "inflation + increment"
      },
      "2030": {
        "basic": 120000,
        "total": 225000,
        "confidence": 70,
        "basis": "8th-pay-commission-estimate"
      }
    }
  }
}
```

### **Pay Commission Timeline**
```javascript
{
  "payCommissions": {
    "6th": {
      "period": "2006-2015",
      "avgIncrease": "20-30%",
      "effectiveDate": "2006-01-01"
    },
    "7th": {
      "period": "2016-2025",
      "avgIncrease": "23.55%",
      "effectiveDate": "2016-01-01"
    },
    "8th": {
      "period": "2026-2035",
      "avgIncrease": "25-30% (estimated)",
      "effectiveDate": "2026-01-01",
      "status": "predicted"
    }
  }
}
```

## 🎛️ **Year Selector Component Design**

### **Interactive Timeline Slider**
```html
<div class="salary-timeline">
  <!-- Year Selector -->
  <div class="year-selector">
    <input type="range" 
           id="yearSlider" 
           min="2010" 
           max="2035" 
           value="2024"
           class="timeline-slider">
    <div class="year-labels">
      <span class="year-mark historical" data-year="2010">2010</span>
      <span class="year-mark historical" data-year="2016">2016</span>
      <span class="year-mark current" data-year="2024">2024</span>
      <span class="year-mark predicted" data-year="2026">2026</span>
      <span class="year-mark predicted" data-year="2030">2030</span>
    </div>
  </div>

  <!-- Current Selection Display -->
  <div class="selected-year">
    <div class="year-info">
      <h3 id="selectedYear">2024</h3>
      <span id="yearType" class="year-type current">Current</span>
    </div>
    <div class="salary-display">
      <div class="salary-amount">₹<span id="salaryAmount">1,45,000</span></div>
      <div class="salary-context">
        <span id="payCommission">7th Pay Commission</span>
        <span id="realValue">Real Value: ₹1,45,000</span>
      </div>
    </div>
  </div>
</div>
```

### **CSS for Timeline**
```css
.salary-timeline {
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 32px;
  margin: 32px 0;
}

.timeline-slider {
  width: 100%;
  height: 8px;
  background: linear-gradient(
    to right,
    #10b981 0% 56%,     /* Historical (2010-2024) */
    #3b82f6 56% 100%    /* Predicted (2024-2035) */
  );
  border-radius: 4px;
  outline: none;
  margin: 20px 0;
}

.year-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.year-mark {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
}

.year-mark.historical {
  background: #10b981;
  color: white;
}

.year-mark.current {
  background: #f59e0b;
  color: white;
}

.year-mark.predicted {
  background: #3b82f6;
  color: white;
}

.selected-year {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 24px;
  align-items: center;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f3f4f6;
}
```

## 📈 **Prediction Algorithm**

### **Basic Prediction Logic**
```javascript
class SalaryPredictor {
  constructor(historicalData) {
    this.data = historicalData;
    this.inflationRate = 5.5; // Average inflation
    this.incrementRate = 3.0; // Annual increment
  }

  predictSalary(position, year) {
    const latest = this.getLatestData(position);
    const yearsAhead = year - 2024;
    
    if (yearsAhead <= 0) {
      return this.getHistoricalData(position, year);
    }

    // Base prediction with inflation
    let predicted = latest.basic * Math.pow(1.055, yearsAhead);
    
    // Pay Commission adjustments
    if (year >= 2026) {
      predicted *= 1.25; // 8th Pay Commission boost
    }
    
    // Calculate total with allowances
    const total = predicted + (predicted * 0.84); // 84% of basic as allowances
    
    return {
      basic: Math.round(predicted),
      total: Math.round(total),
      confidence: this.calculateConfidence(yearsAhead),
      factors: this.getPredictionFactors(year)
    };
  }

  calculateConfidence(yearsAhead) {
    if (yearsAhead <= 2) return 95;
    if (yearsAhead <= 5) return 85;
    if (yearsAhead <= 10) return 70;
    return 50;
  }

  getPredictionFactors(year) {
    const factors = ['inflation-adjustment', 'annual-increment'];
    
    if (year >= 2026) {
      factors.push('8th-pay-commission');
    }
    
    return factors;
  }
}
```

## 🎨 **Visualization Components**

### **Salary Growth Chart**
```javascript
// Chart.js configuration for salary timeline
const salaryChartConfig = {
  type: 'line',
  data: {
    labels: ['2010', '2012', '2014', '2016', '2018', '2020', '2022', '2024', '2026', '2028', '2030'],
    datasets: [{
      label: 'Historical',
      data: [65000, 70000, 75000, 95000, 105000, 115000, 130000, 145000, null, null, null],
      borderColor: '#10b981',
      backgroundColor: '#10b981',
      borderWidth: 3
    }, {
      label: 'Predicted',
      data: [null, null, null, null, null, null, null, 145000, 160000, 185000, 225000],
      borderColor: '#3b82f6',
      backgroundColor: '#3b82f6',
      borderDash: [5, 5],
      borderWidth: 3
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'IAS Salary Progression Over Time'
      },
      annotation: {
        annotations: {
          payCommission7: {
            type: 'line',
            xMin: '2016',
            xMax: '2016',
            borderColor: '#f59e0b',
            borderWidth: 2,
            label: {
              content: '7th Pay Commission',
              enabled: true
            }
          }
        }
      }
    }
  }
};
```

## 💰 **Real Value Calculator**
```javascript
class RealValueCalculator {
  constructor() {
    this.baseYear = 2024;
    this.inflationRates = {
      2010: 11.7, 2011: 8.9, 2012: 9.5, 2013: 10.1,
      2014: 6.0, 2015: 4.9, 2016: 4.5, 2017: 3.6,
      2018: 3.4, 2019: 4.8, 2020: 6.2, 2021: 5.1,
      2022: 6.7, 2023: 5.7, 2024: 5.1
    };
  }

  adjustToRealValue(amount, fromYear, toYear = 2024) {
    let realValue = amount;
    
    if (fromYear < toYear) {
      // Adjust historical value to current purchasing power
      for (let year = fromYear + 1; year <= toYear; year++) {
        const inflation = this.inflationRates[year] || 5.5;
        realValue *= (1 + inflation/100);
      }
    } else if (fromYear > toYear) {
      // Adjust future value to current purchasing power
      for (let year = toYear + 1; year <= fromYear; year++) {
        const inflation = 5.5; // Assumed future inflation
        realValue /= (1 + inflation/100);
      }
    }
    
    return Math.round(realValue);
  }

  getPurchasingPowerComparison(salary2010, salary2024) {
    const adjusted2010 = this.adjustToRealValue(salary2010, 2010, 2024);
    return {
      nominal2010: salary2010,
      adjusted2010: adjusted2010,
      current2024: salary2024,
      realGrowth: ((salary2024 - adjusted2010) / adjusted2010 * 100).toFixed(1)
    };
  }
}
```

## 🎯 **Implementation Plan**

### **Phase 1: Data Collection (Week 1)**
- Collect historical salary data from 2010-2024
- Research pay commission impacts
- Create JSON structure for time-series data

### **Phase 2: Year Selector (Week 2)**
- Build interactive timeline component
- Add smooth transitions between years
- Implement real-time salary updates

### **Phase 3: Predictions (Week 3)**
- Implement basic prediction algorithm
- Add confidence intervals
- Create visual indicators for prediction reliability

### **Phase 4: Visualizations (Week 4)**
- Add salary growth charts
- Implement real value comparisons
- Create pay commission impact highlights

## 📱 **Mobile Considerations**
- Touch-friendly year selector
- Vertical timeline for small screens
- Simplified chart views
- Quick year jump buttons (2010, 2016, 2024, 2030)

---

**Key Features**:
✅ Historical data from 2010
✅ Future predictions till 2035
✅ Interactive year selector
✅ Real purchasing power calculations
✅ Pay commission impact visualization
✅ Confidence indicators for predictions