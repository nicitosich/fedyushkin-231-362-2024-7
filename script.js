
function evaluate(expression) {
    let stack = [];
    let tokens = expression.split(' ');

    tokens.forEach(token => {
        if (!isNaN(token)) {
            stack.push(parseFloat(token));
        } else {
            let b = stack.pop();
            let a = stack.pop();
            switch (token) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '/':
                    stack.push(a / b);
                    break;
            }
        }
    });

    return stack.pop();
}

function clickHandler(event) {
    const display = document.getElementById('display');
    const clickedButton = event.target;

    if (clickedButton.classList.contains('digit') || clickedButton.classList.contains('operation') || clickedButton.classList.contains('bracket')) {
        display.value += clickedButton.textContent;
    }

    if (clickedButton.classList.contains('clear')) {
        display.value = '';
    }

    if (clickedButton.classList.contains('result')) {
        try {
            let result = evaluate(infixToRPN(display.value));
            display.value = result.toFixed(2);
        } catch (e) {
            display.value = 'Ошибка';
        }
    }
}

function infixToRPN(expression) {
    let output = [];
    let operators = [];
    let precedence = {'+': 1, '-': 1, '*': 2, '/': 2};
    
    let tokens = expression.split(/([+\-*/() ])/).filter(t => t.trim() !== '');

    tokens.forEach(token => {
        if (!isNaN(token)) {
            output.push(token);
        } else if (token === '(') {
            operators.push(token);
        } else if (token === ')') {
            while (operators.length && operators[operators.length - 1] !== '(') {
                output.push(operators.pop());
            }
            operators.pop(); // убираем '('
        } else if (['+', '-', '*', '/'].includes(token)) {
            while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
                output.push(operators.pop());
            }
            operators.push(token);
        }
    });

    while (operators.length) {
        output.push(operators.pop());
    }

    return output.join(' ');
}

document.querySelector('.buttons').addEventListener('click', clickHandler);
