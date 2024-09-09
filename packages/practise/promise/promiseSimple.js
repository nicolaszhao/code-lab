class Promise {
  constructor(fn) {
    // 每次自身 Promise 调用 `.then` 就会 push 一个 cb
    this.cbs = [];
    this.value = undefined;

    const resolve = (value) => {
      setTimeout(() => {
        // `this.value` 相当于是，
        // 先 resolve 后，把获取的 value 传递给之后 `.then` 中 push 的 cb 方法的参数
        this.value = value;
        this.cbs.forEach(cb => cb(value));
      });
    };

    fn(resolve);
  }

  then(onFulfilled) {
    return new Promise((resolve) => {
      this.cbs.push(() => {
        const res = onFulfilled(this.value);

        if (res instanceof Promise) {
          // 这里链式 Promise 的关键是，`onFulfilled` 执行的 Promise 后，
          // 将 value 交接给这里的 resolve 的参数，
          // 那么，上面 `return new Promise ...` 这个的后一个 `.then` 的 cb 可以获取到值 
          res.then(resolve);
        } else {
          resolve(res);
        }
      });
    });
  }
}

const p = new Promise((resolve) => {
  setTimeout(() => resolve(10), 400);
});

p
  .then((val) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(val * 2), 600);
    });
  })
  .then((val) => {
    console.log(`finally value: ${val}`);
  });
