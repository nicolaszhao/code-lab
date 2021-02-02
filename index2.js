// type MiddleWare = {
//   (next: () => Promise<void>): Promise<any>;
// };

const middlewares = [
  async next => {
    console.log(1);
    await next();
    console.log(4);
  },

  async next => {
    console.log(2);
    await next();
    console.log(3);
  },
];

function process(middlewares) {
  const resolve = middlewares.reduceRight(() => {

  });
}

process(middlewares).then(() => {
  console.log('end');
});

// expected: 1 2 3 4 end
