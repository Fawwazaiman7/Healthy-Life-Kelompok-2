<?php
header('Content-Type: application/json');

// Database connection
include 'connection.php';

// Pastikan ini adalah GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : null;

    if (!$user_id) {
        echo json_encode([
            'success' => false,
            'message' => 'User ID is required!'
        ]);
        exit;
    }

    // Ambil data pengguna berdasarkan ID
    $query = "SELECT name, weight, age, height FROM users WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        echo json_encode([
            'success' => true,
            'user' => $user
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'User not found!'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method. Use GET.'
    ]);
}
?>
