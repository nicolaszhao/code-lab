const sum = function(...n) {
  return new Promise((resolve, reject) => {
    resolve(n.reduce((a, b) => a + b, 0));
  });
};

module.exports = sum;