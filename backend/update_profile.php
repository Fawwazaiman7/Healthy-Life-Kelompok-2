<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json; charset=UTF-8');

// Include database connection
include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the POST data
    $data = json_decode(file_get_contents("php://input"), true);

    $email = $data['email'] ?? null;
    $berat_badan = $data['berat_badan'] ?? null;
    $tinggi_badan = $data['tinggi_badan'] ?? null;
    $usia = $data['usia'] ?? null;

    if (!$email || !$berat_badan || !$tinggi_badan || !$usia) {
        echo json_encode([
            'success' => false,
            'message' => 'All fields are required'
        ]);
        exit;
    }

    // Update query
    $query = "UPDATE pengguna SET 
                berat_badan = :berat_badan, 
                tinggi_badan = :tinggi_badan, 
                usia = :usia 
              WHERE email = :email";

    $stmt = oci_parse($conn, $query);
    oci_bind_by_name($stmt, ':berat_badan', $berat_badan);
    oci_bind_by_name($stmt, ':tinggi_badan', $tinggi_badan);
    oci_bind_by_name($stmt, ':usia', $usia);
    oci_bind_by_name($stmt, ':email', $email);

    if (oci_execute($stmt)) {
        echo json_encode([
            'success' => true,
            'message' => 'Profile updated successfully'
        ]);
    } else {
        $error = oci_error($stmt);
        echo json_encode([
            'success' => false,
            'message' => 'Failed to update profile: ' . $error['message']
        ]);
    }

    oci_free_statement($stmt);
    oci_close($conn);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
}
?>
