import type { App } from 'vue';

export default {
  install(app: App, option: { splitter: string }) {
    app.config.globalProperties.$demo = (text: string) => {
      return text.split('').join(option.splitter);
    };
  },
};
