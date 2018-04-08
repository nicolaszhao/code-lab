const sum = function(...n) {
  return n.reduce((a, b) => a + b, 0);
};

module.exports = sum;