export function compose(...func) {
  if (func.length === 1) {
    return func[0];
  }
  return func.reduceRight((prev, next) => (...args) => prev(next(...args)));
}

export function composeV2(...fns) {
  return function composed(result) {
    return fns.reverse().reduce(function reducer(result, fn) {
      return fn(result);
    }, result);
  };
}
