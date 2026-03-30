<?php
require_once __DIR__ . '/supabase.php';

// Check rate limit
$clientIp = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
if (!checkRateLimit($clientIp)) {
    http_response_code(429);
    echo json_encode(['error' => 'Rate limit exceeded']);
    exit();
}

try {
    $method = $_SERVER['REQUEST_METHOD'];
    $payload = validatePayload();

    $supabase = new SupabaseAPI();

    switch ($method) {
        case 'GET':
            // Get visitor stats
            $result = $supabase->select('visitors', [], 1000);
            logActivity('GET_VISITORS', ['status' => $result['status']]);
            echo json_encode($result['data']);
            break;

        case 'POST':
            // Record new visitor
            if (!$payload) {
                throw new Exception('Invalid payload');
            }

            $visitorData = [
                'user_agent' => sanitizeInput($_SERVER['HTTP_USER_AGENT'] ?? ''),
                'ip_address' => $clientIp,
                'browser' => sanitizeInput($payload['browser'] ?? ''),
                'os' => sanitizeInput($payload['os'] ?? ''),
                'screen_resolution' => sanitizeInput($payload['screenResolution'] ?? ''),
                'language' => sanitizeInput($payload['language'] ?? ''),
                'timezone' => sanitizeInput($payload['timezone'] ?? ''),
                'referrer' => sanitizeInput($payload['referrer'] ?? ''),
                'platform' => sanitizeInput($payload['platform'] ?? ''),
                'cores' => intval($payload['cores'] ?? 0),
                'memory' => intval($payload['memory'] ?? 0),
                'connection_type' => sanitizeInput($payload['connection']['type'] ?? ''),
                'cookies_enabled' => boolval($payload['cookiesEnabled'] ?? false),
                'online_status' => boolval($payload['onLine'] ?? true),
                'color_depth' => intval($payload['colorDepth'] ?? 0),
                'visited_at' => date('Y-m-d H:i:s')
            ];

            $result = $supabase->insert('visitors', $visitorData);
            logActivity('INSERT_VISITOR', ['status' => $result['status']]);
            
            http_response_code($result['status'] === 201 ? 201 : 400);
            echo json_encode($result['data']);
            break;

        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
    }

} catch (Exception $e) {
    http_response_code(500);
    logActivity('ERROR', ['message' => $e->getMessage()]);
    echo json_encode(['error' => $e->getMessage()]);
}
