const co = (g) => {
  g = g();

  return new Promise((resolve, reject) => {
    function next (ret) {
      if (ret.done) {
        return resolve(ret.value);
      }

      ret.value.then(onFulfilled, onRejected);
    }

    function onFulfilled(res) {
      try {
        res = g.next(res);
      } catch(err) {
        return reject(err);
      }

      next(res);
    }

    function onRejected(res) {
      try {
        res = g.throw(res);
      } catch(err) {
        return reject(err);
      }

      return next(res);
    }

    onFulfilled();
  });
};

co(function* () {
  const a = yield Promise.resolve('a');

  console.log(`a ----> ${a}`);

  const b = yield Promise.resolve('b');

  console.log(`b ----> ${b}`);

  const c = yield Promise.reject('c');

  console.log(`c ----> ${c}`);

  return b;
})
  .then((a) => {
    console.log(`co done! value ----> ${a}`)
  }, b => {
    console.log(`co fail! value ----> ${b}`)
  })