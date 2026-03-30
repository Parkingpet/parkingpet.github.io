<?php
// Security headers to protect against web scanners and attacks
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
header('Content-Security-Policy: default-src \'self\'; script-src \'self\' \'unsafe-inline\'; style-src \'self\' \'unsafe-inline\'; img-src \'self\' data: https:;');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Permissions-Policy: geolocation=(), microphone=(), camera=()');

// CORS headers
header('Access-Control-Allow-Origin: ' . (isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*'));
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Max-Age: 3600');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Supabase configuration
define('SUPABASE_URL', getenv('SUPABASE_URL') ?: 'https://your-project.supabase.co');
define('SUPABASE_KEY', getenv('SUPABASE_KEY') ?: 'your-anon-key');
define('SUPABASE_SERVICE_KEY', getenv('SUPABASE_SERVICE_KEY') ?: 'your-service-key');

// API rate limiting
define('RATE_LIMIT_REQUESTS', 100);
define('RATE_LIMIT_WINDOW', 3600); // 1 hour

// Security
define('API_TIMEOUT', 30);
define('MAX_PAYLOAD_SIZE', 1048576); // 1MB

// Logging
define('LOG_DIR', __DIR__ . '/../logs');
if (!is_dir(LOG_DIR)) {
    mkdir(LOG_DIR, 0755, true);
}

// Error handling
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', LOG_DIR . '/php-errors.log');

// Database for rate limiting (using file-based storage)
define('RATE_LIMIT_FILE', LOG_DIR . '/rate-limits.json');
