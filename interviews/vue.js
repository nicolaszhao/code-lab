// 实现一个 Watcher，监听 Vue 的 data 的变化
// 用 Compile 去解析 el 的子元素为 fragment
// 解析后，为标记中的动态模板添加 Watcher
// 参考: https://segmentfault.com/a/1190000013276124
class Vue {
  constructor(options) {
    const { data } = options;
    this.data = data;
    this.observer(data);
    this.proxy(data);
  }
  proxy(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        get() {
          return this.data[key];
        },
        set(val) {
          this.data[key] = val;
        }
      });
    });
  }
  observer(data) {
    Object.keys(data).forEach((key) => this.defineReactive(data, key, data[key]));
  }
  defineReactive(data, key, val) {
    const that = this;
    Object.defineProperty(data, key, {
      get() {
        return data[key];
      },
      set(newVal) {
        if (val === newVal) {
          return;
        }
        val = newVal;
        that.update(key, newVal);        
      },
    });
  }
  update(key, val) {
    console.log(`data ${key} change to ${val} `);
  }
}
