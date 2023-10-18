// Animations
const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");

registerButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

// Check Register Error
const registerForm = document.querySelector('.form-register');
const regUsername = document.getElementById('username');
const regEmail = document.getElementById('email');
const regPassword = document.getElementById('password');
const regError = document.getElementById('registration-error');

// Check required fields
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
            isRequired = true;
        } else {
            showSuccess(input);
        }
    });

    return isRequired;
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters.`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters.`);
    }
}

// Check email is valid
function checkEmail(input) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(input.value.trim())) {
        showError(input, "Email is not valid");
    }
}

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
    const small = formControl.querySelector('small');
    small.innerText = '';
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!checkRequired([regUsername, regEmail, regPassword])) {
        checkLength(regUsername, 4, 20);
        checkEmail(regEmail);
        checkLength(regPassword, 8, 20);

        if (!regError.innerText) {
            // If no errors, you can proceed to registration.
            // You may call your registration function here.
            registerUser(regUsername.value, regEmail.value, regPassword.value);
        }
    }
});

// Check Login Error
const loginForm = document.querySelector('.form-login');
const lgEmail = document.getElementById('lgEmail');
const lgPassword = document.getElementById('lgPassword');
const lgError = document.getElementById('login-error');

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (lgEmail.value.trim() === '' || lgPassword.value.trim() === '') {
        lgError.innerText = "Please enter your email and password.";
    } else {
        // If no errors, you can proceed to login.
        // You may call your login function here.
        loginUser(lgEmail.value, lgPassword.value);
    }
});

// Hàm đăng ký
function registerUser(username, email, password) {
    // Tạo một đối tượng chứa dữ liệu người dùng
    const userData = {
        username: username,
        email: email,
        password: password
    };

    // Sử dụng Fetch API để gửi yêu cầu POST đến máy chủ
    fetch('Register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData) // Chuyển đối tượng dữ liệu thành chuỗi JSON
    })
        .then(response => response.json()) // Chuyển đổi phản hồi từ máy chủ thành đối tượng JSON
        .then(data => {
            if (data.message === 'Đăng ký thành công') {
                // Đăng ký thành công, bạn có thể thực hiện các hành động sau đây
                alert('Đăng ký thành công!');
            } else {
                // Đăng ký không thành công, hiển thị thông báo lỗi
                alert('Lỗi khi đăng ký: ' + data.message);
            }
        })
        .catch(error => {
            // Xử lý lỗi nếu có
            console.error('Lỗi:', error);
        });
}

// Hàm đăng nhập
function loginUser(email, password) {
    // Tạo một đối tượng chứa dữ liệu người dùng
    const loginData = {
        email: email,
        password: password
    };

    // Sử dụng Fetch API để gửi yêu cầu POST đến máy chủ
    fetch('Login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData) // Chuyển đối tượng dữ liệu thành chuỗi JSON
    })
        .then(response => response.json()) // Chuyển đổi phản hồi từ máy chủ thành đối tượng JSON
        .then(data => {
            if (data.message === 'Đăng nhập thành công') {
                // Đăng nhập thành công, bạn có thể thực hiện các hành động sau đây
                alert('Đăng nhập thành công!');
            } else {
                // Đăng nhập không thành công, hiển thị thông báo lỗi
                alert('Lỗi khi đăng nhập: ' + data.message);
            }
        })
        .catch(error => {
            // Xử lý lỗi nếu có
            console.error('Lỗi:', error);
        });
}
