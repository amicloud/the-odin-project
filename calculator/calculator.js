const buttonHolder = document.getElementById('button-holder');
const historyContainer = document.getElementById('calculator-history');
const displayX = document.getElementById('display-x');
const displayY = document.getElementById('display-y');
const displayFlag = document.getElementById('display-flag');
const base = 10;
const xRegisterSize = 16; //This is effectively the character limit of the displayX-x as well
let xReg = 0;
let prevXReg = 0;
let yReg = 0;
let prevYReg = 0;
let flags = {};
    flags.none = '';
    flags.addition = '+';
    flags.subtraction = '-';
    flags.multiplication = 'x';
    flags.division = '/';
let currentFlag;
let prevFlag = flags.none;
clearAll();
const unaryOperators = new UnaryOperators();
const binaryOperators = new BinaryOperators();
let clearOnNextNumber = false;

const buttons = [
    new Button('%', 'f',  null, null),
    new Button('√', 'f',  unaryOperators.squareRoot),
    new Button('x²', 'f', unaryOperators.square),
    new Button('¹/ₓ', 'f', unaryOperators.inverse),
    new Button('CE', 'f', clearEntry),
    new Button('C', 'f',  clearAll),
    new Button('⌫', 'f', backspace),
    new Button('/', 'f',  null, null),
    new Button('7', 'n',  pushToXRegister, 7),
    new Button('8', 'n',  pushToXRegister, 8),
    new Button('9', 'n',  pushToXRegister, 9),
    new Button('X', 'f',  null),
    new Button('4', 'n',  pushToXRegister, 4),
    new Button('5', 'n',  pushToXRegister, 5),
    new Button('6', 'n',  pushToXRegister, 6),
    new Button('-', 'f',  null),
    new Button('1', 'n',  pushToXRegister, 1),
    new Button('2', 'n',  pushToXRegister, 2),
    new Button('3', 'n',  pushToXRegister, 3),
    new Button('+', 'f',  binaryOperators.addition),
    new Button('±', 'f',  unaryOperators.invertSign, null),
    new Button('0', 'n',  pushToXRegister, 0),
    new Button('.', 'd',  null),
    new Button('=', 'f',  binaryOperators.equals)
];

function UnaryOperators(){
    this.squareRoot = () => {
      updateXRegister(Math.sqrt(xReg));
    };
    this.invertSign = () => {
        updateXRegister(xReg * -1);
    };
    this.inverse = () => {
        updateXRegister(1/xReg)
    };
    this.square = () => {
        updateXRegister(Math.pow(xReg, 2));
    };

}

function updateFlag(flag) {
    currentFlag = flag;
    displayFlag.innerHTML = currentFlag;
}

function BinaryOperators(){
    this.addition = () => {
        evaluate();
        updateFlag(flags.addition);

    };
    this.equals = () => {
        if(currentFlag === flags.none){
            currentFlag = prevFlag;
            updateYRegister(prevYReg)
        }
        prevFlag = currentFlag;
        evaluate();
    };
    function evaluate(){
        switch(currentFlag){
            case flags.addition:
                if(xReg === 0) updateXRegister(prevXReg);
                prevXReg = xReg;
                prevYReg = yReg;
                updateXRegister(xReg + yReg);
                updateYRegister(0);
                updateFlag(flags.none);
                break;
            case flags.none:
                updateYRegister(xReg);
        }
        clearOnNextNumber = true;
    }
}

function backspace() {
    let x = parseInt(xReg.toString().slice(0, -1));
    updateXRegister(x ? x : 0);
}

function clearEntry(){
    updateXRegister(0);
}

function clearAll(){
    updateXRegister(0);
    updateYRegister(0);
    updateFlag(flags.none);
    prevXReg = 0;
}

function pushToXRegister(val){
    if(clearOnNextNumber) {
        updateXRegister(0);
        clearOnNextNumber = false;
    }
    let newXreg = (xReg * base) + val;
    if(Math.log10(newXreg) >= xRegisterSize){
        console.log('Register overflow prevented');
        return;
    }
    updateXRegister(newXreg);
    console.log(val);
    console.log(`Pushed ${val} to X Register`);
}

function updateXRegister(val){
    xReg = val;
    displayX.innerHTML = xReg.toString();
}

function updateYRegister(val){
    yReg = val;
    displayY.innerHTML = yReg ? yReg.toString() : '';
}

function Button(label, type, func, val = null) {
    let that = this;
    this.label = label;
    this.val = val;
    this.type = type; //'n' for number, 'f' for function, 'd' for disabled
    this.func = func;
    this.onClick = function() {
        that.func.call(that, that.val);
    }

}

function createDisplayButton(btn){
    let button = document.createElement('div');
    button.classList.add('calculator-button');
    switch(btn.type){
        case 'n':
            button.classList.add('button-number');
            break;
        case 'f':
            button.classList.add('button-function');
            break;
        case 'd':
            button.classList.add('button-disabled');
            break;
    }
    button.addEventListener('click', btn.onClick);
    let buttonLabel = document.createElement('div');
    buttonLabel.innerHTML = btn.label;
    button.appendChild(buttonLabel);
    return button;
}

for(let r = 0; r < 6 ; r++) {
    let row = document.createElement('div');
    row.classList.add('button-row');
    for (let i = 0; i < 4; i++) {
        let btn = buttons[(r * 4) + i];
        let button = createDisplayButton(btn);
        row.appendChild(button);
    }
    buttonHolder.appendChild(row);
}

for(let i = 0; i< 10; i++){
    let item = document.createElement('div');
    item.classList.add('history-item');
    let itemText = document.createElement('div');
    itemText.innerHTML = 'History Item';
    item.appendChild(itemText);
    historyContainer.appendChild(item);
}


