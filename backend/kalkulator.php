<?php
header('Content-Type: application/json');

// Pastikan ini adalah POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ambil data dari request body
    $input = json_decode(file_get_contents('php://input'), true);

    // Validasi input
    $age = isset($input['age']) ? (int)$input['age'] : null;
    $gender = isset($input['gender']) ? $input['gender'] : null;
    $height = isset($input['height']) ? (float)$input['height'] : null;
    $weight = isset($input['weight']) ? (float)$input['weight'] : null;

    if (!$age || !$gender || !$height || !$weight) {
        echo json_encode([
            'success' => false,
            'message' => 'Semua data (usia, jenis kelamin, tinggi, berat) wajib diisi!'
        ]);
        exit;
    }

    // Kalkulasi BMI
    $heightInMeters = $height / 100; // Konversi tinggi ke meter
    $bmi = $weight / ($heightInMeters * $heightInMeters);
    $bmi = round($bmi, 1); // Pembulatan BMI ke satu desimal

    // Tentukan kategori BMI dan kisaran berat ideal
    $bmiCategory = '';
    $idealWeightRange = '';

    if ($bmi < 18.5) {
        $bmiCategory = 'Kurus';
        $idealWeightRange = 'Berat ideal kamu antara 45 - 60 kg';
    } elseif ($bmi >= 18.5 && $bmi <= 24.9) {
        $bmiCategory = 'Normal';
        $idealWeightRange = 'Berat ideal kamu antara 59 - 80 kg';
    } elseif ($bmi >= 25 && $bmi <= 29.9) {
        $bmiCategory = 'Gemuk';
        $idealWeightRange = 'Berat ideal kamu antara 65 - 90 kg';
    } elseif ($bmi >= 30 && $bmi <= 34.9) {
        $bmiCategory = 'Obesitas 1';
        $idealWeightRange = 'Berat ideal kamu antara 70 - 100 kg';
    } else {
        $bmiCategory = 'Obesitas 2';
        $idealWeightRange = 'Berat ideal kamu antara 80 - 120 kg';
    }

    // Kirimkan hasil dalam format JSON
    echo json_encode([
        'success' => true,
        'bmi' => $bmi,
        'bmiCategory' => $bmiCategory,
        'idealWeightRange' => $idealWeightRange
    ]);
} else {
    // Jika bukan POST request
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method. Use POST request.'
    ]);
}
?>
