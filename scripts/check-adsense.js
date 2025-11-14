#!/usr/bin/env node

/**
 * AdSense Checker Script
 * Scans all HTML files and checks if AdSense script is present
 */

const fs = require('fs');
const path = require('path');

// AdSense script pattern to search for
const ADSENSE_PATTERN = /adsbygoogle\.js\?client=ca-pub-2954991378408470/;

// Directories to scan (only prod, recursively scans subdirectories)
const SCAN_DIRS = [
    'prod'
];

// Files to exclude
const EXCLUDE_FILES = [
    'test-adsense.html',
    'template.html',
    'draft.html',
    'header.html',    // Component, not a full page
    'footer.html',    // Component, not a full page
    'icon-test.html'  // Test file
];

const results = {
    withAdsense: [],
    withoutAdsense: [],
    errors: [],
    scannedFiles: new Set() // Track scanned files to avoid duplicates
};

/**
 * Recursively scan directory for HTML files
 */
function scanDirectory(dir) {
    try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                // Recursively scan subdirectories
                scanDirectory(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.html')) {
                // Skip excluded files
                if (EXCLUDE_FILES.includes(entry.name)) {
                    continue;
                }

                checkFile(fullPath);
            }
        }
    } catch (err) {
        results.errors.push({ path: dir, error: err.message });
    }
}

/**
 * Check if file contains AdSense script
 */
function checkFile(filePath) {
    try {
        const relativePath = path.relative(process.cwd(), filePath);

        // Skip if already scanned
        if (results.scannedFiles.has(relativePath)) {
            return;
        }
        results.scannedFiles.add(relativePath);

        const content = fs.readFileSync(filePath, 'utf8');
        const hasAdsense = ADSENSE_PATTERN.test(content);

        if (hasAdsense) {
            results.withAdsense.push(relativePath);
        } else {
            results.withoutAdsense.push(relativePath);
        }
    } catch (err) {
        results.errors.push({ path: filePath, error: err.message });
    }
}

/**
 * Print results
 */
function printResults() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 ADSENSE CHECKER REPORT');
    console.log('='.repeat(60) + '\n');

    // Summary
    const total = results.withAdsense.length + results.withoutAdsense.length;
    console.log(`Total HTML files scanned: ${total}`);
    console.log(`✅ With AdSense: ${results.withAdsense.length}`);
    console.log(`❌ Without AdSense: ${results.withoutAdsense.length}`);

    if (results.errors.length > 0) {
        console.log(`⚠️  Errors: ${results.errors.length}`);
    }

    // Missing AdSense files
    if (results.withoutAdsense.length > 0) {
        console.log('\n' + '-'.repeat(60));
        console.log('❌ FILES MISSING ADSENSE:');
        console.log('-'.repeat(60));
        results.withoutAdsense.forEach((file, index) => {
            console.log(`${index + 1}. ${file}`);
        });
    }

    // Errors
    if (results.errors.length > 0) {
        console.log('\n' + '-'.repeat(60));
        console.log('⚠️  ERRORS:');
        console.log('-'.repeat(60));
        results.errors.forEach((err, index) => {
            console.log(`${index + 1}. ${err.path}: ${err.error}`);
        });
    }

    // Success message
    if (results.withoutAdsense.length === 0) {
        console.log('\n✅ SUCCESS! All HTML files have AdSense script.\n');
    } else {
        console.log(`\n⚠️  ACTION REQUIRED: ${results.withoutAdsense.length} files need AdSense script.\n`);
        console.log('Add this to <head> section:');
        console.log('');
        console.log('    <!-- Google AdSense -->');
        console.log('    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2954991378408470"');
        console.log('         crossorigin="anonymous"></script>');
        console.log('');
    }

    console.log('='.repeat(60) + '\n');
}

/**
 * Generate fix script
 */
function generateFixScript() {
    if (results.withoutAdsense.length === 0) {
        return;
    }

    const scriptPath = path.join(__dirname, 'fix-adsense.sh');

    let script = `#!/bin/bash
# Auto-generated script to add AdSense to missing files
# Generated: ${new Date().toISOString()}

ADSENSE_SCRIPT='    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2954991378408470"
         crossorigin="anonymous"></script>'

`;

    results.withoutAdsense.forEach(file => {
        script += `
echo "Adding AdSense to ${file}..."
# Check if file has <head> tag
if grep -q "<head>" "${file}"; then
    # Insert after <head> tag
    sed -i '' '/<head>/a\\
'"$ADSENSE_SCRIPT"'
' "${file}"
    echo "✅ Added to ${file}"
else
    echo "⚠️  No <head> tag found in ${file}"
fi
`;
    });

    script += `
echo ""
echo "✅ Done! Run 'node scripts/check-adsense.js' to verify."
`;

    fs.writeFileSync(scriptPath, script, { mode: 0o755 });
    console.log(`\n💡 Fix script generated: ${scriptPath}`);
    console.log(`   Run: bash ${scriptPath}\n`);
}

// Main execution
console.log('🔍 Scanning HTML files for AdSense script...\n');

SCAN_DIRS.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (fs.existsSync(fullPath)) {
        scanDirectory(fullPath);
    }
});

printResults();
generateFixScript();

// Exit with error code if files are missing AdSense
process.exit(results.withoutAdsense.length > 0 ? 1 : 0);
