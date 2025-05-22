<?php
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', 'php_errors.log');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
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

function logError($message, $details = null) {
    error_log(date('[Y-m-d H:i:s] ') . "Error: " . $message . ($details ? " Details: " . print_r($details, true) : "") . "\n", 3, "signup_errors.log");
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $input = json_decode(file_get_contents("php://input"), true);

        if (!$input) {
            throw new Exception("Invalid JSON input");
        }

        if (isset($input['update']) && $input['update'] === true) {
            if (empty($input['email'])) throw new Exception('Email is required for update');

            $stmt = $conn->prepare("UPDATE pengguna SET usia=?, jenis_kelamin=?, berat_badan=?, tinggi_badan=? WHERE email=?");
            $stmt->bind_param("isdss", $input['usia'], $input['jenis_kelamin'], $input['berat_badan'], $input['tinggi_badan'], $input['email']);

            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'User information updated successfully']);
            } else {
                throw new Exception("Update failed");
            }
        } else {
            if (empty($input['name']) || empty($input['email']) || empty($input['password'])) {
                throw new Exception("All fields are required");
            }

            $stmt = $conn->prepare("SELECT COUNT(*) FROM pengguna WHERE email = ?");
            $stmt->bind_param("s", $input['email']);
            $stmt->execute();
            $stmt->bind_result($count);
            $stmt->fetch();
            $stmt->close();

            if ($count > 0) {
                throw new Exception("Email already registered");
            }

            $hashedPassword = password_hash($input['password'], PASSWORD_BCRYPT);

            $stmt = $conn->prepare("INSERT INTO pengguna (nama, email, kata_sandi, usia, jenis_kelamin, berat_badan, tinggi_badan, admin_id_admin)
                                    VALUES (?, ?, ?, 18, 'L', 60, 170, 1)");
            $stmt->bind_param("sss", $input['name'], $input['email'], $hashedPassword);

            if (!$stmt->execute()) {
                throw new Exception("Failed to register user");
            }

            $stmt = $conn->prepare("SELECT id_pengguna, nama, email FROM pengguna WHERE email = ?");
            $stmt->bind_param("s", $input['email']);
            $stmt->execute();
            $result = $stmt->get_result();
            $user = $result->fetch_assoc();

            echo json_encode([
                'success' => true,
                'message' => 'User registration successful',
                'user' => $user
            ]);
        }
    } catch (Exception $e) {
        logError($e->getMessage());
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
