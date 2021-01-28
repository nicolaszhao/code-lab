class TaskProcessor {
  constructor() {
    this.id = 0;
    this.curTasks = [];
    this.waitTasks = [];
  }
  add(promiseCreator) {
    return new Promise((resolve) => {
      const task = { creator: promiseCreator, resolve, id: this.id++ };
      if (this.curTasks.length < 2) {
        this.run(task);
      } else {
        this.waitTasks.push(task);
      }
    });
  }
  run(task) {
    this.curTasks.push(task);
    task.creator()
      .then(() => {
        this.curTasks = this.curTasks.filter(({ id }) => id !== task.id);
        if (this.waitTasks.length) {
          this.run(this.waitTasks.shift());
        }
        task.resolve();
      });
  }
}

const delay = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

const taskProcessor = new TaskProcessor();
const addTask = (duration, order) => {
  taskProcessor
    .add(() => delay(duration))
    .then(() => console.log(order));
};

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
