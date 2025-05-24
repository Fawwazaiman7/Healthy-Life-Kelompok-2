<?php
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', 'php_errors.log');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'connection.php';

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $email = $_GET['email'] ?? null;
    if (!$email) {
        echo json_encode(['success' => false, 'message' => 'Email is required']);
        exit;
    }

    $stmt = $conn->prepare("SELECT id_pengguna, nama, email, usia, jenis_kelamin, berat_badan, tinggi_badan FROM pengguna WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if (!$user) {
        echo json_encode(['success' => false, 'message' => 'User not found']);
        exit;
    }

    $bmi = round($user['berat_badan'] / pow($user['tinggi_badan'] / 100, 2), 2);
    $user['bmi'] = $bmi;

    echo json_encode(['success' => true, 'user' => $user]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    error_log("PUT data: " . print_r($data, true)); // Debug data yang diterima

    if (
        !isset($data['id']) ||
        !isset($data['tinggi_badan']) || !is_numeric($data['tinggi_badan']) || $data['tinggi_badan'] <= 0 ||
        !isset($data['berat_badan']) || !is_numeric($data['berat_badan']) || $data['berat_badan'] <= 0 ||
        !isset($data['usia']) || !is_numeric($data['usia']) || $data['usia'] <= 0
    ) {
        echo json_encode(['success' => false, 'message' => 'All fields must be positive numbers']);
        exit;
    }


    $stmt = $conn->prepare("UPDATE pengguna SET tinggi_badan = ?, berat_badan = ?, usia = ? WHERE id_pengguna = ?");
    $stmt->bind_param("ddii", $data['tinggi_badan'], $data['berat_badan'], $data['usia'], $data['id']);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Profile updated successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update profile']);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (empty($data['id'])) {
        echo json_encode(['success' => false, 'message' => 'User ID is required']);
        exit;
    }

    $stmt = $conn->prepare("DELETE FROM pengguna WHERE id_pengguna = ?");
    $stmt->bind_param("i", $data['id']);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Account deleted successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to delete account']);
    }
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
