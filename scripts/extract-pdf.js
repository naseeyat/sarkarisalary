#!/usr/bin/env node

/**
 * PDF Extraction Script
 * Extracts job data from PDF notifications and adds to jobs.json
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const NOTIFICATIONS_DIR = path.join(__dirname, '../notifications');
const DATA_FILE = path.join(__dirname, '../prod/data/jobs.json');

// Load existing data
function loadData() {
  if (fs.existsSync(DATA_FILE)) {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  }

  // Initialize empty structure
  return {
    metadata: {
      lastUpdated: new Date().toISOString().split('T')[0],
      totalJobs: 0,
      activeJobs: 0,
      closedJobs: 0
    },
    jobs: [],
    departments: {},
    states: {},
    categories: {},
    examCycles: {}
  };
}

// Save data
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  console.log('✅ Data saved to jobs.json');
}

// Generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Manual extraction (you provide data for now)
// Later we can integrate AI extraction
function extractJobFromPDF(pdfPath) {
  const pdfName = path.basename(pdfPath);

  console.log(`\n📄 Processing: ${pdfName}`);
  console.log('Please provide job details:\n');

  // For now, return structure - you'll fill manually
  // Later: Use Claude AI API to auto-extract

  return {
    // You fill this based on PDF
    // Script will prompt for input
  };
}

// Add job to data structure
function addJob(data, jobData) {
  // Generate ID
  if (!jobData.id) {
    jobData.id = generateSlug(jobData.title);
  }

  // Add slug
  if (!jobData.slug) {
    jobData.slug = jobData.id;
  }

  // Set added date
  jobData.addedOn = new Date().toISOString().split('T')[0];

  // Calculate days remaining
  if (jobData.lastDate) {
    const today = new Date();
    const lastDate = new Date(jobData.lastDate);
    jobData.daysRemaining = Math.ceil((lastDate - today) / (1000 * 60 * 60 * 24));
  }

  // Add to jobs array
  data.jobs.push(jobData);

  console.log(`✅ Job added: ${jobData.title}`);

  return data;
}

// Update counts automatically
function updateCounts(data) {
  console.log('\n📊 Updating counts...');

  // Metadata counts
  data.metadata.totalJobs = data.jobs.length;
  data.metadata.activeJobs = data.jobs.filter(j => j.status === 'active').length;
  data.metadata.closedJobs = data.jobs.filter(j => j.status === 'closed').length;
  data.metadata.lastUpdated = new Date().toISOString().split('T')[0];

  // Department counts
  data.jobs.forEach(job => {
    if (job.department) {
      if (!data.departments[job.department]) {
        data.departments[job.department] = {
          name: job.departmentName || job.department,
          slug: job.department,
          totalJobs: 0,
          activeJobs: 0,
          latestJobs: []
        };
      }
    }
  });

  // Calculate department stats
  for (let dept in data.departments) {
    const deptJobs = data.jobs.filter(j => j.department === dept);
    data.departments[dept].totalJobs = deptJobs.length;
    data.departments[dept].activeJobs = deptJobs.filter(j => j.status === 'active').length;
    data.departments[dept].latestJobs = deptJobs
      .filter(j => j.status === 'active')
      .sort((a,b) => new Date(b.addedOn) - new Date(a.addedOn))
      .slice(0, 10)
      .map(j => j.id);
  }

  // State counts
  data.jobs.forEach(job => {
    if (job.states && Array.isArray(job.states)) {
      job.states.forEach(state => {
        if (!data.states[state]) {
          data.states[state] = {
            name: state.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            slug: state,
            totalJobs: 0,
            activeJobs: 0,
            latestJobs: []
          };
        }
      });
    }
  });

  // Calculate state stats
  for (let state in data.states) {
    const stateJobs = data.jobs.filter(j => j.states && j.states.includes(state));
    data.states[state].totalJobs = stateJobs.length;
    data.states[state].activeJobs = stateJobs.filter(j => j.status === 'active').length;
    data.states[state].latestJobs = stateJobs
      .filter(j => j.status === 'active')
      .sort((a,b) => new Date(b.addedOn) - new Date(a.addedOn))
      .slice(0, 10)
      .map(j => j.id);
  }

  // Category counts
  data.jobs.forEach(job => {
    if (job.category) {
      if (!data.categories[job.category]) {
        data.categories[job.category] = {
          name: job.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          slug: job.category,
          totalJobs: 0,
          activeJobs: 0,
          latestJobs: []
        };
      }
    }
  });

  // Calculate category stats
  for (let cat in data.categories) {
    const catJobs = data.jobs.filter(j => j.category === cat);
    data.categories[cat].totalJobs = catJobs.length;
    data.categories[cat].activeJobs = catJobs.filter(j => j.status === 'active').length;
    data.categories[cat].latestJobs = catJobs
      .filter(j => j.status === 'active')
      .sort((a,b) => new Date(b.addedOn) - new Date(a.addedOn))
      .slice(0, 10)
      .map(j => j.id);
  }

  console.log('✅ Counts updated');
  console.log(`   Total Jobs: ${data.metadata.totalJobs}`);
  console.log(`   Active: ${data.metadata.activeJobs}`);
  console.log(`   Departments: ${Object.keys(data.departments).length}`);
  console.log(`   States: ${Object.keys(data.states).length}`);

  return data;
}

// Main function
function main() {
  console.log('🚀 PDF Extraction Script\n');

  // Create directories if not exist
  if (!fs.existsSync(NOTIFICATIONS_DIR)) {
    fs.mkdirSync(NOTIFICATIONS_DIR, { recursive: true });
    console.log('📁 Created notifications/ directory');
    console.log('   Drop your PDF files here!\n');
  }

  // Load existing data
  let data = loadData();

  console.log('📊 Current Stats:');
  console.log(`   Total Jobs: ${data.metadata.totalJobs}`);
  console.log(`   Active Jobs: ${data.metadata.activeJobs}\n`);

  // For now, just update counts from existing data
  data = updateCounts(data);
  saveData(data);

  console.log('\n✅ Done!');
  console.log('\nNext: Add job data manually to jobs.json');
  console.log('Then run: npm run generate-pages');
}

main();
