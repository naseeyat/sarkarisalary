# SARKARI SALARY - Project Structure

## 📁 Clean Production Structure

```
prod/
├── 🌐 MAIN PAGES
│   ├── index.html                    # Homepage with search
│   ├── states.html                   # All states directory
│   ├── departments-complete.html     # All departments
│   ├── level-1-jobs.html            # Job listings
│   └── uttar-pradesh-demo.html       # State example
│
├── 📄 STATIC PAGES  
│   └── pages/
│       ├── jobs/
│       │   └── job-template-basic.html    # Job detail template
│       └── pay-scales/
│           ├── pay-scale-chart.html       # 7th Pay Commission
│           ├── 6th-pay-commission.html    # 6th Pay Commission  
│           ├── 8th-pay-commission.html    # 8th Pay Commission
│           └── grade-pay-explained.html   # Grade pay guide
│
├── 🏗️ TEMPLATES
│   └── templates/
│       ├── state-template.html           # State page template
│       ├── category-listing-template/    # Category templates
│       ├── pay-scale-template/           # Pay scale templates
│       └── timeline-template/            # Timeline templates
│
├── 🤖 GENERATORS
│   └── generators/
│       └── HEADER-USAGE-GUIDE.md         # How to use dynamic headers
│
├── 📦 GENERATED PAGES
│   └── generated/                        # Auto-generated pages go here
│
├── ⚙️ SYSTEM FILES
│   ├── js/
│   │   ├── header-footer-loader.js       # Dynamic header/footer system
│   │   └── data-manager.js               # Data management
│   ├── shared/
│   │   ├── brutalist-styles.css          # Main CSS framework
│   │   ├── global.js                     # Global JavaScript
│   │   ├── dropdown-system.js            # Dropdown components
│   │   └── components/                   # Reusable components
│   └── data/
│       ├── job-postings.json             # Job data
│       └── unified-data.json             # Structured data
│
├── 🌍 WEB CONFIG
│   ├── robots.txt                        # SEO crawler rules
│   ├── sitemap.xml                       # Site structure
│   ├── ads.txt                           # Ad verification
│   └── BingSiteAuth.xml                  # Bing verification
│
└── 🔧 DEPLOYMENT
    ├── api/                              # API endpoints
    ├── functions/                        # Serverless functions
    └── wrangler.toml                     # Cloudflare config
```

## 🎯 Core Features Implemented

### ✅ Dynamic Header/Footer System
- Contextual navigation based on page type
- Custom titles for generated pages
- Automatic path calculation for any directory depth
- Fallback system for missing data

### ✅ Brutalist Design Framework  
- Consistent monospace typography
- Sharp borders, no shadows/gradients
- High contrast black/white theme
- Responsive grid layouts

### ✅ Organized Page Structure
- Clear separation of static vs generated content
- Template-based page generation
- Reusable components system

## 🚀 Ready for Page Generation

The structure is now optimized for:
1. **Mass page generation** in `/generated/` folder
2. **Template reuse** from `/templates/` folder  
3. **Custom header titles** using the dynamic system
4. **Consistent styling** across all pages

## 📋 Next Steps

1. Create page generators in `/generators/` folder
2. Generate pages into `/generated/` folder  
3. Use dynamic header system for custom titles
4. Maintain brutalist design consistency

All test files moved to `/archive/` - production directory is clean and ready for scaling!