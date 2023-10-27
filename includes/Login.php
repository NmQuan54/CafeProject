<?php
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
    if (isset($_POST["email"]) && isset($_POST["password"])) {
        $email = $_POST["email"];
        $password = $_POST["password"];

        // Tạo truy vấn SQL để kiểm tra thông tin đăng nhập
        $sql = "SELECT * FROM account_nguoidung WHERE email = ? AND password = ?";

        // Chuẩn bị truy vấn
        $stmt = $conn->prepare($sql);

        // Kiểm tra việc chuẩn bị truy vấn
        if ($stmt === false) {
            die("Lỗi chuẩn bị truy vấn: " . $conn->error);
        }

        // Bind các giá trị
        $stmt->bind_param("ss", $email, $password);

        // Thực hiện truy vấn
        if ($stmt->execute()) {
            $result = $stmt->get_result();

            if ($result !== null && $result->num_rows == 1) {
                // Đăng nhập thành công
                echo "Đăng nhập thành công";
            } else {
                // Đăng nhập không thành công
                echo "Đăng nhập không thành công";
            }
        } else {
            // Xử lý lỗi khi thực hiện truy vấn
            echo "Lỗi truy vấn: " . $stmt->error;
        }

        // Đóng truy vấn
        $stmt->close();
    } else {
        echo "Vui lòng điền đầy đủ thông tin email và password.";
    }
}
