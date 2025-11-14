#!/usr/bin/env node

/**
 * Add AdSense Script to HTML Files
 * Automatically adds Google AdSense script to <head> section
 */

const fs = require('fs');

const ADSENSE_SCRIPT = `    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2954991378408470"
         crossorigin="anonymous"></script>
`;

// Files to add AdSense to
const FILES = [
    'prod/archive.html',
    'prod/categories/banking-jobs.html',
    'prod/categories/civil-services.html',
    'prod/categories/defense-jobs.html',
    'prod/categories/medical-jobs.html',
    'prod/categories/police-jobs.html',
    'prod/categories/railway-jobs.html',
    'prod/categories/ssc-jobs.html',
    'prod/categories/teaching-jobs.html',
    'prod/categories/technical-jobs.html',
    'prod/categories.html',
    'prod/exam-calendar.html',
    'prod/jobs/bob-apprentice-2025.html',
    'prod/jobs/kvs-nvs-2025.html',
    'prod/jobs/ner-railway-apprentice-2026.html',
    'prod/jobs/nhb-officer-2025.html',
    'prod/jobs/wbssc-slst-2025.html',
    'prod/salaries/bob-apprentice-2025.html',
    'prod/states/all-india.html',
    'prod/states/delhi.html',
    'prod/states/uttar-pradesh.html'
];

let successCount = 0;
let errorCount = 0;

console.log('🔧 Adding AdSense script to HTML files...\n');

FILES.forEach(filePath => {
    try {
        const content = fs.readFileSync(filePath, 'utf8');

        // Check if AdSense already exists
        if (content.includes('adsbygoogle.js?client=ca-pub-2954991378408470')) {
            console.log(`⏭️  Skipped ${filePath} (already has AdSense)`);
            return;
        }

        // Find <head> tag and insert after it
        const headIndex = content.indexOf('<head>');
        if (headIndex === -1) {
            console.log(`⚠️  Error: No <head> tag in ${filePath}`);
            errorCount++;
            return;
        }

        // Find the end of the <head> opening tag
        const headEndIndex = content.indexOf('>', headIndex) + 1;

        // Insert AdSense script after <head>
        const newContent = content.slice(0, headEndIndex) + '\n' + ADSENSE_SCRIPT + content.slice(headEndIndex);

        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`✅ Added to ${filePath}`);
        successCount++;

    } catch (err) {
        console.log(`❌ Error processing ${filePath}: ${err.message}`);
        errorCount++;
    }
});

console.log('\n' + '='.repeat(60));
console.log(`✅ Success: ${successCount} files`);
if (errorCount > 0) {
    console.log(`❌ Errors: ${errorCount} files`);
}
console.log('='.repeat(60));

console.log('\n💡 Run "node scripts/check-adsense.js" to verify\n');
