function curry(func) {
  let args = [];
  return function next(...curArgs) {
    args = [...args, ...curArgs];
    return args.length < func.length 
      ? next
      : func(...args);
  };
}
