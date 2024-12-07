<?php
// Menambahkan header CORS
header("Access-Control-Allow-Origin: *"); // Mengizinkan akses dari semua origin
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Mengizinkan beberapa metode HTTP
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Mengizinkan header tertentu


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit;
}

// Mengimpor koneksi database
include_once 'connection.php';

// Periksa apakah koneksi ke database berhasil
if (!$conn) {
    error_log("Koneksi ke database gagal: " . oci_error());
    die("Koneksi database gagal");
}

// Mendapatkan data makanan berdasarkan ID (GET request dengan ID sebagai parameter)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Mengecek apakah ada parameter id yang dikirimkan
    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        // Query untuk mendapatkan data makanan berdasarkan ID
        $sql = "SELECT * FROM makanan WHERE ID = :id";
        $stmt = oci_parse($conn, $sql);
        
        // Binding parameter ID untuk query
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
                'ingredients' => $food['RESEP'],
                'tutorial' => $food['CARA_PEMBUATAN']
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Data tidak ditemukan']);
        }

    } else {
        // Jika tidak ada id, tampilkan semua data makanan (untuk tampilan daftar)
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
                'ingredients' => $row['RESEP'],
                'tutorial' => $row['CARA_PEMBUATAN']
            ];
        }
        echo json_encode($foods);
    }

    http_response_code(200);
    exit;
}


// Menambahkan makanan baru (POST request)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Membaca data JSON dari request body
    $data = json_decode(file_get_contents('php://input'), true);

       // Validasi data
    if (empty($data['judul']) || empty($data['kalori'])) {
        echo json_encode(['success' => true]);
        http_response_code(201);
        exit;
    }
    // Dapatkan ID baru untuk makanan
    $sql = "SELECT NVL(MAX(id), 0) + 1 AS next_id FROM makanan";
    $stmt = oci_parse($conn, $sql);
    oci_execute($stmt);
    $row = oci_fetch_assoc($stmt);
    $next_id = $row['NEXT_ID'];

    // Query untuk menambahkan makanan
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

    // Binding parameter
    oci_bind_by_name($stmt, ":id", $next_id);
    oci_bind_by_name($stmt, ":title", $data['judul']);
    oci_bind_by_name($stmt, ":calories", $data['kalori']);
    oci_bind_by_name($stmt, ":image", $data['gambar']);
    oci_bind_by_name($stmt, ":ingredients", $data['resep']);
    oci_bind_by_name($stmt, ":tutorial", $data['cara_pembuatan']);
    $admin_id = 1; // Contoh, sesuaikan dengan autentikasi admin
    oci_bind_by_name($stmt, ":admin_id", $admin_id);

    // Eksekusi query
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

// Menghapus makanan (DELETE request)
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

// Mengedit makanan (PUT request)
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Membaca data JSON dari request body
    $data = json_decode(file_get_contents('php://input'), true);
    if ($data) {
        error_log('Data received: ' . print_r($data, true));  // Menyimpan data untuk debugging
    } else {
        error_log('No data received');
    }

    $id = $data['id'] ?? null;

    if (!$id) {
        echo json_encode(['success' => false, 'message' => 'ID makanan tidak diberikan']);
        http_response_code(400);
        exit;
    }

    if (empty($data['judul']) || empty($data['kalori']) || empty($data['gambar']) || empty($data['resep']) || empty($data['cara_pembuatan'])) {
        echo json_encode(['success' => true]);
        http_response_code(200);
        exit;
    }


    // Query untuk mengupdate makanan
    $sql = "UPDATE makanan
        SET judul = :judul,
            kalori = :kalori,
            gambar = :gambar,
            resep = :resep,
            cara_pembuatan = :cara_pembuatan
        WHERE id = :id";

    $stmt = oci_parse($conn, $sql);

    oci_bind_by_name($stmt, ":id", $data['id']);
    oci_bind_by_name($stmt, ":judul", $data['judul']);
    oci_bind_by_name($stmt, ":kalori", $data['kalori']);
    oci_bind_by_name($stmt, ":gambar", $data['gambar']);
    oci_bind_by_name($stmt, ":resep", $data['resep']);
    oci_bind_by_name($stmt, ":cara_pembuatan", $data['cara_pembuatan']);

    if (oci_execute($stmt)) {
        echo json_encode(['success' => true, 'message' => 'Makanan berhasil diperbarui']);
        http_response_code(200);
    } else {
        $error = oci_error($stmt);
        echo json_encode(['success' => false, 'message' => 'Gagal memperbarui makanan', 'error' => $error['message']]);
        http_response_code(500);
    }
    exit;
}


// Jika metode tidak dikenali
http_response_code(405); // Metode Tidak Diizinkan
echo json_encode(['success' => false, 'message' => 'Metode HTTP tidak didukung']);
?>
