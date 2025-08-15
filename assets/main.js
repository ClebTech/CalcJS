function calculatorJS() {
    const toggleBgStyle = document.querySelector(".toggle-bg-style");
    const body = document.querySelector("body");
    const calc = document.querySelector(".calc");
    const resultScreen = document.querySelector(".result-screen");
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const operator = [")", "(", "%", "!", "*", "/", "-", "+", "."];
    let userPressEqual = false;

    function darkLightMode() {
        toggleBgStyle.addEventListener('click', function () {
            body.classList.toggle("dark-mode");
            calc.classList.toggle("white-border");
            toggleBgStyle.classList.toggle("dark-mode-btn");
            if (toggleBgStyle.innerText === "Light Mode") {
                toggleBgStyle.innerText = "Dark Mode";
            } else {
                toggleBgStyle.innerText = "Light Mode";
            }
        });
    }

    function checkingInputs() {
        darkLightMode();

        calc.addEventListener('click', function (event) {
            const element = event.target;
            if (numbers.includes(element.innerHTML) || element.classList.contains("operation")) printingOnScreen(element.innerText); //printing on screen
            if (element.innerText === 'C') clearResultScreen(); //clear screen
            if (element.classList.contains("delete")) deleteChar(); //delete the last char digited by user
            if (element.innerText === '=') calculate(); //calcule the expression in the screen
        });

        document.addEventListener('keydown', function (e) {
            console.log(typeof e.key);
            if (numbers.includes(e.key) || operator.includes(e.key)) printingOnScreen(e.key);
            if (e.key === '=') calculate();
            if (e.key === 'C' || e.key === 'c' || e.key === 'Escape') clearResultScreen();
            if (e.key === "Backspace") deleteChar();
        });
    }

    function adaptingScreen() {
        //adapting the font size
        if (resultScreen.innerText.length >= 10 && resultScreen.innerText.length < 20) resultScreen.style.fontSize = '1.7rem';
        if (resultScreen.innerText.length >= 20) resultScreen.style.fontSize = '1.2rem';
        if (resultScreen.innerText.length < 10 && window.innerWidth > 370) resultScreen.style.fontSize = '3.15rem';
    }

    //this function change percentage like 5% to 0.05
    function percentage(char) {
        const lastNumber = resultScreen.innerText.split(/[\+\-\*\/\^\(]/).pop();
        resultScreen.innerText = resultScreen.innerText.replace(lastNumber, lastNumber/100); //this convert expressions like 5*%8 to 5*0.08
        userPressEqual = false;
    }

    function checkingParantheses() {
        let openedParentheses = 0;
        let closedParentheses = 0;
        for (let i = 0; i < resultScreen.innerText.length; i++) {
            if (resultScreen.innerText[i] === '(') openedParentheses++;
            if (resultScreen.innerText[i] === ')') closedParentheses++;
        }
        return (closedParentheses + 1 > openedParentheses);
    }

    function printingOnScreen(char) {
        const lastChar = resultScreen.innerText[resultScreen.innerText.length - 1];

        if (char === '%') {
            percentage(char);
            return;
        }

        if (userPressEqual && numbers.includes(char)) clearResultScreen();
        adaptingScreen();

        if (char === '.') {
            const lastNumber = resultScreen.innerText.split(/[\+\-\*\/\^\(]/).pop(); // catching the last number digited by user (example, if 25+3*11, catch the 11)
            if (lastNumber.includes('.')) return; // if there is already a dot in the number, return! (cuz user may not digit something like 11.2.3)
        }

        if (char === ')' && checkingParantheses()) return; //checking if the user is trying to close more parantheses than are open
        if (char === ')' && operator.includes(lastChar) && lastChar !== ')') return; //user trying to do something like (5*8+) *******************
        if (char === 'xy' && lastChar === '^') return; //cant have two exponetial. x^y is ok, but x^^y return
        if (resultScreen.innerHTML === '0' && (/[0-9]/.test(char) || char === '(' || char === '√')) resultScreen.innerHTML = ''; //remov the 0 'placeholder' from screen
        if (char === 'xy') { //'xy' is the calc button x^y
            resultScreen.innerText += '^'; //for exponential
            userPressEqual = false;
            return;
        }

        if (!/[0-9]/.test(char) && Number.isNaN(Number(lastChar)) && lastChar !== ')') { //checking if the last char from the calc is a number
            if (char === '(' || char === ')' || char === '√') {
                resultScreen.innerText += char;
                userPressEqual = false;
            }
            return;
        } else if (lastChar !== ')') {
            resultScreen.innerText += char;
            userPressEqual = false;
            return;
        }
        resultScreen.innerText += char;
        userPressEqual = false;
    }

    function clearResultScreen() {
        resultScreen.innerText = '0'; //just a function to put a zero in the result screen (clearing the calc)
        adaptingScreen();
    }

    function deleteChar() {
        resultScreen.innerText = resultScreen.innerText.slice(0, -1);
        adaptingScreen();
        if (!resultScreen.innerText) clearResultScreen(); //if the user is deleting all the chars from the screen result, put a zero in the result screen
    }

    //function to check if the user forgot to close parantheses
    function userClosedParantheses(expression) {
        let openedParentheses = 0;
        let closedParentheses = 0;
        for (let i = 0; i < expression.length; i++) {
            if (expression[i] === '(') {
                openedParentheses++;
            }
            if (expression[i] === ')') {
                closedParentheses++;
            }
        }
        if (closedParentheses < openedParentheses) {
            for (let i = 0; i < openedParentheses - closedParentheses; i++) {
                expression = expression + ')';
            }
        }

        return expression;
    }

    function calculate() {
        userPressEqual = true;
        let expression = resultScreen.innerText;

        while (expression.includes('√')) {
            // catching what comes after the squareroot
            expression = expression.replace(/√(\([^\)]+\)|\d+(\.\d+)?)/, '($1^0.5)'); //tidying up the squareroots expressions with ReGex
        } //the squareroots expressions may have some bugs when so many expressions are inside another one

        //checking if the user forgot to close parantheses
        expression = userClosedParantheses(expression);

        //checking if the user are trying to do a division by zero
        if (expression.includes('/0')) {
            let x = expression.indexOf('/0') + 2;
            if (expression[x] !== '.') {
                resultScreen.innerText = 'Indeterminate';
                return;
            }
        }
        
        //finally, doing the calc
        try {
            resultScreen.innerText = math.evaluate(expression);
        } catch (error) {
            resultScreen.innerText = 'ERROR';
        }
        adaptingScreen();
    }
    checkingInputs();
}

//the calculator function
calculatorJS();