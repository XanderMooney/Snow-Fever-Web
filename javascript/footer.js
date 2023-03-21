let snowboarder = document.getElementById("snowboarder");
let footertexts = document.getElementsByClassName("footer-info")[0].children;
let snowboarderbox = document.getElementsByClassName("boarderbox")[0];

let clicks = 0;
let progress = 0;
let clickText = "replaceme"

snowboarder.onclick = function() {
    if (clicks < 20) {
        clickText = clicks + " clicks... keep going...";
    } else if (clicks < 50) {
        clickText = clicks + " clicks! impressive!"
    } else if (clicks < 100) {
        clickText = clicks + " clicks! you're on fire!!!"
    }
    else {
        clickText = clicks + " clicks! wow!!!!!!"
    }
    
    if (clicks < 10) {
        snowboarder.classList.add("spin");
    }
    else {
        snowboarder.classList.add("spin-faster");
    }
    
    clicks++;
    
    if (clicks >= 10) {
        for (i = 0; i < footertexts.length; i++) {
            footertexts[i].innerText = clickText;
        }
    }

    if (clicks >= 20 && progress == 0) {
        progress++;
    }

    if (clicks >= 50 && progress <= 1) {
        progress++;
        createFire();
    }
    
    if (clicks >= 100 && progress <= 2) {
        progress++;
        startExploding();
    } 
};

snowboarder.onanimationend = function() {
    snowboarder.classList = [];
};

function createFire() {
    var img = document.createElement('img');
    img.src = 'assets/onfire.gif';
    img.classList.add("footer-addon");
    snowboarderbox.appendChild(img);
}

////

function startExploding() {
    window.requestAnimationFrame(explode);
}

let tick = 0;
let explodeTickTimer = 0;

function explode() {
    if (explodeTickTimer >= 3) {
        makeExplodeImage();
        explodeTickTimer = 0;
    }
    
    explodeTickTimer++;
    
    if (tick <= 120) {
        tick++;
        window.requestAnimationFrame(explode);
    }
    else {
        location.href = "https://www.youtube.com/watch?v=p7YXXieghto";
    }
}

function makeExplodeImage() {
    var div = document.createElement('div');
    div.classList.add("explosion");
    div.style.left = (Math.random() * window.innerWidth - 100) + "px";
    div.style.top = (Math.random() * window.innerHeight - 141) + "px";
    div.style.animation = "sprite " + (Math.random() + 0.5) + "s steps(17) infinite"
    div.style.transform = "scale(" + Math.random() + ")"
    document.body.appendChild(div);
}