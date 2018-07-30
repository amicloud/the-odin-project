function translate(str) {
	return str.
        replace(/\b([aeiou]+)[^aeiou ]+[A-Za-z]*/gi, "$&ay").
        replace(/\b([^aeiou ]?[q][u]|[^aeoui ]+)([A-Za-z][^. ]*)/gi, "$2$1ay");
}

module.exports = {
	translate
};