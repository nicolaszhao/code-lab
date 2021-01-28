const thunkify = (fn) => {
  const fnArgs = [];
  const thunk = (...args) => {
    fnArgs.push(...args);

    if (fnArgs.length >= fn.length) {
      return fn.call(this, ...fnArgs);
    } else {
      return thunk;
    }
  };

  return thunk;
};

const add = (a, b, c) => {
  const ret = [a, b, c].reduce((a, b) => a + b);

  console.log(`add ret: ${ret}`);

  return ret;
};

const sum = thunkify(add);

sum(1, 2, 3);
