const userInput = document.querySelector("#user-input");
const result = document.querySelector("#result");
const clearBtn = document.querySelector("#clear");
const buttons = document.querySelectorAll(".buttons");
let firstnum = "";
let secondnum = "";
let count = 0;
let operators = ['+', "-", "/", "%", "*"];

buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        let btn = event.target.value;
        console.dir(operators.includes(btn));
        handleInput(btn);
    });
});

document.addEventListener("keypress", (event) => {
    let key = event.key;
    buttons.forEach(button => {
        if (key == button.value) {
            handleInput(key);
        }
    });
});

clearBtn.addEventListener("click", () => {
    userInput.textContent = "";
    result.textContent = "";
    firstnum = "";
    secondnum = "";
    count = 0;
});

function handleInput(key) {
    if (key === "=") {
        operate(key);
    } else if (operators.includes(key)) {
        if (firstnum !== "" && secondnum !== "") {
            operate("=");
            firstnum = result.textContent;
            secondnum = "";
        }
        count = 1;
        userInput.textContent += key;
    } else {
        if (count === 0) {
            firstnum += key;
        } else if (count === 1) {
            secondnum += key;
        }
        userInput.textContent += key;
    }
}
function adjustFontSize() {
    const totalLength = userInput.textContent.length + result.textContent.length;
    if (totalLength > 20) {
        document.querySelector("#screen").classList.add('shrink');
    } else {
        document.querySelector("#screen").classList.remove('shrink');
    }
}
function operate(key) {
    if (key === "=") {
        if (operators.includes(firstnum.slice(-1))) {
            result.textContent = "Error: Invalid input";
        } else {
            let operator = userInput.textContent.match(/[\+\-\*\/\%]/g).pop();
            let num1 = parseFloat(firstnum);
            let num2 = parseFloat(secondnum);
            let resultNum;
            switch (operator) {
                case "+":
                    resultNum = add(num1, num2);
                    break;
                case "-":
                    resultNum = sub(num1, num2);
                    break;
                case "*":
                    resultNum = product(num1, num2);
                    break;
                case "/":
                    if (num2 !== 0) {
                        resultNum = div(num1, num2);
                    } else {
                        resultNum = "Error: Division by zero";
                    }
                    break;
                case "%":
                    resultNum = modulo(num1, num2);
                    break;
                default:
                    resultNum = "Error: Invalid operator";
            }
            result.textContent = resultNum;
            adjustFontSize();
            firstnum = resultNum.toString(); 
            secondnum = "";
            count = 0;
        }
    }
}

function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function product(a, b) {
    return a * b;
}

function div(a, b) {
    return a / b;
}

function modulo(a, b) {
    return a % b;
}
