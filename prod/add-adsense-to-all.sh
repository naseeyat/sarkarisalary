#!/bin/bash

# Script to add AdSense code to all HTML files that don't have it yet

ADSENSE_CODE='    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2954991378408470"
         crossorigin="anonymous"></script>
'

cd /Users/nmshv/Downloads/_ecosystem/sarkarisalaryde/prod

# Find all HTML files (excluding archive and templates)
find . -name "*.html" -not -path "./archive/*" -not -path "./templates/*" -not -path "./shared/*" -type f | while read file; do
    # Check if AdSense code already exists
    if ! grep -q "ca-pub-2954991378408470" "$file"; then
        echo "Adding AdSense to: $file"

        # Add AdSense code after the first </head> opening but before other scripts
        # We'll add it after favicon or after viewport meta tag
        if grep -q '<link rel="icon"' "$file"; then
            # Add after favicon
            sed -i.bak '/<link rel="icon"/a\
\
    <!-- Google AdSense -->\
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2954991378408470"\
         crossorigin="anonymous"></script>
' "$file"
        elif grep -q '<meta name="viewport"' "$file"; then
            # Add after viewport
            sed -i.bak '/<meta name="viewport"/a\
\
    <!-- Google AdSense -->\
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2954991378408470"\
         crossorigin="anonymous"></script>
' "$file"
        else
            echo "  ⚠️  Could not find insertion point in $file"
        fi

        # Remove backup file
        rm -f "${file}.bak"
    else
        echo "✓ AdSense already in: $file"
    fi
done

echo ""
echo "Done! Verifying all files..."
echo ""

# Verify all files have AdSense
find . -name "*.html" -not -path "./archive/*" -not -path "./templates/*" -not -path "./shared/*" -type f | while read file; do
    if ! grep -q "ca-pub-2954991378408470" "$file"; then
        echo "❌ MISSING: $file"
    fi
done

echo ""
echo "All files processed!"