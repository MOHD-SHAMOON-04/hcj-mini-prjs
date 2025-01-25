document.getElementById("goBtn").addEventListener("click", (e) => {
    e.preventDefault();
    const firstName = document.getElementById("first").value;
    const secondName = document.getElementById("second").value;

    const dev = document.getElementById("dev");
    const eloper = document.getElementById("eloper");

    dev.innerText = firstName;
    eloper.innerText = secondName;
});



const styleBtns = document.querySelectorAll(".row button");

styleBtns.forEach(button => {
    button.addEventListener("click", () => {
        removeActiveClass();
        button.classList.add("active");

        let logoStyle = button.dataset.style;

        const logo = document.querySelector(".logo");
        removePrevStyles();
        logo.classList.add(logoStyle);
    });
});

function removeActiveClass() {
    styleBtns.forEach(button => {
        button.classList.remove("active");
    });
}

function removePrevStyles() {
    const logo = document.querySelector(".logo");
    logo.classList.forEach(cls => {
        if (cls !== "logo") {
            logo.classList.remove(cls);
        }
    });
}



const downloadButton = document.querySelector(".download-button");

downloadButton.addEventListener('click', () => {
    const imageContent = document.querySelector('.logo');

    html2canvas(imageContent).then(canvas => {
        const link = document.createElement('a');
        const firstName = document.getElementById("first").value;
        const secondName = document.getElementById("second").value;
        link.download = `${firstName}${secondName}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
});