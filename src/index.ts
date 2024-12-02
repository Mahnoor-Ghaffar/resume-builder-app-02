// active hamburger menu
let menuIcon = document.querySelector<HTMLElement>(".menu-icon");
let navlist = document.querySelector<HTMLElement>(".navlist");

menuIcon?.addEventListener("click", () => {
    menuIcon?.classList.toggle("active");
    navlist?.classList.toggle("active");
    document.body.classList.toggle("open");
});

// remove navlist
navlist?.addEventListener("click", () => {
    navlist?.classList.remove("active");
    menuIcon?.classList.remove("active");
    document.body.classList.remove("open");
});

// rotate text js code
let text = document.querySelector<HTMLParagraphElement>(".text p");

if (text) {
    text.innerHTML = text.innerHTML
        .split("")
        .map((char, i) => `<b style="transform:rotate(${i * 6.3}deg)">${char}</b>`)
        .join("");
}

// switch between about buttons
const buttons = document.querySelectorAll<HTMLButtonElement>('.about-btn button');
const contents = document.querySelectorAll<HTMLElement>('.content');

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        contents.forEach(content => content.style.display = 'none');
        contents[index].style.display = 'block';
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// skill progress bar
const first_skill = document.querySelector<HTMLElement>(".skill:first-child");
const sk_counters = document.querySelectorAll<HTMLSpanElement>(".counter span");
const progress_bars = document.querySelectorAll<SVGCircleElement>(".skills svg circle");

window.addEventListener("scroll", () => {
    if (!skillsPlayed) skillsCounter();
});

function hasReached(el: HTMLElement): boolean {
    let topPosition = el.getBoundingClientRect().top;
    return window.innerHeight >= topPosition + el.offsetHeight;
}

function updateCount(num: HTMLElement, maxNum: number) {
    let currentNum = +num.innerText;

    if (currentNum < maxNum) {
        num.innerText = (currentNum + 1).toString();
        setTimeout(() => {
            updateCount(num, maxNum);
        }, 12);
    }
}

let skillsPlayed = false;

function skillsCounter() {
    if (!hasReached(first_skill as HTMLElement)) return;
    skillsPlayed = true;
    sk_counters.forEach((counter, i) => {
        let target = +counter.dataset.target!;
        let strokeValue = 465 - 465 * (target / 100);

        progress_bars[i].style.setProperty("--target", strokeValue.toString());

        setTimeout(() => {
            updateCount(counter, target);
        }, 400);
    });

    progress_bars.forEach(p => p.style.animation = "progress 2s ease-in-out forwards");
}

// side progress bar
let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress") as HTMLElement;
    let pos = document.documentElement.scrollTop;

    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);

    if (pos > 100) {
        scrollProgress.style.display = "grid";
    } else {
        scrollProgress.style.display = "none";
    }

    scrollProgress.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });

    scrollProgress.style.background = `conic-gradient(#fff ${scrollValue}%,#e6006d ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

// active menu
let menuLi = document.querySelectorAll<HTMLAnchorElement>("header ul li a");
let section = document.querySelectorAll<HTMLElement>('section');

function activeMenu() {
    let len = section.length;
    while (--len && window.scrollY + 97 < section[len].offsetTop) { }
    menuLi.forEach(sec => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
}
activeMenu();
window.addEventListener("scroll", activeMenu);