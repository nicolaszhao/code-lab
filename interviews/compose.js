function compose(...func) {
  if (func.length === 1) {
    return func[0];
  }
  return func.reduceRight((prev, next) => (...args) => prev(next(...args)));
}
