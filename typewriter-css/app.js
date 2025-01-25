let button = document.getElementById('button');
let message = document.getElementById('message');
let result = document.getElementById('result');

button.addEventListener('click', () => {
    let text = message.value;
    if (text === '') {
        return;
    }
    let length = text.length;
    result.style.animation = `typing 2s steps(${length}) forwards`;
    // typing 2s steps(22) forwards , css property , 22 <-> ${length}
    result.innerHTML = text;
    setTimeout(() => {
        result.style.animation = '';
    }, 2200);
});