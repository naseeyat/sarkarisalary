#!/usr/bin/env node

// Auto-deployment script for Railway/Vercel
const { execSync } = require('child_process');
const fs = require('fs');

function deployToRailway() {
    console.log('🚂 Deploying to Railway...');
    
    try {
        // Build static site
        execSync('node static-site-generator.js build', { stdio: 'inherit' });
        
        // Create railway config
        const railwayConfig = {
            "build": {
                "builder": "NIXPACKS",
                "buildCommand": "node static-site-generator.js build"
            },
            "deploy": {
                "startCommand": "npx serve dist -p $PORT"
            }
        };
        
        fs.writeFileSync('./railway.json', JSON.stringify(railwayConfig, null, 2));
        
        // Create package.json if not exists
        if (!fs.existsSync('./package.json')) {
            const packageJson = {
                "name": "sarkari-salary",
                "version": "1.0.0",
                "scripts": {
                    "build": "node static-site-generator.js build",
                    "start": "npx serve dist -p $PORT"
                },
                "dependencies": {
                    "serve": "^14.0.0"
                }
            };
            fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
        }
        
        console.log('✅ Railway deployment ready!');
        console.log('Upload to Railway and it will auto-deploy');
        
    } catch (error) {
        console.error('❌ Railway deployment failed:', error.message);
    }
}

function deployToVercel() {
    console.log('▲ Deploying to Vercel...');
    
    try {
        // Build static site
        execSync('node static-site-generator.js build', { stdio: 'inherit' });
        
        // Create vercel config
        const vercelConfig = {
            "builds": [
                {
                    "src": "static-site-generator.js",
                    "use": "@vercel/node"
                }
            ],
            "routes": [
                {
                    "src": "/(.*)",
                    "dest": "/dist/$1"
                }
            ]
        };
        
        fs.writeFileSync('./vercel.json', JSON.stringify(vercelConfig, null, 2));
        
        console.log('✅ Vercel deployment ready!');
        console.log('Run: vercel --prod');
        
    } catch (error) {
        console.error('❌ Vercel deployment failed:', error.message);
    }
}

function deployToCloudflare() {
    console.log('☁️  Deploying to Cloudflare Pages...');
    
    try {
        // Build static site
        execSync('node static-site-generator.js build', { stdio: 'inherit' });
        
        console.log('✅ Cloudflare Pages deployment ready!');
        console.log('Upload dist/ folder to Cloudflare Pages');
        console.log('Build command: node static-site-generator.js build');
        console.log('Output directory: dist');
        
    } catch (error) {
        console.error('❌ Cloudflare deployment failed:', error.message);
    }
}

// Command line interface
const platform = process.argv[2];

switch (platform) {
    case 'railway':
        deployToRailway();
        break;
    case 'vercel':
        deployToVercel();
        break;
    case 'cloudflare':
        deployToCloudflare();
        break;
    default:
        console.log(`
🚀 Multi-Platform Deployment Script

Usage:
  node deploy.js railway     - Setup for Railway deployment
  node deploy.js vercel      - Setup for Vercel deployment  
  node deploy.js cloudflare  - Setup for Cloudflare Pages

Features:
✅ Automatic static site generation
✅ Platform-specific configuration
✅ Zero-config deployment setup
        `);
        break;
}