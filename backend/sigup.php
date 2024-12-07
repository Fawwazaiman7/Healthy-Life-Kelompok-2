<?php
header('Content-Type: application/json');

// Database connection
include 'connection.php';

// Pastikan ini adalah POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ambil data dari request body
    $input = json_decode(file_get_contents('php://input'), true);

    $username = isset($input['username']) ? $input['username'] : null; // Ganti name dengan username
    $email = isset($input['email']) ? $input['email'] : null;
    $password = isset($input['password']) ? $input['password'] : null;

    // Validasi input
    if (!$username || !$email || !$password) {
        echo json_encode([
            'success' => false,
            'message' => 'All fields are required!'
        ]);
        exit;
    }

    // Cek apakah email sudah terdaftar
    $query = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode([
            'success' => false,
            'message' => 'Email already registered!'
        ]);
        exit;
    }

    // Hash password dan simpan ke database
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"; // Ganti name dengan username
    $stmt = $conn->prepare($query);
    $stmt->bind_param("sss", $username, $email, $hashedPassword); // Ganti name dengan username

    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'User registered successfully!'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Failed to register user.'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method. Use POST.'
    ]);
}
?>

