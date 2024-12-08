<?php
header("Access-Control-Allow-Origin: *"); // Mengizinkan akses dari semua origin
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Mengizinkan beberapa metode HTTP
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Mengizinkan header tertentu

error_reporting(E_ALL);
ini_set('display_errors', 1);

ob_start(); // Tangkap semua output


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit;
}

// Mengimpor koneksi database
include_once 'connection.php';

if (!$conn) {
    error_log("Koneksi ke database gagal: " . oci_error());
    die("Koneksi database gagal");
} else {
    error_log("Koneksi ke database berhasil");
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        // Query untuk mendapatkan artikel berdasarkan ID
        $sql = "SELECT * FROM artikel WHERE ID_ARTIKEL = :id";
        $stmt = oci_parse($conn, $sql);
        oci_bind_by_name($stmt, ":id", $id);

        if (!oci_execute($stmt, OCI_DEFAULT)) {
            $error = oci_error($stmt);
            echo json_encode(['success' => false, 'message' => 'Gagal mengambil data', 'error' => $error['message']]);
            error_log("Query gagal dieksekusi: " . $error['message']);
            http_response_code(500);
            exit;
        }

        $article = oci_fetch_assoc($stmt);
        if ($article) {
            // Baca isi CLOB jika tersedia
            if (isset($article['KONTEN']) && $article['KONTEN'] instanceof OCILob) {
                $article['KONTEN'] = $article['KONTEN']->read($article['KONTEN']->size());
            }

            // Jika data ditemukan
            $response = [
                'success' => true,
                'data' => [
                    'id' => $article['ID_ARTIKEL'],
                    'title' => $article['JUDUL'],
                    'content' => $article['KONTEN'] ?? "",
                    'category' => $article['KATEGORI_ARTIKEL'] ?? "",
                    'bmi_category' => $article['KATEGORI_BMI_ARTIKEL'] ?? "",
                ],
            ];
            echo json_encode($response);
            error_log("Artikel ditemukan dan dikirim: " . json_encode($response));
        } else {
            echo json_encode(['success' => false, 'message' => 'Data tidak ditemukan']);
            error_log("Artikel dengan ID $id tidak ditemukan.");
        }
    } else {
        // Jika tidak ada ID, ambil semua artikel
        $sql = "SELECT * FROM artikel";
        $stmt = oci_parse($conn, $sql);

        if (!oci_execute($stmt, OCI_DEFAULT)) {
            $error = oci_error($stmt);
            echo json_encode(['success' => false, 'message' => 'Gagal mengambil data', 'error' => $error['message']]);
            error_log("Query gagal dieksekusi: " . $error['message']);
            http_response_code(500);
            exit;
        }

        $articles = [];
        while ($row = oci_fetch_assoc($stmt)) {
            // Baca isi CLOB
            if (isset($row['KONTEN']) && $row['KONTEN'] instanceof OCILob) {
                $row['KONTEN'] = $row['KONTEN']->read($row['KONTEN']->size());
            }

            error_log("Artikel ditemukan: " . print_r($row, true)); // Debug setiap row
            $articles[] = [
                'id' => $row['ID_ARTIKEL'],
                'title' => $row['JUDUL'],
                'content' => $row['KONTEN'] ?? "",
                'category' => $row['KATEGORI_ARTIKEL'] ?? "",
                'bmi_category' => $row['KATEGORI_BMI_ARTIKEL'] ?? "",
            ];
        }

        if (empty($articles)) {
            echo json_encode(['success' => true, 'message' => 'Tidak ada artikel ditemukan']);
        } else {
            $response = ['success' => true, 'data' => $articles];
            $json = json_encode($response);

            if ($json === false) {
                error_log("JSON encoding gagal: " . json_last_error_msg());
                echo json_encode(['success' => false, 'message' => 'Gagal mengencode data']);
            } else {
                echo $json;
                error_log("Artikel yang dikirim ke client: " . $json);
            }
        }
    }

    http_response_code(200);
    exit;
}

// Menambahkan artikel baru (POST request)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Validasi data input
    if (empty($data['judul']) || empty($data['konten']) || empty($data['kategori_artikel'])) {
        echo json_encode(['success' => false, 'message' => 'Judul, Konten dan kategori artikel wajib diisi']);
        http_response_code(400);
        exit;
    }

    // Generate ID Artikel berikutnya
    $sql = "SELECT NVL(MAX(ID_ARTIKEL), 0) + 1 AS NEXT_ID FROM artikel";
    $stmt = oci_parse($conn, $sql);
    if (!oci_execute($stmt)) {
        $error = oci_error($stmt);
        echo json_encode(['success' => false, 'message' => 'Gagal menghitung ID Artikel', 'error' => $error['message']]);
        exit;
    }
    $row = oci_fetch_assoc($stmt);
    $next_id = (int) $row['NEXT_ID'];

    // Insert Artikel dengan CLOB kosong
    $sql = "INSERT INTO artikel (ID_ARTIKEL, JUDUL, KONTEN, KATEGORI_ARTIKEL, KATEGORI_BMI_ARTIKEL, ADMIN_ID_ADMIN) 
            VALUES (:id_artikel, :judul, EMPTY_CLOB(), :kategori_artikel, :kategori_bmi_artikel, :admin_id)
            RETURNING KONTEN INTO :clob";
    $stmt = oci_parse($conn, $sql);

    $admin_id = 1; // Default Admin ID
    $clob = oci_new_descriptor($conn, OCI_D_LOB); // Membuat descriptor untuk CLOB
    oci_bind_by_name($stmt, ":id_artikel", $next_id);
    oci_bind_by_name($stmt, ":judul", $data['judul']);
    oci_bind_by_name($stmt, ":kategori_artikel", $data['kategori_artikel']);
    oci_bind_by_name($stmt, ":kategori_bmi_artikel", $data['kategori_bmi_artikel']);
    oci_bind_by_name($stmt, ":admin_id", $admin_id);
    oci_bind_by_name($stmt, ":clob", $clob, -1, OCI_B_CLOB);

    if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
        $error = oci_error($stmt);
        echo json_encode(['success' => false, 'message' => 'Gagal menambahkan artikel', 'error' => $error['message']]);
        oci_rollback($conn);
        $clob->free(); // Bebaskan resource descriptor
        exit;
    }

    // Simpan data ke dalam CLOB
    if ($clob->save($data['konten'])) {
        oci_commit($conn);
        echo json_encode(['success' => true, 'message' => 'Artikel berhasil ditambahkan']);
        error_log("Artikel berhasil ditambahkan dengan ID: $next_id");
    } else {
        echo json_encode(['success' => false, 'message' => 'Gagal menyimpan konten artikel']);
        error_log("Gagal menyimpan konten artikel dengan ID: $next_id");
        oci_rollback($conn);
    }

    $clob->free(); // Bebaskan resource descriptor
    exit;
}

// Mengedit artikel (PUT request)
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Validasi ID artikel
    $id = $data['id'] ?? null;
    if (!$id) {
        echo json_encode(['success' => false, 'message' => 'ID Artikel tidak diberikan']);
        http_response_code(400);
        exit;
    }

    // Salin data dari array $data ke variabel
    $judul = $data['judul'] ?? '';
    $konten = $data['konten'] ?? '';
    $kategori_artikel = $data['kategori_artikel'] ?? '';
    $kategori_bmi_artikel = $data['kategori_bmi_artikel'] ?? '';

    // Validasi input
    if (empty($judul) || empty($konten)) {
        echo json_encode(['success' => false, 'message' => 'Judul dan Konten wajib diisi']);
        http_response_code(400);
        exit;
    }

    // Query untuk memperbarui data artikel
    $sql = "UPDATE artikel
        SET JUDUL = :judul,
            KONTEN = EMPTY_CLOB(),
            KATEGORI_ARTIKEL = :kategori_artikel,
            KATEGORI_BMI_ARTIKEL = :kategori_bmi_artikel
        WHERE ID_ARTIKEL = :id_artikel
        RETURNING KONTEN INTO :konten_clob";

    $stmt = oci_parse($conn, $sql);

    // Binding variabel ke query
    oci_bind_by_name($stmt, ":judul", $judul);
    oci_bind_by_name($stmt, ":kategori_artikel", $kategori_artikel);
    oci_bind_by_name($stmt, ":kategori_bmi_artikel", $kategori_bmi_artikel);
    oci_bind_by_name($stmt, ":id_artikel", $id);

    // Placeholder untuk CLOB
    $konten_clob = oci_new_descriptor($conn, OCI_D_LOB);
    oci_bind_by_name($stmt, ":konten_clob", $konten_clob, -1, OCI_B_CLOB);

    // Eksekusi query untuk memperbarui artikel
    if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
        $error = oci_error($stmt);
        echo json_encode(['success' => false, 'message' => 'Gagal memperbarui artikel', 'error' => $error['message']]);
        oci_rollback($conn);
        $konten_clob->free();
        exit;
    }

    // Simpan konten ke CLOB
    if ($konten_clob->save($konten)) {
        oci_commit($conn);
        echo json_encode(['success' => true, 'message' => 'Artikel berhasil diperbarui']);
        error_log("Artikel dengan ID $id berhasil diperbarui");
    } else {
        echo json_encode(['success' => false, 'message' => 'Gagal menyimpan konten artikel']);
        error_log("Gagal menyimpan konten artikel untuk ID $id");
        oci_rollback($conn);
    }

    // Bebaskan resource CLOB
    $konten_clob->free();
    exit;
}

// Menghapus artikel (DELETE request)
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    error_log("Data yang diterima oleh backend: " . json_encode($data)); // Log data yang diterima

    $id = $data['id_artikel'] ?? null;

    if (!$id) {
        echo json_encode(['success' => false, 'message' => 'ID Artikel tidak diberikan']);
        error_log("Gagal menghapus: ID Artikel tidak diberikan.");
        http_response_code(400);
        exit;
    }

    // Hapus artikel berdasarkan ID
    $sql = "DELETE FROM artikel WHERE ID_ARTIKEL = :id_artikel";
    $stmt = oci_parse($conn, $sql);
    oci_bind_by_name($stmt, ":id_artikel", $id);

    if (oci_execute($stmt)) {
        echo json_encode(['success' => true, 'message' => 'Artikel berhasil dihapus']);
        error_log("Artikel dengan ID $id berhasil dihapus");
        http_response_code(200);
    } else {
        $error = oci_error($stmt);
        echo json_encode(['success' => false, 'message' => 'Gagal menghapus artikel', 'error' => $error['message']]);
        error_log("Artikel dengan ID $id gagal dihapus. Error: " . $error['message']);
        http_response_code(500);
    }

    exit;
}



    // Jika metode tidak dikenali
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Metode HTTP tidak didukung']);
    $output = ob_get_clean();
    if (!empty($output)) {
        error_log("Ada output tambahan sebelum JSON: " . $output);
    }

