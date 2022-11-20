function letterplane() {
    return document.getElementById('letterplane');
}

function randomLetter(letters) {
    let index = Math.floor(Math.random() * letters.length);
    return letterbox(letters[index]);
}

function newLetter(alphabet) {
    let letter = randomLetter(alphabet);
    letterplane().appendChild(letter);
    letter.style.position = 'absolute';
    letter.style.left = (5 + (10 * Math.floor(Math.random() * 10))) + 'vw';
    letter.style.top = '0px';
    startAnimation();
}

function startAnimation() {
    if (startAnimation.started === true) {
        return;
    }
    startAnimation.started = true;
    requestAnimationFrame(animateFall);
}

function animateFall() {
    let minTop = Number.MAX_VALUE;
    let plane = letterplane();
    for (var child = plane.firstElementChild; child != null; child = child.nextElementSibling) {
        let curTop = parseInt(child.style.top);
        if (curTop >= plane.getBoundingClientRect().height) {
            gameLose();
            return;
        }
        child.style.top = (curTop + dropSpeed()) + 'px';
        minTop = Math.min(minTop, curTop);
    }
    if (minTop < plane.getBoundingClientRect().height) {
        requestAnimationFrame(animateFall);
    } else {
        startAnimation.started = false;
    }
}

function activeLetters() {
    return letterplane().childElementCount;
}

function firstActiveLetter() {
    return letterplane().firstElementChild;
}
