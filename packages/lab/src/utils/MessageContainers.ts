import { MessageQueue } from './MessageQueue';

const ACTION_REQUEST = 'message-request';
const ACTION_RESPONSE = 'message-response';

export class MessageSender<T = any> {
  #target: Window | null | undefined;

  #targetOrigin: string;

  #messageQueue = new MessageQueue<T>();

  constructor({
    target,
    targetOrigin,
  }: {
    target?: Window | null;
    targetOrigin?: string;
  } = {}) {
    this.#target = target ?? top;
    this.#targetOrigin = targetOrigin ?? '*';
    window.addEventListener('message', this.#handleMessage);
  }

  #handleMessage = (e: MessageEvent) => {
    return this.#receive(e.data);
  };

  #receive(
    message: {
      action?: string;
      payload?: { taskId?: any; data?: T };
    } = {},
  ) {
    const { action, payload = {} } = message;
    if (action === ACTION_RESPONSE) {
      const { taskId } = payload;
      if (taskId) {
        this.#messageQueue.notify(payload);
      }
    }
  }

  async send(data: unknown) {
    return this.#messageQueue.add((taskId) => {
      this.#target?.postMessage(
        { action: ACTION_REQUEST, payload: { taskId, data } },
        this.#targetOrigin,
      );
    });
  }

  destroy() {
    window.removeEventListener('message', this.#handleMessage);
    this.#messageQueue.clear();
    this.#messageQueue = null as any;
    this.#target = null;
  }
}

export class MessageReceiver<T, U> {
  #target: Window | null | undefined;

  #targetOrigin: string;

  #onMessage: (data?: U) => Promise<T>;

  constructor({
    target,
    targetOrigin,
    onMessage,
  }: {
    target?: Window | null;
    targetOrigin?: string;
    onMessage?: (data?: U) => Promise<T>;
  } = {}) {
    this.#target = target ?? top;
    this.#targetOrigin = targetOrigin ?? '*';
    this.#onMessage = onMessage ?? (() => Promise.resolve() as any);
    window.addEventListener('message', this.#handleMessage);
  }

  #handleMessage = (e: MessageEvent) => {
    return this.#receive(e.data);
  };

  async #receive(
    message: {
      action?: string;
      payload?: { taskId?: any; data?: U };
    } = {},
  ) {
    const { action, payload = {} } = message;
    if (action === ACTION_REQUEST) {
      const { taskId, data } = payload;
      if (taskId) {
        const res = await this.#onMessage(data);
        this.#target?.postMessage(
          { action: ACTION_RESPONSE, payload: { taskId, data: res } },
          this.#targetOrigin,
        );
      }
    }
  }

  destroy() {
    window.removeEventListener('message', this.#handleMessage);
    this.#target = null;
  }
}
