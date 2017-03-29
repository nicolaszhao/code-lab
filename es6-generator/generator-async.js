var thunkify = function(fn) {
  return function(...args) {
    return function(callback) {
      var cb = function() {
        var called;
        
        if (called) {
          return;
        }
        
        callback.call(null, ...arguments);
      };
      
      fn.call(null, ...args, cb);
    };
  };
};

var doit = thunkify(function(a, b, cb) {
  setTimeout(() => {
    var val = a + b;
    console.log('a + b = ', val);
    cb(null, val);
  }, 1000);
});

var ge = function* () {
  var r1 = yield doit(1, 2);
  var r2 = r1 + (yield doit(3, 4));
  return r2;
};

var run = function(ge) {
  var g = ge();
  
  return new Promise((resolve, reject) => {
    var next = function(err, data) {
      var res = g.next(data);
      
      if (res.done) {
        return resolve(res.value);
      }
      res.value(next);
    };
    
    next();
  });
};

run(ge).then(val => console.log('resule value: ', val));
