// Example: Page Generator Function
// This shows how you would generate pages with custom titles

function generateJobPage(jobData) {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${jobData.title} - SARKARI SALARY</title>
    <meta name="description" content="${jobData.description}">
    
    <!-- Brutalist Styles -->
    <link rel="stylesheet" href="../shared/brutalist-styles.css">
    
    <style>
        .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
        .content-box { border: 3px solid #333333; padding: 30px; margin: 20px 0; background: #ffffff; }
        .salary-highlight { 
            font-size: 24px; font-weight: 900; color: #333333; 
            text-align: center; padding: 20px; border: 2px solid #333333; 
            background: #f8f8f8; margin: 20px 0; 
        }
    </style>
</head>
<body>
    <script>
        // CRITICAL: Set page data BEFORE header-footer script loads
        window.pageHeaderData = {
            title: "${jobData.title.toUpperCase()}",
            subtitle: "${jobData.subtitle}"
        };
        
        // Also set job database for additional context if needed
        window.jobDatabase = {
            current: ${JSON.stringify(jobData)}
        };
    </script>

    <div class="container">
        <div class="content-box">
            <h2 style="font-size: 20px; font-weight: 800; margin-bottom: 15px; text-transform: uppercase;">
                ${jobData.title}
            </h2>
            <p style="font-size: 14px; color: #666; margin-bottom: 20px;">
                ${jobData.description}
            </p>
            
            <div class="salary-highlight">
                Starting Salary: ₹${jobData.startingSalary.toLocaleString()}/month
            </div>
            
            <div style="margin: 20px 0;">
                <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 10px;">Key Information:</h3>
                <ul style="padding-left: 20px; line-height: 1.6;">
                    <li><strong>Department:</strong> ${jobData.department}</li>
                    <li><strong>Qualification:</strong> ${jobData.qualification}</li>
                    <li><strong>Age Limit:</strong> ${jobData.ageLimit}</li>
                    <li><strong>Selection Process:</strong> ${jobData.selectionProcess}</li>
                </ul>
            </div>
        </div>
    </div>
    
    <!-- Header Footer System - Load AFTER setting window.pageHeaderData -->
    <script src="../js/header-footer-loader.js"></script>
</body>
</html>`;
    
    return html;
}

// Example usage:
const iasJobData = {
    title: "IAS Officer",
    subtitle: "Indian Administrative Service - Civil Services",
    description: "Join the prestigious Indian Administrative Service and serve the nation at the highest administrative level.",
    startingSalary: 99000,
    department: "Department of Personnel & Training (DOPT)",
    qualification: "Bachelor's Degree from recognized university",
    ageLimit: "21-32 years (with relaxations)",
    selectionProcess: "Prelims + Mains + Interview"
};

const sbiJobData = {
    title: "SBI PO",
    subtitle: "State Bank of India - Probationary Officer",
    description: "Lead banking operations and customer service at India's largest public sector bank.",
    startingSalary: 82000,
    department: "State Bank of India",
    qualification: "Graduate in any discipline",
    ageLimit: "21-30 years",
    selectionProcess: "Prelims + Mains + Interview"
};

// Generate pages
const iasPageHTML = generateJobPage(iasJobData);
const sbiPageHTML = generateJobPage(sbiJobData);

console.log("Generated IAS page with title:", iasJobData.title);
console.log("Generated SBI page with title:", sbiJobData.title);

// In a real generator, you would write these to files:
// fs.writeFileSync('generated/ias-officer.html', iasPageHTML);
// fs.writeFileSync('generated/sbi-po.html', sbiPageHTML);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateJobPage };
}