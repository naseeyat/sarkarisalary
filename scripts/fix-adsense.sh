#!/bin/bash
# Auto-generated script to add AdSense to missing files
# Generated: 2025-11-15T03:08:49.653Z

ADSENSE_SCRIPT='    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2954991378408470"
         crossorigin="anonymous"></script>'


echo "Adding AdSense to prod/test-components.html..."
# Check if file has <head> tag
if grep -q "<head>" "prod/test-components.html"; then
    # Insert after <head> tag
    sed -i '' '/<head>/a\
'"$ADSENSE_SCRIPT"'
' "prod/test-components.html"
    echo "✅ Added to prod/test-components.html"
else
    echo "⚠️  No <head> tag found in prod/test-components.html"
fi

echo ""
echo "✅ Done! Run 'node scripts/check-adsense.js' to verify."
