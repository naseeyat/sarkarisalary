// Cloudflare Pages Function for updating job postings JSON
export async function onRequestPost(context) {
    const { request, env } = context;
    
    try {
        const input = await request.json();
        
        if (!input || !input.action) {
            return new Response(JSON.stringify({ error: 'Invalid input' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        if (input.action === 'addJob') {
            const jobData = input.jobData;
            
            // Validate job data
            if (!jobData.title || !jobData.department || !jobData.positions) {
                return new Response(JSON.stringify({ error: 'Missing required job fields' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            
            // Since we can't modify static files in Cloudflare Pages,
            // we'll use KV storage for dynamic job data
            const jobId = `job_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
            jobData.id = jobId;
            jobData.postedDate = new Date().toISOString().split('T')[0];
            jobData.isNew = true;
            
            // Store in Cloudflare KV (if available)
            if (env.JOBS_KV) {
                await env.JOBS_KV.put(`job:${jobId}`, JSON.stringify(jobData));
                
                // Update job list
                const jobsList = await env.JOBS_KV.get('jobs:list', 'json') || [];
                jobsList.unshift(jobId);
                
                // Keep only latest 100 jobs
                if (jobsList.length > 100) {
                    const oldJobId = jobsList.pop();
                    await env.JOBS_KV.delete(`job:${oldJobId}`);
                }
                
                await env.JOBS_KV.put('jobs:list', JSON.stringify(jobsList));
            }
            
            return new Response(JSON.stringify({
                success: true,
                jobId: jobId,
                message: 'Job posted successfully',
                distributedTo: calculateDistribution(jobData.tags),
                storage: env.JOBS_KV ? 'kv' : 'memory'
            }), {
                headers: { 'Content-Type': 'application/json' }
            });
            
        } else if (input.action === 'getJobs') {
            let jobs = [];
            
            if (env.JOBS_KV) {
                const jobsList = await env.JOBS_KV.get('jobs:list', 'json') || [];
                
                for (const jobId of jobsList) {
                    const jobData = await env.JOBS_KV.get(`job:${jobId}`, 'json');
                    if (jobData) jobs.push(jobData);
                }
            }
            
            return new Response(JSON.stringify({
                activeJobs: jobs,
                pageMapping: generatePageMapping(jobs)
            }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        return new Response(JSON.stringify({ error: 'Invalid action' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        return new Response(JSON.stringify({ 
            error: 'Server error', 
            details: error.message 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

function calculateDistribution(tags) {
    const pages = ['Homepage'];
    
    for (const tag of tags) {
        if (tag === 'all-states') {
            pages.push('All State Pages', 'All District Pages');
        } else if (tag.endsWith('-only')) {
            const location = tag.replace('-only', '');
            pages.push(location.replace('-', ' ').toUpperCase() + ' Page');
        } else if (tag.endsWith('-category')) {
            const category = tag.replace('-category', '');
            pages.push(category.toUpperCase() + ' Jobs Page');
        }
    }
    
    return [...new Set(pages)];
}

function generatePageMapping(jobs) {
    const mapping = {
        homepage: {
            sections: {
                trending: [],
                featured: [],
                local: [],
                latest: []
            }
        },
        statePages: {},
        districtPages: {},
        categoryPages: {}
    };
    
    jobs.forEach(job => {
        // Add to homepage sections
        if (job.tags.includes('homepage-trending') || job.tags.includes('all-states')) {
            mapping.homepage.sections.trending.push(job.id);
            mapping.homepage.sections.featured.push(job.id);
        } else {
            mapping.homepage.sections.latest.push(job.id);
        }
        
        // Add to state/district pages
        job.tags.forEach(tag => {
            if (tag.endsWith('-only')) {
                const location = tag.replace('-only', '');
                if (!mapping.statePages[location]) {
                    mapping.statePages[location] = [];
                }
                mapping.statePages[location].push(job.id);
            }
            
            if (tag.endsWith('-category')) {
                const category = tag.replace('-category', '-jobs');
                if (!mapping.categoryPages[category]) {
                    mapping.categoryPages[category] = [];
                }
                mapping.categoryPages[category].push(job.id);
            }
        });
        
        // All India jobs go everywhere
        if (job.tags.includes('all-states')) {
            ['uttar-pradesh', 'delhi', 'bihar', 'maharashtra'].forEach(state => {
                if (!mapping.statePages[state]) {
                    mapping.statePages[state] = [];
                }
                mapping.statePages[state].push(job.id);
            });
        }
    });
    
    return mapping;
}