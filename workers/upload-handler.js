/**
 * Cloudflare Worker for PDF Upload to R2
 * Handles file uploads from CMS and stores in R2 bucket
 */

export default {
  async fetch(request, env) {
    // CORS headers for CMS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle OPTIONS request (CORS preflight)
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Only allow POST
    if (request.method !== 'POST') {
      return new Response('Method not allowed', {
        status: 405,
        headers: corsHeaders
      });
    }

    try {
      // Parse multipart form data
      const formData = await request.formData();
      const file = formData.get('file');
      const filename = formData.get('filename');

      // Validate inputs
      if (!file || !filename) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Missing file or filename'
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Validate file type
      if (!file.type.includes('pdf')) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Only PDF files are allowed'
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        return new Response(JSON.stringify({
          success: false,
          error: 'File size must be less than 10MB'
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Upload to R2 bucket
      // env.SARKARISALARY_DOCS is your R2 bucket binding
      await env.SARKARISALARY_DOCS.put(filename, file.stream(), {
        httpMetadata: {
          contentType: 'application/pdf',
        },
      });

      // Return success response
      return new Response(JSON.stringify({
        success: true,
        filename: filename,
        url: `https://reference.sarkarisalary.today/${filename}`,
        size: file.size
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.error('Upload error:', error);
      return new Response(JSON.stringify({
        success: false,
        error: error.message
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};
