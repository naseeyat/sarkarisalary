# SARKARI SALARY - Complete Project Guidelines

## 📋 Project Overview

**Project Name:** SARKARI SALARY (sarkari-salary.today)  
**Purpose:** Government job salary calculator and pay scale guide  
**Target:** Government job seekers in India  
**Tech Stack:** Pure HTML/CSS/JS (No frameworks)  
**Design Philosophy:** Brutalist design with monospace fonts  

## 🎨 Design System & Guidelines

### **BRUTALIST DESIGN PRINCIPLES (STRICT)**
```css
/* MANDATORY DESIGN RULES */
font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
background: #ffffff;
color: #333333;
border: 3px solid #333333;

/* FORBIDDEN */
❌ NO gradients
❌ NO shadows (box-shadow)
❌ NO rounded corners (border-radius)
❌ NO fancy fonts
❌ NO animations (except simple transforms)
❌ NO soft colors
```

### **Typography Rules**
- **Main titles**: 36px, 900 weight, uppercase, 2px letter-spacing
- **Section titles**: 20px, 800 weight, uppercase, 2px letter-spacing  
- **Body text**: 14px, 600 weight
- **Small text**: 11-12px for labels/metadata
- **All text**: Must be high contrast (#333333 on #ffffff)

### **Layout Standards**
- **Container**: max-width: 900px, margin: 0 auto, padding: 40px 20px
- **Boxes**: border: 3px solid #333333, padding: 20-40px
- **Grid gaps**: 15px between cards, 10px between small elements
- **Mobile**: padding: 20px 15px, single column grids

### **Color Palette (ONLY THESE)**
- **Primary**: #333333 (dark)
- **Background**: #ffffff (white)  
- **Secondary**: #666666 (medium gray)
- **Accent**: #f8f8f8 (light gray)
- **Hover**: #000000 (pure black)

## 🏗️ Architecture & File Structure

### **Directory Organization**
```
prod/
├── 🌐 MAIN PAGES (entry points)
├── 📄 pages/ (static content pages)
├── 🏗️ templates/ (reusable templates)
├── 🤖 generators/ (page generation tools)
├── 📦 generated/ (auto-generated pages)
├── ⚙️ js/ (JavaScript systems)
├── 🎨 shared/ (CSS, assets, components)
├── 📊 data/ (JSON data files)
```

### **File Naming Conventions**
- **HTML files**: lowercase-with-hyphens.html
- **Directories**: lowercase-with-hyphens/
- **CSS/JS**: descriptive-names.css, system-name.js
- **Data files**: descriptive-data.json

## 🔧 Technical Implementation

### **Header-Footer System (CRITICAL)**
```javascript
// FOR GENERATED PAGES - ALWAYS SET BEFORE HEADER SCRIPT
window.pageHeaderData = {
    title: "YOUR CUSTOM TITLE",
    subtitle: "Your custom subtitle"
};

// THEN load header script
<script src="js/header-footer-loader.js"></script>
```

### **Page Structure Template**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title - SARKARI SALARY</title>
    <meta name="description" content="Page description">
    
    <!-- ALWAYS include brutalist styles -->
    <link rel="stylesheet" href="shared/brutalist-styles.css">
</head>
<body>
    <!-- Set custom header data if needed -->
    <script>
    window.pageHeaderData = {
        title: "CUSTOM TITLE",
        subtitle: "Custom subtitle"
    };
    </script>

    <div class="container">
        <!-- Content here -->
    </div>
    
    <!-- ALWAYS include header-footer system -->
    <script src="js/header-footer-loader.js"></script>
</body>
</html>
```

### **CSS Guidelines**
```css
/* STANDARD CONTAINER */
.container {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 20px;
}

/* STANDARD BOX */
.content-box {
    border: 3px solid #333333;
    padding: 30px;
    margin: 20px 0;
    background: #ffffff;
}

/* STANDARD GRID */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 15px;
}

/* HOVER EFFECTS (simple only) */
.card:hover {
    background: #333333;
    color: #ffffff;
    transform: scale(1.02);
}
```

## 📝 Content Strategy

### **Page Types & Purposes**
1. **Homepage (index.html)** - Search + trending jobs
2. **States pages** - State-wise job listings
3. **Department pages** - Ministry/department-wise jobs
4. **Job detail pages** - Specific job information + salary calculator
5. **Pay scale pages** - Commission-wise pay structures
6. **Level pages** - Grade/level-wise job listings

### **Content Structure**
- **Title**: Clear, descriptive, SEO-friendly
- **Stats**: Job count, salary range, department count
- **Cards**: Job/state/department cards with hover effects
- **Navigation**: Contextual based on page type

## 🚫 STRICT DO's and DON'Ts

### **✅ DO's**
- ✅ Use ONLY brutalist design elements
- ✅ Set window.pageHeaderData BEFORE header script
- ✅ Include header-footer-loader.js on ALL pages
- ✅ Use consistent container/padding structure
- ✅ Follow naming conventions
- ✅ Test header links work from all directory depths
- ✅ Keep generated pages in /generated/ folder
- ✅ Archive test files in /archive/
- ✅ Use relative paths that work at any depth

### **❌ DON'Ts**
- ❌ NEVER add gradients, shadows, or rounded corners
- ❌ NEVER use fonts other than monospace
- ❌ NEVER create redundant static headers (use dynamic system)
- ❌ NEVER put generated pages in main directory
- ❌ NEVER hardcode navigation paths
- ❌ NEVER use complex animations or effects
- ❌ NEVER deviate from #333/#fff color scheme
- ❌ NEVER create files without proper structure

## 🎯 Page Generation Best Practices

### **Generator Function Template**
```javascript
function generatePage(data) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${data.title} - SARKARI SALARY</title>
    <link rel="stylesheet" href="../shared/brutalist-styles.css">
</head>
<body>
    <script>
    window.pageHeaderData = {
        title: "${data.title.toUpperCase()}",
        subtitle: "${data.subtitle}"
    };
    </script>
    
    <div class="container">
        <!-- Generated content -->
    </div>
    
    <script src="../js/header-footer-loader.js"></script>
</body>
</html>`;
}
```

### **Data Structure Standards**
```javascript
// Job data structure
const jobData = {
    title: "Job Title",
    subtitle: "Job Description",
    department: "Ministry/Department",
    startingSalary: 50000,
    maxSalary: 150000,
    qualification: "Educational requirement",
    ageLimit: "Age range",
    selectionProcess: "Selection method"
};

// State data structure  
const stateData = {
    name: "State Name",
    code: "ST", 
    jobCount: 1500,
    avgSalary: 35000,
    departments: 40,
    description: "State job overview"
};
```

## 🔍 Quality Checklist

### **Before Creating Any Page**
- [ ] Design follows brutalist principles
- [ ] Uses standard container structure
- [ ] Has proper meta tags
- [ ] Includes brutalist-styles.css
- [ ] Sets pageHeaderData if custom title needed
- [ ] Includes header-footer-loader.js
- [ ] Navigation links work from page depth
- [ ] Mobile responsive
- [ ] No design deviations

### **Before Deployment**
- [ ] All test files moved to archive
- [ ] Generated pages in correct folder
- [ ] Header-footer system works on all pages
- [ ] Design consistency across all pages
- [ ] All links functional
- [ ] SEO tags present

## 🚀 Session Continuity Guide

### **For New Claude Sessions**
1. **Read this document first** to understand full context
2. **Check current structure** using LS tool on /prod/ directory
3. **Verify header system** by testing any page
4. **Understand brutalist design** - NO exceptions to design rules
5. **Follow naming conventions** - everything is organized systematically
6. **Use TodoWrite tool** to track progress on complex tasks

### **Key Files to Reference**
- `PROJECT-GUIDELINES.md` (this file) - Full context
- `PROJECT-STRUCTURE.md` - Directory organization
- `generators/HEADER-USAGE-GUIDE.md` - Dynamic header usage
- `js/header-footer-loader.js` - Core header system
- `shared/brutalist-styles.css` - Design framework

### **Common Tasks**
- **Adding new pages** → Use generator pattern + dynamic headers
- **Fixing design** → Always check brutalist principles first
- **Adding navigation** → Use header-footer system, never hardcode
- **Testing** → Create in /archive/, not main directory
- **Organizing** → Follow strict folder structure

## 📞 Critical Success Factors

1. **Design Consistency**: NEVER compromise on brutalist design
2. **Header System**: Dynamic headers must work on ALL pages
3. **File Organization**: Keep structure clean and logical
4. **Path Management**: All links must work from any directory depth
5. **Mobile Support**: Responsive but maintain brutalist look
6. **Performance**: Pure HTML/CSS/JS, no external dependencies

## 🎯 Current Status (Last Updated)

**✅ Completed:**
- Brutalist design system implemented
- Dynamic header-footer system working
- Project structure organized
- States page created with proper design
- All existing pages have dynamic headers
- Contextual navigation system working
- Test files archived

**🎯 Ready For:**
- Mass page generation using templates
- Additional state/job/department pages
- Content automation
- SEO optimization

**🏗️ Architecture:**
- Header system handles custom titles automatically
- Path calculation works for any directory depth
- Consistent design enforced through CSS framework
- Component system ready for scaling

---

**REMEMBER**: This project prioritizes design consistency, clean code, and systematic organization. Always reference these guidelines when making any changes or additions.