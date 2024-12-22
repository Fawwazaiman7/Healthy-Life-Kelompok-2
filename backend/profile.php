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
            tinggi_badan
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

        error_log("Data yang diterima di backend: " . json_encode($data)); // Debug data

        $id = isset($data['id']) ? $data['id'] : null;
        $tinggi_badan = isset($data['tinggi_badan']) ? $data['tinggi_badan'] : null;
        $berat_badan = isset($data['berat_badan']) ? $data['berat_badan'] : null;
        $usia = isset($data['usia']) ? $data['usia'] : null;

        // Pastikan id, tinggi_badan, berat_badan, dan usia diisi
        if (!$id || !$tinggi_badan || !$berat_badan || !$usia) {
            throw new Exception('ID, tinggi_badan, berat_badan, and usia are required');
        }

        // Query untuk update data pengguna
        $query = "UPDATE pengguna 
                  SET tinggi_badan = :tinggi_badan,
                      berat_badan = :berat_badan,
                      usia = :usia
                  WHERE id_pengguna = :id";

        $stmt = oci_parse($conn, $query);
        oci_bind_by_name($stmt, ":id", $id);
        oci_bind_by_name($stmt, ":tinggi_badan", $tinggi_badan);
        oci_bind_by_name($stmt, ":berat_badan", $berat_badan);
        oci_bind_by_name($stmt, ":usia", $usia);

        if (!oci_execute($stmt)) {
            $error = oci_error($stmt);
            throw new Exception('Database error: ' . $error['message']);
        }

        echo json_encode([
            'success' => true,
            'message' => 'Profil updated successfully'
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
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = isset($data['id']) ? $data['id'] : null;

        if (!$id) {
            throw new Exception('ID pengguna diperlukan untuk menghapus akun.');
        }

        // Query untuk menghapus akun berdasarkan ID
        $query = "DELETE FROM pengguna WHERE id_pengguna = :id";
        $stmt = oci_parse($conn, $query);
        oci_bind_by_name($stmt, ":id", $id);

        if (!oci_execute($stmt)) {
            $error = oci_error($stmt);
            throw new Exception('Gagal menghapus akun: ' . $error['message']);
        }

        echo json_encode([
            'success' => true,
            'message' => 'Akun berhasil dihapus'
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

