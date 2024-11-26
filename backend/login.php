<?php
header('Content-Type: application/json');

// Database connection
include 'connection.php';

// Pastikan ini adalah POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ambil data dari request body
    $input = json_decode(file_get_contents('php://input'), true);

    $email = isset($input['email']) ? $input['email'] : null;
    $password = isset($input['password']) ? $input['password'] : null;

    // Validasi input
    if (!$email || !$password) {
        echo json_encode([
            'success' => false,
            'message' => 'All fields are required!'
        ]);
        exit;
    }

    // Cek apakah user ada di database
    $query = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        // Verifikasi password
        if (password_verify($password, $user['password'])) {
            echo json_encode([
                'success' => true,
                'message' => 'Login successful!',
                'user' => [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'email' => $user['email']
                ]
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Invalid password!'
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'User not found!'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method. Use POST.'
    ]);
}
?>
