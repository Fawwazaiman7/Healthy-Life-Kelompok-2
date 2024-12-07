<?php
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', 'login_debug.log');
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'connection.php';

function handleError($message, $details = null) {
    error_log("Login Error - Message: " . $message . " Details: " . print_r($details, true));
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $message
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $json_input = file_get_contents('php://input');
        
        if (!$json_input) {
            handleError('No input received');
        }

        $input = json_decode($json_input, true);
        error_log("Received input: " . print_r($input, true));

        if (json_last_error() !== JSON_ERROR_NONE) {
            handleError('Invalid JSON: ' . json_last_error_msg());
        }

        if (empty($input['username']) || empty($input['password'])) {
            handleError('Username and password are required');
        }

        $username = trim($input['username']);
        $password = trim($input['password']);

        // Check in admin table
        $admin_query = "SELECT id_admin, nama_pengguna, kata_sandi FROM admin WHERE nama_pengguna = :username";
        $admin_stmt = oci_parse($conn, $admin_query);
        
        if (!$admin_stmt) {
            handleError('Database error', oci_error($conn));
        }
        
        if (!oci_bind_by_name($admin_stmt, ":username", $username)) {
            handleError('Binding error', oci_error($admin_stmt));
        }
        
        if (!oci_execute($admin_stmt)) {
            handleError('Query execution error', oci_error($admin_stmt));
        }

        $admin = oci_fetch_assoc($admin_stmt);
        
        if ($admin) {
            // Verify hashed password for admin
            if (password_verify($password, $admin['KATA_SANDI'])) {
                session_start();  // Start session
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

        // Check in pengguna table using nama as username
        $user_query = "SELECT id_pengguna, nama, email, kata_sandi, usia, 
                             jenis_kelamin, berat_badan, tinggi_badan, 
                             target_kalori, kalori_tercapai, kategori_bmi_pengguna 
                      FROM pengguna 
                      WHERE nama = :username";
        
        $user_stmt = oci_parse($conn, $user_query);
        
        if (!$user_stmt) {
            handleError('Database error', oci_error($conn));
        }
        
        if (!oci_bind_by_name($user_stmt, ":username", $username)) {
            handleError('Binding error', oci_error($user_stmt));
        }
        
        if (!oci_execute($user_stmt)) {
            handleError('Query execution error', oci_error($user_stmt));
        }

        $user = oci_fetch_assoc($user_stmt);

        if ($user) {
            // Verify hashed password for user
            if (password_verify($password, $user['KATA_SANDI'])) {
                session_start();  // Start session
                $_SESSION['logged_in'] = true;
                $_SESSION['user_id'] = $user['ID_PENGGUNA'];
                $_SESSION['username'] = $user['NAMA'];
                $_SESSION['role'] = 'user';

                $profileComplete = !empty($user['USIA']) && 
                                 !empty($user['JENIS_KELAMIN']) && 
                                 !empty($user['BERAT_BADAN']) && 
                                 !empty($user['TINGGI_BADAN']) && 
                                 !empty($user['TARGET_KALORI']);
                
                echo json_encode([
                    'success' => true,
                    'message' => 'Login successful',
                    'role' => 'user',
                    'profileComplete' => $profileComplete,
                    'user' => [
                        'id' => $user['ID_PENGGUNA'],
                        'name' => $user['NAMA'],
                        'email' => $user['EMAIL'],
                        'usia' => $user['USIA'],
                        'jenis_kelamin' => $user['JENIS_KELAMIN'],
                        'berat_badan' => $user['BERAT_BADAN'],
                        'tinggi_badan' => $user['TINGGI_BADAN'],
                        'target_kalori' => $user['TARGET_KALORI'],
                        'kalori_tercapai' => $user['KALORI_TERCAPAI'],
                        'kategori_bmi_pengguna' => $user['KATEGORI_BMI_PENGGUNA']
                    ]
                ]);
                exit;
            }
            handleError('Invalid password');
        }

        handleError('Username not found');
        
    } catch (Exception $e) {
        error_log("Unexpected error: " . $e->getMessage());
        handleError('An unexpected error occurred: ' . $e->getMessage());
    } finally {
        if (isset($admin_stmt)) oci_free_statement($admin_stmt);
        if (isset($user_stmt)) oci_free_statement($user_stmt);
        if (isset($conn)) oci_close($conn);
    }
} else {
    handleError('Invalid request method');
}
?>
