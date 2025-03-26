document.addEventListener("DOMContentLoaded", function() {
    let h4 = document.querySelector(".encabezado h4");
    h4.style.position = "relative";
    h4.style.opacity = "0";


    let bounce = [
        {transform: "translateY(-50%)", opacity: "0"},
        {transform: "translateY(10px)", opacity: "1"},
        {transform: "translateY(0)", opacity: "1"}
    ];

    let timing = {
        duration: 800,
        easing: "ease-in-out",
        fill: "forwards",
    };
    h4.animate(bounce, timing);
});

document.addEventListener("DOMContentLoaded", function() {
    let h1 = document.querySelector(".encabezado h1");
    let text = h1.textContent;
    h1.innerHTML = "";

    text.split("").forEach((letter, index) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.style.opacity = "0";
        span.style.animation = `fadeIn 0.5s ${index * 100}ms forwards`;
        h1.appendChild(span);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    let p = document.querySelector(".description p");
    let text = p.textContent;
    p.innerHTML = "";

    text.split("").forEach((letter, index) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.style.opacity = "0";
        span.style.animation = `fadeIn 0.5s ${index * 50}ms forwards`;
        p.appendChild(span);
    })
})