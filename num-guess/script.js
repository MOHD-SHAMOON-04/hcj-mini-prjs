function generateRandomNumber() {
    return Math.floor(Math.random() * 10);
}
function fetch() {
    let num0 = document.getElementById("num0").value;
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    let num3 = document.getElementById("num3").value;
    let num4 = document.getElementById("num4").value;
    let num5 = document.getElementById("num5").value;

    let temp = new Array(num0, num1, num2, num3, num4, num5);
    return temp;
}
function generateArrayOnLoad() {
    var arr1 = new Array(6);
    for (let i = 0; i < 6; i++) {
        arr1[i] = generateRandomNumber();
    };
    if (arr1[0] == 0) {
        arr1[0] = 1;
    };
    // console.log(arr1);
    return arr1;
}

function linearSearch(target, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (target == arr[i]) {
            return i; // Return the index where the element is found
        }
    }
    return -1; // Return -1 if the element is not found
}

function compareArrays(LoadArray, UserArray, chances) {
    for (let i = 0; i < 6; i++) {
        let box = document.getElementById(`num${i}`);

        if (UserArray[i] == LoadArray[i]) {
            box.style.backgroundColor = "green";
        }

        else {
            let res = linearSearch(UserArray[i], LoadArray);
            if (res == -1) {
                box.style.backgroundColor = "red";
            }
            else {
                box.style.backgroundColor = "yellow";
            }
        }
    }
    let status = document.getElementById("status");
    status.innerText = `${chances} Chances Remains`;
}


let LoadArray = [];
let UserArray = [];
var counter = 5;

window.onload = function () {
    LoadArray = generateArrayOnLoad();
    console.log("LoadArray:", LoadArray);
};

document.getElementById("fetch").addEventListener("click", function () {
    UserArray = fetch();
    console.log("UserArray:", UserArray);
    counter--;
    if (counter >= 0) {
        compareArrays(LoadArray, UserArray, counter);
    }
});
