<?php
require_once 'connection.php'; // pastikan path-nya benar

// Password baru yang ingin Anda pakai untuk admin
$newPassword = "123"; // Ganti ini dengan password baru Anda

// Hash password baru pakai bcrypt
$hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);

// ID admin yang ingin di-reset passwordnya, misal admin dengan id_admin=1
$id_admin = 1;

$stmt = $conn->prepare("UPDATE admin SET kata_sandi = ? WHERE id_admin = ?");
$stmt->bind_param("si", $hashedPassword, $id_admin);

if ($stmt->execute()) {
    echo "Password admin berhasil di-reset menjadi: " . $newPassword;
} else {
    echo "Gagal reset password admin.";
}
?>
