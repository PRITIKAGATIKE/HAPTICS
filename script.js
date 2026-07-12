console.log("Script Loaded");

const sounds = {
    string1: new Audio("assets/E.mp3"),
    string2: new Audio("assets/B.mp3"),
    string3: new Audio("assets/G.mp3"),
    string4: new Audio("assets/D.mp3"),
    string5: new Audio("assets/A.mp3"),
    string6: new Audio("assets/e(high).mp3")
};
let fingerDown = false;
    document.addEventListener("pointerdown", () => {fingerDown = true;});
    document.addEventListener("pointerup", () => {fingerDown = false;});
function vibration(duration) {
    if (navigator.vibrate) {
        navigator.vibrate(duration);}
}

function soud(id, duration) {const audio = sounds[id];
     if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    audio.play().catch(err => {console.log("Audio Error:", err);});
setTimeout(() => {audio.pause();
            audio.currentTime = 0;
    }, duration);
}

function movingstring(path, strength) { let frame = 0;
    const animation = setInterval(() => {frame += 0.3;const y =50+Math.sin(frame*4)*Math.sin(frame*4)*strength*Math.exp(-frame / 3);
    path.setAttribute("d",:`M0 50 Q500 ${y} 1000 50`);

        if (frame > 10) {
    clearInterval(animation);
    path.setAttribute( "d","M0 50 Q500 50 1000 50"); }}, 16);
}

for (let i=1; i<=6; i++) {const path = document.getElementById(`string${i}`);
if (!path) {
        console.error(`string${i} not found`);
        continue;}
const strength = 35 - (i * 4);path.addEventListener("pointerdown", () => {

        movingstring(path, strength);
        soud(`string${i}`, 2000);
        vibration(2000);
    });
path.addEventListener("pointerenter", () => {if (!fingerDown) return;
         movingstring(path, strength);
        soud(`string${i}`, 5000);
        vibration(5000);});
}
