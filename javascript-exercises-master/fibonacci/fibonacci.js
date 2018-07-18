let fibonacci = function(n) {
    n = Number.parseInt(n);
    if(n < 1){
        return 'OOPS'
    }
    let sequence = [1,1,2];
    if(n<3){
        return sequence[n-1];
    }
    for(let i = 2; i <= n - 2; i++){
        sequence.push(sequence[i] + sequence[i-1]);
    }
    return sequence[sequence.length-1];
};

module.exports = fibonacci
