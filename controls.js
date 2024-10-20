const MAX_ACTIVE_LETTERS = 5;
const LETTERS_PER_LEVEL = 12;
const LEVELS_PER_GAME = 5;
const ALPHABET = (window.location.search.length == 0 ? "JK" : decodeURIComponent(window.location.search.substring(1)));
const INITIAL_DROP_DELAY = 3000;
const MIN_DROP_DELAY = 500;

var level = 1;
var paused = true;
var gameOver = false;
var lettersDropped = 0;

function dropDelay() {
    let deltaPerLevel = (INITIAL_DROP_DELAY - MIN_DROP_DELAY) / LEVELS_PER_GAME;
    return INITIAL_DROP_DELAY - ((level - 1) * deltaPerLevel);
}

function dropSpeed() {
    return Math.ceil(level / 3);
}

function driveGame() {
    if (gameOver) {
        return;
    }
    if (lettersDropped >= LETTERS_PER_LEVEL) {
        if (activeLetters() == 0) {
            levelWin();
        } else {
            setTimeout(driveGame, dropDelay());
        }
        return;
    }
    if (activeLetters() < MAX_ACTIVE_LETTERS) {
        newLetter(ALPHABET);
        lettersDropped++;
    }
    setTimeout(driveGame, dropDelay());
}

window.onkeydown = function(e) {
    if (e.key == ' ' && paused && !gameOver) {
        paused = false;
        document.getElementById('title').style.display = 'none';
        driveGame();
        return;
    }
    let target = firstActiveLetter();
    if (target == null) {
        return;
    }
    if (e.key.toUpperCase() == target.textContent.toUpperCase()) {
        fireAt(target);
        destroy(target);
    }
}

function gameLose() {
    new Audio('gamelose.wav').play();
    gameOver = true;
    pause();
}

function levelWin() {
    if (level < LEVELS_PER_GAME) {
        new Audio('levelwin.wav').play();
        lettersDropped = 0;
        level++;
    } else {
        new Audio('gameover.wav').play();
        gameOver = true;
    }
    pause();
}

function pause() {
    paused = true;
    if (gameOver) {
        document.getElementById('info').textContent = 'GAME OVER';
    } else {
        document.getElementById('level').textContent = level;
    }
    document.getElementById('title').style.display = 'block';
}
