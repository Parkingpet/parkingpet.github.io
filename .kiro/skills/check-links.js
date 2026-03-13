#!/usr/bin/env node

/**
 * Link Checker Script
 * Checks all links on the landing page to ensure they work
 * Usage: node check-links.js
 */

import fs from 'fs';

// All links to check
const links = {
  'Quick Links': [
    { name: 'View Live Site', url: 'https://parkingpet.github.io' },
    { name: 'GitHub Repository', url: 'https://github.com/Parkingpet/parkingpet.github.io' },
    { name: 'Fork This Project', url: 'https://github.com/Parkingpet/parkingpet.github.io/fork' }
  ],
  'Azure Products': [
    { name: 'Microsoft Intune', url: 'https://intune.microsoft.com' },
    { name: 'Microsoft Entra', url: 'https://entra.microsoft.com' },
    { name: 'Microsoft 365 Admin', url: 'https://admin.microsoft.com' },
    { name: 'Azure Portal', url: 'https://portal.azure.com' },
    { name: 'Azure Documentation', url: 'https://learn.microsoft.com/en-us/azure/' }
  ],
  'AWS Products': [
    { name: 'AWS Management Console', url: 'https://console.aws.amazon.com' },
    { name: 'EC2 Instances', url: 'https://console.aws.amazon.com/ec2' },
    { name: 'S3 Storage', url: 'https://console.aws.amazon.com/s3' },
    { name: 'RDS Databases', url: 'https://console.aws.amazon.com/rds' },
    { name: 'Lambda Functions', url: 'https://console.aws.amazon.com/lambda' },
    { name: 'AWS Documentation', url: 'https://docs.aws.amazon.com' }
  ],
  'Google Cloud Products': [
    { name: 'GCP Console', url: 'https://console.cloud.google.com' },
    { name: 'Compute Engine', url: 'https://console.cloud.google.com/compute' },
    { name: 'Cloud Storage', url: 'https://console.cloud.google.com/storage' },
    { name: 'Cloud SQL', url: 'https://console.cloud.google.com/sql' },
    { name: 'Cloud Functions', url: 'https://console.cloud.google.com/functions' },
    { name: 'GCP Documentation', url: 'https://cloud.google.com/docs' }
  ],
  'Local Resources': [
    { name: 'Moose as a Service Image', path: './public/moose-as-a-service.jpg' },
    { name: 'DevOps Tools Banner', path: './public/devops-tools-banner.svg' },
    { name: 'DevOps Logo', path: './public/devops-logo.svg' }
  ]
};

// Check if URL is accessible using fetch
async function checkUrl(urlString) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(urlString, {
      method: 'HEAD',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LinkChecker/1.0)' },
      signal: controller.signal,
      redirect: 'follow'
    });

    clearTimeout(timeout);
    const status = response.status;
    let statusText = 'OK';
    
    if (status >= 200 && status < 300) statusText = 'OK';
    else if (status >= 300 && status < 400) statusText = 'REDIRECT';
    else if (status === 403) statusText = 'FORBIDDEN';
    else if (status >= 400 && status < 500) statusText = 'NOT_FOUND';
    else if (status >= 500) statusText = 'SERVER_ERROR';

    return { status: statusText, code: status, message: `HTTP ${status}` };
  } catch (err) {
    if (err.name === 'AbortError') {
      return { status: 'TIMEOUT', code: 0, message: 'Request timeout' };
    }
    return { status: 'ERROR', code: 0, message: err.message };
  }
}

// Check if local file exists
function checkLocalFile(filePath) {
  return new Promise((resolve) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        resolve({ status: 'NOT_FOUND', code: 404, message: 'File not found' });
      } else {
        resolve({ status: 'OK', code: 200, message: 'File exists' });
      }
    });
  });
}

// Main function
async function checkAllLinks() {
  console.log('\n🔗 Landing Page Link Checker\n');
  console.log('Checking all links on https://parkingpet.github.io/\n');
  console.log('═'.repeat(80));

  let totalLinks = 0;
  let workingLinks = 0;
  let brokenLinks = 0;
  const results = {};

  for (const [category, categoryLinks] of Object.entries(links)) {
    console.log(`\n📂 ${category}`);
    console.log('─'.repeat(80));

    results[category] = [];

    for (const link of categoryLinks) {
      totalLinks++;
      let result;

      if (link.path) {
        // Check local file
        result = await checkLocalFile(link.path);
        console.log(`  ${link.name}`);
        console.log(`    Path: ${link.path}`);
      } else {
        // Check URL
        result = await checkUrl(link.url);
        console.log(`  ${link.name}`);
        console.log(`    URL: ${link.url}`);
      }

      const statusIcon = 
        result.status === 'OK' ? '✓' :
        result.status === 'REDIRECT' ? '→' :
        result.status === 'FORBIDDEN' ? '🔒' :
        '✗';

      console.log(`    Status: ${statusIcon} ${result.status} (${result.message})`);

      results[category].push({
        name: link.name,
        url: link.url || link.path,
        status: result.status,
        code: result.code,
        message: result.message
      });

      if (result.status === 'OK' || result.status === 'REDIRECT' || result.status === 'FORBIDDEN') {
        workingLinks++;
      } else {
        brokenLinks++;
      }
    }
  }

  // Summary
  console.log('\n' + '═'.repeat(80));
  console.log('\n📊 Summary\n');
  console.log(`Total Links: ${totalLinks}`);
  console.log(`✓ Working: ${workingLinks}`);
  console.log(`✗ Broken: ${brokenLinks}`);
  console.log(`Success Rate: ${((workingLinks / totalLinks) * 100).toFixed(1)}%\n`);

  // Detailed report
  if (brokenLinks > 0) {
    console.log('⚠️  Broken Links:\n');
    for (const [category, categoryResults] of Object.entries(results)) {
      const broken = categoryResults.filter(r => 
        r.status !== 'OK' && r.status !== 'REDIRECT' && r.status !== 'FORBIDDEN'
      );
      if (broken.length > 0) {
        console.log(`${category}:`);
        broken.forEach(link => {
          console.log(`  - ${link.name}: ${link.message}`);
        });
      }
    }
  } else {
    console.log('✓ All links are working!\n');
  }

  console.log('═'.repeat(80) + '\n');

  // Exit with appropriate code
  process.exit(brokenLinks > 0 ? 1 : 0);
}

// Run the checker
checkAllLinks().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
