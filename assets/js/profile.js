

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