function add (a, b) {
    return a + b;
	
}

function subtract (a, b) {
	return a - b;
}

function sum (arr) {
	let sum = 0;
	let item;
	for(item of arr){
	    if(!isNaN(item)){
	        sum += item;
        }
    }
    return sum;
}

function multiply (arr) {
    let prod = 1;
    let item;
    for(item of arr){
        if(!isNaN(item)){
            prod *= item;
        }
    }
    return prod;
}

function power(x, y) {
	return Math.pow(x, y);
}

function factorial(x) {
	if(x === 0) return 1;
	if(x === 1) return 1;
	return(x * factorial(x-1));
}

module.exports = {
	add,
	subtract,
	sum,
	multiply,
    power,
	factorial
}