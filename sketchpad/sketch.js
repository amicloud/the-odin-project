console.log('ready');
const gridSize = document.getElementById('grid-container').offsetWidth;
const gridContainer = document.getElementById('grid-container');
const buttonResize = document.getElementById('button-resize');
const buttonClear = document.getElementById('button-clear');
const pixels = [];
generateGrid();
attachEventListeners();

function attachEventListeners() {
    buttonResize.addEventListener('click', resize);
    buttonClear.addEventListener('click', clear);
}

function resize(){
    let request = prompt("Enter new grid dimensions: ");
    if(request < 1 || isNaN(request)) {
        resize();
    } else {
        generateGrid(request);
    }
}


function generateGrid(gridDimension = 64){
    if(gridContainer.childElementCount > 0){
        gridContainer.innerHTML = '';
    }
    const pixelSize = gridSize / gridDimension;
    for(let i = 0; i < gridDimension; i++){
        for(let j = 0; j < gridDimension; j++){
            let pixel = createPixel(pixelSize);
            pixels.push(pixel);
            gridContainer.appendChild(pixel);
        }
    }
    document.getElementById('x-val').textContent = gridDimension.toString();
    document.getElementById('y-val').textContent = gridDimension.toString();
}

function createPixel(size){
    const pixel = document.createElement('div');
    // pixel.classList.add('pixel');
    pixel.classList.add('pixel');
    pixel.classList.add('pixel-off');
    pixel.setAttribute('style','width: ' + size.toString() +'px;height: ' + size.toString() +'px;');
    pixel.onmouseover = function () {
        pixel.classList.add('pixel-on');
        pixel.classList.remove('pixel-off');
    };
    return pixel;
}

function clear(){
    let pixel;
    for(pixel of pixels){
        pixel.classList.remove('pixel-on');
        pixel.classList.add('pixel-off');
    }
}

function removeAllChildElements(element){
    const myNode = document.getElementById(element);
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}