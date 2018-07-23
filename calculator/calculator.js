const buttonHolder = document.getElementById('button-holder');
const displayX = document.getElementById('display-x');
const displayY = document.getElementById('display-y');
const displayFlag = document.getElementById('display-flag');
const base = 10;
const xRegisterSize = 20;
let decimalOn = false;
let xReg = 0, prevXReg = 0, yReg = 0, prevYReg = 0;
const flags = {
    none: '', addition: '+', subtraction: '-', multiplication: 'x', division: '/',
    percent: '%', sqrt: '√', ln: 'ln', inverse: '¹/ₓ', square: '²', invertSign: '±'
};
let currentFlag, prevFlag = flags.none;
const unaryOperators = new UnaryOperators();
const binaryOperators = new BinaryOperators();
let clearOnNextNumber = false;

const buttons = [
    new Button('ln', 'button-function', unaryOperators.ln),
    new Button('√', 'button-function', unaryOperators.squareRoot),
    new Button('x²', 'button-function', unaryOperators.square),
    new Button('¹/ₓ', 'button-function', unaryOperators.inverse),
    new Button('CE', 'button-function', clearEntry),
    new Button('C', 'button-function', clearAll),
    new Button('⌫', 'button-function', backspace),
    new Button('/', 'button-function', binaryOperators.division),
    new Button('7', 'button-number', pushToXRegister, 7),
    new Button('8', 'button-number', pushToXRegister, 8),
    new Button('9', 'button-number', pushToXRegister, 9),
    new Button('X', 'button-function', binaryOperators.multiplication),
    new Button('4', 'button-number', pushToXRegister, 4),
    new Button('5', 'button-number', pushToXRegister, 5),
    new Button('6', 'button-number', pushToXRegister, 6),
    new Button('-', 'button-function', binaryOperators.subtraction),
    new Button('1', 'button-number', pushToXRegister, 1),
    new Button('2', 'button-number', pushToXRegister, 2),
    new Button('3', 'button-number', pushToXRegister, 3),
    new Button('+', 'button-function', binaryOperators.addition),
    new Button('±', 'button-function', unaryOperators.invertSign),
    new Button('0', 'button-number', pushToXRegister, 0),
    new Button('.', 'button-function', decimal),
    new Button('=', 'button-function', binaryOperators.equals)
];

function UnaryOperators() {
    this.squareRoot = () => {
        // updateFlag(flags.sqrt);
        updateXRegister(Math.sqrt(xReg));
        clearOnNextNumber = true;
    };
    this.invertSign = () => {
        updateXRegister(xReg * -1);
        clearOnNextNumber = true;
    };
    this.inverse = () => {
        // updateFlag(flags.inverse);
        updateXRegister(1 / xReg);
        clearOnNextNumber = true;
    };
    this.square = () => {
        // updateFlag(flags.square);
        updateXRegister(Math.pow(xReg, 2));
        clearOnNextNumber = true;
    };
    this.ln = () => {
        // updateFlag(flags.ln);
        updateXRegister(Math.log(xReg));
        clearOnNextNumber = true;
    };
}

function BinaryOperators() {
    this.addition = () => {
        evaluate();
        updateFlag(flags.addition);
    };
    this.subtraction = () => {
        evaluate();
        updateFlag(flags.subtraction);
    };
    this.multiplication = () => {
        evaluate();
        updateFlag(flags.multiplication);
    };
    this.division = () => {
        evaluate();
        updateFlag(flags.division);
    };
    this.equals = () => {
        if (currentFlag === flags.none) {
            updateFlag(prevFlag);
            updateYRegister(xReg);
            updateXRegister(prevXReg);
        }
        prevFlag = currentFlag;
        evaluate();
        updateYRegister(0);
    };

    function evaluate() {
        if (xReg === 0 && currentFlag !== flags.division) updateXRegister(prevXReg);
        prevXReg = xReg;
        prevYReg = yReg;
        switch (currentFlag) {
            case flags.addition:
                updateXRegister(yReg + xReg);
                updateYRegister(xReg);
                break;
            case flags.subtraction:
                updateXRegister(yReg - xReg);
                updateYRegister(xReg);
                break;
            case flags.multiplication:
                updateXRegister(yReg * xReg);
                updateYRegister(xReg);
                break;
            case flags.division:
                if (xReg === 0) {
                    updateXRegister(undefined);
                } else {
                    updateXRegister(yReg / xReg);
                }
                updateYRegister(xReg);
                break;
            case flags.none:
                updateYRegister(xReg);
                updateXRegister(0);
        }
        updateFlag(flags.none);
        clearOnNextNumber = true;
    }
}

function backspace() {
    let x = parseInt(xReg.toString().slice(0, -1));
    updateXRegister(x ? x : 0);
}

function clearEntry() {
    updateXRegister(0);
}

function clearAll() {
    updateXRegister(0);
    updateYRegister(0);
    updateFlag(flags.none);
    prevXReg = 0;
    prevYReg = 0;
}

function decimal() {
    if (decimalOn) {
        decimalOn = !decimalOn;
    } else {
        if(xReg.toString().includes('.')) return;
        decimalOn = true;
        displayX.innerHTML = displayX.innerHTML.slice(0, -4) + '.' + '</p>';
    }
}

function updateXRegister(val) {
    xReg = val;
    xReg = isNaN(xReg) ? undefined : xReg;
    let pContents = xReg === undefined ? 'undefined' : xReg.toString();
    if (pContents.length >= 12) {
        pContents = pContents.slice(0, 12) + '\n' + pContents.slice(12);
    }
    displayX.innerHTML = `<p>${pContents}</p>`;
    decimalOn = false;
}

function pushToXRegister(val) {
    if (clearOnNextNumber) {
        updateXRegister(0);
        clearOnNextNumber = false;
    }
    let newXReg = 0;
    if (xReg.toString().includes('.') || decimalOn) {
        let fracDigits = xReg.toString().includes(".") ? xReg.toString().match(/\.([0-9]+)/)[1].length : 0;
        newXReg = xReg + (val / Math.pow(10, fracDigits + 1));
    } else {
        newXReg = (xReg * base) + val;

    }
    if (Math.log10(newXReg) >= xRegisterSize) {
        return;
    }
    updateXRegister(newXReg);
}

function updateFlag(flag) {
    currentFlag = flag;
    displayFlag.innerHTML = currentFlag;
}

function updateYRegister(val) {
    yReg = val;
    yReg = isNaN(yReg) ? undefined : yReg;
    displayY.innerHTML = yReg === undefined ? 'undefined' : yReg ? yReg.toString() : '';
}

function Button(label, cssClass, func, val = null) {
    let that = this;
    this.label = label;
    this.val = val;
    this.cssClass = cssClass;
    this.func = func;
    this.onClick = function () {
        that.func.call(that, that.val);
    }

}

function createDisplayButton(btn) {
    let button = document.createElement('div');
    button.classList.add('calculator-button');
    button.classList.add(btn.cssClass);
    button.addEventListener('click', btn.onClick);
    let buttonLabel = document.createElement('div');
    buttonLabel.innerHTML = btn.label;
    button.appendChild(buttonLabel);
    return button;
}

function populateButtons() {
    for (let r = 0; r < 6; r++) {
        let row = document.createElement('div');
        row.classList.add('button-row');
        for (let i = 0; i < 4; i++) {
            let btn = buttons[(r * 4) + i];
            let button = createDisplayButton(btn);
            row.appendChild(button);
        }
        buttonHolder.appendChild(row);
    }
}

function init() {
    populateButtons();
    clearAll()
}

init();