

//Mã js dùng để hiển thị giao diện add card ẩn đi giao diện my wallet 
document.querySelector('.card_blank__addToCard').addEventListener('click', function() {
  document.getElementById('info-detail').style.display = 'none'; 
  document.getElementById('add-card').style.display = 'block'; 

});


// Ma js dung de hien thi giao dien My Wallet ẩn đi giao diện của phần add card 
document.querySelectorAll('.black-info-detail, #btn-cancel').forEach(function(element) {
  element.addEventListener('click', function() {
    document.getElementById('info-detail').style.display = 'block'; 
    document.getElementById('add-card').style.display = 'none'; 
    const ftNameInput = document.getElementById('ft-name-text');
    const cardNumberInput = document.getElementById('card-number_text');
    const cvvInput = document.getElementById('cvv');
    const ltNameInput = document.getElementById('lt-name-text');
    const expDateInput = document.getElementById('expDate');
    const phoneNumberInput = document.getElementById('phoneNumber');
    ftNameInput.value = "";
    cardNumberInput.value = "";
    cvvInput.value = "";
    ltNameInput.value = "";
    expDateInput.value = "";
    phoneNumberInput.value = "";
  });
});




// Mã js dùng để hiển thị giao diện personal info ẩn giao diện my wallet 
document.querySelector('.personal-link').addEventListener('click', function() {
  
  document.getElementById('info-detail').style.display = 'none'; 
  document.getElementById('personal-tab').style.display = 'block'; 
  var personalLink = document.querySelector(".personal-selected"); // Lấy ra phần tử đầu tiên có class "personal-link"

  if (personalLink) {
    personalLink.classList.add("cl-red"); // Thêm class "color-red" cho phần tử
  }

  const nameInput = document.getElementById('name-text');
  const addressInput = document.getElementById('addr-text');
  const phoneInput = document.getElementById('phone-text');
  const emailInput = document.getElementById('email-text');
  nameInput.value = "";
  addressInput.value = "";
  phoneInput.value = "";
  emailInput.value = "";


});

document.querySelectorAll('.back-profile, #btn-cancel-personal').forEach(function(element) {
  element.addEventListener('click', function() {
    document.getElementById('info-detail').style.display = 'block'; 
    document.getElementById('personal-tab').style.display = 'none'; 
    var personalLink = document.querySelector(".personal-selected"); // Lấy ra phần tử đầu tiên có class "personal-selected"

    if (personalLink) {
      personalLink.classList.remove("cl-red"); // Xóa class "cl-red" khỏi phần tử
    }
  });
});


const modal = document.getElementById("modal-logout");

// Get the button that opens the modal
const btn_log = document.getElementById("logoutButton");

// Get the <span> element that closes the modal
const cancel_lg = document.getElementById("btn-cancel");

const confirm_lg = document.getElementById("btn-confirm");


// When the user clicks on the button, open the modal
btn_log.onclick = function() {
  modal.style.display = "block";
}

cancel_lg.onclick = function() {
  modal.style.display = "none";
}

confirm_lg.onclick = function() {
  window.location.href = 'index.html';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//toast
function showSuccessToast() {
  toast({
    title: "Thành công!",
    message: "Cập nhật thông tin thành công!",
    type: "success",
    duration: 5000
  });
}

function showErrorToast() {
  toast({
    title: "Thất bại!",
    message: "Vui lòng nhập thông tin đúng với định dạng!",
    type: "error",
    duration: 5000
  });
}

function updateUser1InLocalStorage() {
  // Lấy giá trị từ các ô input
  const nameInput = document.getElementById('name-text');
  const addressInput = document.getElementById('addr-text');
  const phoneInput = document.getElementById('phone-text');
  const emailInput = document.getElementById('email-text');

  console.log(nameInput.value);
  console.log(addressInput.value);
  console.log(phoneInput.value);
  console.log(emailInput.value);

  let user1 = {
    name: nameInput.value,
    address: addressInput.value,
    phone: phoneInput.value,
    email_add: emailInput.value
  };

  // Lưu đối tượng user1 cập nhật vào Local Storage
  localStorage.setItem('user1', JSON.stringify(user1));

  // Hiển thị thông báo hoặc thực hiện các tác vụ khác (tuỳ theo bạn)
  const re = JSON.parse(localStorage.getItem('user1'));

  console.log(re);
  showSuccessToast();
  nameInput.value = "";
  addressInput.value = "";
  phoneInput.value = "";
  emailInput.value = "";
}

// Gắn sự kiện click vào thẻ <a>
const saveLink = document.getElementById('save-link');
console.log(saveLink);
saveLink.addEventListener('click', function(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
    const check_valid1 = document.getElementById('check-valid1');
    const check_valid2 = document.getElementById('check-valid2');
    const check_valid3 = document.getElementById('check-valid3');
    const check_valid4 = document.getElementById('check-valid4');

    if (check_valid1.checkValidity() && check_valid2.checkValidity() && check_valid3.checkValidity()  && check_valid4.checkValidity() ) {
      updateUser1InLocalStorage(); // Gọi hàm cập nhật và lưu dữ liệu
      document.getElementById('info-detail').style.display = 'block'; 
      document.getElementById('personal-tab').style.display = 'none'; 
      var personalLink = document.querySelector(".personal-selected"); // Lấy ra phần tử đầu tiên có class "personal-selected"
  
      if (personalLink) {
        personalLink.classList.remove("cl-red"); // Xóa class "cl-red" khỏi phần tử
      }
      storedPerson = JSON.parse(localStorage.getItem('user1'));
      if (storedPerson) {
          // Lấy danh sách tất cả các phần tử .icon_title
          const iconTitleElements = document.querySelectorAll('.icon_title');
          // Duyệt qua từng phần tử .icon_title và cập nhật nội dung của thẻ <p> bên trong
          iconTitleElements.forEach((iconTitleElement) => {
              const firstPTag = iconTitleElement.querySelector('p:first-child');
              if (firstPTag.textContent === 'Email Address') {
                  // Cập nhật thông tin chỉ khi thẻ <p> đầu tiên có nội dung là 'Email Address'
                  const emailP = iconTitleElement.querySelector('p:nth-child(2)'); 
                  emailP.textContent = storedPerson.email_add;
              }
              else if (firstPTag.textContent === 'Phone number') {
                // Cập nhật thông tin chỉ khi thẻ <p> đầu tiên có nội dung là 'Email Address'
                const emailP = iconTitleElement.querySelector('p:nth-child(2)'); 
                emailP.textContent = storedPerson.phone;
              }
              else if (firstPTag.textContent === 'Add an address') {
                // Cập nhật thông tin chỉ khi thẻ <p> đầu tiên có nội dung là 'Email Address'
                const emailP = iconTitleElement.querySelector('p:nth-child(2)'); 
                emailP.textContent = storedPerson.address;
              } 
              else {
                console.log("Co loi xay ra!");
              }
          });
  
          const firstParagraph = document.getElementById('modified_name');
  
          // Kiểm tra xem thẻ p đầu tiên có tồn tại không
          console.log(firstParagraph);
          if (firstParagraph) {
              // Cập nhật nội dung của thẻ p đầu tiên
              firstParagraph.textContent = storedPerson.name;
          }
  
      }
      else {
        console.log("Gia tri cua storedperson la:", storedPerson);
      };
    } else {
      showErrorToast();
    }
});


let cardArray = JSON.parse(localStorage.getItem('cards')) || [];

function createAndAppendCard() {


  const ftNameInput = document.getElementById('ft-name-text');
  const cardNumberInput = document.getElementById('card-number_text');
  const cvvInput = document.getElementById('cvv');
  const ltNameInput = document.getElementById('lt-name-text');
  const expDateInput = document.getElementById('expDate');
  const phoneNumberInput = document.getElementById('phoneNumber');

  console.log(ftNameInput.value);
  console.log(cardNumberInput.value);
  console.log(cvvInput.value);
  console.log(ltNameInput.value);
  console.log(expDateInput.value);
  console.log(phoneNumberInput.value);

  const card1 = {
    card: 'FeatherCard',
    name: ftNameInput.value + ' ' + ltNameInput.value,
    cardNumber: cardNumberInput.value,
    expD: expDateInput.value,
    phone: phoneNumberInput.value,
    cvv: cvvInput.value
  };


  cardArray.push(card1);

  // Lưu đối tượng card1 cập nhật vào Local Storage
  localStorage.setItem('cards', JSON.stringify(cardArray));





// Lấy vùng chứa các thẻ để chèn thẻ mới vào
const cardContainer = document.getElementById("card-container-render"); // Thay "card-container" bằng ID của vùng chứa bạn muốn chèn thẻ

// Lặp qua mảng cardArray và tạo thẻ cho mỗi phần tử trong mảng
  const newCard = document.createElement("div");
  newCard.classList.add("card_title");

  // Thiết lập nội dung cho card bằng thông tin từ mỗi phần tử trong mảng
  newCard.innerHTML = `
    <div class="bank_card">
        <img src="./assets/img/profile_img/UH18SDOBirEAnXGl 1.svg" alt="">
        <span>FeatherCard</span>
    </div>
    <img class="phane_icon" src="./assets/img/profile_img/test.svg" alt="">
    <span class="id_card">${card1.cardNumber}</span>
    <img class="oval_icon" src="./assets/img/profile_img/Oval.svg" alt="">
    <div class="card_title__holder">
        <p>Card Holder</p>
        <p>${card1.name}</p>
    </div>
    <div class="card_title__exp">
        <p>Expired</p>
        <p>${card1.expD}</p>
    </div>
  `;

  // Chèn thẻ mới vào vùng chứa thẻ
  cardContainer.appendChild(newCard);

  ftNameInput.value = "";
  cardNumberInput.value = "";
  cvvInput.value = "";
  ltNameInput.value = "";
  expDateInput.value = "";
  phoneNumberInput.value = "";
}

const saveCard = document.getElementById('save-card');
saveCard.addEventListener('click', function(event) {
  event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
  const creditCardForm = document.getElementById("credit-card-form");
  
  if (creditCardForm.checkValidity()) {
    createAndAppendCard();
    document.getElementById('info-detail').style.display = 'block'; 
    document.getElementById('add-card').style.display = 'none';
    showSuccessToast();
  } else {
    showErrorToast();
  }
});



window.addEventListener('load', function () {
  // Trang web đã tải xong, thực hiện các hành động sau khi trang đã sẵn sàng
  storedPerson = JSON.parse(localStorage.getItem('user1'));
    if (storedPerson) {
        // Lấy danh sách tất cả các phần tử .icon_title
        const iconTitleElements = document.querySelectorAll('.icon_title');
        // Duyệt qua từng phần tử .icon_title và cập nhật nội dung của thẻ <p> bên trong
        iconTitleElements.forEach((iconTitleElement) => {
            const firstPTag = iconTitleElement.querySelector('p:first-child');
            if (firstPTag.textContent === 'Email Address') {
                // Cập nhật thông tin chỉ khi thẻ <p> đầu tiên có nội dung là 'Email Address'
                const emailP = iconTitleElement.querySelector('p:nth-child(2)'); 
                emailP.textContent = storedPerson.email_add;
            }
            else if (firstPTag.textContent === 'Phone number') {
              // Cập nhật thông tin chỉ khi thẻ <p> đầu tiên có nội dung là 'Email Address'
              const emailP = iconTitleElement.querySelector('p:nth-child(2)'); 
              emailP.textContent = storedPerson.phone;
            }
            else if (firstPTag.textContent === 'Add an address') {
              // Cập nhật thông tin chỉ khi thẻ <p> đầu tiên có nội dung là 'Email Address'
              const emailP = iconTitleElement.querySelector('p:nth-child(2)'); 
              emailP.textContent = storedPerson.address;
            } 
            else {
              console.log("Co loi xay ra!");
            }
        });

        const firstParagraph = document.getElementById('modified_name');

        // Kiểm tra xem thẻ p đầu tiên có tồn tại không
        console.log(firstParagraph);
        if (firstParagraph) {
            // Cập nhật nội dung của thẻ p đầu tiên
            firstParagraph.textContent = storedPerson.name;
        }

    }
    else {
      console.log("Gia tri cua storedperson la:", storedPerson);
    };

    cardArray = JSON.parse(localStorage.getItem('cards')) || [];
    const cardContainer = document.getElementById("card-container-render"); // Thay "card-container" bằng ID của vùng chứa bạn muốn chèn thẻ

// Lặp qua mảng cardArray và tạo thẻ cho mỗi phần tử trong mảng
    cardArray.forEach(card => {
      const newCard = document.createElement("div");
      newCard.classList.add("card_title");

      // Thiết lập nội dung cho card bằng thông tin từ mỗi phần tử trong mảng
      newCard.innerHTML = `
        <div class="bank_card">
            <img src="./assets/img/profile_img/UH18SDOBirEAnXGl 1.svg" alt="">
            <span>FeatherCard</span>
        </div>
        <img class="phane_icon" src="./assets/img/profile_img/test.svg" alt="">
        <span class="id_card">${card.cardNumber}</span>
        <img class="oval_icon" src="./assets/img/profile_img/Oval.svg" alt="">
        <div class="card_title__holder">
            <p>Card Holder</p>
            <p>${card.name}</p>
        </div>
        <div class="card_title__exp">
            <p>Expired</p>
            <p>${card.expD}</p>
        </div>
      `;

      // Chèn thẻ mới vào vùng chứa thẻ
      cardContainer.appendChild(newCard);
    });


  console.log('Trang đã tải xong.');
});



function toast({ title = "", message = "", type = "info", duration = 3000 }) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");

    // Auto remove toast
    const autoRemoveId = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);

    // Remove toast when clicked
    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveId);
      }
    };

    const icons = {
      success: "fas fa-check-circle",
      info: "fas fa-info-circle",
      warning: "fas fa-exclamation-circle",
      error: "fas fa-exclamation-circle"
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);

    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

    toast.innerHTML = `
                    <div class="toast__icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="toast__body">
                        <h3 class="toast__title">${title}</h3>
                        <p class="toast__msg">${message}</p>
                    </div>
                    <div class="toast__close">
                        <i class="fas fa-times"></i>
                    </div>
                `;
    main.appendChild(toast);
  }
}


