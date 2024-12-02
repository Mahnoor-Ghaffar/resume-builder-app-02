// active hamburger menu
var menuIcon = document.querySelector(".menu-icon");
var navlist = document.querySelector(".navlist");
menuIcon === null || menuIcon === void 0 ? void 0 : menuIcon.addEventListener("click", function () {
    menuIcon === null || menuIcon === void 0 ? void 0 : menuIcon.classList.toggle("active");
    navlist === null || navlist === void 0 ? void 0 : navlist.classList.toggle("active");
    document.body.classList.toggle("open");
});
// remove navlist
navlist === null || navlist === void 0 ? void 0 : navlist.addEventListener("click", function () {
    navlist === null || navlist === void 0 ? void 0 : navlist.classList.remove("active");
    menuIcon === null || menuIcon === void 0 ? void 0 : menuIcon.classList.remove("active");
    document.body.classList.remove("open");
});
// rotate text js code
var text = document.querySelector(".text p");
if (text) {
    text.innerHTML = text.innerHTML
        .split("")
        .map(function (char, i) { return "<b style=\"transform:rotate(".concat(i * 6.3, "deg)\">").concat(char, "</b>"); })
        .join("");
}
// switch between about buttons
var buttons = document.querySelectorAll('.about-btn button');
var contents = document.querySelectorAll('.content');
buttons.forEach(function (button, index) {
    button.addEventListener('click', function () {
        contents.forEach(function (content) { return content.style.display = 'none'; });
        contents[index].style.display = 'block';
        buttons.forEach(function (btn) { return btn.classList.remove('active'); });
        button.classList.add('active');
    });
});
// skill progress bar
var first_skill = document.querySelector(".skill:first-child");
var sk_counters = document.querySelectorAll(".counter span");
var progress_bars = document.querySelectorAll(".skills svg circle");
window.addEventListener("scroll", function () {
    if (!skillsPlayed)
        skillsCounter();
});
function hasReached(el) {
    var topPosition = el.getBoundingClientRect().top;
    return window.innerHeight >= topPosition + el.offsetHeight;
}
function updateCount(num, maxNum) {
    var currentNum = +num.innerText;
    if (currentNum < maxNum) {
        num.innerText = (currentNum + 1).toString();
        setTimeout(function () {
            updateCount(num, maxNum);
        }, 12);
    }
}
var skillsPlayed = false;
function skillsCounter() {
    if (!hasReached(first_skill))
        return;
    skillsPlayed = true;
    sk_counters.forEach(function (counter, i) {
        var target = +counter.dataset.target;
        var strokeValue = 465 - 465 * (target / 100);
        progress_bars[i].style.setProperty("--target", strokeValue.toString());
        setTimeout(function () {
            updateCount(counter, target);
        }, 400);
    });
    progress_bars.forEach(function (p) { return p.style.animation = "progress 2s ease-in-out forwards"; });
}
// side progress bar
var calcScrollValue = function () {
    var scrollProgress = document.getElementById("progress");
    var pos = document.documentElement.scrollTop;
    var calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrollValue = Math.round((pos * 100) / calcHeight);
    if (pos > 100) {
        scrollProgress.style.display = "grid";
    }
    else {
        scrollProgress.style.display = "none";
    }
    scrollProgress.addEventListener("click", function () {
        document.documentElement.scrollTop = 0;
    });
    scrollProgress.style.background = "conic-gradient(#fff ".concat(scrollValue, "%,#e6006d ").concat(scrollValue, "%)");
};
window.onscroll = calcScrollValue;
window.onload = calcScrollValue;
// active menu
var menuLi = document.querySelectorAll("header ul li a");
var section = document.querySelectorAll('section');
function activeMenu() {
    var len = section.length;
    while (--len && window.scrollY + 97 < section[len].offsetTop) { }
    menuLi.forEach(function (sec) { return sec.classList.remove("active"); });
    menuLi[len].classList.add("active");
}
activeMenu();
window.addEventListener("scroll", activeMenu);
