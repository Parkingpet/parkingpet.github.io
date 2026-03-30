<?php
require_once __DIR__ . '/config.php';

class SupabaseAPI {
    private $url;
    private $key;
    private $timeout;

    public function __construct($url = SUPABASE_URL, $key = SUPABASE_KEY) {
        $this->url = rtrim($url, '/');
        $this->key = $key;
        $this->timeout = API_TIMEOUT;
    }

    /**
     * Make a request to Supabase REST API
     */
    private function request($method, $endpoint, $data = null, $useServiceKey = false) {
        $url = $this->url . '/rest/v1' . $endpoint;
        $key = $useServiceKey ? SUPABASE_SERVICE_KEY : $this->key;

        $headers = [
            'apikey: ' . $key,
            'Authorization: Bearer ' . $key,
            'Content-Type: application/json',
            'Prefer: return=representation'
        ];

        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_TIMEOUT => $this->timeout,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_SSL_VERIFYHOST => 2,
            CURLOPT_CUSTOMREQUEST => $method
        ]);

        if ($data !== null) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);

        if ($error) {
            throw new Exception('cURL Error: ' . $error);
        }

        return [
            'status' => $httpCode,
            'data' => json_decode($response, true),
            'raw' => $response
        ];
    }

    /**
     * Get records from a table
     */
    public function select($table, $filters = [], $limit = 100, $offset = 0) {
        $endpoint = '/' . $table;
        $query = '?limit=' . $limit . '&offset=' . $offset;

        foreach ($filters as $key => $value) {
            $query .= '&' . $key . '=eq.' . urlencode($value);
        }

        return $this->request('GET', $endpoint . $query);
    }

    /**
     * Insert a record
     */
    public function insert($table, $data) {
        $endpoint = '/' . $table;
        return $this->request('POST', $endpoint, $data);
    }

    /**
     * Update a record
     */
    public function update($table, $id, $data) {
        $endpoint = '/' . $table . '?id=eq.' . $id;
        return $this->request('PATCH', $endpoint, $data);
    }

    /**
     * Delete a record
     */
    public function delete($table, $id) {
        $endpoint = '/' . $table . '?id=eq.' . $id;
        return $this->request('DELETE', $endpoint);
    }

    /**
     * Call a Supabase function
     */
    public function callFunction($functionName, $data = []) {
        $url = $this->url . '/functions/v1/' . $functionName;
        
        $headers = [
            'Authorization: Bearer ' . $this->key,
            'Content-Type: application/json'
        ];

        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_TIMEOUT => $this->timeout,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_POSTFIELDS => json_encode($data)
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        return [
            'status' => $httpCode,
            'data' => json_decode($response, true)
        ];
    }
}

/**
 * Rate limiting helper
 */
function checkRateLimit($identifier) {
    $file = RATE_LIMIT_FILE;
    $limits = [];

    if (file_exists($file)) {
        $limits = json_decode(file_get_contents($file), true) ?: [];
    }

    $now = time();
    $window = $now - RATE_LIMIT_WINDOW;

    // Clean old entries
    foreach ($limits as $key => $timestamps) {
        $limits[$key] = array_filter($timestamps, function($t) use ($window) {
            return $t > $window;
        });
        if (empty($limits[$key])) {
            unset($limits[$key]);
        }
    }

    // Check limit
    if (!isset($limits[$identifier])) {
        $limits[$identifier] = [];
    }

    if (count($limits[$identifier]) >= RATE_LIMIT_REQUESTS) {
        return false;
    }

    $limits[$identifier][] = $now;
    file_put_contents($file, json_encode($limits), LOCK_EX);

    return true;
}

/**
 * Log API activity
 */
function logActivity($action, $details = []) {
    $log = [
        'timestamp' => date('Y-m-d H:i:s'),
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'action' => $action,
        'details' => $details
    ];

    $logFile = LOG_DIR . '/api-activity.log';
    file_put_contents($logFile, json_encode($log) . "\n", FILE_APPEND | LOCK_EX);
}

/**
 * Sanitize input
 */
function sanitizeInput($data) {
    if (is_array($data)) {
        return array_map('sanitizeInput', $data);
    }
    return htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
}

/**
 * Validate JSON payload
 */
function validatePayload() {
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    
    if (strpos($contentType, 'application/json') === false) {
        return null;
    }

    $input = file_get_contents('php://input');
    
    if (strlen($input) > MAX_PAYLOAD_SIZE) {
        throw new Exception('Payload too large');
    }

    return json_decode($input, true);
}
