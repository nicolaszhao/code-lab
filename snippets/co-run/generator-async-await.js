var doit = function(a, b) {
  return new Promise((resolve) => {
    setTimeout(() => {
      var val = a + b;
      console.log('a + b = ', val);
      resolve(val);
    }, 1000);
  });
};

async function ge() {
  let r1 = await doit(1, 2);
  let r2 = r1 + (await doit(3, 4));
  return r2;
};

ge().then(val => console.log('resule value: ', val));