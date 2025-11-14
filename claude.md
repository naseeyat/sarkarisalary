# CLAUDE CODE - JOB PORTAL PROCESS

## 📋 OVERVIEW
This document describes the complete process for adding government job notifications to sarkarisalary.today using Claude Code.

---

## 🎯 CORE PRINCIPLES

### 0. DATA VERIFICATION (CRITICAL!)
**⚠️ ALWAYS VERIFY DATA FROM OFFICIAL PDF**

**Vacancy Counts:**
- NEVER estimate or guess vacancy numbers
- ALWAYS read the complete official notification PDF
- COUNT all posts carefully from vacancy tables
- Double-check totals before adding to jobs.json
- When in doubt, re-read the PDF section with vacancy breakdown

**Links & URLs:**
- VERIFY all links work before adding to job pages
- Check official website URLs from notification PDF
- Test apply links, notification PDF links
- NEVER use placeholder or dummy links
- Important links should appear EARLY on page (after Quick Info, before detailed content)

### 1. Single Source of Truth
**`prod/data/jobs.json`** - All pages auto-generate from this file.

### 2. 100% Dynamic Pages - ZERO HARDCODED DATA
**CRITICAL RULE:** Every page MUST fetch data from JSON dynamically using JavaScript.

✅ **CORRECT:**
```javascript
fetch('data/jobs.json')
    .then(response => response.json())
    .then(data => {
        // Generate HTML dynamically
        data.jobs.forEach(job => {
            // Create cards/content
        });
    });
```

❌ **WRONG:**
```html
<!-- Hardcoded data - NEVER DO THIS -->
<div class="job-card">
    <h3>Bank Job - 2700 Posts</h3>
</div>
```

**Why?**
- Update jobs.json once → ALL pages update automatically
- No need to manually update multiple pages
- Consistent data across entire site
- Easy to maintain and scale

**Pages that MUST be dynamic:**
- ✅ States page (states.html) - Auto-generates state cards
- ✅ Category pages (banking-jobs.html, etc.) - Auto-filter from jobs.json
- ✅ Individual state pages (uttar-pradesh.html, etc.) - Auto-filter
- ✅ Archive page (archive.html) - Shows closed jobs only
- ✅ Exam calendar (exam-calendar.html) - Auto-generates from dates in jobs.json
- ✅ Index page (index.html) - Latest jobs section must be dynamic
- ✅ Results page (results.html) - From updates array in jobs.json

---

## 📁 FILE STRUCTURE

```
prod/
├── data/
│   └── jobs.json              # SINGLE SOURCE OF TRUTH
├── jobs/
│   ├── job-slug.html          # Individual job pages
│   └── job-slug-post-name.html # Multi-post jobs
├── salaries/
│   └── job-slug.html          # Salary detail pages
├── states/                     # AUTO-GENERATED PAGES
│   ├── delhi.html             # Shows all Delhi jobs
│   ├── uttar-pradesh.html     # Shows all UP jobs
│   └── all-india.html         # Shows all Pan India jobs
├── categories/                 # AUTO-GENERATED PAGES
│   ├── banking-jobs.html      # Shows all banking jobs
│   └── railway-jobs.html      # Shows all railway jobs
├── departments/                # AUTO-GENERATED PAGES (future)
│   ├── banking.html           # Department-wise grouping
│   └── railway.html
├── exam-calendar.html         # Date-wise timeline
├── index.html                 # Homepage
├── shared/
│   ├── header.html
│   ├── footer.html
│   ├── global.js
│   ├── header-footer.css
│   └── brutalist-styles.css
└── scripts/
    ├── check-adsense.js       # AdSense verification tool
    └── add-adsense.js         # AdSense batch installer
```

**AUTO-UPDATE SYSTEM:**
- State pages automatically filter jobs by `states` field
- Category pages automatically filter jobs by `category` field
- All pages fetch from jobs.json using JavaScript
- No manual updates needed - add job to jobs.json and all pages update!

---

## 🔄 STANDARD WORKFLOW

### ⚠️ GOLDEN RULE: ALWAYS CREATE DYNAMIC PAGES
Before creating ANY page, remember:
1. Page HTML = Template structure ONLY
2. All data comes from jobs.json via JavaScript fetch()
3. NEVER hardcode job titles, counts, dates, or any data
4. Test that data updates when jobs.json changes

### STEP 1: Receive PDF
User provides PDF path: `/Users/nmshv/Downloads/notification.pdf`

### STEP 2: Read & Extract
```
- Read entire PDF (all pages)
- Extract key data:
  * Organization name
  * Post titles (ALL if multiple)
  * Total posts
  * Qualification
  * Age limit
  * Salary/Stipend
  * Application dates
  * Last date
  * States covered
  * Unique features
  * Application fee
  * Selection process
```

### STEP 3: Add to jobs.json

#### For SINGLE POST jobs:
```json
{
  "id": "bob-apprentice-2025",
  "slug": "bob-apprentice-2025",
  "title": "Bank of Baroda Apprentice Recruitment 2025",
  "shortTitle": "Bank of Baroda Apprentice 2025",
  "department": "banking",
  "departmentName": "Bank of Baroda",
  "category": "banking-jobs",
  "states": ["all-india"],
  "posts": 2700,
  "organization": "Bank of Baroda",
  "qualification": "Graduation in any discipline",
  "minAge": 20,
  "maxAge": 28,
  "salary": {
    "stipend": "₹15,000/month",
    "duration": "12 months",
    "totalPackage": "₹1,80,000 for training period",
    "inHand": "₹15,000",
    "note": "No job guarantee after training completion"
  },
  "applicationFee": {
    "general": "₹800 + GST",
    "sc": "NIL",
    "st": "NIL"
  },
  "notificationDate": "2025-11-11",
  "applicationStart": "2025-11-11",
  "lastDate": "2025-12-01",
  "status": "active",
  "featured": true,
  "isNew": true,
  "applyLink": "https://www.bankofbaroda.in/apprentice",
  "notificationPdf": "/notifications/BoB-Apprentice-Notification-2025.pdf",
  "daysRemaining": 17,
  "addedOn": "2024-11-14",
  "pageUrl": "/jobs/bob-apprentice-2025.html",
  "isRecurring": true,
  "recurringCycle": "annual",
  "examCycleId": "bob-apprentice",
  "estimatedAspirants": 800000,
  "priorityScore": 0,
  "uniqueFeatures": [
    "NO job guarantee after training completion",
    "Remote proctored exam from home",
    "Local language test required"
  ],
  "updates": []
}
```

#### For MULTIPLE POST jobs (like NHB):
```json
{
  "id": "nhb-officer-2025",
  "slug": "nhb-officer-2025",
  "title": "National Housing Bank Officer Recruitment 2025",
  "shortTitle": "NHB Officer 2025",
  "department": "banking",
  "departmentName": "National Housing Bank",
  "category": "banking-jobs",
  "states": ["delhi"],
  "posts": 10,
  "organization": "National Housing Bank, New Delhi",
  "multiPost": true,
  "postBreakdown": [
    {
      "postName": "Deputy General Manager - Credit Monitoring",
      "postSlug": "dgm-credit-monitoring",
      "posts": 1,
      "scale": "Scale VI",
      "salary": {
        "basic": "₹1,40,500 - ₹1,56,500",
        "grade": "TEG Scale-VI"
      },
      "qualification": "CA/MBA/PGDM",
      "experience": "15 years (10 in housing finance)",
      "minAge": 40,
      "maxAge": 55,
      "category": "UR",
      "pageUrl": "/jobs/nhb-officer-2025-dgm-credit-monitoring.html"
    },
    {
      "postName": "Assistant Manager - Audit",
      "postSlug": "assistant-manager-audit",
      "posts": 2,
      "scale": "Scale I",
      "salary": {
        "basic": "₹48,480 - ₹85,920",
        "grade": "JMG Scale-I"
      },
      "qualification": "Chartered Accountant",
      "experience": "1 year in audit",
      "minAge": 21,
      "maxAge": 30,
      "category": "EWS",
      "pageUrl": "/jobs/nhb-officer-2025-assistant-manager-audit.html"
    }
  ],
  "qualification": "CA/MBA/PGDM/Graduate (varies by post)",
  "minAge": 21,
  "maxAge": 62,
  "salary": {
    "range": "₹48,480 - ₹1,56,500 per month",
    "note": "Varies by post and scale"
  },
  "applicationFee": {
    "general": "₹850 + GST",
    "sc": "₹175",
    "st": "₹175",
    "pwbd": "₹175"
  },
  "notificationDate": "2025-11-07",
  "applicationStart": "2025-11-07",
  "lastDate": "2025-11-28",
  "status": "active",
  "featured": true,
  "isNew": true,
  "applyLink": "https://www.nhb.org.in",
  "notificationPdf": "/notifications/NHB-Officer-2025.pdf",
  "daysRemaining": 14,
  "addedOn": "2024-11-14",
  "pageUrl": "/jobs/nhb-officer-2025.html",
  "isRecurring": true,
  "recurringCycle": "annual",
  "examCycleId": "nhb-officer",
  "uniqueFeatures": [
    "Multiple posts at different levels",
    "Regular and contractual positions",
    "High salary packages"
  ],
  "updates": []
}
```

### STEP 4: Create Job Pages

#### A. SINGLE POST PAGE
File: `prod/jobs/bob-apprentice-2025.html`

**Content Order (CRITICAL):**
1. Alert Banner (sticky top)
2. Job Title + Meta Tags
3. **SALARY SECTION** (prominent yellow box)
4. Quick Info Grid (8 boxes)
5. Apply Button (prominent)
6. **Important Dates Table**
7. **Eligibility Criteria**
8. **Selection Process**
9. **How to Apply**
10. Unique Features (highlight box)
11. State-wise Vacancy (if applicable - COLLAPSIBLE)
12. FAQs
13. Important Links
14. Apply Button (again)

#### B. MULTI-POST MASTER PAGE
File: `prod/jobs/nhb-officer-2025.html`

**Content:**
1. Alert Banner
2. Job Title + Total Posts
3. Quick Navigation Menu (jump to each post)
4. Common Information:
   - Organization
   - Application dates
   - Application fee
   - Common eligibility
5. **POST BREAKDOWN** (expandable sections):
   ```html
   <div class="post-section">
     <h3 onclick="togglePost('dgm')">
       DGM - Credit Monitoring (1 Post) ▼
     </h3>
     <div id="dgm" class="post-details">
       - Salary
       - Qualification
       - Experience
       - Age
       - Link to detailed page
     </div>
   </div>
   ```
6. Common How to Apply
7. Apply Button

#### C. INDIVIDUAL POST PAGE (for multi-post jobs)
File: `prod/jobs/nhb-officer-2025-dgm-credit-monitoring.html`

**Same structure as single post**, but:
- Breadcrumb: Home → NHB Officer 2025 → DGM Credit Monitoring
- Link back to master page
- Post-specific details only

### STEP 5: Create Salary Pages
File: `prod/salaries/bob-apprentice-2025.html`

**Content:**
1. Breadcrumb
2. Salary breakdown
3. Month-wise calculation
4. What's included/not included
5. Comparison with other banks
6. Key points
7. FAQs

### STEP 6: Update Exam Calendar
File: `prod/exam-calendar.html`

Add events in **CHRONOLOGICAL ORDER (latest first)**:
```html
<!-- December 1, 2025 - Last Date -->
<div class="date-group">
  <div class="date-header">
    <div class="date-dot upcoming"></div>
    <div class="date-label">01 DEC 2025</div>
    <div class="date-day">• Monday</div>
  </div>
  <div class="events-list">
    <div class="event-card" data-type="last-date">
      <div class="event-info">
        <div class="event-type">🔴 LAST DATE</div>
        <div class="event-title">
          <a href="jobs/bob-apprentice-2025.html">Bank of Baroda Apprentice 2025</a>
        </div>
        <div class="event-meta">Applications Close • 2700 Posts</div>
      </div>
      <div class="event-badge last-date">LAST DATE</div>
    </div>
  </div>
</div>
```

Update stats at top:
- Active Jobs
- Events This Month
- Closing Soon
- Results Today

### STEP 7: Update Index Page
File: `prod/index.html`

Add to "Latest Jobs" section in **priority order**:
- Priority = (Posts × 0.3) + (Aspirants × 0.5) + (Salary × 0.2)

---

## 🔄 HANDLING UPDATES

### When Admit Card / Result / Answer Key releases:

#### Update jobs.json:
```json
{
  "id": "bob-apprentice-2025",
  "updates": [
    {
      "date": "2025-11-20",
      "type": "admit-card",
      "title": "Admit Card Released",
      "description": "Download admit card for online exam",
      "link": "https://bankofbaroda.in/admit-card",
      "important": true
    },
    {
      "date": "2025-12-15",
      "type": "exam-date",
      "title": "Exam Date Announced",
      "description": "Online exam on 15 January 2026"
    },
    {
      "date": "2026-01-20",
      "type": "answer-key",
      "title": "Answer Key Released",
      "link": "https://..."
    },
    {
      "date": "2026-02-01",
      "type": "result",
      "title": "Result Declared",
      "link": "https://..."
    }
  ]
}
```

#### Add to Exam Calendar:
```html
<div class="event-card" data-type="admit-card">
  <div class="event-info">
    <div class="event-type">🎫 ADMIT CARD</div>
    <div class="event-title">
      <a href="jobs/bob-apprentice-2025.html">BoB Apprentice 2025</a>
    </div>
    <div class="event-meta">Download Now</div>
  </div>
  <div class="event-badge admit-card">ADMIT CARD</div>
</div>
```

#### Update Job Page:
Add "Updates" section at top (after alert banner):
```html
<div class="updates-section">
  <h2>🔔 LATEST UPDATES</h2>
  <div class="update-card new">
    <div class="update-date">20 Nov 2025</div>
    <div class="update-title">Admit Card Released</div>
    <a href="..." class="update-link">DOWNLOAD →</a>
  </div>
</div>
```

---

## 📊 STATE NAME STANDARDIZATION

**Always use slugs in jobs.json:**
```json
"states": ["uttar-pradesh", "maharashtra", "all-india"]
```

**Mapping:**
```
uttar-pradesh → Uttar Pradesh
maharashtra → Maharashtra
all-india → All India
delhi → Delhi
```

Auto-capitalize for display, but store as slugs.

---

## ✅ CHECKLIST FOR EACH JOB

- [ ] Read PDF completely (all pages)
- [ ] Extract all data accurately
- [ ] Add to jobs.json with correct structure
- [ ] Create job page(s)
  - [ ] Single post page OR
  - [ ] Multi-post master + individual pages
- [ ] Create salary detail page
- [ ] Update exam calendar (all dates)
- [ ] Update index.html
- [ ] Update departments/states/categories counts
- [ ] Verify all links work
- [ ] Check mobile responsiveness
- [ ] Test filters on exam calendar

---

## 🎨 DESIGN STANDARDS

### Brutalist Style Rules:
- Monospace fonts only
- 3px solid borders (#333333)
- White background
- Black text (#333333)
- No gradients, no shadows
- Color system:
  - Red: #ff4444 (alerts, last dates)
  - Green: #00aa00 (new, opened)
  - Orange: #ff8800 (results, upcoming)
  - Yellow: #fffacd (highlights, salary boxes)
  - Blue: #0066cc (exams, links)
  - Purple: #9900cc (admit cards)

### Content Width:
- Max-width: 900px
- Centered with auto margins
- 20px padding on mobile

### Hover Effects:
```css
.card:hover {
    background: #333333;
    color: #ffffff;
    transform: translateX(5px);
    cursor: pointer;
}
```

---

## 🚨 COMMON MISTAKES TO AVOID

1. **Don't create state table before eligibility** - Bad UX
2. **Don't use capital letters in signature/declaration** - Invalid
3. **Don't duplicate state names** - Use standardized slugs
4. **Don't forget to update exam calendar** - Every date matters
5. **Don't skip salary page** - Main USP of site
6. **Don't create multiple job entries for updates** - Use updates array
7. **Don't forget daysRemaining calculation** - Auto-calculate from lastDate
8. **Don't use purple** - Brutalist style forbids it

---

## 📝 CONTENT PRIORITY ORDER

### Job Page:
1. Alert (sticky)
2. Title + Tags
3. **SALARY** (yellow box, prominent)
4. Quick Facts (8 boxes)
5. Apply Button
6. Dates
7. **Eligibility**
8. **Selection**
9. **How to Apply**
10. Unique Features
11. Detailed breakdown (tables)
12. FAQs
13. Links

### Multi-Post Jobs:
1. Alert
2. Title + Total Posts
3. Navigation Menu
4. Common Info
5. **Post Breakdown** (expandable)
6. Common How to Apply
7. Apply Button

---

## 🔧 TECHNICAL NOTES

### Auto-calculations:
```javascript
// Days remaining
const today = new Date();
const lastDate = new Date('2025-12-01');
const daysRemaining = Math.ceil((lastDate - today) / (1000*60*60*24));

// Priority score
const priorityScore = (posts * 0.3) + (aspirants * 0.5) + (salary * 0.2);
```

### State counts:
```javascript
// Auto-update from jobs array
data.states["uttar-pradesh"].totalJobs =
  data.jobs.filter(j => j.states.includes("uttar-pradesh")).length;
```

---

## 📞 SUPPORT

For any issues:
- Check this document first
- Verify jobs.json structure
- Test on mobile
- Check browser console for errors

---

**Last Updated:** 14 Nov 2024
**Version:** 1.0

---

## 🎯 CAREER TIMELINE FEATURE

### Overview
Detailed career progression pages showing complete journey from entry to retirement for each government job.

### Structure
```
prod/data/careers.json  ← Career progression data (permanent)
prod/career/           ← Career timeline pages
  ├── ias-officer.html
  ├── sbi-po.html
  └── kvs-teacher.html
```

### Implementation Approach
**Start Manual, Then Automate:**
1. Copy `archive/ias-timeline-v0-planetscale.html`
2. Adapt to 900px width (brutalist style)
3. Add header/footer integration
4. Create for top 5 jobs manually
5. Later: Build generation script from careers.json

### careers.json Structure
```json
{
  "careers": [
    {
      "id": "ias-officer",
      "slug": "ias-officer",
      "title": "IAS Officer Career Timeline",
      "category": "civil-services",
      "overview": {
        "entryAge": "21-32",
        "retirementAge": "60",
        "entrySalary": "₹56,100",
        "peakSalary": "₹2,50,000"
      },
      "stages": [
        {
          "number": 1,
          "designation": "Sub Divisional Magistrate",
          "years": "0-4 years",
          "salary": "₹56,100 - ₹1,77,500",
          "inHand": "₹75,000/month",
          "responsibilities": [...]
        }
      ]
    }
  ]
}
```

### Link from Job Pages
Add after Quick Info Grid, before Apply Button:
```html
<a href="/career/ias-officer.html" class="career-journey-btn">
    📊 VIEW COMPLETE CAREER JOURNEY & SALARY PROGRESSION →
</a>
```

### Data Collection Sources
- Official government websites
- Pay Commission reports
- RTI responses
- Verified forums & officer associations

### Priority Order
1. IAS Officer
2. SBI PO
3. IPS Officer
4. Railway Officer
5. KVS/NVS Teachers

---

## 📢 GOOGLE ADSENSE MANAGEMENT

### Philosophy: Manual Per-Page Integration

**Why NOT automatic injection?**
- ❌ Header component timing issues (fetch delays)
- ❌ DOM ready race conditions
- ❌ Unpredictable script loading order
- ❌ Hard to debug when it fails

**Why manual `<head>` tags?**
- ✅ Loads immediately with page HTML
- ✅ No fetch/timing dependencies
- ✅ Google recommends early `<head>` placement
- ✅ Better ad rendering performance
- ✅ Predictable, debuggable, reliable

### Required AdSense Script

Add to **every page's `<head>` section**:

```html
<head>
    <meta charset="UTF-8">
    <title>Page Title</title>

    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2954991378408470"
         crossorigin="anonymous"></script>

    <!-- Other meta tags, CSS, etc -->
</head>
```

### Verification Tools

**Check all pages:**
```bash
node scripts/check-adsense.js
```

**Output:**
- ✅ Total pages scanned
- ✅ Pages with AdSense
- ❌ Pages missing AdSense (detailed list)
- Exit code 1 if missing, 0 if all good

**Auto-fix missing pages:**
```bash
node scripts/add-adsense.js
```

**Then verify:**
```bash
node scripts/check-adsense.js
# Should show: ✅ SUCCESS! All HTML files have AdSense script.
```

### When to Run Checker

1. **After creating new HTML pages** - Always check
2. **Before deployment** - Part of CI/CD
3. **Weekly audit** - Catch any missed pages
4. **After bulk changes** - Verify nothing broke

### Excluded Files

Scripts automatically skip:
- `header.html` (component, not full page)
- `footer.html` (component, not full page)
- `test-*.html` (test files)
- `template.html` (boilerplate)
- `draft.html` (work in progress)

### Best Practices

1. **New page checklist:**
   - [ ] Create HTML file
   - [ ] Add AdSense to `<head>`
   - [ ] Run `node scripts/check-adsense.js`
   - [ ] Verify in browser console

2. **Component-based pages:**
   - Even if page uses header/footer components
   - Still add AdSense to main page's `<head>`
   - Components load AFTER page, too late for ads

3. **Never:**
   - ❌ Add AdSense via JavaScript injection
   - ❌ Load AdSense in footer
   - ❌ Use setTimeout/defer for AdSense
   - ❌ Skip verification after changes

---
