<?php
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', 'php_errors.log');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

ob_start();
require_once 'connection.php'; // Pastikan koneksi berhasil
ob_end_clean();

if (!$conn) {
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed'
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $email = isset($_GET['email']) ? $_GET['email'] : null;

        if (!$email) {
            throw new Exception('Email is required');
        }

        // Query untuk mengambil data pengguna berdasarkan email
        $query = "SELECT 
            id_pengguna,
            nama,
            email,
            usia,
            jenis_kelamin,
            berat_badan,
            tinggi_badan,
            kalori_tercapai,
            kategori_bmi_pengguna
            FROM pengguna 
            WHERE email = :email";

        $stmt = oci_parse($conn, $query);
        oci_bind_by_name($stmt, ":email", $email);
        
        if (!oci_execute($stmt)) {
            $error = oci_error($stmt);
            throw new Exception('Database error: ' . $error['message']);
        }

        $user = oci_fetch_assoc($stmt);

        if (!$user) {
            throw new Exception('User not found');
        }

        // Hitung BMI
        $height_in_meters = $user['TINGGI_BADAN'] / 100;
        $bmi = round($user['BERAT_BADAN'] / ($height_in_meters * $height_in_meters), 2);

        // Prepare user data untuk response
        $userData = [
            'id' => $user['ID_PENGGUNA'],
            'nama' => $user['NAMA'],
            'email' => $user['EMAIL'],
            'usia' => $user['USIA'],
            'jenis_kelamin' => $user['JENIS_KELAMIN'],
            'berat_badan' => $user['BERAT_BADAN'],
            'tinggi_badan' => $user['TINGGI_BADAN'],
            'kalori_tercapai' => $user['KALORI_TERCAPAI'],
            'kategori_bmi' => $user['KATEGORI_BMI_PENGGUNA'],
            'bmi' => $bmi
        ];

        echo json_encode([
            'success' => true,
            'user' => $userData
        ]);

    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => $e->getMessage()
        ]);
    } finally {
        if (isset($stmt)) oci_free_statement($stmt);
        if (isset($conn)) oci_close($conn);
    }
} 

// Untuk menangani update target kalori
elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = isset($data['id']) ? $data['id'] : null;
        $target_kalori = isset($data['target_kalori']) ? $data['target_kalori'] : null;

        if (!$id || !$target_kalori) {
            throw new Exception('ID and target_kalori are required');
        }

        // Query untuk update target kalori
        $query = "UPDATE pengguna 
                  SET target_kalori = :target_kalori 
                  WHERE id_pengguna = :id";
        
        $stmt = oci_parse($conn, $query);
        oci_bind_by_name($stmt, ":id", $id);
        oci_bind_by_name($stmt, ":target_kalori", $target_kalori);
        
        if (!oci_execute($stmt)) {
            $error = oci_error($stmt);
            throw new Exception('Database error: ' . $error['message']);
        }

        echo json_encode([
            'success' => true,
            'message' => 'Target kalori updated successfully'
        ]);

    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => $e->getMessage()
        ]);
    } finally {
        if (isset($stmt)) oci_free_statement($stmt);
        if (isset($conn)) oci_close($conn);
    }
}
else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
}
?>
