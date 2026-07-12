const strings = [
    "string1",
    "string2",
    "string3",
    "string4",
    "string5",
    "string6"
];

function vibrateString(id, strength){

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

        if(frame > 10){

            clearInterval(animation);

            path.setAttribute(
                "d",
                "M0 50 Q500 50 1000 50"
            );
        }

    },16);
}

function phoneVibrate(ms){

    if(navigator.vibrate){
        navigator.vibrate(ms);
    }
}

strings.forEach((id,index)=>{

    const path = document.getElementById(id);

    const strength = 30 - index * 4;

    path.addEventListener("pointerdown",()=>{

        vibrateString(id,strength);

        // 2 seconds
        phoneVibrate(2000);
    });

    path.addEventListener("pointermove",()=>{

        vibrateString(id,strength);

        // 5 seconds
        phoneVibrate(5000);
    });
});
