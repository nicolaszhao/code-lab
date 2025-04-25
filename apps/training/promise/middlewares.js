//
// expected: 1 2 3 4 end
const middlewares = [
  async (next) => {
    console.log(1);
    await next();
    console.log(6);
  },

  async (next) => {
    console.log(2);
    await next();
    console.log(5);
  },

  async (next) => {
    console.log(3);
    await next();
    console.log(4);
  },
];

function process1(middlewares) {
  function dispatch(index) {
    if (index === middlewares.length) {
      return;
    }
    return middlewares[index](() => dispatch(index + 1));
  }
  return dispatch(0);
}

function process2(middlewares) {
  const dispatch = middlewares.reduceRight((fn1, fn2) => {
    return (first) => fn2(() => fn1(first));
  });
  return dispatch(() => Promise.resolve());
}

async function test() {
  await process1(middlewares);
  console.log('process1 end!');

  await process2(middlewares);
  console.log('process2 end!');
}

test();
