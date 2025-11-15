// Global JavaScript for all pages

// Helper function to calculate days remaining dynamically
function calculateDaysRemaining(lastDate) {
    if (!lastDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const last = new Date(lastDate);
    last.setHours(0, 0, 0, 0);
    const daysRemaining = Math.ceil((last - today) / (1000 * 60 * 60 * 24));
    return daysRemaining;
}

// Sticky header - instant compact on ANY scroll
let headerElement = null;
let isScrolled = false;

function handleScroll() {
    if (!headerElement) {
        headerElement = document.querySelector('.brutalist-header-wrapper');
        if (!headerElement) return;
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // INSTANT COMPACT: Single pixel scroll = compact
    if (scrollTop > 0 && !isScrolled) {
        isScrolled = true;
        headerElement.classList.add('scrolled');
    }
    // INSTANT EXPAND: Only at absolute top (0px)
    else if (scrollTop === 0 && isScrolled) {
        isScrolled = false;
        headerElement.classList.remove('scrolled');
    }
}

// Use passive listener for better performance
window.addEventListener('scroll', handleScroll, { passive: true });

// Hamburger menu toggle - using event delegation for dynamically loaded header
document.addEventListener('click', function(e) {
    // Header hamburger button
    const hamburgerBtn = e.target.closest('#hamburgerBtn');
    if (hamburgerBtn) {
        e.preventDefault();
        e.stopPropagation();

        const nav = document.getElementById('mainNav');
        const btn = document.getElementById('hamburgerBtn');

        if (nav && btn) {
            nav.classList.toggle('nav-open');
            btn.classList.toggle('active');
            console.log('Menu toggled:', nav.classList.contains('nav-open'));
        }
    }

    // Footer toggle button (mobile)
    const footerToggleBtn = e.target.closest('#footerToggleBtn');
    if (footerToggleBtn) {
        e.preventDefault();
        e.stopPropagation();

        const footerGrid = document.getElementById('footerGrid');
        const btn = document.getElementById('footerToggleBtn');

        if (footerGrid && btn) {
            footerGrid.classList.toggle('open');
            btn.classList.toggle('active');
            console.log('Footer links toggled:', footerGrid.classList.contains('open'));
        }
    }
});

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