/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/

/*------------------------ Cached Element References ------------------------*/

/*----------------------------- Event Listeners -----------------------------*/

/*-------------------------------- Functions --------------------------------*/

// document.addEventListener('click', function() {
//     const display = document.querySelector('.display');
//     const buttons = document.querySelectorAll('.button');
  
//     let secondChar = '';
//     let firstChar = '';
//     let operator = '';
  
//     buttons.forEach(button => {
//     button.addEventListener('click', function() {
//         if (button.classList.contains('number')) {
//           handleNumber(button.textContent);
//         } 
//         else if (button.classList.contains('operator')) {
//             if (button.textContent === 'C') {
//             clearDisplay();
//             } 
            // else if (button.textContent === '=') {
            // calculateResult();
            // } 
//             else {
//             handleOperator(button.textContent);
//             }
//         }
//       });
//     });
  
//     function handleNumber(number) {
//       secondChar += number;
//       updateDisplay(secondChar);
//     }
  
//     function handleOperator(op) {
//       if (secondChar === '') return;
//       operator = op;
//       firstChar = secondChar;
//       secondChar = '';
//     }
  
//     function calculateResult() {
//         if (firstChar === '' || secondChar === '') return;
//         let result;
//         const first = parseInt(firstChar);
//         const second = parseInt(secondChar);
//         switch (operator) {
//         case '+':
//             result = first + second;
//             break;
//         case '-':
//             result = first - second;
//             break;
//         case '*':
//             result = first * second;
//             break;
//         case '/':
//             result = first / second;
//             break;
//         }

//         updateDisplay(result);
//         secondChar = result.toString();
//         firstChar = '';
//         operator = '';
//     }
  
//     function updateDisplay(value) {
//         display.textContent = value;
//     }
  
//     function clearDisplay() {
//         secondChar = '';
//         firstChar = '';
//         operator = '';
//         updateDisplay('0');
//     }

// });


let currentInput = '';
let storedValues = [];
let operator = '';

/*------------------------ Cached Element References ------------------------*/
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');

/*----------------------------- Event Listeners -----------------------------*/
buttons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

/*-------------------------------- Functions --------------------------------*/
function handleButtonClick(event) {
  const button = event.target;

  if (button.classList.contains('number')) {
    handleNumber(button.textContent);
  } 
  else if (button.classList.contains('operator')) {
    handleOperator(button.textContent);
  }
  else if (button.textContent === '=') {
    calculateResult();
    }
}

function handleNumber(number) {
  currentInput += number;
  updateDisplay(currentInput);
}

function handleOperator(op) {
  if (op === 'C') {
    clearDisplay();
    return;
  }

  if (currentInput !== '') {
    storedValues.push(currentInput);
    storedValues.push(op);
    currentInput = '';
    updateDisplay(op);
  }
}

function calculateResult() {
  if (currentInput !== '') {
    storedValues.push(currentInput);
  }

  let result = parseFloat(storedValues[0]);
  for (let i = 1; i < storedValues.length; i += 2) {
    const operator = storedValues[i];
    const nextValue = parseFloat(storedValues[i + 1]);

    switch (operator) {
      case '+':
        result += nextValue;
        break;
      case '-':
        result -= nextValue;
        break;
      case '*':
        result *= nextValue;
        break;
      case '/':
        result /= nextValue;
        break;
    }
  }

  updateDisplay(result);
  storedValues = [];
  currentInput = result.toString();
}

function updateDisplay(value) {
  display.textContent = value;
}

function clearDisplay() {
  currentInput = '';
  storedValues = [];
  updateDisplay('0');
}