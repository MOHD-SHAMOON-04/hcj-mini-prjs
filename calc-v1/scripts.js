function remove(str) {
    if (str.length > 0) {
        return str.slice(0, -1);
    } else {
        return str;
    }
}

function symbol(str, sym) {
    if (str.length === 0) {
        return str;
    }

    const lastChar = str[str.length - 1];

    // Compare the last character with the operators
    if (['+', '-', '/', '*', '%'].includes(lastChar)) {
        str = remove(str);
    }
    str += sym;
    return str;
}

// function modeToggle() {
//     const body = document.body;
//     const textbox = document.getElementById("result");
    
//     body.classList.toggle('dark-body');
//     textbox.classList.toggle('dark-text');


//     const buttons = document.querySelectorAll('.btn');
//     const divisions = document.querySelectorAll('.text, .cal');

//     for (let i = 0; i < buttons.length; i++) {
//         buttons[i].classList.toggle('dark-button');
//     }

//     for (let i = 0; i < divisions.length; i++) {
//         divisions[i].classList.toggle('dark-divs');
//     }
// }
