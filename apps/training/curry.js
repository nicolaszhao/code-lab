export function curry(func) {
  let args = [];
  return function next(...curArgs) {
    args = [...args, ...curArgs];
    return args.length < func.length ? next : func(...args);
  };
}

export function curryV2(fn) {
  return (function nextCurried(...prevArgs) {
    return (...nextArgs) => {
      const args = [...prevArgs, ...nextArgs];
      return args.length >= fn.length ? fn(...args) : nextCurried(...args);
    };
  })([]);
}
