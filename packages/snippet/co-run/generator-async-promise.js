var doit = function(a, b) {
  return new Promise((resolve) => {
    setTimeout(() => {
      var val = a + b;
      console.log('a + b = ', val);
      resolve(val);
    }, 1000);
  });
};

var ge = function*() {
  var r1 = yield doit(1, 2);
  r1 = r1 + (yield doit(3, 4));
  return r1;
};

var run = function(fn) {
  var g = fn();
  
  return new Promise((resolve, reject) => {
    var next = function(data) {
      var res = g.next(data);
      
      if (res.done) {
        return resolve(res.value);
      }
      
      res.value.then(next);
    };
    
    next();
  });
};

run(ge).then(val => console.info('result value: ', val));