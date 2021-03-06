// CalculatorVars ESTABLISHES A CALC OBJECT FOR VALUES TO BE HELD
// AND MANIPULATED
class CalculatorVars {
    constructor(displayValue, firstOperand, waitingForSecondOperand, secondOperand, operator) {
        this.displayValue = displayValue;
        this.firstOperand = firstOperand;
        this.waitingForNextOperand = waitingForSecondOperand;
        this.secondOperand = secondOperand;
        this.operator = operator;
    }
}
// CalculatorUI HANDLES USER INPUT AND CALCULATION LOGIC
class CalculatorUI {
    constructor() {
        this.performCalculation = {
            "/": (firstOperand, secondOperand) => firstOperand / secondOperand,
            "*": (firstOperand, secondOperand) => firstOperand * secondOperand,
            "+": (firstOperand, secondOperand) => firstOperand + secondOperand,
            "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
            "=": (secondOperand) => secondOperand,
        };
        this.display = (document.querySelector(".display"));
        this.keyPad = document.querySelector(".key-pad");
        this.listenToKeypad();
    }
    listenToKeypad() {
        this.keyPad.addEventListener("click", (e) => {
            const target = e.target;
            if (!target.matches("button")) {
                return;
                // ^^^ IF THE CLICK EVENT !ISN'T ON A BUTTON, JUST "RETURN"
                // DON'T DO ANYTHING
            }
            if (target.classList.contains("operator")) {
                this.handleOperator(target.value);
                this.updateDisplay();
                return;
            }
            if (target.classList.contains(".")) {
                this.inputDecimal(target.value);
                this.updateDisplay();
                return;
            }
            if (target.classList.contains("clear")) {
                this.resetCalculator();
                this.updateDisplay();
                return;
            }
            this.inputDigit(target.value);
            this.updateDisplay();
        });
    }
    inputDigit(digit) {
        if (calc.waitingForNextOperand === true) {
            calc.displayValue = digit;
            calc.waitingForNextOperand = false;
        }
        else {
            calc.displayValue =
                calc.displayValue === "0" ? digit : calc.displayValue + digit;
        }
    }
    inputDecimal(dot) {
        if (!calc.displayValue.includes(dot)) {
            calc.displayValue += dot;
        }
    }
    handleOperator(nextOperator) {
        const inputValue = parseFloat(calc.displayValue);
        if (calc.operator && calc.waitingForNextOperand) {
            calc.operator = nextOperator;
            return;
        }
        if (calc.firstOperand == null) {
            calc.firstOperand = inputValue;
        }
        else if (calc.operator) {
            const currentValue = calc.firstOperand || 0;
            const result = this.performCalculation[calc.operator](currentValue, inputValue);
            calc.displayValue = result.toString();
            calc.firstOperand = result;
        }
        calc.waitingForNextOperand = true;
        calc.operator = nextOperator;
    }
    resetCalculator() {
        calc.displayValue = "0";
        calc.firstOperand = null;
        calc.secondOperand = null;
        calc.operator = null;
        calc.waitingForNextOperand = false;
    }
    updateDisplay() {
        calcUi.display.value = null;
        setTimeout(() => {
            calcUi.display.value = calc.displayValue;
        }, 50)
    }
}
const calc = new CalculatorVars("Ready", null, true, null, null);
const calcUi = new CalculatorUI();
calcUi.updateDisplay();
