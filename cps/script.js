const leftNavElements = document.querySelectorAll('.leftNav li');

const clickable = document.getElementById('clickable');
const timeDisplay = document.getElementById('time');
const reset = document.getElementById('reset');

const popup = document.getElementById('popup');
const message = document.getElementById('message');
const cps = document.getElementById('cps');

var clicks = 0;
var time = 5;
var temp = 5;

leftNavElements.forEach((element) => {
    element.addEventListener('click', () => {
        timeDisplay.innerText = element.innerText;
        time = Number(timeDisplay.innerText);
        temp = time;
    });
});

clickable.addEventListener('click', () => {
    if (clicks === 0) {
        startTimer();
    }
    clicks++;
});

function startTimer() {
    const interval = setInterval(() => {
        time--;
        timeDisplay.innerText = time;
        if (time === 0) {
            clearInterval(interval);

            clickable.style.display = 'none';

            popup.style.display = 'flex';
            popup.style.animation = 'popup 1s ease';


            setTimeout(() => {
                reset.style.display = 'block';
                reset.style.animation = 'delay 1s ease';
            }, 1000);
            // This sets up a delay before executing
            // a specified function. Here, it delays
            // the execution by 1,000 milliseconds 
            // (or 1 second)
            let cpsDisplay = parseFloat(clicks / temp, 2);
            cps.innerText = cpsDisplay;

            if (cpsDisplay <= 3)
            {
                message.innerText = 'you are a Sloth! 🦥';
            }
            else if (cpsDisplay > 3 && cpsDisplay <= 5)
            {
                message.innerText = 'you are a Turtle! 🐢';
            }
            else if (cpsDisplay > 5 && cpsDisplay <= 8)
            {
                message.innerText = 'you are a Cat! 🐱';
            }
            else if (cpsDisplay > 8 && cpsDisplay <= 12)
            {
                message.innerText = 'you are a Rabbit! 🐇';
            }
            else
            {
                message.innerText = 'you are a Cheetah! 🐆';
            }
        }
    }, 1000);
}

reset.addEventListener('click', () => {
    clicks = 0;

    timeDisplay.innerText = temp;
    time = temp;

    clickable.style.display = 'block';

    popup.style.display = 'none';

    reset.style.display = 'none';
});