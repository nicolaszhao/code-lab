class LazyMan {
  constructor(name) {
    this.name = name;
    this.tasks = [];

    this.tasks.push(
      () =>
        new Promise((r) => {
          console.log(`I AM LAZY MAN. MY NAME IS ${this.name}.`);
          r();
        }),
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
        new Promise((r) => {
          setTimeout(() => {
            console.log(`Wake up after ${time}.`);
            r();
          }, time);
        }),
    );
    return this;
  }

  sleepFirst(time) {
    this.tasks.unshift(
      () =>
        new Promise((r) => {
          setTimeout(() => {
            console.log(`Sleep first wake up after ${time}.`);
            r();
          }, time);
        }),
    );
    return this;
  }

  eat(something) {
    this.tasks.push(
      () =>
        new Promise((r) => {
          console.log(`Eat ${something}.`);
          r();
        }),
    );
    return this;
  }
}

const lazyMan = new LazyMan('NZ');

lazyMan.sleep(1000).eat('333').sleepFirst(2000);

lazyMan.run();
