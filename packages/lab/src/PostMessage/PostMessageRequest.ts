import { Queue } from './Queue';

const ACTION_TYPE = 'post-message-request';

export class PostMessageRequest {
  queue = new Queue();
  target = top;

  constructor(target: Window) {
    this.target = target;
    this.init();
  }

  init() {
    window.addEventListener('message', this.handleMessage);
  }

  destroy() {
    window.removeEventListener('message', this.handleMessage);
    this.queue.clear();
  }

  handleMessage(e: MessageEvent) {
    return this.receive.bind(this, e.data);
  }

  receive(message?: {
    action?: string;
    payload?: { key?: string; data?: unknown };
  }) {
    const { action, payload = {} } = message || {};
    if (action === ACTION_TYPE) {
      const { key, data } = payload;
      if (key) {
        this.queue.run(key, data);
      }
    }
  }

  send(key: string, data: unknown) {
    return new Promise((resolve, reject) => {
      const payload = { key, data };
      this.target?.postMessage({ action: ACTION_TYPE, payload }, '*');
      this.queue.add(key, { resolve, reject });
    });
  }
}
