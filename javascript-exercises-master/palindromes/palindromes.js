let palindromes = function(query) {
    let processed;
    processed = query.toLowerCase().replace(/[^A-Za-z]/g, "");
    return(processed === processed.split("").reverse().join(""));
};

module.exports = palindromes;
