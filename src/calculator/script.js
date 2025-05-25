document.addEventListener("DOMContentLoaded", function () {
  // Javascript here
  const display = document.getElementById("display");
  const buttonsWrapper = document.getElementById("buttons-w");

  // prettier-ignore
  const buttons = [
    'C',      '↵', 'π', '√',
    '7', '8', '9', '%', 'x²',
    '4', '5', '6', '÷', '×',
    '1', '2', '3', "+", "-",
    '0', '.', '=',
  ];

  const buttonIndexes = [2, 3, 7, 8, 12, 13, 17, 18, 21];

  // Create buttons dynamically
  buttons.forEach((buttonText, index) => {
    const button = document.createElement("button");
    button.textContent = buttonText;
    if (buttonText.match(/[+\-÷×π√x²=%]/)) {
      button.id = `${index}`;
      button.disabled = true;
    }

    // Add special classes for certain buttons
    if (buttonText === "=") {
      button.classList.add("equals");
    } else if (buttonText === "C") {
      button.classList.add("clear");
    }

    // Add click event handler
    button.addEventListener("click", () => {
      switch (buttonText) {
        case "=":
          calculate();
          break;
        case "C":
          clearDisplay();
          break;
        case "↵":
          backSpace();
          break;
        case "√":
          getSquareRoot(display.value);
          break;
        case "x²":
          powerByTwo(display.value);
          break;
        case "π":
          addPi(display.value);
          break;
        default:
          appendToDisplay(buttonText);
      }
    });

    buttonsWrapper.appendChild(button);
  });
  // Calculator functions
  function appendToDisplay(value) {
    display.hasAttribute("value") && clearDisplay();
    display.value += value;
    toggleButtons();
  }

  function toggleButtons() {
    buttonIndexes.forEach((index) => {
      let button = document.getElementById(index);
      if ((button.disabled = true)) {
        button.disabled = false;
      } else {
        button.disabled = true;
      }
    });
  }

  function getSquareRoot(value) {
    result = Math.sqrt(value);
    result = result % 1 != 0 ? result.toFixed(4) : result;
    display.value = result;
    display.setAttribute("value", result);
  }

  function powerByTwo(value) {
    result = value *= value;
    display.value = result % 1 != 0 ? result.toFixed(4) : result;
    display.setAttribute("value", result);
  }

  function addPi(value) {
    const pi = 3.1415;
    result = value *= pi;
    display.value = result.toFixed(4);
  }

  function backSpace() {
    display.value = display.value.slice(0, -1);
  }

  function clearDisplay() {
    display.value = "";
    display.hasAttribute("value") && display.removeAttribute("value");
    toggleButtons();
  }
  // Replace the calculate function with this:
  function calculate() {
    try {
      // Parse the display value and calculate
      const result = parseAndCalculate(display.value);
      display.setAttribute("value", result);
      display.value = result;
    } catch (error) {
      display.setAttribute("value", error);
      display.value = "Error";
    }
  }

  // Custom calculation function
  function parseAndCalculate(expression) {
    // Remove any whitespace
    expression = expression.replace(/\s+/g, "");
    // console.log(expression);

    // Validate the expression
    if (!/^[0-9+\-×÷.]+$/.test(expression)) {
      throw new Error("Invalid characters");
    }

    // Split into numbers and operators
    const numbers = expression.split(/[+\-÷×]/).map(Number);
    // console.log(numbers);
    const operators = expression.split(/[0-9.]+/).filter((op) => op);
    // console.log(operators);

    // Check if we have one more number than operators
    if (numbers.length !== operators.length + 1) {
      throw new Error("Invalid expression");
    }

    // First pass for multiplication and division
    let result = numbers[0];
    // console.log(result);
    for (let i = 0; i < operators.length; i++) {
      const nextNum = numbers[i + 1];
      const op = operators[i];
      switch (op) {
        case "×":
          result *= nextNum;
          break;
        case "÷":
          result /= nextNum;
          break;
        case "+":
          result += nextNum;
        case "-":
          result -= nextNum;
          break;
        default:
          throw new Error("The operator used is invalid");
      }
    }

    return result % 1 != 0
      ? (Math.floor(result * 10000) / 10000).toFixed(4)
      : result;
  }
});
