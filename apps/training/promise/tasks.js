class TaskProcessor {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.size = 0;
    this.taskQueue = [];
  }

  add(task) {
    return new Promise((resolve) => {
      this.taskQueue.push({ task, resolve });

      if (this.size < this.maxSize) {
        this.run(this.taskQueue.shift());
      }
    });
  }

  run(sequence) {
    this.size++;
    Promise.resolve(sequence.task()).then(() => {
      this.size--;
      if (this.taskQueue.length) {
        this.run(this.taskQueue.shift());
      }
      sequence.resolve();
    });
  }
}

const delay = () =>
  new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * 5) * 200),
  );

const taskProcessor = new TaskProcessor(2);

const addTask = (id) => {
  taskProcessor
    .add(() => delay())
    .then(() => console.log('addTask done: ', id));
};

addTask(1);
addTask(2);
addTask(3);
addTask(4);
addTask(5);
addTask(6);
addTask(7);
addTask(8);
addTask(9);
addTask(10);
