var sumAll = function(bound1, bound2) {
    if(bound1 < 0 || bound2 < 0 || !Number.isInteger(bound1) || !Number.isInteger(bound2)) {
        return 'ERROR';
    }
    let start, end, sum = 0;
    if(bound1 > bound2){
        end = bound1;
        start = bound2;
    } else{
        start = bound1;
        end = bound2;
    }
    for(let i = start; i <= end; i++){
        sum += i;
    }
    return sum;
}

module.exports = sumAll
