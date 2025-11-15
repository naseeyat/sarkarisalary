# COMPONENT SYSTEM DOCUMENTATION

**Last Updated:** 15 Nov 2024
**Version:** 1.0

---

## 📋 OVERVIEW

Component-based system for auto-generating job pages from `jobs.json` data.

**Key Benefits:**
- ✅ Update once in JSON → All pages update
- ✅ Auto-calculate days remaining, status, badges
- ✅ Consistent design across all job pages
- ✅ 75% less code duplication

---

## 🗂️ FILE STRUCTURE

```
prod/
├── data/
│   ├── jobs.json          # Single source of truth
│   └── careers.json       # Career timeline data (future)
├── jobs/
│   └── *.html             # Job pages using components
├── shared/
│   └── components.js      # Component library
└── test-components.html   # Component testing page
```

---

## 📦 AVAILABLE COMPONENTS

### Core Components:

#### 1. **renderJobAlert(job)**
Sticky top banner with auto-calculated status.

**Auto-Features:**
- Days remaining calculation
- Green (active) / Red (closed) color
- Auto-expire when lastDate passes

**Usage:**
```javascript
document.getElementById('job-alert').innerHTML = renderJobAlert(job);
```

**Output:**
```html
<div class="job-alert active">
    🟢 APPLICATIONS OPEN • 8477 POSTS • LAST DATE: 03 DEC 2025 • 18 DAYS REMAINING
</div>
```

---

#### 2. **renderJobHeader(job)**
Title + Breadcrumb + Auto-generated meta tags.

**Auto-Generated Tags:**
- 🟢 **NEW** - if added within 7 days
- **13000+ POSTS** - post count
- **ALL INDIA** / **5 STATES** - location
- **MULTIPLE POSTS** - if multiPost: true
- 🔴 **CLOSING SOON** - if ≤7 days remaining

**Usage:**
```javascript
html += renderJobHeader(job);
```

---

#### 3. **renderSalaryBox(job)**
Yellow highlighted salary section with link to detailed page.

**Fields Used:**
- `job.salary.range` OR `job.salary.stipend` OR `job.salary.basic`
- `job.salary.note` (optional)
- `job.slug` (for salary page link)

---

#### 4. **renderQuickInfo(job)**
8-item info grid (KVS-NVS style - single box with internal grid).

**Items:**
1. Total Posts
2. Organization
3. Qualification
4. Age Limit
5. Application Fee
6. Selection Process
7. Apply Mode
8. Job Location

---

#### 5. **renderDatesTable(job)**
Important dates table with highlighted last date.

**Dates Included:**
- Notification Date
- Application Start
- Last Date (highlighted red)
- Exam Date

**Auto-Formatting:** Uses `formatDate()` helper.

---

#### 6. **renderImportantLinks(job)**
Urban-style button grid (green Apply, black PDF, white secondary).

**Links:**
- 🚀 Apply Online (green, prominent)
- 📄 View Notification PDF (black)
- 🏢 Official Website (white, grid)
- 📚 Download Syllabus (white, grid)

**Conditional:** Only renders links that exist in job data.

---

#### 7. **renderPostBreakdown(job)** ⭐ NEW
Table showing teaching/non-teaching post details (for multi-post jobs).

**Requirement:** `job.postBreakdown` array

**Example:**
```json
"postBreakdown": [
    {
        "postName": "PGT Teacher",
        "posts": 4000,
        "type": "teaching",
        "salary": {"range": "₹47,000 - ₹1,50,000"}
    }
]
```

**Output:** Auto-separates into TEACHING POSTS and NON-TEACHING POSTS tables.

---

#### 8. **renderApplicationFee(job)**
Category-wise fee table.

**Fields:** `job.applicationFee.{general, sc, st, obc, etc.}`

---

#### 9. **renderUniqueFeatures(job)**
Blue highlighted box for special features.

**Condition:** Only renders if `job.uniqueFeatures` array exists.

---

#### 10. **renderImportantNotes(job)**
Orange highlighted box for warnings/notes.

**Condition:** Only renders if `job.importantNotes` array exists.

---

#### 11. **renderBenefits(job)** ⭐ NEW
Yellow box with "Why Apply" benefits list.

**Requirement:** `job.benefits` array

**Example:**
```json
"benefits": [
    "Central Government Job: Job security and work-life balance",
    "All India Posting: Transfer facility across India",
    "Career Growth: Regular promotions"
]
```

**Output:** Auto-splits on `:` to bold first part.

---

#### 12. **renderFinalApplyButton(job)**
Bottom CTA with days remaining.

**Auto-Calculation:** Shows "X days remaining" or "Applications Closed"

---

### Helper Functions:

```javascript
calculateDaysRemaining(lastDate)   // Returns days until deadline
isJobExpired(lastDate)              // Boolean check
isJobNew(addedOn)                   // Check if added in last 7 days
formatDate(dateStr)                 // DD MMM YYYY format
formatStateName(slug)               // "uttar-pradesh" → "Uttar Pradesh"
```

---

## 🎨 MASTER RENDER FUNCTION

```javascript
renderJobPage(job, options)
```

**Order (matches production):**
1. Job Header (breadcrumb + title + meta tags)
2. Salary Box (yellow)
3. Quick Info Grid (8 boxes)
4. Important Dates Table
5. Important Links
6. Post Breakdown (if multi-post)
7. Application Fee
8. Unique Features
9. Important Notes
10. Benefits
11. Final Apply Button

**Options (all default true):**
```javascript
{
    header: true,
    salary: true,
    quickInfo: true,
    dates: true,
    links: true,
    postBreakdown: true,
    fee: true,
    features: true,
    notes: true,
    benefits: true,
    finalButton: true
}
```

**Example:**
```javascript
// Render all sections
const html = renderJobPage(job);

// Render without benefits
const html = renderJobPage(job, {benefits: false});
```

---

## 📝 USAGE EXAMPLE

### Basic Job Page Template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Job Title</title>

    <script src="/shared/global.js"></script>
    <link rel="stylesheet" href="/shared/brutalist-styles.css">
    <link rel="stylesheet" href="/shared/header-footer.css">
</head>
<body>
    <!-- Header -->
    <div id="header"></div>

    <!-- Alert (sticky) -->
    <div id="job-alert"></div>

    <div class="container">
        <!-- Auto-generated components -->
        <div id="job-components"></div>

        <!-- Manual sections (job-specific) -->
        <div class="section">
            <h2>✅ ELIGIBILITY CRITERIA</h2>
            <!-- Manually write detailed criteria -->
        </div>

        <div class="section">
            <h2>📊 SELECTION PROCESS</h2>
            <!-- Manually write process details -->
        </div>

        <div class="section">
            <h2>📝 HOW TO APPLY</h2>
            <!-- Manually write application steps -->
        </div>
    </div>

    <!-- Footer -->
    <div id="footer"></div>

    <!-- Load header/footer -->
    <script>
        fetch('/shared/header.html').then(r => r.text())
            .then(html => document.getElementById('header').innerHTML = html);

        fetch('/shared/footer.html').then(r => r.text())
            .then(html => document.getElementById('footer').innerHTML = html);
    </script>

    <!-- Load components -->
    <script src="/shared/components.js"></script>

    <!-- Render job data -->
    <script>
        const JOB_SLUG = 'wbssc-slst-2025'; // Change per job

        fetch('/data/jobs.json')
            .then(r => r.json())
            .then(data => {
                const job = data.jobs.find(j => j.slug === JOB_SLUG);

                // Render alert
                document.getElementById('job-alert').innerHTML = renderJobAlert(job);

                // Render all components
                document.getElementById('job-components').innerHTML = renderJobPage(job);
            });
    </script>
</body>
</html>
```

---

## 🔄 UPDATE WORKFLOW

### Before Components:
```
Update job date → Edit 5 files:
1. jobs/job-name.html (alert banner)
2. jobs/job-name.html (dates table)
3. index.html (latest jobs)
4. exam-calendar.html (timeline)
5. archive.html (if closed)

TIME: 15-20 minutes per job
```

### With Components:
```
Update job date → Edit 1 file:
1. data/jobs.json (change lastDate)

Components auto-update:
✅ Alert banner (days, status, color)
✅ Dates table
✅ Index (via separate dynamic fetch)
✅ Exam calendar (dynamic - future)
✅ Archive (dynamic - future)

TIME: 10 seconds!
```

---

## 📊 REQUIRED JSON FIELDS

### Minimum Required:
```json
{
    "id": "job-slug",
    "slug": "job-slug",
    "title": "Job Title",
    "shortTitle": "Short Title",
    "category": "banking-jobs",
    "states": ["all-india"],
    "posts": 1000,
    "organization": "Organization Name",
    "qualification": "Graduation",
    "minAge": 18,
    "maxAge": 40,
    "salary": {
        "range": "₹20,000 - ₹50,000"
    },
    "applicationFee": {
        "general": "₹500",
        "sc": "₹250"
    },
    "notificationDate": "2025-11-01",
    "applicationStart": "2025-11-01",
    "lastDate": "2025-12-01",
    "addedOn": "2024-11-14",
    "applyLink": "https://..."
}
```

### Optional Fields (for enhanced features):
```json
{
    "notificationPdf": "/notifications/job.pdf",
    "syllabusLink": "https://...",
    "officialWebsite": "https://...",
    "examDate": "2026-01-15",
    "selectionProcess": "2-Tier CBT + Interview",
    "multiPost": true,
    "postBreakdown": [...],
    "benefits": [...],
    "uniqueFeatures": [...],
    "importantNotes": [...],
    "careerJourneySlug": "ias-officer"
}
```

---

## 🚨 IMPORTANT NOTES

### What Components DON'T Handle:

**Manual sections still needed:**
- ✍️ Eligibility Criteria (detailed, job-specific)
- ✍️ Selection Process (stage-by-stage breakdown)
- ✍️ How to Apply (step-by-step guide)
- ✍️ State-wise vacancy tables (if complex)

**Why?** These sections are too job-specific and detailed to auto-generate.

### Hybrid Approach:

**Components:** Handle repetitive data sections (dates, fees, posts)
**Manual:** Handle unique, detailed content (eligibility, process)

---

## 🧪 TESTING

**Test Page:** `/test-components.html`

**URL:** `http://localhost:8000/test-components.html`

**Features:**
- Tests all components with WBSSC SLST 2025 data
- Shows header scroll behavior
- Demonstrates auto-calculation
- Validates styling

---

## 📌 FUTURE ENHANCEMENTS

### Planned Components:

1. **renderCareerJourneyLink(job)** 🔜
   - Link to career timeline page
   - Fetches from `careers.json`

2. **Dynamic Exam Calendar**
   - Auto-generate from all job dates
   - Chronological sorting
   - Event filtering

3. **Dynamic Archive**
   - Auto-move expired jobs
   - Filter by year/category

---

## 🛠️ MIGRATION GUIDE

### Converting Existing Pages:

**Step 1:** Add component library
```html
<script src="/shared/components.js"></script>
```

**Step 2:** Add containers
```html
<div id="job-alert"></div>
<div id="job-components"></div>
```

**Step 3:** Add render script
```javascript
const JOB_SLUG = 'your-job-slug';
fetch('/data/jobs.json')
    .then(r => r.json())
    .then(data => {
        const job = data.jobs.find(j => j.slug === JOB_SLUG);
        document.getElementById('job-alert').innerHTML = renderJobAlert(job);
        document.getElementById('job-components').innerHTML = renderJobPage(job);
    });
```

**Step 4:** Remove hardcoded sections that components now handle

**Step 5:** Keep manual sections (eligibility, selection, how to apply)

---

## 📚 RELATED DOCS

- `CLAUDE.md` - Main workflow (PDF → JSON → Page creation)
- `jobs.json` - Data structure reference
- `careers.json` - Career timeline data (future)

---

**Questions? Check test-components.html for live examples!** 🚀
