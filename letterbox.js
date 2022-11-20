function letterbox(letter) {
    let box = document.createElement('div');
    box.className = 'letterbox';
    box.textContent = letter;
    box.style.color = `rgb(${Math.random() * 100 + 150}, 100, 100)`;
    box.style.transform = randomTransform();
    return box;
}

function randomTransform() {
    switch (Math.floor(Math.random() * 5)) {
        case 0:
            return 'skewX(' + Math.floor((Math.random() * 20) - 10) + 'deg)';
        case 1:
            return 'skewY(' + Math.floor((Math.random() * 20) - 10) + 'deg)';
        case 2:
            return 'rotateX(' + Math.floor((Math.random() * 50) - 25) + 'deg)';
        case 3:
            return 'rotateY(' + Math.floor((Math.random() * 50) - 25) + 'deg)';
        case 4:
            return 'rotateZ(' + Math.floor((Math.random() * 50) - 25) + 'deg)';
    }
}
