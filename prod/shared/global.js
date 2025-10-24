// Global JavaScript for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Make all links open in new tab (except anchors, mail, tel)
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        const href = link.getAttribute('href');
        // Only add target="_blank" for actual page links, not anchors
        if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('javascript:')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    // Also handle any remaining onclick elements that weren't caught
    setTimeout(() => {
        const allLinks = document.querySelectorAll('a[href]:not([target])');
        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }, 100);
    
    // Fix onclick redirects to open in new tab
    const clickableElements = document.querySelectorAll('[onclick*="window.location.href"]');
    clickableElements.forEach(element => {
        const onclickValue = element.getAttribute('onclick');
        if (onclickValue && onclickValue.includes('window.location.href')) {
            // Extract the URL from onclick
            const urlMatch = onclickValue.match(/'([^']+)'/);
            if (urlMatch && urlMatch[1]) {
                const url = urlMatch[1];
                // Replace onclick with new tab opening
                element.setAttribute('onclick', `window.open('${url}', '_blank', 'noopener,noreferrer')`);
            }
        }
    });
});