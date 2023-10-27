<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: x-requested-with, Content-Type, origin, authorization, accept, client-security-token");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cafeproject";

// Kiểm tra kết nối cơ sở dữ liệu
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Kết nối đến cơ sở dữ liệu thất bại: " . $conn->connect_error);
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];
    $email = $_POST["email"];

    // Kiểm tra và xử lý dữ liệu đầu vào ở đây (loại bỏ ký tự đặc biệt, kiểm tra tính hợp lệ, v.v.)

    // Sử dụng prepared statements để tránh SQL Injection
    $stmt = $conn->prepare("INSERT INTO account_nguoidung (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username,$email, $password);

    if ($stmt->execute()) {
        // Đăng ký thành công
        echo "Đăng ký thành công!";
        // Hoặc trả về thông báo JSON cho giao diện (nếu cần)

        // Ví dụ: Trả về JSON
        // $response = ["message" => "Đăng ký thành công"];
        // header("Content-type: application/json");
        // echo json_encode($response);
    } else {
        // Xử lý lỗi
        echo "Lỗi khi đăng ký: " . $stmt->error;
    }

    // Đóng prepared statement
    $stmt->close();
}

// Đóng kết nối
$conn->close();
?>











