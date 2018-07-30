var reverseString = function(input) {
    let builtString = '';
    for(let i = input.length - 1; i >= 0; i--){
        builtString += input[i];
    }
    return builtString;
};

module.exports = reverseString;