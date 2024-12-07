<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // Mengizinkan akses dari semua origin
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); // Mengizinkan beberapa metode HTTP
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Mengizinkan header tertentu

// Database connection
include 'connection.php';

// Pastikan ini adalah GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = isset($_GET['id']) ? intval($_GET['id']) : null;

    if ($id) {
        // Ambil artikel berdasarkan ID
        $query = "SELECT id, title, content, image_url FROM articles WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $article = $result->fetch_assoc();
            echo json_encode([
                'success' => true,
                'article' => $article
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Article not found'
            ]);
        }
    } else {
        // Ambil semua artikel
        $query = "SELECT id, title, content, image_url FROM articles";
        $result = $conn->query($query);

        $articles = [];
        while ($row = $result->fetch_assoc()) {
            $articles[] = $row;
        }

        echo json_encode([
            'success' => true,
            'articles' => $articles
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method. Use GET.'
    ]);
}
?>
