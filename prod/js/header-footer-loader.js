// Header Footer Loader Utility
class HeaderFooterLoader {
    constructor() {
        this.headerLoaded = false;
        this.footerLoaded = false;
    }

    async loadHeader() {
        try {
            // Determine correct path based on current location
            const headerPath = this.getCorrectPath('shared/header.html');
            const response = await fetch(headerPath);
            const headerHTML = await response.text();
            
            // Fix relative paths in header based on current location
            const fixedHTML = this.fixHeaderPaths(headerHTML);
            
            // Insert header at the beginning of body
            document.body.insertAdjacentHTML('afterbegin', fixedHTML);
            
            // Set active nav link based on current page
            this.setActiveNavLink();
            
            this.headerLoaded = true;
            console.log('✅ Header loaded successfully');
        } catch (error) {
            console.error('❌ Error loading header:', error);
            // Fallback to inline header
            this.loadInlineHeader();
        }
    }

    loadInlineHeader() {
        // Get dynamic path prefix based on current page depth
        const pathPrefix = this.getPathPrefix();
        
        // Get page specific content
        const pageInfo = this.getPageInfo();
        
        const headerHTML = `
        <div style="max-width: 900px; margin: 0 auto; padding: 40px 20px 0;">
            <!-- Brutalist Header Box -->
            <header class="brutalist-header brutalist-no-shadow" style="text-align: center; margin-bottom: 20px; border: 3px solid #333333; padding: 40px; background: #ffffff; font-family: ui-monospace, SFMono-Regular, monospace;">
                <h1 class="main-title" style="font-size: 36px; font-weight: 900; color: #333333; margin-bottom: 8px; letter-spacing: 2px;">SARKARI SALARY<span style="font-size: 12px; color: #666; font-weight: 400;">.today</span></h1>
                <h2 class="page-title" style="font-size: 20px; font-weight: 800; color: #333333; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;">${pageInfo.title}</h2>
                <p class="subtitle" style="font-size: 16px; color: #666666; margin-bottom: 25px; font-weight: 600;">${pageInfo.subtitle}</p>
                <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
                    ${this.getContextualNavigation(pathPrefix)}
                </div>
            </header>
        </div>
        <style>
        .back-link:hover {
            background: #000000 !important;
        }
        @media (max-width: 768px) {
            .brutalist-header {
                padding: 20px !important;
            }
            .main-title {
                font-size: 28px !important;
            }
        }
        </style>`;
        
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
        this.headerLoaded = true;
        console.log('✅ Brutalist header box loaded with page-specific content');
    }

    // Get contextual navigation based on page type
    getContextualNavigation(pathPrefix) {
        const currentPath = window.location.pathname;
        const urlParams = new URLSearchParams(window.location.search);
        const jobType = urlParams.get('job');
        const stateType = urlParams.get('state');
        
        // Base navigation
        let navLinks = [
            `<a href="${pathPrefix}index.html" class="back-link" style="display: inline-block; padding: 8px 16px; background: #333333; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 5px;">🏠 Home</a>`
        ];
        
        // Add contextual links based on page type
        if (currentPath.includes('/pay-scales/')) {
            navLinks.push(
                `<a href="${pathPrefix}pages/pay-scales/6th-pay-commission.html" class="back-link" style="display: inline-block; padding: 8px 16px; background: #333333; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 5px;">6th Pay</a>`,
                `<a href="${pathPrefix}pages/pay-scales/pay-scale-chart.html" class="back-link" style="display: inline-block; padding: 8px 16px; background: #333333; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 5px;">7th Pay</a>`,
                `<a href="${pathPrefix}pages/pay-scales/8th-pay-commission.html" class="back-link" style="display: inline-block; padding: 8px 16px; background: #333333; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 5px;">8th Pay</a>`,
                `<a href="${pathPrefix}pages/pay-scales/grade-pay-explained.html" class="back-link" style="display: inline-block; padding: 8px 16px; background: #333333; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 5px;">Grade Pay</a>`
            );
        } else if (currentPath.includes('/jobs/') || jobType) {
            navLinks.push(
                `<a href="${pathPrefix}level-1-jobs.html" class="back-link" style="display: inline-block; padding: 8px 16px; background: #333333; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 5px;">📋 All Jobs</a>`,
                `<a href="${pathPrefix}departments-complete.html" class="back-link" style="display: inline-block; padding: 8px 16px; background: #333333; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 5px;">🏛️ Departments</a>`,
                `<a href="${pathPrefix}pages/pay-scales/pay-scale-chart.html" class="back-link" style="display: inline-block; padding: 8px 16px; background: #333333; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 5px;">📊 Pay Scales</a>`
            );
        } else if (stateType || currentPath.includes('pradesh') || currentPath.includes('bihar')) {
            navLinks.push(
                `<a href="${pathPrefix}states.html" class="back-link" style="display: inline-block; padding: 8px 16px; background: #333333; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 5px;">🗺️ All States</a>`,
                `<a href="${pathPrefix}level-1-jobs.html" class="back-link" style="display: inline-block; padding: 8px 16px; background: #333333; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 5px;">📋 Jobs</a>`,
                `<a href="${pathPrefix}departments-complete.html" class="back-link" style="display: inline-block; padding: 8px 16px; background: #333333; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 5px;">🏛️ Departments</a>`
            );
        } else {
            // Default navigation for other pages
            navLinks.push(
                `<a href="${pathPrefix}states.html" class="back-link" style="display: inline-block; padding: 8px 16px; background: #333333; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 5px;">🗺️ States</a>`,
                `<a href="${pathPrefix}departments-complete.html" class="back-link" style="display: inline-block; padding: 8px 16px; background: #333333; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 5px;">🏛️ Departments</a>`,
                `<a href="${pathPrefix}level-1-jobs.html" class="back-link" style="display: inline-block; padding: 8px 16px; background: #333333; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 5px;">📋 Jobs</a>`,
                `<a href="${pathPrefix}pages/pay-scales/pay-scale-chart.html" class="back-link" style="display: inline-block; padding: 8px 16px; background: #333333; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 5px;">📊 Pay Scales</a>`
            );
        }
        
        return navLinks.join('');
    }

    // Get page specific title and subtitle
    getPageInfo() {
        const currentPath = window.location.pathname;
        const fileName = currentPath.split('/').pop() || 'index.html';
        
        // Check for dynamic page data first (for generated pages)
        if (window.pageHeaderData) {
            console.log('🎯 Using dynamic page header data:', window.pageHeaderData);
            return window.pageHeaderData;
        }
        
        // Check for URL parameters (for template pages)
        const urlParams = new URLSearchParams(window.location.search);
        const jobType = urlParams.get('job');
        const stateType = urlParams.get('state');
        
        if (jobType && window.jobDatabase && window.jobDatabase[jobType]) {
            const jobData = window.jobDatabase[jobType];
            return {
                title: jobData.title || jobType.toUpperCase(),
                subtitle: jobData.subtitle || 'Government Job Information'
            };
        }
        
        if (stateType) {
            const stateName = stateType.replace('-', ' ').toUpperCase();
            return {
                title: stateName,
                subtitle: `${stateName.charAt(0) + stateName.slice(1).toLowerCase()} Government Job Opportunities`
            };
        }
        
        // Check for existing meta tags or page title
        const pageTitle = document.title;
        const metaDescription = document.querySelector('meta[name="description"]');
        
        // Page specific mappings
        const pageMap = {
            'index.html': {
                title: 'HOME',
                subtitle: 'Government Job Portal - Complete Career Guide'
            },
            'states.html': {
                title: 'ALL STATES',
                subtitle: 'State-wise Government Job Opportunities'
            },
            'departments-complete.html': {
                title: 'ALL DEPARTMENTS',
                subtitle: 'Government Departments & Job Categories'
            },
            'level-1-jobs.html': {
                title: 'LEVEL 1 JOBS',
                subtitle: 'Entry Level Government Positions'
            },
            'uttar-pradesh-demo.html': {
                title: 'UTTAR PRADESH',
                subtitle: 'UP Government Job Opportunities'
            }
        };
        
        // Check if filename exists in mapping
        if (pageMap[fileName]) {
            return pageMap[fileName];
        }
        
        // Check if it's a state page
        if (currentPath.includes('/states/') || fileName.includes('pradesh') || fileName.includes('bihar') || fileName.includes('maharashtra')) {
            const stateName = fileName.replace('.html', '').replace('-', ' ').toUpperCase();
            return {
                title: stateName,
                subtitle: `${stateName.charAt(0) + stateName.slice(1).toLowerCase()} Government Job Opportunities`
            };
        }
        
        // Check if it's a department page
        if (currentPath.includes('/departments/')) {
            const deptName = fileName.replace('.html', '').replace('-', ' ').toUpperCase();
            return {
                title: `${deptName} JOBS`,
                subtitle: `${deptName.charAt(0) + deptName.slice(1).toLowerCase()} Department Opportunities`
            };
        }
        
        // Check if it's a category page
        if (currentPath.includes('/categories/')) {
            const categoryName = fileName.replace('.html', '').replace('-', ' ').toUpperCase();
            return {
                title: `${categoryName} JOBS`,
                subtitle: `${categoryName.charAt(0) + categoryName.slice(1).toLowerCase()} Category Opportunities`
            };
        }
        
        // Extract from page title if available
        if (pageTitle && pageTitle !== 'Document') {
            const titleParts = pageTitle.split('-');
            return {
                title: titleParts[0].trim().toUpperCase(),
                subtitle: titleParts[1] ? titleParts[1].trim() : 'Government Job Portal'
            };
        }
        
        // Default fallback
        return {
            title: 'SARKARI SALARY',
            subtitle: 'Government Job Portal - Complete Career Guide'
        };
    }

    async loadFooter() {
        try {
            const footerPath = this.getCorrectPath('shared/footer.html');
            const response = await fetch(footerPath);
            const footerHTML = await response.text();
            
            // Fix relative paths in footer
            const fixedHTML = this.fixFooterPaths(footerHTML);
            
            // Insert footer at the end of body
            document.body.insertAdjacentHTML('beforeend', fixedHTML);
            
            this.footerLoaded = true;
            console.log('✅ Footer loaded successfully');
        } catch (error) {
            console.error('❌ Error loading footer:', error);
            // Fallback to inline footer
            this.loadInlineFooter();
        }
    }

    loadInlineFooter() {
        // Get dynamic path prefix based on current page depth
        const pathPrefix = this.getPathPrefix();
        
        const footerHTML = `
        <div style="max-width: 900px; margin: 60px auto 0; padding: 0 20px 40px;">
            <!-- Brutalist Footer Box -->
            <footer class="brutalist-footer" style="border: 3px solid #333333; padding: 40px; background: #333333; font-family: ui-monospace, SFMono-Regular, monospace;">
                <div class="footer-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; margin-bottom: 30px;">
                    <div class="footer-section">
                        <h3 style="font-size: 14px; font-weight: 900; color: #ffffff; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #ffffff; padding-bottom: 8px;">Popular States</h3>
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            <li style="margin-bottom: 8px;"><a href="${pathPrefix}states/uttar-pradesh.html" target="_blank" style="color: #cccccc; text-decoration: none; font-size: 12px; font-weight: 600; display: block; padding: 4px 0; border-bottom: 1px solid #555555;">Uttar Pradesh (2,800+ jobs)</a></li>
                            <li style="margin-bottom: 8px;"><a href="${pathPrefix}states/bihar.html" target="_blank" style="color: #cccccc; text-decoration: none; font-size: 12px; font-weight: 600; display: block; padding: 4px 0; border-bottom: 1px solid #555555;">Bihar (1,800+ jobs)</a></li>
                            <li style="margin-bottom: 8px;"><a href="${pathPrefix}states/maharashtra.html" target="_blank" style="color: #cccccc; text-decoration: none; font-size: 12px; font-weight: 600; display: block; padding: 4px 0; border-bottom: 1px solid #555555;">Maharashtra (2,200+ jobs)</a></li>
                            <li style="margin-bottom: 8px;"><a href="${pathPrefix}states.html" target="_blank" style="color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 700; display: block; padding: 8px 12px; background: #000000; border: 2px solid #ffffff; text-align: center; text-transform: uppercase;">🗺️ View All States</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3 style="font-size: 14px; font-weight: 900; color: #ffffff; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #ffffff; padding-bottom: 8px;">Top Categories</h3>
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            <li style="margin-bottom: 8px;"><a href="${pathPrefix}categories/railway.html" target="_blank" style="color: #cccccc; text-decoration: none; font-size: 12px; font-weight: 600; display: block; padding: 4px 0; border-bottom: 1px solid #555555;">Railway Jobs (2,500+ posts)</a></li>
                            <li style="margin-bottom: 8px;"><a href="${pathPrefix}categories/banking.html" target="_blank" style="color: #cccccc; text-decoration: none; font-size: 12px; font-weight: 600; display: block; padding: 4px 0; border-bottom: 1px solid #555555;">Banking Jobs (1,800+ posts)</a></li>
                            <li style="margin-bottom: 8px;"><a href="${pathPrefix}categories/police.html" target="_blank" style="color: #cccccc; text-decoration: none; font-size: 12px; font-weight: 600; display: block; padding: 4px 0; border-bottom: 1px solid #555555;">Police Jobs (1,600+ posts)</a></li>
                            <li style="margin-bottom: 8px;"><a href="${pathPrefix}level-1-jobs.html" target="_blank" style="color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 700; display: block; padding: 8px 12px; background: #000000; border: 2px solid #ffffff; text-align: center; text-transform: uppercase;">📋 View All Jobs</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3 style="font-size: 14px; font-weight: 900; color: #ffffff; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #ffffff; padding-bottom: 8px;">Quick Tools</h3>
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            <li style="margin-bottom: 8px;"><a href="${pathPrefix}pages/pay-scales/pay-scale-chart.html" target="_blank" style="color: #cccccc; text-decoration: none; font-size: 12px; font-weight: 600; display: block; padding: 4px 0; border-bottom: 1px solid #555555;">📊 Pay Scale Calculator</a></li>
                            <li style="margin-bottom: 8px;"><a href="${pathPrefix}pages/pay-scales/8th-pay-commission.html" target="_blank" style="color: #cccccc; text-decoration: none; font-size: 12px; font-weight: 600; display: block; padding: 4px 0; border-bottom: 1px solid #555555;">💰 8th Pay Commission</a></li>
                            <li style="margin-bottom: 8px;"><a href="${pathPrefix}departments-complete.html" target="_blank" style="color: #cccccc; text-decoration: none; font-size: 12px; font-weight: 600; display: block; padding: 4px 0; border-bottom: 1px solid #555555;">🏛️ All Departments</a></li>
                            <li style="margin-bottom: 8px;"><a href="${pathPrefix}index.html" target="_blank" style="color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 700; display: block; padding: 8px 12px; background: #000000; border: 2px solid #ffffff; text-align: center; text-transform: uppercase;">🏠 Back to Home</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom" style="border-top: 3px solid #ffffff; padding-top: 20px; text-align: center;">
                    <p style="margin-bottom: 15px; font-size: 14px; font-weight: 700; color: #ffffff;">SARKARI SALARY<span style="font-size: 10px; color: #cccccc; font-weight: 400;">.today</span></p>
                    <p style="margin-bottom: 10px; font-size: 11px; color: #cccccc; font-weight: 600;">&copy; 2025 Complete Government Job Portal. All rights reserved.</p>
                    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin-top: 15px;">
                        <a href="${pathPrefix}index.html" style="color: #ffffff; text-decoration: none; font-weight: 600; font-size: 10px; text-transform: uppercase; padding: 4px 8px; border: 1px solid #ffffff;">Home</a>
                        <a href="${pathPrefix}states.html" style="color: #ffffff; text-decoration: none; font-weight: 600; font-size: 10px; text-transform: uppercase; padding: 4px 8px; border: 1px solid #ffffff;">States</a>
                        <a href="${pathPrefix}departments-complete.html" style="color: #ffffff; text-decoration: none; font-weight: 600; font-size: 10px; text-transform: uppercase; padding: 4px 8px; border: 1px solid #ffffff;">Departments</a>
                        <a href="${pathPrefix}pages/pay-scales/pay-scale-chart.html" style="color: #ffffff; text-decoration: none; font-weight: 600; font-size: 10px; text-transform: uppercase; padding: 4px 8px; border: 1px solid #ffffff;">Pay Scales</a>
                    </div>
                </div>
            </footer>
        </div>
        <style>
        .footer-section a:hover {
            background: #ffffff !important;
            color: #333333 !important;
        }
        @media (max-width: 768px) {
            .footer-grid {
                grid-template-columns: 1fr !important;
            }
            .brutalist-footer {
                padding: 20px !important;
            }
        }
        </style>`;
        
        document.body.insertAdjacentHTML('beforeend', footerHTML);
        this.footerLoaded = true;
        console.log('✅ Inline footer loaded as fallback with dynamic paths');
    }

    async loadBoth() {
        await Promise.all([
            this.loadHeader(),
            this.loadFooter()
        ]);
        
        console.log('🎯 Header & Footer loaded!');
        return { headerLoaded: this.headerLoaded, footerLoaded: this.footerLoaded };
    }

    setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Remove all active classes
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class based on current page
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            if (currentPath === '/' || currentPath === '/index.html') {
                if (href === '/index.html') link.classList.add('active');
            } else if (currentPath.includes('/states/') || currentPath === '/states.html') {
                if (href === '/states.html') link.classList.add('active');
            } else if (currentPath.includes('/departments/') || currentPath === '/departments.html') {
                if (href === '/departments.html') link.classList.add('active');
            } else if (currentPath.includes('/categories/') || currentPath === '/categories.html') {
                if (href === '/categories.html') link.classList.add('active');
            } else if (currentPath.includes('/pay-scales')) {
                if (href === '/pay-scales.html') link.classList.add('active');
            }
        });
    }

    // Generate breadcrumb based on current page
    generateBreadcrumb() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(segment => segment && segment !== 'index.html');
        
        let breadcrumbHTML = '<div class="breadcrumb"><div class="breadcrumb-container">';
        breadcrumbHTML += '<a href="/index.html">Home</a>';
        
        let currentPath = '';
        segments.forEach((segment, index) => {
            currentPath += '/' + segment;
            
            if (index < segments.length - 1) {
                // Not the last segment - make it a link
                const displayName = this.formatSegmentName(segment);
                breadcrumbHTML += `<span>></span><a href="${currentPath}.html">${displayName}</a>`;
            } else {
                // Last segment - just text
                const displayName = this.formatSegmentName(segment.replace('.html', ''));
                breadcrumbHTML += `<span>></span><span>${displayName}</span>`;
            }
        });
        
        breadcrumbHTML += '</div></div>';
        
        // Insert breadcrumb after header
        const header = document.querySelector('.site-header');
        if (header) {
            header.insertAdjacentHTML('afterend', breadcrumbHTML);
        }
    }

    formatSegmentName(segment) {
        return segment
            .replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    // Get path prefix for dynamic links
    getPathPrefix() {
        const currentPath = window.location.pathname;
        
        // For file:// protocol, extract the relative path from prod/ directory
        let relativePath = currentPath;
        if (currentPath.includes('/prod/')) {
            relativePath = currentPath.substring(currentPath.indexOf('/prod/') + 5);
        }
        
        // Split by '/' and filter out empty parts
        const pathParts = relativePath.split('/').filter(part => part && part !== '');
        
        // Remove the filename (last part) to get directory parts
        const directories = pathParts.slice(0, -1);
        
        // If we're in a subdirectory, count how many levels deep
        const depth = directories.length;
        
        if (depth === 0) {
            // Root level (index.html)
            return '';
        } else {
            // Add ../ for each directory level
            return '../'.repeat(depth);
        }
    }

    // Get correct path based on current page location
    getCorrectPath(relativePath) {
        const pathPrefix = this.getPathPrefix();
        return pathPrefix + relativePath;
    }

    // Fix header paths based on current page location
    fixHeaderPaths(headerHTML) {
        const pathPrefix = this.getPathPrefix();
        
        if (!pathPrefix) {
            // Root level - paths are correct
            return headerHTML;
        } else {
            // Need to fix relative paths
            return headerHTML
                .replace(/href="([^"]*\.html)"/g, (match, url) => {
                    if (url.startsWith('http') || url.startsWith('#')) return match;
                    return `href="${pathPrefix}${url}"`;
                })
                .replace(/src="([^"]*)"/g, (match, url) => {
                    if (url.startsWith('http') || url.startsWith('#')) return match;
                    return `src="${pathPrefix}${url}"`;
                });
        }
    }

    // Fix footer paths similarly
    fixFooterPaths(footerHTML) {
        const pathPrefix = this.getPathPrefix();
        
        if (!pathPrefix) {
            return footerHTML;
        } else {
            return footerHTML
                .replace(/href="([^"]*\.html)"/g, (match, url) => {
                    if (url.startsWith('http') || url.startsWith('#')) return match;
                    return `href="${pathPrefix}${url}"`;
                });
        }
    }
}

// Auto-load header footer when page loads
function initializeHeaderFooter() {
    console.log('🚀 Initializing header-footer system...');
    const loader = new HeaderFooterLoader();
    loader.loadBoth();
}

// Check if DOM is already loaded, or wait for it
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHeaderFooter);
} else {
    // DOM is already loaded, execute immediately
    initializeHeaderFooter();
}

// Export for manual use
window.HeaderFooterLoader = HeaderFooterLoader;