# PDF Upload Worker Setup

This Cloudflare Worker handles PDF uploads to your R2 bucket with automatic naming.

## Setup Instructions

### 1. Install Wrangler CLI
```bash
npm install -g wrangler
```

### 2. Login to Cloudflare
```bash
wrangler login
```

### 3. Configure R2 Bucket Binding
Make sure your R2 bucket `sarkarisalarydocs` is created and bound in `wrangler.toml`.

### 4. Deploy Worker
```bash
cd workers
wrangler deploy
```

This will give you a URL like: `https://sarkarisalary-upload.YOUR_SUBDOMAIN.workers.dev`

### 5. Update CMS Upload Page
In `/cms/upload-pdf.html`, update the WORKER_URL:

```javascript
const WORKER_URL = 'https://sarkarisalary-upload.YOUR_SUBDOMAIN.workers.dev';
```

### 6. Optional: Custom Domain
Add a route in Cloudflare dashboard:
- Route: `upload.sarkarisalary.today/*`
- Worker: `sarkarisalary-upload`

## Usage

### CMS Upload Page
Access: `/cms/upload-pdf.html`

Features:
- Select job from dropdown
- Choose document type (notification, syllabus, etc.)
- Upload PDF
- Auto-renames to: `{job-slug}-{doc-type}.pdf`

### File Naming Convention
```
kvs-nvs-2025-notification.pdf
kvs-nvs-2025-syllabus.pdf
kvs-nvs-2025-admit-card.pdf
wbssc-slst-2025-notification.pdf
```

### Automatic URL
Files are accessible at:
```
https://reference.sarkarisalary.today/{filename}
```

## Cost Estimate

- **R2 Storage**: $0.015/GB/month (first 10GB free)
- **Operations**: $4 per 1 million operations
- **Bandwidth**: Free (no egress charges!)

**Example**: 100 PDFs (average 2MB each) uploaded/month
- Storage: 200MB = FREE
- Operations: 100 uploads + 10,000 downloads = ~10,000 ops = $0.04
- **Total Cost**: ~$0.04/month ≈ ₹3/month! 🎉

## Security

For production, add authentication:
1. Add password protection to CMS
2. Use environment variables for secrets
3. Restrict CORS origins

Example:
```toml
# wrangler.toml
[vars]
UPLOAD_PASSWORD = "your-secret-password"
```

Then in worker:
```javascript
const password = request.headers.get('X-Upload-Password');
if (password !== env.UPLOAD_PASSWORD) {
  return new Response('Unauthorized', { status: 401 });
}
```
