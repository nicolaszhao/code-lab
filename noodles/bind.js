function bind(func, context, ...args) {
  return function(...funcArgs) {
    return func.apply(context, [...args, ...funcArgs]);
  };
}
