let  caesar = function(str, shift) {
    str = str.replace(/[A-Za-z]/g, (match) => {
        const char = match.charCodeAt(0);
        let offset = char >= 97 ? 97 : 65;
        return String.fromCharCode(((char - offset + shift) % 26) + offset + (char - offset + shift < 0 ? 26 : 0))
    });
    return str;
};

module.exports = caesar;