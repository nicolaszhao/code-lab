class LazyMan {
  constructor(name) {
    this.name = name;
    this.tasks = [];

    this.tasks.push(
      () =>
        new Promise(r => {
          console.log(`I AM LAZY MAN. MY NAME IS ${this.name}.`);
          r();
        })
    );
  }

  run() {
    let sequence = Promise.resolve();
    for (let task of this.tasks) {
      sequence = sequence.then(task);
    }
  }

  sleep(time) {
    this.tasks.push(
      () =>
        new Promise(r => {
          setTimeout(() => {
            console.log(`Wake up after ${time}.`);
            r();
          }, time);
        })
    );
    return this;
  }

  sleepFirst(time) {
    this.tasks.unshift(
      () =>
        new Promise(r => {
          setTimeout(() => {
            console.log(`Sleep first wake up after ${time}.`);
            r();
          }, time);
        })
    );
    return this;
  }

  eat(something) {
    this.tasks.push(
      () =>
        new Promise(r => {
          console.log(`Eat ${something}.`);
          r();
        })
    );
    return this;
  }
}

const lazyMan = new LazyMan('NZ');

lazyMan.sleep(1000).eat('333').sleepFirst(2000);

lazyMan.run();

function start(id) {
  start.tasks = start.tasks || [];

  const tasks = start.tasks;

  tasks.push(() => execute(id));

  clearTimeout(start.timer);
  start.timer = setTimeout(() => {
    tasks.reduce((prev, next) => prev.then(next), Promise.resolve());
  });
}

for (let i = 0; i < 5; i++) {
  start(i);
}

function sleep() {
  const duration = Math.floor(Math.random() * 500);
  return new Promise(resolve => setTimeout(resolve, duration));
}

function execute(id) {
  return sleep().then(() => {
    console.log('id', id);
  });
}

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let values = [];
    let count = 0;
    promises.forEach((promise, index) => {
      promise.then(value => {
        console.log('value:', value, 'index:', index);
        values[index] = value;
        count++;
        if (count === promises.length) {
          resolve(values);
        }
      }, reject);
    });
  });
};

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      promise.then(resolve, reject);
    });
  });
};


const middlewares = [
  async next => {
    console.log(1);
    await next();
    console.log(4);
  },

  async next => {
    console.log(2);
    await next();
    console.log(3);
  },
];

function process(middlewares) {
  function dispatch(index) {
    const middleware = middlewares[index];
    if (!middleware) {
      return;
    }
    return middleware(() => dispatch(index + 1));
  }
  return dispatch(0);
}

// expected: 1 2 3 4 end
process(middlewares).then(() => {
  console.log('end');
});
