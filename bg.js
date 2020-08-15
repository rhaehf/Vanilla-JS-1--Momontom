const body = document.querySelector("body");

const IMG_NUMBER = 15;

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER); //IMG_NUMBER보다 적은 수가 나옴
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();