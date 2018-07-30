var ftoc = function(f) {
  return parseFloat(((f - 32) * (5/9)).toFixed(1));
};

var ctof = function(c) {
  return parseFloat(((c * (9/5)) + 32).toFixed(1));
};

module.exports = {
  ftoc,
  ctof
};
