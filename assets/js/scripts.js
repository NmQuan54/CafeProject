const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/**
 * Hàm tải template
 *
 * Cách dùng:
 * <div id="parent"></div>
 * <script>
 *  load("#parent", "./path-to-template.html");
 * </script>
 */
function load(selector, path) {
    const cached = localStorage.getItem(path);
    if (cached) {
        $(selector).innerHTML = cached;
    }

    fetch(path)
        .then((res) => res.text())
        .then((html) => {
            if (html !== cached) {
                $(selector).innerHTML = html;
                localStorage.setItem(path, html);
            }
        })
        .finally(() => {
            window.dispatchEvent(new Event("template-loaded"));
        });
}

/**
 * Hàm kiểm tra một phần tử
 * có bị ẩn bởi display: none không
 */
function isHidden(element) {
    if (!element) return true;

    if (window.getComputedStyle(element).display === "none") {
        return true;
    }

    let parent = element.parentElement;
    while (parent) {
        if (window.getComputedStyle(parent).display === "none") {
            return true;
        }
        parent = parent.parentElement;
    }

    return false;
}

/**
 * Hàm buộc một hành động phải đợi
 * sau một khoảng thời gian mới được thực thi
 */
function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

/**
 * Hàm tính toán vị trí arrow cho dropdown
 *
 * Cách dùng:
 * 1. Thêm class "js-dropdown-list" vào thẻ ul cấp 1
 * 2. CSS "left" cho arrow qua biến "--arrow-left-pos"
 */
const calArrowPos = debounce(() => {
    if (isHidden($(".js-dropdown-list"))) return;

    const items = $$(".js-dropdown-list > li");

    items.forEach((item) => {
        const arrowPos = item.offsetLeft + item.offsetWidth / 2;
        item.style.setProperty("--arrow-left-pos", `${arrowPos}px`);
    });
});

// Tính toán lại vị trí arrow khi resize trình duyệt
window.addEventListener("resize", calArrowPos);

// Tính toán lại vị trí arrow sau khi tải template
window.addEventListener("template-loaded", calArrowPos);

/**
 * Giữ active menu khi hover
 *
 * Cách dùng:
 * 1. Thêm class "js-menu-list" vào thẻ ul menu chính
 * 2. Thêm class "js-dropdown" vào class "dropdown" hiện tại
 *  nếu muốn reset lại item active khi ẩn menu
 */
window.addEventListener("template-loaded", handleActiveMenu);

function handleActiveMenu() {
    const dropdowns = $$(".js-dropdown");
    const menus = $$(".js-menu-list");
    const activeClass = "menu-column__item--active";

    const removeActive = (menu) => {
        menu.querySelector(`.${activeClass}`)?.classList.remove(activeClass);
    };

    const init = () => {
        menus.forEach((menu) => {
            const items = menu.children;
            if (!items.length) return;

            removeActive(menu);
            if (window.innerWidth > 991) items[0].classList.add(activeClass);

            Array.from(items).forEach((item) => {
                item.onmouseenter = () => {
                    if (window.innerWidth <= 991) return;
                    removeActive(menu);
                    item.classList.add(activeClass);
                };
                item.onclick = () => {
                    if (window.innerWidth > 991) return;
                    removeActive(menu);
                    item.classList.add(activeClass);
                    item.scrollIntoView();
                };
            });
        });
    };

    init();

    dropdowns.forEach((dropdown) => {
        dropdown.onmouseleave = () => init();
    });
}

/**
 * JS toggle
 *
 * Cách dùng:
 * <button class="js-toggle" toggle-target="#box">Click</button>
 * <div id="box">Content show/hide</div>
 */
window.addEventListener("template-loaded", initJsToggle);

function initJsToggle() {
    $$(".js-toggle").forEach((button) => {
        const target = button.getAttribute("toggle-target");
        if (!target) {
            document.body.innerText = `Cần thêm toggle-target cho: ${button.outerHTML}`;
        }
        button.onclick = (e) => {
            e.preventDefault();

            if (!$(target)) {
                return (document.body.innerText = `Không tìm thấy phần tử "${target}"`);
            }
            const isHidden = $(target).classList.contains("hide");

            requestAnimationFrame(() => {
                $(target).classList.toggle("hide", !isHidden);
                $(target).classList.toggle("show", isHidden);
            });
        };
        document.onclick = function (e) {
            if (!e.target.closest(target)) {
                const isHidden = $(target).classList.contains("hide");
                if (!isHidden) {
                    button.click();
                }
            }
        };
    });
}

window.addEventListener("template-loaded", () => {
    const links = $$(".js-dropdown-list > li > a");

    links.forEach((link) => {
        link.onclick = () => {
            if (window.innerWidth > 991) return;
            const item = link.closest("li");
            item.classList.toggle("navbar__item--active");
        };
    });
});

function toggleImage() {
    var moonImage = document.getElementById("moon");
    var sunImage = document.getElementById("sun");

    // Kiểm tra trạng thái hiển thị của ảnh moon
    if (moonImage.style.display !== "none") {
        // Nếu ảnh moon đang hiển thị, ẩn nó và hiển thị ảnh sun
        moonImage.style.display = "none";
        sunImage.style.display = "inline";
    } else {
        // Ngược lại, ẩn ảnh sun và hiển thị ảnh moon
        moonImage.style.display = "inline";
        sunImage.style.display = "none";
    }
}

function toggleImage() {
    var moonImage = document.getElementById("moon");
    var sunImage = document.getElementById("sun");
    var body = document.body;

    // Kiểm tra trạng thái hiển thị của ảnh moon
    if (moonImage.style.display !== "none") {
        // Nếu ảnh moon đang hiển thị, ẩn nó và hiển thị ảnh sun
        moonImage.style.display = "none";
        sunImage.style.display = "inline";

        // Chuyển giao diện sang chế độ sáng
        body.classList.remove("html.dark");
    } else {
        // Ngược lại, ẩn ảnh sun và hiển thị ảnh moon
        moonImage.style.display = "inline";
        sunImage.style.display = "none";

        // Chuyển giao diện sang chế độ tối
        body.classList.add("html.dark");
    }
}

// function toggleImage() {
//     var moonImage = document.getElementById("moon");
//     var sunImage = document.getElementById("sun");
//     var htmlElement = document.documentElement;

//     // Kiểm tra trạng thái hiển thị của ảnh moon
//     if (moonImage.style.display !== "none") {
//         // Nếu ảnh moon đang hiển thị, ẩn nó và hiển thị ảnh sun
//         moonImage.style.display = "none";
//         sunImage.style.display = "inline";

//         // Chuyển giao diện sang chế độ sáng với độ trễ 1 giây
//         setTimeout(function () {
//             htmlElement.classList.remove("dark");
//         }, 300);
//     } else {
//         // Ngược lại, ẩn ảnh sun và hiển thị ảnh moon
//         moonImage.style.display = "inline";
//         sunImage.style.display = "none";

//         // Chuyển giao diện sang chế độ tối với độ trễ 1 giây
//         setTimeout(function () {
//             htmlElement.classList.add("dark");
//         }, 300);
//     }
// }
// Đọc trạng thái đã lưu từ localStorage
var isDarkMode = localStorage.getItem("darkMode") === "true";
var htmlElement = document.documentElement;

// Áp dụng trạng thái đọc được
if (isDarkMode) {
    htmlElement.classList.add("dark");
}

function toggleImage() {
    var moonImage = document.getElementById("moon");
    var sunImage = document.getElementById("sun");
    var isDarkMode = htmlElement.classList.contains("dark");

    // Kiểm tra trạng thái hiển thị của ảnh moon
    if (isDarkMode) {
        // Nếu ảnh moon đang hiển thị, ẩn nó và hiển thị ảnh sun
        moonImage.style.display = "none";
        sunImage.style.display = "inline";

        // Chuyển giao diện sang chế độ sáng với độ trễ 0.3 giây
        setTimeout(function () {
            htmlElement.classList.remove("dark");
            // Lưu trạng thái vào localStorage
            localStorage.setItem("darkMode", "false");
        }, 300);
    } else {
        // Ngược lại, ẩn ảnh sun và hiển thị ảnh moon
        moonImage.style.display = "inline";
        sunImage.style.display = "none";

        // Chuyển giao diện sang chế độ tối với độ trễ 0.3 giây
        setTimeout(function () {
            htmlElement.classList.add("dark");
            // Lưu trạng thái vào localStorage
            localStorage.setItem("darkMode", "true");
        }, 300);
    }
}
