<?php
// Konfigurasi koneksi database Oracle
$host = 'localhost';
$port = '1521';
$service_name = 'XE';
$username = 'c##iqy';
$password = '1234';

// Membuat string koneksi
$dsn = "(DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = $host)(PORT = $port))
    (CONNECT_DATA =
        (SERVER = DEDICATED)
        (SERVICE_NAME = $service_name)
    )
)";

$conn = oci_connect($username, $password, $dsn);

if (!$conn) {
    $e = oci_error();
    trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
}

// Header CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
?>
