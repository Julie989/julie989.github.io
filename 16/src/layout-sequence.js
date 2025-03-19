let selected = 1;
document.getElementById(selected).style.opacity = "1";

//let fadeInSpeed = 50;
let angleTriggered = false; // Flag to track if the angle trigger occurred

document.addEventListener("keydown", function (event) {
    let key = parseInt(event.key);
    if (!isNaN(key)) {
        selected = key;
        angleTriggered = false; // reset the angle trigger flag.
    }
});

const layers = document.querySelectorAll('.svg-layer');
let currentLayerIndex = 0;

function showLayer(index) {
    layers.forEach((layer, i) => {
        if (i === index) {
            layer.classList.add('active');
        } else {
            layer.classList.remove('active');
        }
    });
    currentLayerIndex = index;
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '1' && key <= '9') {
        const layerNumber = parseInt(key) - 1;
        if (layerNumber >= 0 && layerNumber < layers.length) {
            showLayer(layerNumber);
        }
    }
});

let triggerAngle = 10; // Change this to desired trigger angle
let layerIndex = 0; // Initialize layer index here

function handleAngleChange(angle) {
    if (angle === triggerAngle && !angleTriggered) {
        console.log("i change the image");
        showLayer(layerIndex);
        layerIndex = (layerIndex + 1) % layers.length; // Increment and loop around
        angleTriggered = true; // Set the flag to true
    } else if (angle !== triggerAngle && angleTriggered) {
        angleTriggered = false; // Reset the flag
    }
}

function startAngleDetection(angleGetter) {
    function checkAngle() {
        const currentAngle = angleGetter();
        console.log(magneticHeading);
        handleAngleChange(currentAngle);
        requestAnimationFrame(checkAngle);
    }
    checkAngle();
}

function getAngleValue() {
    return magneticHeading;
}

// Start angle detection
setTimeout(function () {
    startAngleDetection(getAngleValue);
}, 50);

const music = document.getElementById('music');
const audioSource = document.getElementById("musicSource");
const musicArray = ["src/assets/sound/1.mp3", "src/assets/sound/2.mp3", "src/assets/sound/3.mp3", "src/assets/sound/4.mp3", "src/assets/sound/5.mp3", "src/assets/sound/6.mp3"];
let currentTrackIndex = 0;

document.addEventListener('keydown', function (event) {
    if (event.key === 'p' || event.key === 'P') {
        if (!music.paused) {
            music.pause();
        }
    } else if (event.key === 'm' || event.key === 'M') {
        if (music.paused) {
            music.play().catch(error => {
                console.error("Autoplay was prevented:", error);
            });
        }
    }
});

function changeMusicSource(trackIndex) {
    if (trackIndex > 0 && trackIndex < musicArray.length) {
        audioSource.src = musicArray[trackIndex];
        music.load();
        currentTrackIndex = trackIndex;
        music.play();
    } else {
        music.pause();
        console.log("music pause");
    }
}

