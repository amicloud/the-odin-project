const buttonHolder = document.getElementById('button-holder');
const historyContainer = document.getElementById('calculator-history');
const display = document.getElementById('display');
const base = 10;
const xRegisterSize = 16; //This is effectively the character limit of the display as well
let xReg = 0;
let yReg = 0;
updateXRegister(xReg);

const buttons = [
    new Button('%', 'f',  null, null),
    new Button('√', 'f',  null, null),
    new Button('x²', 'f', null, null),
    new Button('¹/ₓ', 'f', null, null),
    new Button('CE', 'f', null, null),
    new Button('C', 'f',  null, null),
    new Button('⌫', 'f', backspace, null),
    new Button('/', 'f',  null, null),
    new Button('7', 'n',  pushToXRegister, 7),
    new Button('8', 'n',  pushToXRegister, 8),
    new Button('9', 'n',  pushToXRegister, 9),
    new Button('X', 'f',  null, null),
    new Button('4', 'n',  pushToXRegister, 4),
    new Button('5', 'n',  pushToXRegister, 5),
    new Button('6', 'n',  pushToXRegister, 6),
    new Button('-', 'f',  null, null),
    new Button('1', 'n',  pushToXRegister, 1),
    new Button('2', 'n',  pushToXRegister, 2),
    new Button('3', 'n',  pushToXRegister, 3),
    new Button('+', 'f',  null, null),
    new Button('±', 'f',  null, null),
    new Button('0', 'n',  pushToXRegister, 0),
    new Button('.', 'f',  null, null),
    new Button('=', 'f',  null, null)
];

function backspace() {
    let x = parseInt(xReg.toString().slice(0, -1));
    updateXRegister(x ? x : 0);
}

function pushToXRegister(val){
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
    display.innerHTML = val;
}

function pushToYRegister(val){
    yReg = (yReg * base) + val;
}

function Button(label, type, func, val) {
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


