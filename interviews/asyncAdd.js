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
      })
    })
  }

  const tasks = [];
  const remain = num.length % 2;
  const taskNumSizes = num.length - remain;

  for (let i = 0; i < taskNumSizes; i += 2) {
    tasks.push(asyncAdd(num[i], num[i + 1]));
  }

  let ret = await Promise.all(tasks);
  ret = ret.reduce((a, b) => a + b);
  if (remain) {
    ret = await asyncAdd(ret, num[num.length - remain]);
  }
  return ret;
}

sum(1, 2, 3, 4, 5, 6, 7, 8, 1)
  .then(r => console.log(r));
