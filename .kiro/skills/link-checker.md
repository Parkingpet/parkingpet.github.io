# Link Checker Skill

This skill checks all links on the landing page (https://parkingpet.github.io/) to ensure they are working correctly.

## Purpose
Verify that all external links, internal navigation links, and resource links on the landing page are accessible and return valid HTTP status codes.

## Links Checked

### Quick Links Section
- View Live Site: https://parkingpet.github.io
- GitHub Repository: https://github.com/Parkingpet/parkingpet.github.io
- Fork This Project: https://github.com/Parkingpet/parkingpet.github.io/fork

### Azure Products Section
- Microsoft Intune: https://intune.microsoft.com
- Microsoft Entra: https://entra.microsoft.com
- Microsoft 365 Admin: https://admin.microsoft.com
- Azure Portal: https://portal.azure.com
- Azure Documentation: https://learn.microsoft.com/en-us/azure/

### AWS Products Section
- AWS Management Console: https://console.aws.amazon.com
- EC2 Instances: https://console.aws.amazon.com/ec2
- S3 Storage: https://console.aws.amazon.com/s3
- RDS Databases: https://console.aws.amazon.com/rds
- Lambda Functions: https://console.aws.amazon.com/lambda
- AWS Documentation: https://docs.aws.amazon.com

### Google Cloud Products Section
- GCP Console: https://console.cloud.google.com
- Compute Engine: https://console.cloud.google.com/compute
- Cloud Storage: https://console.cloud.google.com/storage
- Cloud SQL: https://console.cloud.google.com/sql
- Cloud Functions: https://console.cloud.google.com/functions
- GCP Documentation: https://cloud.google.com/docs

### Resource Links
- Moose as a Service Image: ./public/moose-as-a-service.jpg
- DevOps Tools Banner: ./public/devops-tools-banner.svg
- DevOps Logo: ./public/devops-logo.svg

## How to Use

When you need to verify all links on the landing page are working:

1. Ask: "Check all links on the landing page"
2. The skill will:
   - Fetch the landing page
   - Extract all links
   - Test each link's accessibility
   - Report which links are working and which are broken
   - Provide HTTP status codes for each link

## Expected Results

All links should return:
- **200 OK** - Link is working
- **301/302 Redirect** - Link redirects (acceptable)
- **403 Forbidden** - May occur for authenticated services (acceptable)
- **4xx/5xx** - Link is broken (needs investigation)

## Notes

- External links (Azure, AWS, GCP consoles) may require authentication
- Some links may return 403 if accessed without proper credentials
- Local resource links are checked for file existence
- The skill respects robots.txt and rate limiting
