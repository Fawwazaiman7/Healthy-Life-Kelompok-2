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

function handleError($message, $details = null, $statusCode = 400)
{
    error_log("Login Error - Message: $message, Details: " . print_r($details, true));
    http_response_code($statusCode);
    echo json_encode([
        'success' => false,
        'message' => $message
    ]);
    exit;
}

// Tangani permintaan POST untuk login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Ambil input JSON
        $json_input = file_get_contents('php://input');
        if (!$json_input) {
            handleError('No input received');
        }

        $input = json_decode(
            $json_input,
            true
        );
        error_log("Received input: " . print_r($input, true));

        if (json_last_error() !== JSON_ERROR_NONE) {
            handleError('Invalid JSON: ' . json_last_error_msg());
        }

        // Periksa apakah CAPTCHA diaktifkan
        $isCaptchaEnabled = $input['isCaptchaEnabled'] ?? true; // Default ke true jika tidak ada
        error_log("isCaptchaEnabled: " . ($isCaptchaEnabled ? "enabled" : "disabled"));


        if ($isCaptchaEnabled) {
            // Verifikasi CAPTCHA hanya jika diaktifkan
            if (empty($input['recaptchaResponse'])) {
                handleError('CAPTCHA token is missing');
            }

            $recaptchaSecret = "6LfPN5YqAAAAAC1uC5tBMUYGpT7Z7p0pice6zH1F"; // Secret Key Google
            $recaptchaResponse = $input['recaptchaResponse'];

            // Kirim permintaan ke Google untuk memvalidasi token
            $recaptchaVerifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
            $recaptchaData = [
                'secret' => $recaptchaSecret,
                'response' => $recaptchaResponse
            ];
            $options = [
                'http' => [
                    'method' => 'POST',
                    'header' => 'Content-Type: application/x-www-form-urlencoded',
                    'content' => http_build_query($recaptchaData)
                ]
            ];
            $context = stream_context_create($options);
            $response = file_get_contents($recaptchaVerifyUrl, false, $context);
            $responseKeys = json_decode($response, true);

            if (!$responseKeys['success']) {
                handleError('CAPTCHA verification failed');
            }
        }
        // Verifikasi Username dan Password
        if (empty($input['username']) || empty($input['password'])) {
            handleError('Username and password are required');
        }

        $username = trim($input['username']);
        $password = trim($input['password']);

        // Check in admin table
        $admin_query = "SELECT id_admin, nama_pengguna, kata_sandi FROM admin WHERE nama_pengguna = :username";
        $admin_stmt = oci_parse($conn, $admin_query);

        if (!$admin_stmt || !oci_bind_by_name($admin_stmt, ":username", $username) || !oci_execute($admin_stmt)) {
            handleError('Database error during admin query', oci_error($conn));
        }

        $admin = oci_fetch_assoc($admin_stmt);

        if ($admin) {
            // Verify hashed password for admin
            if (password_verify($password, $admin['KATA_SANDI'])) {
                session_start();
                $_SESSION['logged_in'] = true;
                $_SESSION['user_id'] = $admin['ID_ADMIN'];
                $_SESSION['username'] = $admin['NAMA_PENGGUNA'];
                $_SESSION['role'] = 'admin';

                echo json_encode([
                    'success' => true,
                    'message' => 'Admin login successful',
                    'role' => 'admin',
                    'user' => [
                        'id' => $admin['ID_ADMIN'],
                        'name' => $admin['NAMA_PENGGUNA']
                    ]
                ]);
                exit;
            }
            handleError('Invalid password');
        }

        // Check in pengguna table
        $user_query = "SELECT id_pengguna, nama, email, kata_sandi, usia, 
                              jenis_kelamin, berat_badan, tinggi_badan  
                       FROM pengguna 
                       WHERE nama = :username";

        $user_stmt = oci_parse($conn, $user_query);

        if (!$user_stmt || !oci_bind_by_name($user_stmt, ":username", $username) || !oci_execute($user_stmt)) {
            handleError('Database error during user query', oci_error($conn));
        }

        $user = oci_fetch_assoc($user_stmt);

        if ($user) {
            // Verify hashed password for user
            if (password_verify($password, $user['KATA_SANDI'])) {
                session_start();
                $_SESSION['logged_in'] = true;
                $_SESSION['user_id'] = $user['ID_PENGGUNA'];
                $_SESSION['username'] = $user['NAMA'];
                $_SESSION['role'] = 'user';

                $profileComplete = !empty($user['USIA']) &&
                    !empty($user['JENIS_KELAMIN']) &&
                    !empty($user['BERAT_BADAN']) &&
                    !empty($user['TINGGI_BADAN']);
                    

                echo json_encode([
                    'success' => true,
                    'message' => 'User login successful',
                    'role' => 'user',
                    'profileComplete' => $profileComplete,
                    'user' => [
                        'id' => $user['ID_PENGGUNA'],
                        'name' => $user['NAMA'],
                        'email' => $user['EMAIL'],
                        'usia' => $user['USIA'],
                        'jenis_kelamin' => $user['JENIS_KELAMIN'],
                        'berat_badan' => $user['BERAT_BADAN'],
                        'tinggi_badan' => $user['TINGGI_BADAN']
                    ]
                ]);
                exit;
            }
            handleError('Invalid password');
        }

        handleError('Username not found', null, 404);
    } catch (Exception $e) {
        error_log("Unexpected error: " . $e->getMessage());
        handleError('An unexpected error occurred: ' . $e->getMessage(), null, 500);
    } finally {
        if (isset($admin_stmt)) oci_free_statement($admin_stmt);
        if (isset($user_stmt)) oci_free_statement($user_stmt);
        if (isset($conn)) oci_close($conn);
    }
} else {
    handleError('Invalid request method', null, 405);
}
