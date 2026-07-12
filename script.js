console.log("Script loaded");

// AUDIO FILES
const sounds = {
    string1: new Audio("E.mp3"),
    string2: new Audio("B.mp3"),
    string3: new Audio("G.mp3"),
    string4: new Audio("D.mp3"),
    string5: new Audio("A.mp3"),
    string6: new Audio("e(high).mp3")
};

// VIBRATION
function vibratePhone(duration) {
    if ("vibrate" in navigator) {
        navigator.vibrate(duration);
    }
}

// STRING ANIMATION
function animateString(path, strength) {

    let start = Date.now();

    const animation = setInterval(() => {

        let t = (Date.now() - start) / 100;

        let offset =
            Math.sin(t * 8) *
            strength *
            Math.exp(-t / 2);

        path.setAttribute(
            "d",
            `M0 50 Q500 ${50 + offset} 1000 50`
        );

        if (t > 2) {

            clearInterval(animation);

            path.setAttribute(
                "d",
                "M0 50 Q500 50 1000 50"
            );
        }

    }, 16);
}

// PLAY AUDIO
function playSound(audio, duration) {

    audio.pause();
    audio.currentTime = 0;

    audio.play();

    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
    }, duration);
}

let fingerDown = false;

document.addEventListener("pointerdown", () => {
    fingerDown = true;
});

document.addEventListener("pointerup", () => {
    fingerDown = false;
});

// CONNECT STRINGS
for (let i = 1; i <= 6; i++) {

    const path = document.getElementById(`string${i}`);

    if (!path) {
        console.error(`string${i} not found`);
        continue;
    }

    const strength = 35 - (i * 4);

    // TAP
    path.addEventListener("pointerdown", () => {

        animateString(path, strength);

        playSound(
            sounds[`string${i}`],
            2000
        );

        vibratePhone(2000);
    });

    // SWIPE
    path.addEventListener("pointerenter", () => {

        if (!fingerDown) return;

        animateString(path, strength);

        playSound(
            sounds[`string${i}`],
            5000
        );

        vibratePhone(5000);
    });
}
