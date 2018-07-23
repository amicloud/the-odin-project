var repeatString = function(input, repeats) {
    if(repeats < 0){
        return 'ERROR'
    }
    if(repeats === 0){
        return ''
    }
    let builtString = '';
    for(let i = 0; i < repeats; i++){
        builtString += input;
    }
    return builtString;
};

module.exports = repeatString;
