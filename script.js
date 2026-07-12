const strings = [
    "string1",
    "string2",
    "string3",
    "string4",
    "string5",
    "string6"
];

// AUDIO FILES
const sounds = {
    string1: new Audio("E.mp3"),
    string2: new Audio("B.mp3"),
    string3: new Audio("G.mp3"),
    string4: new Audio("D.mp3"),
    string5: new Audio("A.mp3"),
    string6: new Audio("e(high).mp3")
};

// TRACK FINGER PRESS
let fingerDown = false;

document.addEventListener("pointerdown", () => {
    fingerDown = true;
});

document.addEventListener("pointerup", () => {
    fingerDown = false;
});

// PLAY 2 SECONDS
function playFor2Seconds(audio) {

    audio.pause();
    audio.currentTime = 0;

    audio.play();

    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
    }, 2000);
}

// PLAY 5 SECONDS
function playFor5Seconds(audio) {

    audio.pause();
    audio.currentTime = 0;

    audio.play();

    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
    }, 5000);
}

// PHONE VIBRATION
function phoneVibrate(ms) {

    if (navigator.vibrate) {
        navigator.vibrate(ms);
    }
}

// STRING ANIMATION
function vibrateString(id, strength) {

    const path = document.getElementById(id);

    let frame = 0;

    const animation = setInterval(() => {

        frame += 0.35;

        const y =
            50 +
            Math.sin(frame * 4) *
            strength *
            Math.exp(-frame / 3);

        path.setAttribute(
            "d",
            `M0 50 Q500 ${y} 1000 50`
        );

        if (frame > 10) {

            clearInterval(animation);

            path.setAttribute(
                "d",
                "M0 50 Q500 50 1000 50"
            );
        }

    }, 16);
}

// SETUP STRINGS
strings.forEach((id, index) => {

    const path = document.getElementById(id);

    const strength = 30 - index * 4;

    // TAP
    path.addEventListener("pointerdown", () => {

        vibrateString(id, strength);

        phoneVibrate(2000);

        playFor2Seconds(sounds[id]);
    });

    // SWIPE
    path.addEventListener("pointerenter", () => {

        if (!fingerDown) return;

        vibrateString(id, strength);

        phoneVibrate(5000);

        playFor5Seconds(sounds[id]);
    });

});
