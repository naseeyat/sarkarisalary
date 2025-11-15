/**
 * Job Page Component Library
 * Dynamically renders job page sections from jobs.json data
 */

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Calculate days remaining until last date
 */
function calculateDaysRemaining(lastDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const end = new Date(lastDate);
    end.setHours(0, 0, 0, 0);

    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? diff : 0;
}

/**
 * Check if job is expired
 */
function isJobExpired(lastDate) {
    return calculateDaysRemaining(lastDate) <= 0;
}

/**
 * Check if job is new (added within last 7 days)
 */
function isJobNew(addedOn) {
    const today = new Date();
    const added = new Date(addedOn);
    const diffDays = Math.ceil((today - added) / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
}

/**
 * Format date to DD MMM YYYY
 */
function formatDate(dateStr) {
    if (!dateStr) return 'Not specified';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).toUpperCase();
}

/**
 * Capitalize state names
 */
function formatStateName(slug) {
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// ============================================================================
// COMPONENT RENDERERS
// ============================================================================

/**
 * Render Breadcrumb Navigation
 */
function renderBreadcrumb(job) {
    const categoryMap = {
        'banking-jobs': 'Banking Jobs',
        'teaching-jobs': 'Teaching Jobs',
        'railway-jobs': 'Railway Jobs',
        'defense-jobs': 'Defense Jobs',
        'ssc-jobs': 'SSC Jobs',
        'state-jobs': 'State Jobs'
    };

    const categoryName = categoryMap[job.category] || 'Jobs';
    const categoryUrl = job.category ? `../categories/${job.category}.html` : '../index.html';

    return `
        <style>
            .breadcrumb {
                font-size: 12px;
                margin-bottom: 15px;
                color: #666666;
            }
            .breadcrumb a {
                color: #0066cc;
                text-decoration: none;
            }
            .breadcrumb a:hover {
                text-decoration: underline;
            }
        </style>
        <div class="breadcrumb">
            <a href="../index.html">Home</a> →
            <a href="${categoryUrl}">${categoryName}</a> →
            ${job.shortTitle || job.title}
        </div>
    `;
}

/**
 * Render Job Alert Bar
 * Auto-determines status from lastDate
 */
function renderJobAlert(job) {
    const daysLeft = calculateDaysRemaining(job.lastDate);
    const isActive = daysLeft > 0;
    const statusClass = isActive ? 'active' : 'closed';
    const emoji = isActive ? '🟢' : '🔴';
    const statusText = isActive ? 'APPLICATIONS OPEN' : 'APPLICATIONS CLOSED';

    return `
        <style>
            .job-alert {
                position: sticky;
                top: 0;
                z-index: 100;
                border: 3px solid #333333;
                text-align: center;
                padding: 12px;
                font-weight: 900;
                font-size: 12px;
                letter-spacing: 1.5px;
                margin-bottom: 30px;
            }
            .job-alert.active {
                background: #00aa00;
                color: #ffffff;
            }
            .job-alert.closed {
                background: #ff4444;
                color: #ffffff;
            }
        </style>
        <div class="job-alert ${statusClass}">
            ${emoji} ${statusText} •
            ${job.posts} POSTS •
            LAST DATE: ${formatDate(job.lastDate)}${isActive ? ` • ${daysLeft} DAYS REMAINING` : ''}
        </div>
    `;
}

/**
 * Render Job Header with Title and Meta Tags
 */
function renderJobHeader(job) {
    const isNew = isJobNew(job.addedOn);
    const daysLeft = calculateDaysRemaining(job.lastDate);
    const isClosingSoon = daysLeft <= 7 && daysLeft > 0;

    // Build meta tags
    const tags = [];
    if (isNew) tags.push('<span class="meta-tag green">NEW</span>');
    tags.push(`<span class="meta-tag">${job.posts.toLocaleString()}+ POSTS</span>`);

    if (job.states.includes('all-india')) {
        tags.push('<span class="meta-tag">ALL INDIA</span>');
    } else if (job.states.length > 1) {
        tags.push(`<span class="meta-tag">${job.states.length} STATES</span>`);
    }

    if (job.multiPost) {
        tags.push('<span class="meta-tag">MULTIPLE POSTS</span>');
    }

    if (isClosingSoon) {
        tags.push('<span class="meta-tag red">CLOSING SOON</span>');
    }

    return `
        <div style="padding: 40px 0 30px; border-bottom: 3px solid #333333;">
            ${renderBreadcrumb(job)}
            <h1 style="font-size: 28px; font-weight: 900; margin-bottom: 15px; letter-spacing: 1px; line-height: 1.3;">
                ${job.title}
            </h1>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                ${tags.join('\n                ')}
            </div>
        </div>

        <style>
            .meta-tag {
                background: #333333;
                color: #ffffff;
                padding: 6px 12px;
                font-size: 10px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .meta-tag.red { background: #ff4444; }
            .meta-tag.green { background: #00aa00; }
        </style>
    `;
}

/**
 * Render Quick Info Grid (KVS-NVS style - single box with grid inside)
 */
function renderQuickInfo(job) {
    const items = [
        {
            label: 'Total Posts',
            value: job.posts.toLocaleString() + ' Vacancies'
        },
        {
            label: 'Organization',
            value: job.organization
        },
        {
            label: 'Qualification',
            value: job.qualification
        },
        {
            label: 'Age Limit',
            value: `${job.minAge}-${job.maxAge} years` + (job.category === 'teaching-jobs' ? ' (varies by post)' : '')
        },
        {
            label: 'Application Fee',
            value: job.applicationFee.general
        },
        {
            label: 'Selection Process',
            value: job.selectionProcess || '2-Tier CBT + Interview'
        },
        {
            label: 'Apply Mode',
            value: 'Online Only'
        },
        {
            label: 'Job Location',
            value: job.states.includes('all-india') ? 'All India (Pan India Posting)' : job.states.map(s => formatStateName(s)).join(', ')
        }
    ];

    return `
        <div class="info-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: #333333; border: 3px solid #333333; margin: 30px 0;">
            ${items.map(item => `
                <div style="background: #ffffff; padding: 20px;">
                    <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #666666; font-weight: 700; margin-bottom: 8px;">${item.label}</div>
                    <div style="font-size: 14px; font-weight: 700;">${item.value}</div>
                </div>
            `).join('')}
        </div>

        <style>
            @media (max-width: 768px) {
                .info-grid {
                    grid-template-columns: 1fr !important;
                }
            }
        </style>
    `;
}

/**
 * Render Salary Highlight Box
 */
function renderSalaryBox(job) {
    const salaryText = job.salary.range || job.salary.stipend || job.salary.basic;
    const note = job.salary.note || '';

    return `
        <div style="background: #fffacd; border: 3px solid #333; padding: 25px; margin: 30px 0;">
            <h2 style="font-size: 20px; font-weight: 900; margin-bottom: 15px; text-transform: uppercase;">
                💰 SALARY & BENEFITS
            </h2>
            <div style="font-size: 24px; font-weight: 900; color: #333; margin: 15px 0;">
                ${salaryText}
            </div>
            ${note ? `<p style="font-size: 14px; color: #666; margin-top: 10px;">${note}</p>` : ''}
            <a href="/salaries/${job.slug}.html"
               style="display: inline-block; margin-top: 15px; background: #333; color: #fff; padding: 12px 20px; text-decoration: none; font-weight: 700; font-size: 12px; text-transform: uppercase;">
                VIEW DETAILED SALARY BREAKDOWN →
            </a>
        </div>
    `;
}

/**
 * Render Career Journey Link (appears after salary box)
 */
function renderCareerJourneyLink(job) {
    if (!job.careerJourneySlug) return '';

    return `
        <a href="/career/${job.careerJourneySlug}.html"
           style="display: flex; justify-content: space-between; align-items: center;
                  background: #f0f8ff; color: #333; padding: 20px 25px;
                  text-decoration: none; border: 3px solid #1890ff;
                  font-weight: 900; font-size: 14px; text-transform: uppercase;
                  letter-spacing: 1px; margin: 30px 0; transition: all 0.2s;">
            <span>📊 VIEW COMPLETE CAREER JOURNEY & SALARY PROGRESSION</span>
            <span style="font-size: 20px;">→</span>
        </a>

        <style>
            a[href^="/career/"]:hover {
                background: #1890ff;
                color: #ffffff;
                transform: translateX(5px);
            }
        </style>
    `;
}

/**
 * Render Important Dates Table
 */
function renderDatesTable(job) {
    const dates = [
        { label: 'Notification Date', value: job.notificationDate },
        { label: 'Application Start', value: job.applicationStart },
        { label: 'Last Date to Apply', value: job.lastDate, highlight: true },
        { label: 'Exam Date', value: job.examDate || 'To be announced' }
    ];

    return `
        <div style="margin: 30px 0;">
            <h2 style="font-size: 20px; font-weight: 900; margin-bottom: 20px; text-transform: uppercase; border-bottom: 2px solid #333; padding-bottom: 10px;">
                📅 IMPORTANT DATES
            </h2>
            <table style="width: 100%; border-collapse: collapse; border: 3px solid #333;">
                <thead>
                    <tr style="background: #f8f8f8;">
                        <th style="border: 1px solid #333; padding: 12px; text-align: left; font-weight: 700; text-transform: uppercase; font-size: 12px;">Event</th>
                        <th style="border: 1px solid #333; padding: 12px; text-align: left; font-weight: 700; text-transform: uppercase; font-size: 12px;">Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${dates.map(date => `
                        <tr style="${date.highlight ? 'background: #fffacd;' : ''}">
                            <td style="border: 1px solid #333; padding: 12px; font-weight: 700; font-size: 14px;">${date.label}</td>
                            <td style="border: 1px solid #333; padding: 12px; font-weight: ${date.highlight ? '900' : '600'}; font-size: 14px; color: ${date.highlight ? '#d9534f' : '#333'};">
                                ${formatDate(date.value)}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

/**
 * Render Important Links (Enhanced Urban Style)
 */
function renderImportantLinks(job) {
    const applyButton = job.applyLink ? `
        <a href="${job.applyLink}" target="_blank"
           style="display: flex; justify-content: space-between; align-items: center; background: #00aa00; color: #fff; padding: 18px 25px; text-decoration: none; border: 3px solid #333; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; transition: all 0.2s;">
            <span>🚀 Apply Online</span>
            <span style="font-size: 20px;">→</span>
        </a>
    ` : '';

    const pdfButton = job.notificationPdf ? `
        <a href="../pdf-viewer.html?file=${job.notificationPdf}" target="_blank"
           style="display: flex; justify-content: space-between; align-items: center; background: #333333; color: #fff; padding: 18px 25px; text-decoration: none; border: 3px solid #333; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; transition: all 0.2s;">
            <span>📄 View Notification PDF</span>
            <span style="font-size: 20px;">→</span>
        </a>
    ` : '';

    const officialWebsite = job.officialWebsite ? `
        <a href="${job.officialWebsite}" target="_blank"
           style="display: flex; justify-content: space-between; align-items: center; background: #ffffff; color: #333; padding: 18px 20px; text-decoration: none; border: 3px solid #333; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; transition: all 0.2s;">
            <span>🏢 Official Website</span>
            <span style="font-size: 16px;">→</span>
        </a>
    ` : '';

    const syllabusLink = job.syllabusLink ? `
        <a href="${job.syllabusLink}" target="_blank"
           style="display: flex; justify-content: space-between; align-items: center; background: #ffffff; color: #333; padding: 18px 20px; text-decoration: none; border: 3px solid #333; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; transition: all 0.2s;">
            <span>📚 Download Syllabus</span>
            <span style="font-size: 16px;">→</span>
        </a>
    ` : '';

    return `
        <div style="margin: 30px 0; padding: 30px; border: 3px solid #333;">
            <h2 style="font-size: 18px; font-weight: 900; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">
                🔗 Important Links
            </h2>
            <div style="display: grid; gap: 12px; margin-top: 20px;">
                ${applyButton}
                ${pdfButton}
                ${(officialWebsite || syllabusLink) ? `
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                        ${officialWebsite}
                        ${syllabusLink}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

/**
 * Render Post Breakdown Table (for multi-post jobs)
 */
function renderPostBreakdown(job) {
    if (!job.postBreakdown || job.postBreakdown.length === 0) {
        return '';
    }

    const teachingPosts = job.postBreakdown.filter(p => p.category === 'teaching' || p.type === 'teaching');
    const nonTeachingPosts = job.postBreakdown.filter(p => p.category === 'non-teaching' || p.type === 'non-teaching');

    const renderTable = (posts, title) => {
        if (posts.length === 0) return '';
        return `
            <h3 style="margin: 20px 0 15px; font-size: 16px; font-weight: 900;">${title}:</h3>
            <table style="width: 100%; border-collapse: collapse; border: 3px solid #333;">
                <tr>
                    <th style="border: 1px solid #333; padding: 12px; text-align: left; background: #333; color: #fff; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Post Name</th>
                    <th style="border: 1px solid #333; padding: 12px; text-align: left; background: #333; color: #fff; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Vacancies</th>
                    <th style="border: 1px solid #333; padding: 12px; text-align: left; background: #333; color: #fff; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Approx. Salary</th>
                </tr>
                ${posts.map(post => `
                    <tr>
                        <td style="border: 1px solid #333; padding: 12px; font-size: 13px;">${post.postName}</td>
                        <td style="border: 1px solid #333; padding: 12px; font-size: 13px;">${post.posts}</td>
                        <td style="border: 1px solid #333; padding: 12px; font-size: 13px;">${post.salary.range || post.salary.basic}</td>
                    </tr>
                `).join('')}
            </table>
        `;
    };

    return `
        <div style="margin: 40px 0; padding: 30px; border: 3px solid #333;">
            <h2 style="font-size: 18px; font-weight: 900; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">
                📝 Post-Wise Vacancy Details
            </h2>
            ${renderTable(teachingPosts, 'TEACHING POSTS')}
            ${renderTable(nonTeachingPosts, 'NON-TEACHING POSTS')}
            ${teachingPosts.length === 0 && nonTeachingPosts.length === 0 ? renderTable(job.postBreakdown, 'ALL POSTS') : ''}
        </div>
    `;
}

/**
 * Render Benefits / Why Apply Section
 */
function renderBenefits(job) {
    if (!job.benefits || job.benefits.length === 0) {
        return '';
    }

    return `
        <div style="margin: 40px 0; padding: 30px; border: 3px solid #333; background: #fffacd;">
            <h2 style="font-size: 18px; font-weight: 900; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">
                ⭐ Why Apply for ${job.organization}?
            </h2>
            <ul style="padding-left: 20px; line-height: 2.5; font-size: 14px; list-style: none;">
                ${job.benefits.map(benefit => `
                    <li>✅ <strong>${benefit.split(':')[0]}:</strong> ${benefit.split(':')[1] || benefit}</li>
                `).join('')}
            </ul>
        </div>
    `;
}

/**
 * Render Final Apply Button
 */
function renderFinalApplyButton(job) {
    if (!job.applyLink) return '';

    const daysLeft = calculateDaysRemaining(job.lastDate);

    return `
        <div style="margin: 30px 0; text-align: center;">
            <a href="${job.applyLink}" target="_blank"
               style="display: inline-block; background: #333333; color: #ffffff; padding: 18px 40px; font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; text-decoration: none; border: 3px solid #333333; transition: all 0.2s;">
                APPLY ONLINE NOW →
            </a>
            <p style="margin-top: 15px; font-size: 12px; color: #666666;">
                Last Date: ${formatDate(job.lastDate)} | ${daysLeft > 0 ? `${daysLeft} days remaining` : 'Applications Closed'}
            </p>
        </div>
    `;
}

/**
 * Render Unique Features (if available)
 */
function renderUniqueFeatures(job) {
    if (!job.uniqueFeatures || job.uniqueFeatures.length === 0) {
        return '';
    }

    return `
        <div style="background: #f0f8ff; border: 3px solid #1890ff; padding: 25px; margin: 30px 0;">
            <h2 style="font-size: 20px; font-weight: 900; margin-bottom: 15px; text-transform: uppercase; color: #0050b3;">
                ⭐ UNIQUE FEATURES
            </h2>
            <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
                ${job.uniqueFeatures.map(feature => `
                    <li style="margin-bottom: 10px; font-size: 14px; font-weight: 600;">${feature}</li>
                `).join('')}
            </ul>
        </div>
    `;
}

/**
 * Render Important Notes (if available)
 */
function renderImportantNotes(job) {
    if (!job.importantNotes || job.importantNotes.length === 0) {
        return '';
    }

    return `
        <div style="background: #fff3cd; border: 3px solid #ff9800; padding: 25px; margin: 30px 0;">
            <h2 style="font-size: 20px; font-weight: 900; margin-bottom: 15px; text-transform: uppercase; color: #e65100;">
                ⚠️ IMPORTANT NOTES
            </h2>
            <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
                ${job.importantNotes.map(note => `
                    <li style="margin-bottom: 10px; font-size: 14px; font-weight: 600;">${note}</li>
                `).join('')}
            </ul>
        </div>
    `;
}

/**
 * Render Application Fee Table
 */
function renderApplicationFee(job) {
    const fees = Object.entries(job.applicationFee).map(([category, amount]) => ({
        category: category.toUpperCase(),
        amount: amount
    }));

    return `
        <div style="margin: 30px 0;">
            <h2 style="font-size: 20px; font-weight: 900; margin-bottom: 20px; text-transform: uppercase; border-bottom: 2px solid #333; padding-bottom: 10px;">
                💳 APPLICATION FEE
            </h2>
            <table style="width: 100%; border-collapse: collapse; border: 3px solid #333;">
                <thead>
                    <tr style="background: #f8f8f8;">
                        <th style="border: 1px solid #333; padding: 12px; text-align: left; font-weight: 700; text-transform: uppercase; font-size: 12px;">Category</th>
                        <th style="border: 1px solid #333; padding: 12px; text-align: left; font-weight: 700; text-transform: uppercase; font-size: 12px;">Fee</th>
                    </tr>
                </thead>
                <tbody>
                    ${fees.map(fee => `
                        <tr>
                            <td style="border: 1px solid #333; padding: 12px; font-weight: 700; font-size: 14px;">${fee.category}</td>
                            <td style="border: 1px solid #333; padding: 12px; font-weight: 600; font-size: 14px;">${fee.amount}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// ============================================================================
// MASTER RENDER FUNCTION
// ============================================================================

/**
 * Render complete job page
 * Call this with job data to populate all sections
 *
 * Order matches production KVS-NVS page:
 * 1. Job Header (breadcrumb + title + meta tags)
 * 2. Salary Box (yellow highlight)
 * 3. Quick Info Grid (8 boxes)
 * 4. Important Dates Table
 * 5. Important Links (green apply + PDF)
 * 6. Post Breakdown (if multi-post)
 * 7. Application Fee
 * 8. Features/Notes
 * 9. Benefits (yellow box)
 * 10. Final Apply Button
 */
function renderJobPage(job, options = {}) {
    const sections = {
        header: options.header !== false,
        salary: options.salary !== false,
        quickInfo: options.quickInfo !== false,
        dates: options.dates !== false,
        links: options.links !== false,
        postBreakdown: options.postBreakdown !== false,
        fee: options.fee !== false,
        features: options.features !== false,
        notes: options.notes !== false,
        benefits: options.benefits !== false,
        finalButton: options.finalButton !== false
    };

    let html = '';

    // Header with breadcrumb, title, meta tags
    if (sections.header) html += renderJobHeader(job);

    // Salary prominent box
    if (sections.salary) html += renderSalaryBox(job);

    // Career journey link (after salary)
    html += renderCareerJourneyLink(job);

    // Quick info grid (8 boxes)
    if (sections.quickInfo) html += renderQuickInfo(job);

    // Important dates table
    if (sections.dates) html += renderDatesTable(job);

    // Important links (apply, PDF, etc)
    if (sections.links) html += renderImportantLinks(job);

    // Post breakdown table (teaching/non-teaching)
    if (sections.postBreakdown) html += renderPostBreakdown(job);

    // Application fee table
    if (sections.fee) html += renderApplicationFee(job);

    // Unique features
    if (sections.features) html += renderUniqueFeatures(job);

    // Important notes
    if (sections.notes) html += renderImportantNotes(job);

    // Benefits section (yellow box)
    if (sections.benefits) html += renderBenefits(job);

    // Final apply button
    if (sections.finalButton) html += renderFinalApplyButton(job);

    return html;
}

console.log('✅ Job Components Library Loaded');
