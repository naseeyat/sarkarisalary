/**
 * PDF Prefetching System
 * Loads related PDFs in background for instant viewing
 */

class PDFPrefetcher {
    constructor() {
        this.R2_BASE = 'https://reference.sarkarisalary.today/';
        this.cache = new Map();
        this.prefetchQueue = [];
    }

    /**
     * Prefetch PDFs in background
     * @param {Array<string>} filenames - Array of PDF filenames to prefetch
     */
    async prefetchPDFs(filenames) {
        console.log('[PDF Prefetch] Starting prefetch for:', filenames);

        for (const filename of filenames) {
            if (!this.cache.has(filename)) {
                this.prefetchQueue.push(filename);
            }
        }

        // Start fetching in background
        this.processPrefetchQueue();
    }

    async processPrefetchQueue() {
        while (this.prefetchQueue.length > 0) {
            const filename = this.prefetchQueue.shift();

            try {
                const url = this.R2_BASE + filename;

                // Fetch PDF in background
                const response = await fetch(url, {
                    mode: 'cors',
                    cache: 'force-cache' // Use browser cache
                });

                if (response.ok) {
                    // Convert to blob for caching
                    const blob = await response.blob();
                    this.cache.set(filename, blob);
                    console.log('[PDF Prefetch] Cached:', filename, `(${(blob.size / 1024).toFixed(2)} KB)`);
                }
            } catch (error) {
                console.warn('[PDF Prefetch] Failed to prefetch:', filename, error);
            }

            // Small delay to avoid overwhelming connection
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        console.log('[PDF Prefetch] Complete. Cached PDFs:', this.cache.size);
    }

    /**
     * Check if PDF is cached
     */
    isCached(filename) {
        return this.cache.has(filename);
    }

    /**
     * Get cached PDF blob
     */
    getCached(filename) {
        return this.cache.get(filename);
    }

    /**
     * Auto-prefetch based on current page context
     */
    static autoPrefetch() {
        // Get current page context
        const currentUrl = window.location.pathname;
        const prefetcher = new PDFPrefetcher();

        // Prefetch strategy based on page
        if (currentUrl.includes('/jobs/')) {
            // On job page - prefetch current job PDF + related jobs
            prefetcher.prefetchRelatedJobPDFs();
        } else if (currentUrl.includes('/categories/')) {
            // On category page - prefetch top 5 job PDFs
            prefetcher.prefetchCategoryTopPDFs();
        } else if (currentUrl === '/index.html' || currentUrl === '/') {
            // On homepage - prefetch featured job PDFs
            prefetcher.prefetchFeaturedPDFs();
        }

        return prefetcher;
    }

    async prefetchRelatedJobPDFs() {
        try {
            // Fetch jobs.json
            const response = await fetch('/data/jobs.json');
            const data = await response.json();

            // Get current job slug from URL
            const urlParts = window.location.pathname.split('/');
            const currentSlug = urlParts[urlParts.length - 1].replace('.html', '');

            // Find current job
            const currentJob = data.jobs.find(j => j.slug === currentSlug);

            if (currentJob) {
                const toPrefetch = [];

                // Add current job PDF
                if (currentJob.notificationPdf && !currentJob.notificationPdf.startsWith('http')) {
                    const pdfFilename = this.extractFilename(currentJob.notificationPdf);
                    if (pdfFilename) toPrefetch.push(pdfFilename);
                }

                // Add similar category jobs (max 3)
                const similarJobs = data.jobs
                    .filter(j => j.category === currentJob.category && j.id !== currentJob.id)
                    .slice(0, 3);

                similarJobs.forEach(job => {
                    if (job.notificationPdf && !job.notificationPdf.startsWith('http')) {
                        const pdfFilename = this.extractFilename(job.notificationPdf);
                        if (pdfFilename) toPrefetch.push(pdfFilename);
                    }
                });

                console.log('[PDF Prefetch] Prefetching job-related PDFs:', toPrefetch);
                await this.prefetchPDFs(toPrefetch);
            }
        } catch (error) {
            console.warn('[PDF Prefetch] Failed to prefetch related PDFs:', error);
        }
    }

    async prefetchCategoryTopPDFs() {
        try {
            const response = await fetch('/data/jobs.json');
            const data = await response.json();

            // Get top 5 active jobs
            const topJobs = data.jobs
                .filter(j => j.status === 'active')
                .slice(0, 5);

            const toPrefetch = topJobs
                .map(job => job.notificationPdf)
                .filter(pdf => pdf && !pdf.startsWith('http'))
                .map(pdf => this.extractFilename(pdf))
                .filter(Boolean);

            console.log('[PDF Prefetch] Prefetching category top PDFs:', toPrefetch);
            await this.prefetchPDFs(toPrefetch);
        } catch (error) {
            console.warn('[PDF Prefetch] Failed to prefetch category PDFs:', error);
        }
    }

    async prefetchFeaturedPDFs() {
        try {
            const response = await fetch('/data/jobs.json');
            const data = await response.json();

            // Get featured jobs
            const featuredJobs = data.jobs
                .filter(j => j.featured && j.status === 'active')
                .slice(0, 3);

            const toPrefetch = featuredJobs
                .map(job => job.notificationPdf)
                .filter(pdf => pdf && !pdf.startsWith('http'))
                .map(pdf => this.extractFilename(pdf))
                .filter(Boolean);

            console.log('[PDF Prefetch] Prefetching featured PDFs:', toPrefetch);
            await this.prefetchPDFs(toPrefetch);
        } catch (error) {
            console.warn('[PDF Prefetch] Failed to prefetch featured PDFs:', error);
        }
    }

    extractFilename(pdfPath) {
        // Extract filename from paths like:
        // - /pdf-viewer.html?file=kvs-2025.pdf
        // - /notifications/kvs-2025.pdf

        if (pdfPath.includes('?file=')) {
            return pdfPath.split('?file=')[1];
        } else if (pdfPath.includes('/')) {
            return pdfPath.split('/').pop();
        }
        return pdfPath;
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Wait 2 seconds after page load to avoid blocking initial render
        setTimeout(() => {
            window.pdfPrefetcher = PDFPrefetcher.autoPrefetch();
        }, 2000);
    });
} else {
    setTimeout(() => {
        window.pdfPrefetcher = PDFPrefetcher.autoPrefetch();
    }, 2000);
}

// Export for use in other scripts
window.PDFPrefetcher = PDFPrefetcher;
