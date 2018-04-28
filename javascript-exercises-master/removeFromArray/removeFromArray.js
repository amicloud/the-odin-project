var removeFromArray = function(arr, toRemove) {
    const args = Array.from(arguments);
    let toBeRemoved = [];
    for(let arg of args.slice(1, args.length)){
        toBeRemoved.push(arg);
    }
    let cleaned = [];
    for(let i of arr){
        if(!toBeRemoved.includes(i)){
            cleaned.push(i);
        }
    }
    return cleaned;
}

module.exports = removeFromArray
