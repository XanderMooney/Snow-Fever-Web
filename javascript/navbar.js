document.getElementById("checkbox").checked = false;

var header = document.querySelector("header");

var extraHeader = document.getElementById("extraHeader");

var scroll = 0;

var nav = document.getElementsByClassName("navItems")[0];

var navExpandedHeight = 0;

var navExpanded = false;

window.onresize = calcNav();

function calcNav() {
    nav.style.transition = "none";
    nav.style.height = "100%";
    navExpandedHeight = nav.clientWidth * 20;

    displayNav();
}

calcNav();

function toggleNav() {
    navExpanded = !navExpanded;
    
    displayNav();
}

function displayNav() {
    nav.style.transition = "400ms";
    if (navExpanded) {
        nav.style.width = navExpandedHeight + "px";
    }
    else {
        nav.style.width = "0";
    }
}

/* thanks to javascripttutorial.net */

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}