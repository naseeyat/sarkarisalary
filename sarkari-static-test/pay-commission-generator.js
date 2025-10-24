#!/usr/bin/env node

// Dynamic Pay Commission Page Generator
const fs = require('fs');
const path = require('path');

// Load pay commission data
const payCommissionData = JSON.parse(fs.readFileSync('./pay-commission-data.json', 'utf8'));

function generatePayCommissionPages() {
    console.log('🏗️  Generating pay commission pages...');
    
    const commissions = payCommissionData.payCommissions;
    const navigation = payCommissionData.navigation;
    
    Object.entries(commissions).forEach(([key, data]) => {
        console.log(`📄 Generating ${key} pay commission page...`);
        
        const pageContent = generatePageContent(key, data, navigation, commissions);
        const filename = key === navigation.currentCommission 
            ? 'pay-scale-chart.html' 
            : `${key}-pay-commission.html`;
            
        fs.writeFileSync(`../prod/${filename}`, pageContent);
        console.log(`✅ Generated: ${filename}`);
    });
    
    // Generate grade pay explanation with dynamic links
    generateGradePayPage();
    
    console.log('🎉 All pay commission pages generated!');
}

function generatePageContent(commissionKey, data, navigation, allCommissions) {
    const isCurrentCommission = commissionKey === navigation.currentCommission;
    const statusBadge = data.status === 'current' ? 'CURRENT' : 
                       data.status === 'upcoming' ? 'UPCOMING' : 'HISTORICAL';
    const headerColor = data.status === 'current' ? '#333333' :
                       data.status === 'upcoming' ? '#1890ff' : '#666666';
    
    // Generate navigation buttons
    const navButtons = generateNavigationButtons(commissionKey, navigation, allCommissions);
    
    // Generate table based on commission type
    const tableContent = data.structure === 'Pay Band + Grade Pay' 
        ? generateGradePayTable(data.gradePays)
        : data.status === 'upcoming'
        ? generateProjectedTable(data.projectedLevels)
        : generatePayLevelTable(data.payLevels);
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title} - Government Pay Scale Chart</title>
    <meta name="description" content="${data.title} salary structure and pay scale guide.">
    <link rel="icon" type="image/svg+xml" href="favicon.svg">
    
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-VCKVNDH46X"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-VCKVNDH46X');
    </script>
    
    <!-- Global JavaScript -->
    <script src="global.js"></script>
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: ui-monospace, SFMono-Regular, monospace;
            background: #ffffff; color: #333333; line-height: 1.4; font-size: 14px;
        }
        .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
        .header {
            text-align: center; margin-bottom: 40px; border: 3px solid #333333;
            padding: 40px; background: #ffffff; box-shadow: 8px 8px 0px #333333;
        }
        .main-title {
            font-size: 36px; font-weight: 900; color: #333333;
            margin-bottom: 12px; letter-spacing: 2px;
        }
        .subtitle { font-size: 16px; color: #666666; margin-bottom: 20px; font-weight: 600; }
        .back-link {
            display: inline-block; padding: 8px 16px; background: #333333; color: #ffffff;
            text-decoration: none; font-weight: 700; font-size: 11px; text-transform: uppercase;
            letter-spacing: 1px; margin: 5px;
        }
        .back-link:hover { background: #000000; }
        .pay-scale-table {
            border: 3px solid #333333; background: #ffffff; box-shadow: 6px 6px 0px #333333;
            margin-bottom: 30px; overflow-x: auto;
        }
        .table-header {
            padding: 20px; background: ${headerColor}; color: #ffffff; font-size: 14px;
            font-weight: 700; text-transform: uppercase; letter-spacing: 1px; text-align: center;
        }
        table { width: 100%; border-collapse: collapse; }
        th, td {
            border: 1px solid #333333; padding: 12px 8px; text-align: center; font-size: 14px;
        }
        th { background: #f8f8f8; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
        td { font-weight: 600; }
        .grade-column { background: #f8f8f8; font-weight: 700; }
        .salary-amount { font-weight: 900; color: #333333; }
        .expected-amount { font-weight: 900; color: #1890ff; }
        @media (max-width: 768px) {
            .container { padding: 20px 15px; }
            .main-title { font-size: 28px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
            <a href="index.html" class="back-link">🏠 Home</a>
            <a href="grade-pay-explained.html" class="back-link">📚 Grade Pay Explained</a>
        </div>
        
        <header class="header">
            <h1 class="main-title">${data.title}</h1>
            <p class="subtitle">${getSubtitle(data)}</p>
            
            ${navButtons}
            
            <div style="margin-top: 15px; font-size: 11px; color: #666; text-align: center;">
                ${getTimeline(data)}
            </div>
        </header>

        ${getNoticeBox(data)}

        <div class="pay-scale-table">
            <div class="table-header">${getTableHeader(data)}</div>
            ${tableContent}
        </div>

        ${getInfoSections(data)}

        <div style="text-align: center; margin-top: 40px;">
            ${getActionButtons(commissionKey, navigation)}
        </div>

        <div style="text-align: center; margin-top: 20px;">
            <a href="index.html" class="back-link">🏠 Home</a>
        </div>
    </div>
</body>
</html>`;
}

function generateNavigationButtons(currentKey, navigation, allCommissions) {
    const buttons = [];
    
    // Previous commission
    if (currentKey !== '6th') {
        const prevKey = currentKey === '8th' ? '7th' : '6th';
        const prevTitle = allCommissions[prevKey].title;
        const prevUrl = prevKey === navigation.currentCommission ? 'pay-scale-chart.html' : `${prevKey}-pay-commission.html`;
        buttons.push(`<a href="${prevUrl}" style="text-decoration: none; color: #333; font-size: 12px; font-weight: 600; padding: 8px 12px; border: 2px solid #333; background: #f8f8f8; transition: all 0.2s ease;" onmouseover="this.style.background='#333'; this.style.color='white'" onmouseout="this.style.background='#f8f8f8'; this.style.color='#333'">← ${prevTitle}</a>`);
    }
    
    // Current commission indicator
    const statusColor = currentKey === navigation.currentCommission ? '#333333' : 
                       currentKey === '8th' ? '#1890ff' : '#666666';
    const statusText = currentKey === navigation.currentCommission ? 'CURRENT' :
                      currentKey === '8th' ? 'UPCOMING' : 'HISTORICAL';
    buttons.push(`<div style="padding: 8px 16px; background: ${statusColor}; color: white; font-size: 12px; font-weight: 700; letter-spacing: 1px;">${allCommissions[currentKey].title.toUpperCase()} (${statusText})</div>`);
    
    // Next commission
    if (currentKey !== '8th') {
        const nextKey = currentKey === '6th' ? '7th' : '8th';
        const nextTitle = allCommissions[nextKey].title;
        const nextUrl = nextKey === navigation.currentCommission ? 'pay-scale-chart.html' : `${nextKey}-pay-commission.html`;
        buttons.push(`<a href="${nextUrl}" style="text-decoration: none; color: #333; font-size: 12px; font-weight: 600; padding: 8px 12px; border: 2px solid #333; background: #f8f8f8; transition: all 0.2s ease;" onmouseover="this.style.background='#333'; this.style.color='white'" onmouseout="this.style.background='#f8f8f8'; this.style.color='#333'">${nextTitle} →</a>`);
    }
    
    return `<div style="margin-top: 25px; display: flex; justify-content: center; align-items: center; gap: 20px; flex-wrap: wrap;">${buttons.join('')}</div>`;
}

// Helper functions
function getSubtitle(data) {
    if (data.status === 'current') return `Complete Salary Structure Based on ${data.title}`;
    if (data.status === 'upcoming') return `Expected Government Salary Structure (${data.period})`;
    return `Historical Government Salary Structure (${data.period})`;
}

function getTimeline(data) {
    if (data.status === 'current') return `Effective from: ${data.effective} • Next revision: ${data.nextRevision}`;
    if (data.status === 'upcoming') return `Expected implementation: ${data.effective} • Committee formation: ${data.formation}`;
    return `Effective from: ${data.effective} • Superseded by: ${data.superseded}`;
}

function getNoticeBox(data) {
    if (data.status === 'historical') {
        return `<div style="background: #fff8dc; border: 2px solid #daa520; padding: 20px; margin-bottom: 30px; text-align: center;">
            <div style="font-weight: 700; color: #8b6914; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">⚠️ Historical Data</div>
            <div>This pay structure is no longer in effect. For current salaries, refer to the 7th Pay Commission.</div>
        </div>`;
    }
    if (data.status === 'upcoming') {
        return `<div style="background: #e6f7ff; border: 2px solid #1890ff; padding: 20px; margin-bottom: 30px; text-align: center;">
            <div style="font-weight: 700; color: #0050b3; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">🚀 Upcoming Changes</div>
            <div>These are expected projections based on historical patterns. Official announcement pending.</div>
        </div>`;
    }
    return '';
}

function getTableHeader(data) {
    if (data.status === 'upcoming') return `Expected ${data.title} Salary Structure`;
    if (data.status === 'historical') return `${data.title} Pay Bands (Historical)`;
    return `Central Government Pay Scale Matrix`;
}

function generateGradePayTable(gradePays) {
    const rows = gradePays.map(gp => `
        <tr>
            <td class="grade-column">₹${gp.amount}</td>
            <td class="salary-amount">₹${(5200 + gp.amount).toLocaleString()}</td>
            <td>${gp.posts}</td>
        </tr>
    `).join('');
    
    return `<table>
        <thead>
            <tr><th>Grade Pay</th><th>Entry Basic Pay</th><th>Common Posts</th></tr>
        </thead>
        <tbody>${rows}</tbody>
    </table>`;
}

function generatePayLevelTable(payLevels) {
    const rows = payLevels.map(level => `
        <tr>
            <td class="grade-column">Level ${level.level}</td>
            <td>₹${level.entry.toLocaleString()} - ₹${level.max.toLocaleString()}</td>
            <td class="salary-amount">₹${level.entry.toLocaleString()}</td>
            <td class="salary-amount">₹${level.max.toLocaleString()}</td>
            <td>${level.posts}</td>
        </tr>
    `).join('');
    
    return `<table>
        <thead>
            <tr><th>Pay Level</th><th>Basic Pay Range</th><th>Entry Pay</th><th>Max Pay</th><th>Common Posts</th></tr>
        </thead>
        <tbody>${rows}</tbody>
    </table>`;
}

function generateProjectedTable(projectedLevels) {
    const rows = projectedLevels.map(level => `
        <tr>
            <td class="grade-column">Level ${level.level}</td>
            <td class="salary-amount">₹${level.current.toLocaleString()}</td>
            <td class="expected-amount">₹${level.expected.toLocaleString()}</td>
            <td style="color: green; font-weight: 700;">+${level.increase}%</td>
        </tr>
    `).join('');
    
    return `<table>
        <thead>
            <tr><th>Pay Level</th><th>7th PC Entry Pay</th><th>Expected 8th PC</th><th>Estimated Increase</th></tr>
        </thead>
        <tbody>${rows}</tbody>
    </table>`;
}

function getInfoSections(data) {
    // Commission-specific info sections would go here
    return '';
}

function getActionButtons(currentKey, navigation) {
    const buttons = [];
    if (currentKey !== navigation.currentCommission) {
        buttons.push(`<a href="pay-scale-chart.html" style="background: #333333; color: #ffffff; padding: 15px 25px; text-decoration: none; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 10px 5px; display: inline-block;">View Current Pay Scales</a>`);
    }
    buttons.push(`<a href="grade-pay-explained.html" style="background: #333333; color: #ffffff; padding: 15px 25px; text-decoration: none; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 10px 5px; display: inline-block;">Understand Grade Pay</a>`);
    return buttons.join('');
}

function generateGradePayPage() {
    // Enhanced grade pay explanation page with dynamic links
    console.log('📚 Generating grade pay explanation page...');
    // Implementation would generate the grade pay explanation page with current data
}

// Run generator
generatePayCommissionPages();