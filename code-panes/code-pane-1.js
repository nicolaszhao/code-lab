// Promise A+
function PromiseA(func) {
  const cbs = [];
  let state = 'pending';
  let value;

  function resolve(newValue) {
    setTimeout(() => resolver(newValue, 'fulfilled'));
  }

  function reject(err) {
    setTimeout(() => resolver(err, 'rejected'));
  }

  function resolver(newValue, nextState) {
    if (state !== 'pending') {
      return;
    }

    if (newValue && typeof newValue === 'object' && newValue.then) {
      newValue.then(resolve, reject);
      return;
    }

    value = newValue;
    state = nextState;

    while (cbs.length) {
      handle(cbs.shift());
    }
  }

  function handle(callbackObj) {
    if (state === 'pending') {
      cbs.push(callbackObj);
      return;
    }

    const cb = state === 'fulfilled'
      ? callbackObj.onFulfilled
      : callbackObj.onRejected;

    const next = state === 'fulfilled'
      ? callbackObj.resolve
      : callbackObj.reject;

    if (!cb) {
      next(value);
      return;
    }

    try {
      const res = cb(value);
      next(res);
    } catch (ex) {
      callbackObj.reject(ex);
    }
  }

  this.then = function(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      handle({
        onFulfilled, 
        onRejected,
        resolve,
        reject,
      });
    });
  };

  this.catch = function(onError) {
    return this.then(null, onError);
  };

  func(resolve, reject);
}

const P = (i) => new PromiseA((r, j) => {
  setTimeout(() => {
    const val = Math.random() * 10;
    console.log(`P(${i}): ${val}, will ${val > 1 ? 'resolve': 'reject'}`);
    val > 1 ? r(val) : j(val);
  }, 500);
});

P(1).then((v) => {
  return P(2).then(() => {
    return P(3).then(() => {
      return 'done';
    });
  });
})
.then((v) => console.log(v))
.catch((err) => {
  console.log(`catch: ${err}`);
})



// React Lifecycle
// mounting
class ReactMounting {
  constructor() {}
  static getDerivedStateFromProps() {}
  render() {}
  componentDidMount() {}
}

// updating
class ReactUpdating {
  static getDerivedStateFromProps() {}
  shouldComponentUpdate() {}
  render() {}
  getSnapshotBeforeUpdate() {}
  componentDidUpdate()
}

// unmounting
class ReactUnmounting {
  componentWillUnmount() {}
}

// error handling
class ReactErrorBoundary {
  static getDerivedStateFromError() {}
  componentDidCatch() {}
}
