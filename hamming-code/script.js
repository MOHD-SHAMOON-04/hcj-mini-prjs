function encode() {
    const bitflip = document.getElementById('bitflip');
    bitflip.disabled = false;

    var data = document.getElementById('data').value;

    if (data.length == 0) {
        alert('Please enter data');
        return;
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i] != '0' && data[i] != '1') {
            data = data.replace(data[i], '1');
        }
    }

    if (data.length < 11) {
        for (let i = data.length; i < 11; i++) {
            data += '0';
        }
    }
    console.log(data);
    console.log(data.length);
    makeMatrix(data);
};

var parityMatrix = [[], [], [], []];

function makeMatrix(data) {
    let a = 0, i = 0, j = 0, k = 0;
    let magic = 1;

    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            if (a == 0) {
                parityMatrix[i][j] = '0';
            }
            else if (a == magic) {
                parityMatrix[i][j] = '0';
                magic = magic * 2;
            }
            else {
                parityMatrix[i][j] = (data[k]);
                k++;
            }
            a++;
        }
    }
    // console.log(parityMatrix);
    // now parity matrix is ready
    calculateParity();
}

function calculateParity() {
    let count = 0, i = 0, j = 0;
    // 1st parity bit - 1
    for (i = 1; i < 4; i += 2) { // i = cols
        for (j = 0; j < 4; j++) { // j = rows
            if (parityMatrix[j][i] == '1') {
                count++;
            }
        }
    }
    if (count % 2 == 0) {
        parityMatrix[0][1] = '0';
    }
    else {
        parityMatrix[0][1] = '1';
    }
    // 2nd parity bit - 2
    count = 0;
    for (i = 2; i < 4; i++) { // i = cols
        for (j = 0; j < 4; j++) { // j = rows
            if (parityMatrix[j][i] == '1') {
                count++;
            }
        }
    }
    if (count % 2 == 0) {
        parityMatrix[0][2] = '0';
    }
    else {
        parityMatrix[0][2] = '1';
    }
    // 3rd parity bit - 4
    count = 0;
    for (i = 1; i < 4; i += 2) { // i = rows
        for (j = 0; j < 4; j++) { // j = cols
            if (parityMatrix[i][j] == '1') {
                count++;
            }
        }
    }
    if (count % 2 == 0) {
        parityMatrix[1][0] = '0';
    }
    else {
        parityMatrix[1][0] = '1';
    }
    // 4th parity bit - 8
    count = 0;
    for (i = 2; i < 4; i++) { // i = rows
        for (j = 0; j < 4; j++) { // j = cols
            if (parityMatrix[i][j] == '1') {
                count++;
            }
        }
    }
    if (count % 2 == 0) {
        parityMatrix[2][0] = '0';
    }
    else {
        parityMatrix[2][0] = '1';
    }
    // final parity bit - 0
    count = 0;
    for (i = 0; i < 4; i++) { // i = rows
        for (j = 0; j < 4; j++) { // j = cols
            if (parityMatrix[i][j] == '1') {
                count++;
            }
        }
    }
    if (count % 2 == 0) {
        parityMatrix[0][0] = '0';
    }
    else {
        parityMatrix[0][0] = '1';
    }
    // matrix ready
    console.log(parityMatrix);
    copyMatrix();
}

function copyMatrix() {
    const spans = document.querySelectorAll('#iniData span');
    for (let i = 0; i < spans.length; i++) {
        spans[i].innerText = parityMatrix[Math.floor(i / 4)][i % 4];
    }
}

function createNoise() {
    const bitflip = document.getElementById('bitflip');
    bitflip.disabled = true;
    const correctflip = document.getElementById('correctflip');
    correctflip.disabled = false;

    const noises = document.querySelectorAll('#noisyData span');
    const spans = document.querySelectorAll('#iniData span');

    for (let i = 0; i < spans.length; i++) {
        noises[i].innerText = spans[i].innerText;
    }

    let random = Math.floor(Math.random() * 16);
    if (noises[random].innerText == '0') {
        noises[random].innerText = '1';
    }
    else {
        noises[random].innerText = '0';
    }
}

function freeNoise() {
    const correctflip = document.getElementById('correctflip');
    correctflip.disabled = true;

    const noises = document.querySelectorAll('#noisyData span');
    const results = document.querySelectorAll('#resultData span');

    // copies the data
    // now copy it to a matrix
    let tempMatrix = [[], [], [], []];
    let k = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            tempMatrix[i][j] = noises[k].innerText;
            k++;
        }
    }
    // now check for errors
    let count = 0, i = 0, j = 0;
    let rowPar = [1, 1, 1, 1];
    let colPar = [1, 1, 1, 1];
    // 1st parity check
    for (i = 1; i < 4; i += 2) { // i = cols
        for (j = 0; j < 4; j++) { // j = rows
            if (tempMatrix[j][i] == '1') {
                count++;
            }
        }
    }
    if (count % 2 == 0) {
        colPar[1] = 0; colPar[3] = 0; // no error
    }
    else {
        colPar[1] = 1; colPar[3] = 1; // error
    }

    // // 2nd parity check
    count = 0;
    for (i = 2; i < 4; i++) { // i = cols
        for (j = 0; j < 4; j++) { // j = rows
            if (tempMatrix[j][i] == '1') {
                count++;
            }
        }
    }
    if (count % 2 == 0) {
        colPar[2] = 0; colPar[3] = 0;
    }
    else {
        if (colPar[1] == 1) {
            colPar[1] = colPar[2] = 0;
        }
        else {
            colPar[2] = 1;
        }
    }

    // // 3rd parity check
    count = 0;
    for (i = 1; i < 4; i += 2) { // i = rows
        for (j = 0; j < 4; j++) { // j = cols
            if (tempMatrix[i][j] == '1') {
                count++;
            }
        }
    }
    if (count % 2 == 0) {
        rowPar[1] = 0; rowPar[3] = 0;
    }
    else {
        rowPar[1] = 1; rowPar[3] = 1;
    }

    // // 4th parity bit - 8
    count = 0;
    for (i = 2; i < 4; i++) { // i = rows
        for (j = 0; j < 4; j++) { // j = cols
            if (tempMatrix[i][j] == '1') {
                count++;
            }
        }
    }
    if (count % 2 == 0) {
        rowPar[2] = 0; rowPar[3] = 0;
    }
    else {
        if (rowPar[1] == 1) {
            rowPar[1] = rowPar[2] = 0;
        }
        else {
            rowPar[2] = 1;
        }
    }

    let x , y;
    for (let i = 3; i >= 0; i--) {
        if (rowPar[i] == 1) {
            x = i;
            break;
        }
    }
    for (let i = 3; i >= 0; i--) {
        if (colPar[i] == 1) {
            y = i;
            break;
        }
    }
    alert(`err at (${x}, ${y})`);
    // result[i].innerText
    tempMatrix[x][y] = (tempMatrix[x][y] == '1') ? '0' : '1';

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            results[i * 4 + j].innerText = tempMatrix[i][j];
        }
    }
    // alert(`Error at position: (${x}, ${y})`);

}

function resetData() {
    var data = document.getElementById('data');
    data.value = '';
    const spans = document.querySelectorAll('#iniData span');
    const noises = document.querySelectorAll('#noisyData span');
    const result = document.querySelectorAll('#resultData span');
    for (let i = 0; i < spans.length; i++) {
        spans[i].innerText = '0';
        noises[i].innerText = '0';
        result[i].innerText = '0';
    }
    const bitflip = document.getElementById('bitflip');
    bitflip.disabled = true;
    const correctflip = document.getElementById('correctflip');
    correctflip.disabled = true;
}
