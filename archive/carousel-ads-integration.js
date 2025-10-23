// AdSense-Compatible Carousel with Ad Reload System
// Handles carousel content switching with automatic ad refreshing

class CarouselAdManager {
    constructor(options = {}) {
        this.carouselContainer = options.container || '.carousel-container';
        this.adSlots = new Map(); // Track active ad slots
        this.currentSlide = 0;
        this.autoRotate = options.autoRotate || false;
        this.rotateInterval = options.rotateInterval || 10000; // 10 seconds
        this.adRefreshDelay = options.adRefreshDelay || 500; // Delay before refreshing ads
        
        this.init();
    }

    init() {
        this.setupCarouselStructure();
        this.bindEvents();
        if (this.autoRotate) {
            this.startAutoRotation();
        }
    }

    setupCarouselStructure() {
        const container = document.querySelector(this.carouselContainer);
        if (!container) {
            console.error('Carousel container not found');
            return;
        }

        // Create carousel HTML structure
        container.innerHTML = `
            <div class="carousel-wrapper">
                <div class="carousel-slides" id="carouselSlides">
                    <!-- Slides will be loaded dynamically -->
                </div>
                
                <!-- Navigation Controls -->
                <div class="carousel-controls">
                    <button class="carousel-btn prev" onclick="carouselManager.previousSlide()">‹</button>
                    <div class="carousel-indicators" id="carouselIndicators">
                        <!-- Indicators will be generated dynamically -->
                    </div>
                    <button class="carousel-btn next" onclick="carouselManager.nextSlide()">›</button>
                </div>
                
                <!-- Ad Slots -->
                <div class="carousel-ads">
                    <div class="ad-slot ad-top" id="carouselAdTop">
                        <div class="ad-placeholder">Advertisement</div>
                        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                        <ins class="adsbygoogle"
                             style="display:block"
                             data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX"
                             data-ad-slot="XXXXXXXXXX"
                             data-ad-format="auto"
                             data-full-width-responsive="true"></ins>
                    </div>
                    
                    <div class="ad-slot ad-sidebar" id="carouselAdSidebar">
                        <div class="ad-placeholder">Advertisement</div>
                        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                        <ins class="adsbygoogle"
                             style="display:block"
                             data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX"
                             data-ad-slot="XXXXXXXXXX"
                             data-ad-format="auto"
                             data-full-width-responsive="true"></ins>
                    </div>
                    
                    <div class="ad-slot ad-bottom" id="carouselAdBottom">
                        <div class="ad-placeholder">Advertisement</div>
                        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                        <ins class="adsbygoogle"
                             style="display:block"
                             data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX"
                             data-ad-slot="XXXXXXXXXX"
                             data-ad-format="auto"
                             data-full-width-responsive="true"></ins>
                    </div>
                </div>
            </div>
        `;

        this.registerAdSlots();
    }

    // Register ad slots for tracking and refreshing
    registerAdSlots() {
        const adElements = document.querySelectorAll('.adsbygoogle');
        adElements.forEach((element, index) => {
            const slotId = `carousel-ad-${index}`;
            this.adSlots.set(slotId, {
                element: element,
                isLoaded: false,
                lastRefresh: Date.now()
            });
        });
    }

    // Load carousel slides with job data
    loadSlides(jobsData) {
        const slidesContainer = document.getElementById('carouselSlides');
        const indicatorsContainer = document.getElementById('carouselIndicators');
        
        // Clear existing content
        slidesContainer.innerHTML = '';
        indicatorsContainer.innerHTML = '';

        jobsData.forEach((job, index) => {
            // Create slide
            const slide = document.createElement('div');
            slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            slide.innerHTML = this.generateSlideContent(job, index);
            slidesContainer.appendChild(slide);

            // Create indicator
            const indicator = document.createElement('div');
            indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
            indicator.onclick = () => this.goToSlide(index);
            indicator.textContent = index + 1;
            indicatorsContainer.appendChild(indicator);
        });

        // Initialize first ad load
        this.refreshAds();
    }

    generateSlideContent(job, index) {
        return `
            <div class="slide-content" data-job-id="${job.jobId}">
                <div class="slide-header">
                    <h2 class="slide-title">${job.display.title}</h2>
                    <p class="slide-subtitle">${job.display.subtitle}</p>
                </div>
                
                <div class="slide-stats">
                    ${job.stats.map(stat => `
                        <div class="stat-item">
                            <div class="stat-number">${stat.number}</div>
                            <div class="stat-label">${stat.label}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="slide-tags">
                    ${job.tags.slice(0, 4).map(tag => `
                        <span class="tag ${tag.clickable ? 'clickable' : ''}" 
                              ${tag.clickable ? `onclick="navigateToTag('${tag.link}')"` : ''}>
                            ${tag.text}
                        </span>
                    `).join('')}
                </div>
                
                <div class="slide-actions">
                    <button class="action-btn primary" onclick="openJobCalculator('${job.jobId}', 'basic')">
                        Calculate Salary
                    </button>
                    <button class="action-btn secondary" onclick="openJobCalculator('${job.jobId}', 'advanced')">
                        Advanced Analysis
                    </button>
                    <button class="action-btn tertiary" onclick="openJobCalculator('${job.jobId}', 'retirement')">
                        Retirement Plan
                    </button>
                </div>
            </div>
        `;
    }

    // Navigation methods
    nextSlide() {
        const totalSlides = document.querySelectorAll('.carousel-slide').length;
        this.goToSlide((this.currentSlide + 1) % totalSlides);
    }

    previousSlide() {
        const totalSlides = document.querySelectorAll('.carousel-slide').length;
        this.goToSlide((this.currentSlide - 1 + totalSlides) % totalSlides);
    }

    goToSlide(slideIndex) {
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.carousel-indicator');
        
        if (slideIndex < 0 || slideIndex >= slides.length) return;

        // Remove active class from current slide and indicator
        slides[this.currentSlide].classList.remove('active');
        indicators[this.currentSlide].classList.remove('active');

        // Add active class to new slide and indicator
        this.currentSlide = slideIndex;
        slides[this.currentSlide].classList.add('active');
        indicators[this.currentSlide].classList.add('active');

        // Refresh ads after slide change
        setTimeout(() => {
            this.refreshAds();
        }, this.adRefreshDelay);

        // Track slide change for analytics
        this.trackSlideChange(slideIndex);
    }

    // Ad refresh functionality
    refreshAds() {
        if (typeof googletag !== 'undefined' && googletag.display) {
            // Using Google Ad Manager (GPT)
            this.refreshGPTAds();
        } else if (typeof adsbygoogle !== 'undefined') {
            // Using AdSense
            this.refreshAdSenseAds();
        }
    }

    refreshGPTAds() {
        // Refresh all ad slots using Google Publisher Tag
        googletag.cmd.push(() => {
            googletag.pubads().refresh();
        });
    }

    refreshAdSenseAds() {
        // For AdSense, we need to reload the ads
        this.adSlots.forEach((slot, slotId) => {
            if (slot.element && Date.now() - slot.lastRefresh > 5000) { // Minimum 5 seconds between refreshes
                try {
                    // Remove old ad
                    const parent = slot.element.parentNode;
                    parent.removeChild(slot.element);
                    
                    // Create new ad element
                    const newAd = document.createElement('ins');
                    newAd.className = 'adsbygoogle';
                    newAd.style.display = 'block';
                    newAd.setAttribute('data-ad-client', slot.element.getAttribute('data-ad-client'));
                    newAd.setAttribute('data-ad-slot', slot.element.getAttribute('data-ad-slot'));
                    newAd.setAttribute('data-ad-format', 'auto');
                    newAd.setAttribute('data-full-width-responsive', 'true');
                    
                    parent.appendChild(newAd);
                    
                    // Push new ad
                    (adsbygoogle = window.adsbygoogle || []).push({});
                    
                    // Update slot reference
                    slot.element = newAd;
                    slot.lastRefresh = Date.now();
                } catch (error) {
                    console.warn('Ad refresh failed:', error);
                }
            }
        });
    }

    // Auto-rotation functionality
    startAutoRotation() {
        this.rotationTimer = setInterval(() => {
            this.nextSlide();
        }, this.rotateInterval);
    }

    stopAutoRotation() {
        if (this.rotationTimer) {
            clearInterval(this.rotationTimer);
            this.rotationTimer = null;
        }
    }

    // Event binding
    bindEvents() {
        // Pause auto-rotation on hover
        const container = document.querySelector(this.carouselContainer);
        if (container) {
            container.addEventListener('mouseenter', () => {
                this.stopAutoRotation();
            });
            
            container.addEventListener('mouseleave', () => {
                if (this.autoRotate) {
                    this.startAutoRotation();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });

        // Touch/swipe support for mobile
        let startX = 0;
        let endX = 0;

        container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        container.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        });
    }

    // Analytics tracking
    trackSlideChange(slideIndex) {
        // Google Analytics 4 event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'carousel_slide_change', {
                'slide_index': slideIndex,
                'slide_position': slideIndex + 1,
                'total_slides': document.querySelectorAll('.carousel-slide').length
            });
        }

        // Custom tracking
        if (typeof window.customAnalytics !== 'undefined') {
            window.customAnalytics.track('carousel_interaction', {
                action: 'slide_change',
                slide: slideIndex
            });
        }
    }
}

// Carousel-specific CSS styles
const carouselStyles = `
    <style>
        .carousel-container {
            max-width: 1200px;
            margin: 0 auto;
            position: relative;
            background: #ffffff;
            border: 3px solid #333333;
            box-shadow: 8px 8px 0px #333333;
        }

        .carousel-wrapper {
            position: relative;
            overflow: hidden;
        }

        .carousel-slides {
            display: flex;
            transition: transform 0.5s ease-in-out;
        }

        .carousel-slide {
            min-width: 100%;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.5s ease-in-out;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
        }

        .carousel-slide.active {
            opacity: 1;
            transform: translateX(0);
            position: relative;
        }

        .slide-content {
            padding: 40px;
            text-align: center;
        }

        .slide-header {
            margin-bottom: 30px;
            border-bottom: 2px solid #333333;
            padding-bottom: 20px;
        }

        .slide-title {
            font-size: 28px;
            font-weight: 900;
            color: #333333;
            margin-bottom: 8px;
            font-family: ui-monospace, monospace;
        }

        .slide-subtitle {
            font-size: 16px;
            color: #666666;
            font-weight: 600;
        }

        .slide-stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 30px;
        }

        .stat-item {
            padding: 20px;
            border: 2px solid #333333;
            background: #f8f8f8;
            transition: all 0.3s ease;
        }

        .stat-item:hover {
            background: #333333;
            color: #ffffff;
            transform: scale(1.05);
        }

        .stat-number {
            font-size: 20px;
            font-weight: 900;
            margin-bottom: 6px;
        }

        .stat-label {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: 0.8;
        }

        .slide-tags {
            margin-bottom: 30px;
            display: flex;
            justify-content: center;
            gap: 10px;
            flex-wrap: wrap;
        }

        .slide-tags .tag {
            background: #333333;
            color: #ffffff;
            padding: 8px 16px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .slide-tags .tag:hover {
            background: #000000;
            transform: scale(1.05);
        }

        .slide-actions {
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
        }

        .action-btn {
            padding: 12px 24px;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            border: 2px solid #333333;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: inherit;
        }

        .action-btn.primary {
            background: #333333;
            color: #ffffff;
        }

        .action-btn.primary:hover {
            background: #000000;
            transform: scale(1.05);
        }

        .action-btn.secondary {
            background: #ffffff;
            color: #333333;
        }

        .action-btn.secondary:hover {
            background: #333333;
            color: #ffffff;
        }

        .action-btn.tertiary {
            background: #f0f8ff;
            color: #333333;
        }

        .action-btn.tertiary:hover {
            background: #333333;
            color: #ffffff;
        }

        .carousel-controls {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 40px;
            border-top: 2px solid #333333;
            background: #f8f8f8;
        }

        .carousel-btn {
            width: 50px;
            height: 50px;
            border: 2px solid #333333;
            background: #ffffff;
            font-size: 24px;
            font-weight: 900;
            color: #333333;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .carousel-btn:hover {
            background: #333333;
            color: #ffffff;
            transform: scale(1.1);
        }

        .carousel-indicators {
            display: flex;
            gap: 10px;
        }

        .carousel-indicator {
            width: 40px;
            height: 40px;
            border: 2px solid #333333;
            background: #ffffff;
            color: #333333;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 14px;
        }

        .carousel-indicator.active,
        .carousel-indicator:hover {
            background: #333333;
            color: #ffffff;
        }

        .carousel-ads {
            position: relative;
        }

        .ad-slot {
            margin: 20px 0;
            min-height: 100px;
            border: 1px solid #dddddd;
            position: relative;
            text-align: center;
        }

        .ad-placeholder {
            padding: 20px;
            color: #999999;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .ad-top {
            margin-bottom: 20px;
        }

        .ad-sidebar {
            position: absolute;
            right: -320px;
            top: 0;
            width: 300px;
            height: 600px;
        }

        .ad-bottom {
            margin-top: 20px;
        }

        @media (max-width: 768px) {
            .slide-stats {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .slide-actions {
                flex-direction: column;
            }
            
            .action-btn {
                width: 100%;
            }
            
            .carousel-controls {
                padding: 15px 20px;
            }
            
            .carousel-btn {
                width: 40px;
                height: 40px;
                font-size: 20px;
            }
            
            .carousel-indicator {
                width: 30px;
                height: 30px;
                font-size: 12px;
            }
            
            .ad-sidebar {
                display: none;
            }
        }
    </style>
`;

// Utility functions for carousel integration
function openJobCalculator(jobId, mode) {
    const url = templateManager.getJobUrl(jobId, mode);
    window.open(url, '_blank');
}

// Initialize carousel manager
let carouselManager;

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add carousel styles to head
    document.head.insertAdjacentHTML('beforeend', carouselStyles);
    
    // Initialize carousel with featured jobs
    const featuredJobs = [
        JOB_DATABASE.ias,
        JOB_DATABASE.ips,
        JOB_DATABASE.ssc_cgl
    ];
    
    carouselManager = new CarouselAdManager({
        container: '.carousel-container',
        autoRotate: true,
        rotateInterval: 12000, // 12 seconds
        adRefreshDelay: 800
    });
    
    carouselManager.loadSlides(featuredJobs);
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CarouselAdManager };
}