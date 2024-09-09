const _Promise = {};

_Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let values = [];
    let count = 0;
    promises.forEach((promise, index) => {
      promise.then(value => {
        values[index] = value;
        count++;
        if (count === promises.length) {
          resolve(values);
        }
      }, reject);
    });
  });
};

_Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      promise.then(resolve, reject);
    });
  });
};

_Promise.any = function(promises) {
  promises = promises.map(p => new Promise((resolve, reject) => {
    p.then(reject, resolve);
  }));
  return new Promise((resolve, reject) => {
    _Promise.all(promises).then(reject, resolve);
  });
};

const tasks = Array(5)
  .fill(0)
  .map((n, i) => new Promise(
    (resolve, reject) => setTimeout(
      () => i > 10 ? resolve(i) : reject(i), 
      Math.random() * 10 * 100,
    ),
  ));

_Promise.any(tasks)
  .then((ret) => console.log('success', ret))
  .catch(err => console.log('failed', err));
