// async/await 版本
async function serialTasksV1(tasks) {
  let ret = [];
  for (let task of tasks) {
    const val = await task();
    ret.push(val);
  }
  return ret;
}

// promise 版
function serialTasksV2(tasks) {
  const ret = [];
  return tasks.reduce((prev, next) => {
    return () => prev().then((val) => {
      ret.push(val);
      return next();
    })
  });
}
