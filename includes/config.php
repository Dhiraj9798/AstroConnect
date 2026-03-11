<?php
// Database configuration with environment variable support.
$dbHost = getenv('DB_HOST') ?: 'localhost';
$dbUser = getenv('DB_USER') ?: 'root';
$dbPass = getenv('DB_PASS') ?: '';
$dbName = getenv('DB_NAME') ?: 'astroconnect';

// Optional: if your provider gives DATABASE_URL
if (!$dbHost && getenv('DATABASE_URL')) {
    $dbUrl = getenv('DATABASE_URL');
    $dbInfo = parse_url($dbUrl);
    if ($dbInfo) {
        $dbHost = $dbInfo['host'] ?? $dbHost;
        $dbUser = $dbInfo['user'] ?? $dbUser;
        $dbPass = $dbInfo['pass'] ?? $dbPass;
        $dbName = ltrim($dbInfo['path'] ?? '', '/');
    }
}

$conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
if ($conn->connect_error) {
    die('Database connection failed: ' . $conn->connect_error);
}

// return connection object for includes
return $conn;
