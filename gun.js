function lightning() {
    return document.getElementById('lightning');
}

function fireAt(letterbox) {
    let box = letterbox.getBoundingClientRect();
    let tx = box.x + (box.width / 2);
    let ty = box.y + (box.height / 2);
    let sx = document.documentElement.clientWidth / 2;
    let sy = window.innerHeight;
    let angle = Math.atan2(sy - ty, tx - sx) * 180 / Math.PI;
    let rotation = -90 - angle;
    let scale = Math.sqrt(Math.pow(sy - ty, 2) + Math.pow(sx - tx, 2)) / 330;
    lightning().style.transform = 'rotateZ(' + rotation + 'deg) scaleY(' + scale + ')';
    lightning().style.visibility = 'visible';
    setTimeout(function() {
        lightning().style.visibility = 'hidden';
    }, 100);
}

function destroy(letterbox) {
    new Audio('destroy.wav').play();
    let fire = document.createElement('img');
    fire.src = 'fire.gif';
    fire.className = 'fire';
    fire.style.left = letterbox.getBoundingClientRect().left + 'px';
    fire.style.top = letterbox.getBoundingClientRect().top + 'px';
    document.body.appendChild(fire);
    letterbox.parentNode.removeChild(letterbox);
    setTimeout(function() {
        document.body.removeChild(fire);
    }, 500);
}
