<?php
// Menambahkan header CORS
header("Access-Control-Allow-Origin: *"); // Mengizinkan akses dari semua origin
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Mengizinkan beberapa metode HTTP
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Mengizinkan header tertentu

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit;
}
error_log("Request diterima pada " . date('Y-m-d H:i:s') . ": " . file_get_contents('php://input'));

// Mengimpor koneksi database
include_once 'connection.php';

// Periksa apakah koneksi ke database berhasil
if (!$conn) {
    error_log("Koneksi ke database gagal: " . oci_error());
    die("Koneksi database gagal");
}

// Fungsi untuk memastikan input adalah JSON string
function safe_json_decode($data, $context)
{
    if (is_string($data)) {
        $decoded = json_decode($data, true);
        if (json_last_error() === JSON_ERROR_NONE) {
            return $decoded;
        } else {
            error_log("JSON decode error ($context): " . json_last_error_msg());
        }
    } else {
        error_log("Expected JSON string in $context, got: " . gettype($data));
    }
    return null;
}

// Mendapatkan data makanan berdasarkan ID (GET request dengan ID sebagai parameter)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        $sql = "SELECT * FROM makanan WHERE ID = :id";
        $stmt = oci_parse($conn, $sql);

        oci_bind_by_name($stmt, ":id", $id);

        if (!oci_execute($stmt)) {
            $error = oci_error($stmt);
            echo json_encode(['success' => false, 'message' => 'Gagal mengambil data', 'error' => $error['message']]);
            http_response_code(500);
            exit;
        }

        $food = oci_fetch_assoc($stmt);
        if ($food) {
            echo json_encode([
                'id' => $food['ID'],
                'title' => $food['JUDUL'],
                'calories' => $food['KALORI'],
                'image' => $food['GAMBAR'],
                'ingredients' => safe_json_decode($food['RESEP'], 'GET - ingredients'),
                'tutorial' => safe_json_decode($food['CARA_PEMBUATAN'], 'GET - tutorial'),
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Data tidak ditemukan']);
        }
    } else {
        $sql = "SELECT * FROM makanan";
        $stmt = oci_parse($conn, $sql);

        if (!oci_execute($stmt)) {
            $error = oci_error($stmt);
            echo json_encode(['success' => false, 'message' => 'Gagal mengambil data', 'error' => $error['message']]);
            http_response_code(500);
            exit;
        }

        $foods = [];
        while ($row = oci_fetch_assoc($stmt)) {
            $foods[] = [
                'id' => $row['ID'],
                'title' => $row['JUDUL'],
                'calories' => $row['KALORI'],
                'image' => $row['GAMBAR'],
                'ingredients' => safe_json_decode($row['RESEP'], 'GET - list ingredients'),
                'tutorial' => safe_json_decode($row['CARA_PEMBUATAN'], 'GET - list tutorial'),
            ];
        }
        echo json_encode($foods);
    }

    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Membaca data JSON dari request body
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'] ?? null;

    if (!$id) {
        echo json_encode(['success' => false, 'message' => 'ID makanan tidak diberikan']);
        http_response_code(400);
        exit;
    }

    // Query untuk menghapus makanan berdasarkan ID
    $sql = "DELETE FROM makanan WHERE id = :id";
    $stmt = oci_parse($conn, $sql);

    // Binding parameter ID
    oci_bind_by_name($stmt, ":id", $id);

    if (oci_execute($stmt)) {
        echo json_encode(['success' => true, 'message' => 'Makanan berhasil dihapus']);
        http_response_code(200);
    } else {
        $error = oci_error($stmt);
        echo json_encode(['success' => false, 'message' => 'Gagal menghapus makanan', 'error' => $error['message']]);
        http_response_code(500);
    }
    exit;
}

// Menambahkan makanan baru (POST request)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw_data = file_get_contents('php://input');
    $data = json_decode($raw_data, true);

    if (is_null($data)) {
        error_log("Invalid JSON body: $raw_data");
        echo json_encode(['success' => false, 'message' => 'Body request tidak valid']);
        http_response_code(400);
        exit;
    }

    error_log("Data yang diterima backend: " . print_r($data, true));

    $ingredients = $data['resep'] ?? null;
    $instructions = $data['cara_pembuatan'] ?? null;

    error_log("Ingredients sebelum validasi: " . print_r($ingredients, true));
    error_log("Instructions sebelum validasi: " . print_r($instructions, true));

    if (empty($ingredients) || empty($instructions)) {
        error_log("Invalid format for resep or cara_pembuatan");
        echo json_encode(['success' => false, 'message' => 'Format resep atau cara_pembuatan tidak valid']);
        http_response_code(400);
        exit;
    }

    if (!is_array($ingredients) || !is_array($instructions)) {
        error_log("Invalid format for resep or cara_pembuatan");
        echo json_encode(['success' => false, 'message' => 'Format resep atau cara_pembuatan tidak valid']);
        http_response_code(400);
        exit;
    }

    // Validasi data utama
    if (empty($data['judul']) || empty($data['kalori']) || empty($data['gambar'])) {
        echo json_encode(['success' => false, 'message' => 'Field judul, kalori, atau gambar tidak boleh kosong']);
        http_response_code(400);
        exit;
    }

    $sql = "SELECT NVL(MAX(id), 0) + 1 AS next_id FROM makanan";
    $stmt = oci_parse($conn, $sql);
    oci_execute($stmt);
    $row = oci_fetch_assoc($stmt);
    $next_id = $row['NEXT_ID'];

    $sql = "INSERT INTO makanan (
                id,
                judul,
                kalori,
                gambar,
                resep,
                cara_pembuatan,
                admin_id_admin
            ) VALUES (
                :id,
                :title,
                :calories,
                :image,
                :ingredients,
                :tutorial,
                :admin_id
            )";

    $stmt = oci_parse($conn, $sql);

    $ingredients_json = json_encode($ingredients);
    $instructions_json = json_encode($instructions);

    oci_bind_by_name($stmt, ":id", $next_id);
    oci_bind_by_name($stmt, ":title", $data['judul']);
    oci_bind_by_name($stmt, ":calories", $data['kalori']);
    oci_bind_by_name($stmt, ":image", $data['gambar']);
    oci_bind_by_name($stmt, ":ingredients", $ingredients_json);
    oci_bind_by_name($stmt, ":tutorial", $instructions_json);

    $admin_id = 1; // Contoh, sesuaikan dengan autentikasi admin
    oci_bind_by_name($stmt, ":admin_id", $admin_id);

    if (oci_execute($stmt)) {
        echo json_encode(['success' => true, 'message' => 'Makanan berhasil ditambahkan']);
        http_response_code(201);
    } else {
        $error = oci_error($stmt);
        echo json_encode(['success' => false, 'message' => 'Gagal menambahkan makanan', 'error' => $error['message']]);
        http_response_code(500);
    }
    exit;
}


// Jika metode tidak dikenali
http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Metode HTTP tidak didukung']);
