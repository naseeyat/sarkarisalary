# Dynamic Header System Usage Guide

## For Generated Pages - Custom Titles

### Method 1: Using window.pageHeaderData (Recommended)

Set the page data **BEFORE** loading the header-footer script:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Page Title</title>
    <!-- Other head content -->
</head>
<body>
    <!-- STEP 1: Set page data FIRST -->
    <script>
        window.pageHeaderData = {
            title: "YOUR CUSTOM TITLE",
            subtitle: "Your custom subtitle description"
        };
    </script>

    <!-- Your page content here -->
    <div class="container">
        <!-- Page content -->
    </div>
    
    <!-- STEP 2: Load header script AFTER setting data -->
    <script src="js/header-footer-loader.js"></script>
</body>
</html>
```

### Method 2: Using URL Parameters

For template-based pages, use URL parameters:

```html
<!-- For job pages -->
<a href="job-template.html?job=ias">IAS Officer</a>

<!-- For state pages -->
<a href="state-template.html?state=maharashtra">Maharashtra</a>
```

The system will automatically detect these parameters and set appropriate titles.

### Method 3: Page Generator Function

```javascript
function generatePage(data) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title} - SARKARI SALARY</title>
</head>
<body>
    <script>
        // Set custom header data
        window.pageHeaderData = {
            title: "${data.title.toUpperCase()}",
            subtitle: "${data.subtitle}"
        };
    </script>
    
    <div class="container">
        <!-- Generated content -->
        <h1>${data.title}</h1>
        <p>${data.description}</p>
    </div>
    
    <!-- Load header system -->
    <script src="../js/header-footer-loader.js"></script>
</body>
</html>`;
}

// Usage
const pageData = {
    title: "SBI PO",
    subtitle: "State Bank of India - Probationary Officer",
    description: "Banking career opportunity with excellent growth prospects"
};

const generatedHTML = generatePage(pageData);
// Write to file or serve dynamically
```

## Contextual Navigation

The header system automatically shows relevant navigation based on page type:

### Pay Scale Pages
- Shows: 6th Pay, 7th Pay, 8th Pay, Grade Pay links

### Job Pages  
- Shows: All Jobs, Departments, Pay Scales links

### State Pages
- Shows: All States, Jobs, Departments links

### Default Pages
- Shows: States, Departments, Jobs, Pay Scales links

## Debugging

If custom titles aren't showing:

1. **Check console logs** - Look for `🎯 Using dynamic page header data` message
2. **Verify timing** - Ensure `window.pageHeaderData` is set BEFORE the script loads
3. **Check data format** - Must have `title` and `subtitle` properties
4. **Browser cache** - Clear cache and reload

### Debug Script
Add this to test if your data is being picked up:

```javascript
// Add after setting pageHeaderData
console.log("Custom data set:", window.pageHeaderData);

// Add after header loads (with delay)
setTimeout(() => {
    if (window.HeaderFooterLoader) {
        const loader = new window.HeaderFooterLoader();
        console.log("Page info detected:", loader.getPageInfo());
    }
}, 1000);
```

## Examples

### Working Example - Job Page
```html
<script>
window.pageHeaderData = {
    title: "IAS OFFICER",
    subtitle: "Indian Administrative Service - Complete Career Guide"
};
</script>
<!-- Content and header script -->
```

### Working Example - State Page  
```html
<script>
window.pageHeaderData = {
    title: "UTTAR PRADESH",
    subtitle: "UP Government Job Opportunities & Recruitment"
};
</script>
<!-- Content and header script -->
```

### Working Example - Custom Page
```html
<script>
window.pageHeaderData = {
    title: "EXAM RESULTS 2025",
    subtitle: "Latest Government Job Exam Results & Merit Lists"
};
</script>
<!-- Content and header script -->
```

## Important Notes

1. **Order matters**: Set `window.pageHeaderData` BEFORE loading `header-footer-loader.js`
2. **Case sensitive**: Use exact property names `title` and `subtitle` 
3. **Uppercase**: Titles are automatically styled in uppercase in the header
4. **Fallbacks**: System falls back to URL parameters, then page mappings, then document title
5. **Persistence**: Data persists until page reload or manual change

## File Structure

```
prod/
├── js/
│   └── header-footer-loader.js    # Main header system
├── pages/
│   ├── jobs/                      # Job template pages
│   └── pay-scales/               # Pay scale pages  
├── templates/                     # Reusable templates
└── generated/                     # Generated pages (your pages go here)
```

The header system works across all directory levels and automatically calculates correct navigation paths.