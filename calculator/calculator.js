const buttonHolder = document.getElementById('button-holder');
const displayX = document.getElementById('display-x');
const displayY = document.getElementById('display-y');
const displayFlag = document.getElementById('display-flag');
const base = 10, xRegisterSize = 12;
let decimalOn, clearOnNextNumber, xReg, prevXReg, yReg, prevYReg, currentFlag, prevFlag;
const flags = {
    none: '', addition: '+', subtraction: '-', multiplication: 'x', division: '/',
    percent: '%', sqrt: '√', ln: 'ln', inverse: '¹/ₓ', square: '²', invertSign: '±'
};
const unaryOperators = new UnaryOperators();
const binaryOperators = new BinaryOperators();

function UnaryOperators() {
    this.squareRoot = () => {
        updateXRegister(Math.sqrt(xReg));
        clearOnNextNumber = true;
    };
    this.invertSign = () => {
        updateXRegister(xReg * -1);
    };
    this.inverse = () => {
        updateXRegister(1 / xReg);
        clearOnNextNumber = true;
    };
    this.square = () => {
        updateXRegister(Math.pow(xReg, 2));
        clearOnNextNumber = true;
    };
    this.ln = () => {
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
    let x = xReg.toString().slice(0, -1);
    updateXRegister(x ? x : 0);
}

function clearEntry() {
    updateXRegister(0);
}

function clearAll() {
    updateXRegister(0);
    updateYRegister(0);
    updateFlag(flags.none);
    prevFlag = flags.none;
    decimalOn = false;
    clearOnNextNumber = false;
    prevXReg = 0;
    prevYReg = 0;
}

function decimal() {
    if(!decimalOn){
        if (xReg.toString().includes('.')) return;
        decimalOn = true;
        displayX.innerHTML = displayX.innerHTML.slice(0, -4) + '.' + '</p>';
    }
}

function updateXRegister(val) {
    xReg = isNaN(val) ? undefined : val;
    let pContents = xReg === undefined ? 'undefined' : xReg.toString();
    if (pContents.length > xRegisterSize) {
        displayX.style.fontSize = '.55em'
    } else {
        displayX.style.fontSize = '1em';
    }
    pContents = pContents.convertToRegularScientificNotation();
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
        if (val === 0) {
            newXReg = Number(xReg).toFixed(fracDigits + 1);
        } else {
            newXReg = xReg.toString().includes('.') ? Number(xReg).toFixed(fracDigits) + val.toString() : Number(xReg).toFixed(fracDigits) + '.' + val.toString();
        }
    } else {
        newXReg = xReg >= 0 ? (xReg * base) + val : (xReg * base) - val;

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
    yReg = isNaN(val) ? undefined : val;
    let contents = yReg === undefined ? 'undefined' : yReg ? yReg.toString() : '';
    contents = contents.convertToRegularScientificNotation();
    displayY.innerHTML = contents;
}

String.prototype.convertToRegularScientificNotation = function () {
    return this.replace(/([.0-9]+)e\+([0-9]+)/, "$1 * 10<sup>$2</sup>");
};

function Button(label, cssClass, func, val = null, keyCodes = []) {
    let that = this;
    this.label = label;
    this.val = val;
    this.cssClass = cssClass;
    this.func = func;
    this.keyCodes = keyCodes;
    this.onClick = function () {
        that.func.call(that, that.val);
    }
}

const buttons = [
    new Button('ln', 'button-function', unaryOperators.ln, null, ['l']),
    new Button('√', 'button-function', unaryOperators.squareRoot, null, ['S']),
    new Button('x²', 'button-function', unaryOperators.square, null, ['s']),
    new Button('¹/ₓ', 'button-function', unaryOperators.inverse, null, ['?']),
    new Button('CE', 'button-function', clearEntry, null, ['c']),
    new Button('C', 'button-function', clearAll, null, ['C']),
    new Button('⌫', 'button-function', backspace, null, ['Backspace', 'ArrowLeft']),
    new Button('/', 'button-function', binaryOperators.division, null, ['/']),
    new Button('7', 'button-number', pushToXRegister, 7, ['7']),
    new Button('8', 'button-number', pushToXRegister, 8, ['8']),
    new Button('9', 'button-number', pushToXRegister, 9, ['9']),
    new Button('X', 'button-function', binaryOperators.multiplication, null, ['x', '*']),
    new Button('4', 'button-number', pushToXRegister, 4, ['4']),
    new Button('5', 'button-number', pushToXRegister, 5, ['5']),
    new Button('6', 'button-number', pushToXRegister, 6, ['6']),
    new Button('-', 'button-function', binaryOperators.subtraction, '-'),
    new Button('1', 'button-number', pushToXRegister, 1, ['1']),
    new Button('2', 'button-number', pushToXRegister, 2, ['2']),
    new Button('3', 'button-number', pushToXRegister, 3, ['3']),
    new Button('+', 'button-function', binaryOperators.addition, null, ['+']),
    new Button('±', 'button-function', unaryOperators.invertSign, null, ['_']),
    new Button('0', 'button-number', pushToXRegister, 0, ['0']),
    new Button('.', 'button-function', decimal, null, ['.']),
    new Button('=', 'button-function', binaryOperators.equals, null, ['=', 'Enter', ' ', 'ArrowRight'])
];

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
    clearAll();
    window.addEventListener('keydown', function (event) {
        let button = buttons.filter((b) => {
            return b.keyCodes.includes(event.key)
        });
        if (button[0]) {
            button[0].onClick();
        }
    });
}

init();