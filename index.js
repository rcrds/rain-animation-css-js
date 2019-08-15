let btnAnimate = document.getElementById("btnAnimate");
let btnStop = document.getElementById("btnStop");
let currentGroup = 1;
let ammountDrops = 0;
let audio;
let intervalCreate;
let intervalClear;
const hMaxRain = 760;

const createDrops = function () {
    if (ammountDrops < 2000) {
        let rainContainer = document.getElementById("rainContainer");
        let baseDropElement = document.getElementById("baseDrop");
        let index = 1;
        let position = 0;
        while (position<screen.width - 50) {
            let clone = baseDropElement.cloneNode(true);
            clone.id = clone.id + index;
            clone.className = "dropRain " + currentGroup;
            position = index * 10 + index;
            clone.style.left = `${position}px`;
            clone.style.transitionDuration = Math.floor((Math.random() * 20)) + "s";
            clone.style.transitionProperty = "top";
            rainContainer.appendChild(clone);
            index++;
        }

        setTimeout(function () {
            toRainGroup(currentGroup);
            currentGroup++;
        }, 200);
    } else {
        setTimeout(function () {
            console.log("waiting to create more drops 5s");
        }, 5000);
    }
}

const toRainGroup = function (currentGroup) {
    let dropToRain = document.getElementsByClassName("dropRain " + currentGroup);
    let dropControl = 0;
    for (let index = 1; index < dropToRain.length; index++) {
        if (dropControl == 0) {
            dropToRain[index].style.top = `${hMaxRain}px`;
            dropControl++;
        } else if (dropControl == 1) {
            setTimeout(function () {
                dropToRain[index].style.top = `${hMaxRain}px`;
            }, 1000);
            dropControl++;
        } else {ß
            setTimeout(function () {
                dropToRain[index].style.top = `${hMaxRain}px`;
            }, 600);
        }
        dropControl = 0;
    }
}

const cleanFloor = function () {
    let drops = document.getElementById("rainContainer").childNodes
    ammountDrops = drops.length;
    //console.log(">"+drops.length);
    for (let index = 0; index < drops.length; index++) {
        let drop = drops[index];
        let dropTop = getComputedStyle(drop).top.substring(0, getComputedStyle(drop).top.indexOf("p"));
        if (dropTop > 699) {
            document.getElementById(drop.id).remove();
        }
    }
}

const startAnimation = function () {
    intervalCreate = setInterval(function () {
        createDrops()
    }, 500);

    intervalClear = setInterval(function () {
        cleanFloor()
    }, 100);
}

const stopAnimation = function () {
    clearInterval(intervalCreate);
    clearInterval(intervalClear);
}

btnAnimate.addEventListener("click", function () {
    startAnimation();
    audio = new Audio("./Gentle-rain-sounds.mp3");
    audio.loop = true;
    audio.play();
});

btnStop.addEventListener("click", function () {
    stopAnimation();
    audio.pause();
});