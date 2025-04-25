function PromiseA(fnc) {
  const callbacks = [];
  let state = 'pending';
  let value;

  this.then = function (onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      handle({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      });
    });
  };

  this.catch = function (onError) {
    return this.then(null, onError);
  };

  function handle(callback) {
    if (state === 'pending') {
      callbacks.push(callback);
      return;
    }
    const cb =
      state === 'fulfilled' ? callback.onFulfilled : callback.onRejected;
    const next = state === 'fulfilled' ? callback.resolve : callback.reject;

    if (!cb) {
      next(value);
      return;
    }
    try {
      const ret = cb(value);
      next(ret);
    } catch (ex) {
      callback.reject(ex);
    }
  }
  function handleCallback() {
    while (callbacks.length) {
      handle(callbacks.shift());
    }
  }
  function resolve(newValue) {
    const resolver = () => {
      if (state !== 'pending') {
        return;
      }
      if (
        newValue &&
        typeof newValue === 'object' &&
        typeof newValue.then === 'function'
      ) {
        const { then } = newValue;
        then.call(newValue, resolve, reject);
        return;
      }
      state = 'fulfilled';
      value = newValue;
      handleCallback();
    };
    setTimeout(resolver, 0);
  }
  function reject(error) {
    const rejecter = () => {
      if (state !== 'pending') {
        return;
      }
      if (
        error &&
        typeof error === 'object' &&
        typeof error.then === 'function'
      ) {
        const { then } = error;
        then.call(error, resolve, reject);
        return;
      }
      state = 'rejected';
      value = error;
      handleCallback();
    };
    setTimeout(rejecter, 0);
  }

  fnc(resolve, reject);
}

// test...
new PromiseA((resolve) => {
  setTimeout(() => {
    resolve({ test: 1 });
  }, 1000);
})
  .then((data) => {
    console.log('result1', data);
    //dosomething
    return test();
  })
  .then((data) => {
    console.log('result2', data);
  });

function test() {
  return new PromiseA((resolve) => {
    setTimeout(() => {
      resolve({ test: 2 });
    }, 1000);
  });
}
