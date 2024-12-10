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

// Mendapatkan data olahraga berdasarkan ID (GET request dengan ID sebagai parameter)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Mengecek apakah ada parameter id yang dikirimkan
    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        // Query untuk mendapatkan data olahraga berdasarkan ID
        $sql = "SELECT * FROM data_olahraga WHERE ID_OLAHRAGA = :id";
        $stmt = oci_parse($conn, $sql);
        
        // Binding parameter ID untuk query
        oci_bind_by_name($stmt, ":id", $id);

        if (!oci_execute($stmt)) {
            $error = oci_error($stmt);
            echo json_encode(['success' => false, 'message' => 'Gagal mengambil data', 'error' => $error['message']]);
            http_response_code(500);
            exit;
        }

        $exercise = oci_fetch_assoc($stmt);
        if ($exercise) {
            echo json_encode([
                'id' => $exercise['ID_OLAHRAGA'],
                'title' => $exercise['NAMA_OLAHRAGA'],
                'calories' => $exercise['KALORI_PER_SET'],
                'time' => $exercise['ESTIMASI_WAKTU'],
                'image' => $exercise['GAMBAR'],
                'video' => $exercise['LINK_VIDEO'],
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Data tidak ditemukan']);
        }

    } else {
        // Jika tidak ada id, tampilkan semua data olahraga
        $sql = "SELECT * FROM data_olahraga";
        $stmt = oci_parse($conn, $sql);

        if (!oci_execute($stmt)) {
            $error = oci_error($stmt);
            echo json_encode(['success' => false, 'message' => 'Gagal mengambil data', 'error' => $error['message']]);
            http_response_code(500);
            exit;
        }

        $exercises = [];
        while ($row = oci_fetch_assoc($stmt)) {
            $exercises[] = [
                'id' => $row['ID_OLAHRAGA'],
                'title' => $row['NAMA_OLAHRAGA'],
                'calories' => $row['KALORI_PER_SET'],
                'time' => $row['ESTIMASI_WAKTU'],
                'image' => $row['GAMBAR'],
                'video' => $row['LINK_VIDEO'],
            ];
        }
        echo json_encode($exercises);
    }

    http_response_code(200);
    exit;
}

// Menambahkan olahraga baru (POST request)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Validasi duplikasi berdasarkan judul
    $sql_check = "SELECT COUNT(*) AS COUNT FROM data_olahraga WHERE NAMA_OLAHRAGA = :judul";
    $stmt_check = oci_parse($conn, $sql_check);
    oci_bind_by_name($stmt_check, ":judul", $data['judul']);
    oci_execute($stmt_check);
    $row_check = oci_fetch_assoc($stmt_check);

if ($row_check['COUNT'] > 0) {
    echo json_encode(['success' => false, 'message' => 'Olahraga dengan judul ini sudah ada']);
    http_response_code(409); // Conflict
    exit;
}

    $data = json_decode(file_get_contents('php://input'), true);
    error_log("Data yang diterima: " . print_r($data, true));


    // Validasi input
    if (
        empty($data['judul']) ||
        empty($data['kalori_per_set']) ||
        empty($data['estimasi_waktu'])
    ) {
        echo json_encode(['success' => false, 'message' => 'Data tidak lengkap. Pastikan semua data telah diisi.']);
        http_response_code(400); // Gunakan kode status 400 untuk kesalahan permintaan
        exit;
    }



    // Salin nilai dari $data ke variabel
    $judul = $data['judul'];
    $kalori_per_set = $data['kalori_per_set'];
    $estimasi_waktu = $data['estimasi_waktu'];
    $gambar = $data['gambar'] ?? '';
    $link_video = $data['link_video'] ?? '';
    $admin_id = 1; // Contoh, sesuaikan dengan autentikasi admin

    // Dapatkan ID baru
    $sql = "SELECT NVL(MAX(ID_OLAHRAGA), 0) + 1 AS NEXT_ID FROM data_olahraga";
    $stmt = oci_parse($conn, $sql);
    oci_execute($stmt);
    $row = oci_fetch_assoc($stmt);
    $next_id = $row['NEXT_ID'];

    // Query untuk menambahkan olahraga baru
    $sql = "INSERT INTO data_olahraga (
                ID_OLAHRAGA, 
                NAMA_OLAHRAGA, 
                KALORI_PER_SET, 
                ESTIMASI_WAKTU, 
                GAMBAR, 
                LINK_VIDEO, 
                ADMIN_ID_ADMIN
            ) VALUES (
                :id, 
                :judul, 
                :kalori_per_set, 
                :estimasi_waktu, 
                :gambar, 
                :link_video, 
                :admin_id
            )";


    $stmt = oci_parse($conn, $sql);

    // Binding parameter
    oci_bind_by_name($stmt, ":id", $next_id);
    oci_bind_by_name($stmt, ":judul", $judul);
    oci_bind_by_name($stmt, ":kalori_per_set", $kalori_per_set);
    oci_bind_by_name($stmt, ":estimasi_waktu", $estimasi_waktu);
    oci_bind_by_name($stmt, ":gambar", $gambar);
    oci_bind_by_name($stmt, ":link_video", $link_video);
    oci_bind_by_name($stmt, ":admin_id", $admin_id);

    if (oci_execute($stmt)) {
        echo json_encode(['success' => true, 'message' => 'Olahraga berhasil ditambahkan']);
        http_response_code(201);
    } else {
        $error = oci_error($stmt);
        echo json_encode(['success' => false, 'message' => 'Gagal menambahkan olahraga', 'error' => $error['message']]);
        http_response_code(500);
    }
    exit;
}


// Menghapus olahraga (DELETE request)
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'] ?? null;
    // Debug nilai variabel sebelum binding
    error_log('Judul: ' . $data['judul']);
    error_log('Kalori per set: ' . $data['kalori_per_set']);
    error_log('Estimasi waktu: ' . $data['estimasi_waktu']);
    error_log('Gambar: ' . ($data['gambar'] ?? 'null'));
    error_log('Link video: ' . ($data['link_video'] ?? 'null'));

    if (!$id) {
        echo json_encode(['success' => false, 'message' => 'ID olahraga tidak diberikan']);
        http_response_code(400);
        exit;
    }

    $sql = "DELETE FROM data_olahraga WHERE ID_OLAHRAGA = :id";
    $stmt = oci_parse($conn, $sql);

    oci_bind_by_name($stmt, ":id", $id);

    if (oci_execute($stmt)) {
        echo json_encode(['success' => true, 'message' => 'Olahraga berhasil dihapus']);
        http_response_code(200);
    } else {
        $error = oci_error($stmt);
        echo json_encode(['success' => false, 'message' => 'Gagal menghapus olahraga', 'error' => $error['message']]);
        http_response_code(500);
    }
    exit;
}

// Mengedit olahraga (PUT request)
// Mengedit olahraga (PUT request)
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Menerima dan mendecode data JSON
    $data = json_decode(file_get_contents('php://input'), true);
    error_log(print_r($data, true));

    // Validasi data yang diterima
    $id = isset($data['id']) ? $data['id'] : null;
    if ($id === null) {
        error_log('ID is missing!');
        echo json_encode(['success' => false, 'message' => 'ID tidak ditemukan']);
        http_response_code(400);
        exit;
    }

    $judul = $data['judul'] ?? null;
    $kalori_per_set = $data['kalori_per_set'] ?? null;
    $estimasi_waktu = $data['estimasi_waktu'] ?? null;

    if (empty($judul) || empty($kalori_per_set) || empty($estimasi_waktu)) {
        echo json_encode(['success' => false, 'message' => 'Data tidak lengkap']);
        http_response_code(400);
        exit;
    }

    // Nilai default jika tidak diberikan
    $gambar = $data['gambar'] ?? '';
    $link_video = $data['link_video'] ?? '';

    // Log data yang diterima
    error_log("Data yang diterima untuk update olahraga: " . print_r($data, true));

    // Query untuk memperbarui data olahraga
    $sql = "UPDATE data_olahraga
            SET NAMA_OLAHRAGA = :judul,
                KALORI_PER_SET = :kalori_per_set,
                ESTIMASI_WAKTU = :estimasi_waktu,
                GAMBAR = :gambar,
                LINK_VIDEO = :link_video
            WHERE ID_OLAHRAGA = :id";

    // Persiapkan statement
    $stmt = oci_parse($conn, $sql);

    // Bind variabel ke query
    oci_bind_by_name($stmt, ":judul", $judul);
    oci_bind_by_name($stmt, ":kalori_per_set", $kalori_per_set);
    oci_bind_by_name($stmt, ":estimasi_waktu", $estimasi_waktu);
    oci_bind_by_name($stmt, ":gambar", $gambar);
    oci_bind_by_name($stmt, ":link_video", $link_video);
    oci_bind_by_name($stmt, ":id", $id);

    // Eksekusi query dan cek hasilnya
    if (oci_execute($stmt)) {
        error_log("Query berhasil dieksekusi untuk ID: $id");
        echo json_encode(['success' => true, 'message' => 'Olahraga berhasil diperbarui']);
        http_response_code(200);
    } else {
        $error = oci_error($stmt);
        error_log("Gagal mengeksekusi query: " . $error['message']);
        echo json_encode(['success' => false, 'message' => 'Gagal memperbarui olahraga', 'error' => $error['message']]);
        http_response_code(500);
    }

    exit;
}





// Jika metode tidak dikenali
http_response_code(405); // Metode Tidak Diizinkan
echo json_encode(['success' => false, 'message' => 'Metode HTTP tidak didukung']);
?>
