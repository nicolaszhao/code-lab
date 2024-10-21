type Option = { timeout?: number };

type Task<T> = {
  timeId?: number;
  resolve: (value: T) => void;
  reject: (reason: any) => void;
};

const defaultOptions: Option = { timeout: 15000 };

export class MessageQueue<T = any> {
  #id = 0;

  #options: Option;

  queue: Map<string, Task<T>>;

  constructor(options?: Option) {
    this.#options = { ...defaultOptions, ...options };
    this.queue = new Map();
  }

  add(callback: (taskId: string) => void): Promise<T> {
    const taskId = `message-queue-task--${this.#id}`;
    this.#id += 1;
    return new Promise((resolve, reject) => {
      const task: Task<T> = { resolve, reject };

      task.timeId = setTimeout(() => {
        this.pop(taskId);
        task.reject(new Error('Task timeout'));
      }, this.#options.timeout);

      this.queue.set(taskId, task);
      callback(taskId);
    });
  }

  pop(taskId: string) {
    const task = this.queue.get(taskId);
    if (task) {
      clearTimeout(task.timeId);
      this.queue.delete(taskId);
      return task;
    }
  }

  notify({ taskId, data }: { taskId?: string; data?: any } = {}) {
    if (taskId) {
      const task = this.pop(taskId);
      if (task) {
        task.resolve(data);
      }
    } else {
      this.queue.forEach((task) => {
        clearTimeout(task.timeId);
        task.resolve(data);
      });
      this.queue.clear();
    }
  }

  clear() {
    this.queue.forEach((task) => {
      clearTimeout(task.timeId);
    });
    this.queue.clear();
  }
}
