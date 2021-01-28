const co = (gen) => {
  gen = gen();

  return new Promise((resolve, reject) => {
    const next = (ret) => {
      if (ret.done) {
        return resolve(ret.value);
      }

      ret.value.then(onFulfilled, onRejected);
    };

    const onFulfilled = (res) => {
      let ret;

      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }

      next(ret);
    };

    const onRejected = (err) => {
      let ret;

      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }

      next(ret);
    };

    onFulfilled();
  });
};

co(function* () {
  const a = yield Promise.resolve('a');
  console.log('----a----', a);
  const b = yield Promise.resolve('b');
  console.log('----b----', b);
  return a + b;
})
  .then(val => console.log(val))
  .catch(e => console.error(e));
