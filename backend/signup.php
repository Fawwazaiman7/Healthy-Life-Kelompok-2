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

ob_start();
require_once 'connection.php';
ob_end_clean();

if (!$conn) {
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed'
    ]);
    exit;
}

function logError($message, $details = null)
{
    error_log(
        date('[Y-m-d H:i:s] ') . "Error: " . $message .
            ($details ? " Details: " . print_r($details, true) : "") . "\n",
        3,
        "signup_errors.log"
    );
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $json_input = file_get_contents('php://input');
        $input = json_decode($json_input, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Invalid JSON input');
        }

        if (isset($input['update']) && $input['update'] === true) {
            // Update existing user data
            if (empty($input['email'])) {
                throw new Exception('Email is required for update');
            }

            $update_query = "UPDATE pengguna SET 
                usia = :usia,
                jenis_kelamin = :jenis_kelamin,
                berat_badan = :berat_badan,
                tinggi_badan = :tinggi_badan
                WHERE email = :email";

            $update_stmt = oci_parse($conn, $update_query);

            if (!$update_stmt) {
                $error = oci_error($conn);
                logError("Failed to parse update query", $error);
                throw new Exception('Database error: Failed to prepare update statement');
            }

            oci_bind_by_name($update_stmt, ":email", $input['email']);
            oci_bind_by_name($update_stmt, ":usia", $input['usia']);
            oci_bind_by_name($update_stmt, ":jenis_kelamin", $input['jenis_kelamin']);
            oci_bind_by_name($update_stmt, ":berat_badan", $input['berat_badan']);
            oci_bind_by_name($update_stmt, ":tinggi_badan", $input['tinggi_badan']);

            if (!oci_execute($update_stmt)) {
                $error = oci_error($update_stmt);
                logError("Failed to execute update query", $error);
                throw new Exception('Database error during update: ' . $error['message']);
            }

            oci_commit($conn);

            echo json_encode([
                'success' => true,
                'message' => 'User information updated successfully'
            ]);
        } else {
            // Initial registration
            if (empty($input['name']) || empty($input['email']) || empty($input['password'])) {
                throw new Exception('All fields are required');
            }

            $name = $input['name'];
            $email = $input['email'];
            $password = $input['password'];

            $check_query = "SELECT COUNT(*) as count FROM pengguna WHERE email = :email";
            $check_stmt = oci_parse($conn, $check_query);

            if (!$check_stmt) {
                $error = oci_error($conn);
                logError("Failed to parse check email query", $error);
                throw new Exception('Database error: Failed to check email');
            }

            oci_bind_by_name($check_stmt, ":email", $email);

            if (!oci_execute($check_stmt)) {
                $error = oci_error($check_stmt);
                logError("Failed to execute check email query", $error);
                throw new Exception('Database error: Failed to verify email');
            }

            $row = oci_fetch_array($check_stmt, OCI_ASSOC);

            if ($row['COUNT'] > 0) {
                throw new Exception('Email already registered or was previously registered');
            }

            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

            $insert_query = "INSERT INTO pengguna (
                id_pengguna, 
                nama, 
                email, 
                kata_sandi, 
                usia, 
                jenis_kelamin, 
                berat_badan, 
                tinggi_badan,
                admin_id_admin
            ) VALUES (
                SEQ_PENGGUNA_ID.nextval, 
                :name, 
                :email, 
                :password,
                18,
                'L',
                60,
                170,
                1
            )";

            $insert_stmt = oci_parse($conn, $insert_query);

            if (!$insert_stmt) {
                $error = oci_error($conn);
                logError("Failed to parse insert query", $error);
                throw new Exception('Database error: Failed to prepare insert statement');
            }

            oci_bind_by_name($insert_stmt, ":name", $name);
            oci_bind_by_name($insert_stmt, ":email", $email);
            oci_bind_by_name($insert_stmt, ":password", $hashedPassword);

            if (!oci_execute($insert_stmt)) {
                $error = oci_error($insert_stmt);
                logError("Failed to execute insert query", $error);
                throw new Exception('Database error during insert: ' . $error['message']);
            }

            oci_commit($conn);

            $fetch_user_query = "SELECT id_pengguna, nama, email FROM pengguna WHERE email = :email";
            $fetch_user_stmt = oci_parse($conn, $fetch_user_query);
            oci_bind_by_name($fetch_user_stmt, ":email", $email);
            oci_execute($fetch_user_stmt);

            $user_data = oci_fetch_array($fetch_user_stmt, OCI_ASSOC);

            if ($user_data) {
                echo json_encode([
                    'success' => true,
                    'message' => 'User registration successful',
                    'user' => [
                        'id' => $user_data['ID_PENGGUNA'],
                        'name' => $user_data['NAMA'],
                        'email' => $user_data['EMAIL']
                    ]
                ]);
            } else {
                echo json_encode([
                    'success' => true,
                    'message' => 'User registration successful, but user data could not be retrieved'
                ]);
            }
        }
    } catch (Exception $e) {
        if (isset($conn)) {
            oci_rollback($conn);
        }

        logError($e->getMessage());

        echo json_encode([
            'success' => false,
            'message' => $e->getMessage()
        ]);
    } finally {
        if (isset($check_stmt)) oci_free_statement($check_stmt);
        if (isset($insert_stmt)) oci_free_statement($insert_stmt);
        if (isset($fetch_user_stmt)) oci_free_statement($fetch_user_stmt);
        if (isset($conn)) oci_close($conn);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
}
