# cPanel Deployment Guide for Vite + PHP + Supabase

## Prerequisites
- cPanel hosting with PHP 7.4+ and curl support
- Supabase project with API keys
- SSH access or File Manager access

## Deployment Steps

### 1. Build the Vite Project
```bash
npm run build
```
This creates a `dist/` folder with your compiled React app.

### 2. Upload to cPanel

#### Option A: Using File Manager
1. Log in to cPanel
2. Go to File Manager
3. Navigate to your public_html folder
4. Upload the contents of the `dist/` folder
5. Upload the `api/` folder
6. Upload `.htaccess` file

#### Option B: Using SSH
```bash
# Connect to your server
ssh user@your-domain.com

# Navigate to public_html
cd public_html

# Upload files (from your local machine)
scp -r dist/* user@your-domain.com:~/public_html/
scp -r api/ user@your-domain.com:~/public_html/
scp .htaccess user@your-domain.com:~/public_html/
```

### 3. Configure Environment Variables

#### Option A: Using .env file
1. Create a `.env` file in your public_html root
2. Add your Supabase credentials:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
```

#### Option B: Using cPanel Environment Variables
1. Go to cPanel → Select PHP Version
2. Click "Switch to PHP Options"
3. Add environment variables there

### 4. Set Permissions
```bash
# Make logs directory writable
chmod 755 logs/
chmod 644 logs/*

# Make API files readable
chmod 644 api/*.php
chmod 644 .htaccess
```

### 5. Create Supabase Tables

In your Supabase dashboard, create a `visitors` table:

```sql
CREATE TABLE visitors (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_agent TEXT,
  ip_address VARCHAR(45),
  browser VARCHAR(50),
  os VARCHAR(50),
  screen_resolution VARCHAR(20),
  language VARCHAR(10),
  timezone VARCHAR(50),
  referrer TEXT,
  platform VARCHAR(50),
  cores INT,
  memory INT,
  connection_type VARCHAR(20),
  cookies_enabled BOOLEAN,
  online_status BOOLEAN,
  color_depth INT,
  visited_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_visitors_visited_at ON visitors(visited_at DESC);
```

### 6. Update VisitorTracker Component

Update `src/components/analytics/VisitorTracker.jsx` to use your PHP API:

```javascript
const collectVisitorData = async () => {
  try {
    const data = {
      // ... visitor data collection code ...
    };

    // Send to PHP API instead of localStorage
    const response = await fetch('/api/visitors.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      console.log('Visitor data recorded');
    }
  } catch (error) {
    console.error('Error recording visitor:', error);
  }
};
```

## Security Features Included

✅ **Security Headers**
- X-Content-Type-Options: Prevents MIME type sniffing
- X-Frame-Options: Prevents clickjacking
- X-XSS-Protection: Enables XSS filter
- Strict-Transport-Security: Forces HTTPS
- Content-Security-Policy: Restricts resource loading
- Referrer-Policy: Controls referrer information
- Permissions-Policy: Disables unnecessary APIs

✅ **Rate Limiting**
- 100 requests per hour per IP
- File-based rate limit tracking

✅ **Input Validation**
- Payload size limits (1MB max)
- Input sanitization
- JSON validation

✅ **File Protection**
- Hidden files blocked (.env, .git, etc.)
- Sensitive files protected
- Directory listing disabled

✅ **CORS Protection**
- Configurable origin restrictions
- Preflight request handling

## Monitoring

### View API Logs
```bash
# SSH into your server
tail -f logs/api-activity.log
tail -f logs/php-errors.log
```

### Check Rate Limits
```bash
cat logs/rate-limits.json
```

## Troubleshooting

### 404 Errors on Page Refresh
- Ensure `.htaccess` is uploaded and enabled
- Check that mod_rewrite is enabled in cPanel

### API Not Working
- Verify Supabase credentials in `.env`
- Check PHP error logs: `logs/php-errors.log`
- Ensure curl is enabled: `php -m | grep curl`

### Rate Limiting Issues
- Check `logs/rate-limits.json` permissions
- Ensure `logs/` directory is writable

### CORS Errors
- Update `CORS` headers in `api/config.php`
- Add your domain to allowed origins

## Updating Your Site

1. Build locally: `npm run build`
2. Upload new `dist/` folder contents
3. Clear browser cache
4. Test on your domain

## Performance Tips

1. Enable gzip compression (included in .htaccess)
2. Use browser caching (included in .htaccess)
3. Minify assets (Vite does this automatically)
4. Use CDN for static assets if available

## Support

For issues:
1. Check PHP error logs
2. Verify Supabase connection
3. Test API endpoint: `curl https://your-domain.com/api/visitors.php`
4. Check cPanel error logs
