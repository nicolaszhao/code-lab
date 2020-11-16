const betaCalc = {
  currentValue: 0,

  setValue(newValue) {
    this.currentValue = newValue;
  },

  plus(addend) {
    this.setValue(this.currentValue + addend);
  },

  minus(subtrahend) {
    this.setValue(this.currentValue - subtrahend);
  },

  register(plugin) {
    const { name, exec } = plugin;
    this[name] = exec;
  },
};
