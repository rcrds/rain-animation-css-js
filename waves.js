let btnAnimate = document.getElementById("btnAnimate");
let btnStop = document.getElementById("btnStop");
let audio;
let intervalWave;

const createLines = function () {
    let wavesContainer = document.getElementById("wavesContainer");
    let baseLineElement = document.getElementById("baseLine");
    let index = 0;
    let position = 0;
    while (position < screen.width - 5) {
        let clone = baseLineElement.cloneNode(true);
        clone.id = clone.id + index;
        position = index * 5;
        clone.style.left = `${position}px`;
        clone.style.height = "1px";
        wavesContainer.appendChild(clone);
        index++;
    }
}

const degrees_to_radians = function (degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

let aux = 5;
const moveWaves = function () {
    let lines = document.getElementById("wavesContainer").childNodes
    for (let index = 1; index < lines.length; index++) {
        let pixelY = (0 - Math.sin(2.0 * Math.PI * degrees_to_radians(aux) / 1.2) * 0.5) * 50;
        let newH = 200 + pixelY;
        lines[index].style.height = `${newH}px`;
        aux++;
    }
}

const startAnimation = function () {
    createLines();
    let lines = document.getElementById("wavesContainer").childNodes
    setTimeout(function () {
        for (let index = 1; index < lines.length; index++) {
            lines[index].style.transitionDuration = "0.5s"
            lines[index].style.height = "200px";
        }
    }, 200);
    intervalWave = setInterval(function () {
        moveWaves();
    }, 90);
}

const stopAnimation = function () {
    clearInterval(intervalWave);
    let lines = document.getElementById("wavesContainer").childNodes
    let arrayId = [];
    for (let index = 1; index < lines.length; index++) {
        lines[index].style.transitionDuration = "2s"
        lines[index].style.height = "0px";
        arrayId.push(lines[index].id)
    }
    setTimeout(function () {
        for (let index = 0; index < arrayId.length; index++) {
            document.getElementById(arrayId[index]).remove();
        }
    }, 2000);
}

btnAnimate.addEventListener("click", function () {
    startAnimation();
    audio = new Audio("./Calm-ocean-waves.mp3");
    audio.loop = true;
    audio.play();
});

btnStop.addEventListener("click", function () {
    stopAnimation();
    audio.pause();
});