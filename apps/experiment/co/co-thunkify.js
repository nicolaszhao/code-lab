const thunkify = (fn) => {
  return (...args) => {
    return (callback) => {
      return fn.call(null, ...args, callback);
    };
  };
};

const add = (a, b, cb) => {
  setTimeout(() => cb(null, a + b), 1000);
};

const co = (g) => {
  g = g();

  return new Promise((resolve, reject) => {
    function next(err, data) {
      const ret = g.next(data);

      if (ret.done) {
        return resolve(ret.value);
      }

      ret.value(next);
    }

    next();
  });
};

co(function* () {
  const a = yield thunkify(add)(1, 2);

  console.log(`a ---> ${a}`);

  const b = yield thunkify(add)(3, 4);

  console.log(`b ---> ${b}`);

  return a + b;
}).then((res) => console.log(`done! res --> ${res}`));
