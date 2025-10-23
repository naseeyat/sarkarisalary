#!/usr/bin/env node

// Automatic Analytics Injection Build System
const fs = require('fs');
const path = require('path');

// Google Analytics code to inject
const analyticsCode = `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-VCKVNDH46X"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-VCKVNDH46X');
    </script>`;

// Directory to process
const prodDir = './prod';

// Function to inject analytics into HTML files
function injectAnalytics() {
    console.log('🚀 Starting analytics injection...');
    
    // Read all files in prod directory
    fs.readdir(prodDir, (err, files) => {
        if (err) {
            console.error('❌ Error reading directory:', err);
            return;
        }

        // Filter HTML files
        const htmlFiles = files.filter(file => file.endsWith('.html'));
        
        console.log(`📄 Found ${htmlFiles.length} HTML files:`);
        htmlFiles.forEach(file => console.log(`   - ${file}`));
        
        // Process each HTML file
        htmlFiles.forEach(filename => {
            const filePath = path.join(prodDir, filename);
            
            // Read file content
            fs.readFile(filePath, 'utf8', (err, content) => {
                if (err) {
                    console.error(`❌ Error reading ${filename}:`, err);
                    return;
                }
                
                // Check if analytics already exists
                if (content.includes('gtag.js?id=G-VCKVNDH46X')) {
                    console.log(`✅ ${filename} - Analytics already present`);
                    return;
                }
                
                // Check if </head> exists
                if (!content.includes('</head>')) {
                    console.log(`⚠️  ${filename} - No </head> tag found, skipping`);
                    return;
                }
                
                // Inject analytics before </head>
                const updatedContent = content.replace('</head>', `    ${analyticsCode}\n</head>`);
                
                // Write back to file
                fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
                    if (err) {
                        console.error(`❌ Error writing ${filename}:`, err);
                        return;
                    }
                    
                    console.log(`✅ ${filename} - Analytics injected successfully`);
                });
            });
        });
    });
}

// Function to remove analytics (cleanup)
function removeAnalytics() {
    console.log('🧹 Removing analytics from all files...');
    
    fs.readdir(prodDir, (err, files) => {
        if (err) {
            console.error('❌ Error reading directory:', err);
            return;
        }

        const htmlFiles = files.filter(file => file.endsWith('.html'));
        
        htmlFiles.forEach(filename => {
            const filePath = path.join(prodDir, filename);
            
            fs.readFile(filePath, 'utf8', (err, content) => {
                if (err) {
                    console.error(`❌ Error reading ${filename}:`, err);
                    return;
                }
                
                // Remove analytics code block
                const cleanContent = content.replace(
                    /\s*<!-- Google tag \(gtag\.js\) -->[\s\S]*?gtag\('config', 'G-VCKVNDH46X'\);\s*<\/script>/g, 
                    ''
                );
                
                if (cleanContent !== content) {
                    fs.writeFile(filePath, cleanContent, 'utf8', (err) => {
                        if (err) {
                            console.error(`❌ Error writing ${filename}:`, err);
                            return;
                        }
                        console.log(`✅ ${filename} - Analytics removed`);
                    });
                } else {
                    console.log(`ℹ️  ${filename} - No analytics found`);
                }
            });
        });
    });
}

// Command line interface
const command = process.argv[2];

switch (command) {
    case 'inject':
        injectAnalytics();
        break;
    case 'remove':
        removeAnalytics();
        break;
    case 'help':
    default:
        console.log(`
📊 Analytics Injection Build System

Usage:
  node build-inject.js inject  - Add analytics to all HTML files
  node build-inject.js remove  - Remove analytics from all HTML files
  node build-inject.js help    - Show this help

Features:
✅ Automatically finds all HTML files in prod/
✅ Skips files that already have analytics
✅ Safe injection before </head> tag
✅ Clean removal with cleanup command
✅ Detailed logging for troubleshooting

Examples:
  node build-inject.js inject
  git add . && git commit -m "Auto-inject analytics" && git push
        `);
        break;
}