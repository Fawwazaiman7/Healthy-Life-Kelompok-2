<?php
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', 'login_debug.log');
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'connection.php';

function handleError($message, $statusCode = 400)
{
    http_response_code($statusCode);
    echo json_encode(['success' => false, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input) handleError('Invalid input');
    if (empty($input['username']) || empty($input['password'])) handleError('Username and password are required');

    $username = trim($input['username']);
    $password = trim($input['password']);

    // Cek ke tabel admin
    $stmt = $conn->prepare("SELECT id_admin, nama_pengguna, kata_sandi FROM admin WHERE nama_pengguna = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $admin = $result->fetch_assoc();

    if ($admin && password_verify($password, $admin['kata_sandi'])) {
        session_start();
        $_SESSION['logged_in'] = true;
        $_SESSION['user_id'] = $admin['id_admin'];
        $_SESSION['username'] = $admin['nama_pengguna'];
        $_SESSION['role'] = 'admin';

        echo json_encode([
            'success' => true,
            'message' => 'Admin login successful',
            'role' => 'admin',
            'user' => [
                'id' => $admin['id_admin'],
                'name' => $admin['nama_pengguna']
            ]
        ]);
        exit;
    }

    // Cek ke tabel pengguna
    $stmt = $conn->prepare("SELECT id_pengguna, nama, email, kata_sandi, usia, jenis_kelamin, berat_badan, tinggi_badan FROM pengguna WHERE email = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && password_verify($password, $user['kata_sandi'])) {
        session_start();
        $_SESSION['logged_in'] = true;
        $_SESSION['user_id'] = $user['id_pengguna'];
        $_SESSION['username'] = $user['nama'];
        $_SESSION['role'] = 'user';

        $profileComplete = !empty($user['usia']) && !empty($user['jenis_kelamin']) &&
            !empty($user['berat_badan']) && !empty($user['tinggi_badan']);

        echo json_encode([
            'success' => true,
            'message' => 'User login successful',
            'role' => 'user',
            'profileComplete' => $profileComplete,
            'user' => [
                'id' => $user['id_pengguna'],
                'name' => $user['nama'],
                'email' => $user['email'],
                'usia' => $user['usia'],
                'jenis_kelamin' => $user['jenis_kelamin'],
                'berat_badan' => $user['berat_badan'],
                'tinggi_badan' => $user['tinggi_badan']
            ]
        ]);
        exit;
    }

    handleError('Username or password incorrect', 401);
} else {
    handleError('Invalid request method', 405);
}
