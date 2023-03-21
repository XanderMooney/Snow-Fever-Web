document.getElementById("checkbox").checked = false;

var header = document.querySelector("header");

var extraHeader = document.getElementById("extraHeader");

var scroll = 0;

window.onscroll = function() {
    if (isInViewport(header)) {
        extraHeader.style.opacity = "0%"
    }
    else {
        extraHeader.style.opacity = "100%"
    }
}

var nav = document.getElementsByClassName("navItems")[0];

var navExpandedHeight = 0;

var navExpanded = false;

window.onresize = calcNav();

function calcNav() {
    nav.style.transition = "none";
    nav.style.height = "100%";
    navExpandedHeight = nav.clientHeight;

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
        nav.style.height = navExpandedHeight + "px";
    }
    else {
        nav.style.height = "0";
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