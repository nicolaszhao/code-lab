type Option = { timeout?: number };
type Task = {
  timeId?: number;
  resolve: (value: unknown) => void;
  reject: (error: Error) => void;
}

const defaultOptions: Option = { timeout: 15000 };

export class Queue {
  #options: Option = defaultOptions;

  queue: Map<string, Task>;

  constructor(options?: Option) {
    this.#options = { ...this.#options, ...options };
    this.queue = new Map();
  }

  add(key: string, task: Task) {
    task.timeId = setTimeout(() => {
      this.pick(key);
      task.reject(new Error('timeout'));
    }, this.#options.timeout);
    this.queue.set(key, task);
  }

  run(key: string, data: unknown) {
    const task = this.pick(key);
    if (task) {
      task.resolve(data);
    }
  }

  pick(key: string) {
    const task = this.queue.get(key);
    if (task) {
      clearTimeout(task.timeId);
      this.queue.delete(key);
      return task;
    }
  }

  clear() {
    this.queue.forEach((task) => {
      clearTimeout(task.timeId);
    });
    this.queue.clear();
  }
}
