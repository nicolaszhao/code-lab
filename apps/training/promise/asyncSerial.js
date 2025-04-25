// async/await 版本
export async function serialTasksV1(tasks) {
  let ret = [];
  for (let task of tasks) {
    const val = await task();
    ret.push(val);
  }
  return ret;
}

// promise 版
export function serialTasksV2(tasks) {
  const ret = [];
  return tasks.reduce((prev, next) => {
    return () =>
      prev().then((val) => {
        ret.push(val);
        return next();
      });
  });
}
