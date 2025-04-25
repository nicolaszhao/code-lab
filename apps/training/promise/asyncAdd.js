function add(a, b, callback) {
  const duration = Math.floor(Math.random() * 1000);
  setTimeout(() => {
    console.log(`${a} + ${b} = ${a + b}`);
    callback(null, a + b);
  }, duration);
}

async function sum(...num) {
  function asyncAdd(a, b) {
    return new Promise((resolve, reject) => {
      add(a, b, (err, ret) => {
        if (err) {
          return reject(err);
        }
        resolve(ret);
      });
    });
  }

  const tasks = [];
  const taskNum = num.splice(0, num.length - (num.length % 2));

  while (taskNum.length) {
    tasks.push(asyncAdd(taskNum.shift(), taskNum.shift()));
  }

  let ret = await Promise.all(tasks);
  ret = ret.reduce((a, b) => a + b);

  if (num.length) {
    ret = await asyncAdd(ret, num[0]);
  }

  return ret;
}

sum(1, 2, 3, 4, 5, 6, 7, 8, 1).then((r) => console.log(r));
