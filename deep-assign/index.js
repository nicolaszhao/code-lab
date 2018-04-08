const isArray = (obj) => {
  return Array.isArray(obj);
};

const isObject = (obj) => {
  return obj && typeof obj === 'object' && !isArray(obj);
};

const deepAssign = (target, ...sources) => {
  const source = sources.shift();

  if (!source) {
    return target;
  }

  const props = Object.keys(source);

  for (let prop of props) {
    if (isObject(source[prop]) || isArray(source[prop])) {
      if (!target[prop]) {
        Object.assign(target, { [prop]: isObject(source[prop]) ? {} : [] });
      }

      deepAssign(target[prop], source[prop]);
    } else {
      Object.assign(target, { [prop]: source[prop] });
    }
  }

  return deepAssign(target, ...sources);  
};


var A = {
  a: 'A',
  b: {
    a: 'A',
    c: {
      a: 'A'
    }
  },
  e: [2, 3, { a: 'A' }]
};

var B = {
  a: 'B',
  b: {
    b: 'B',
    c: {
      b: 'B'
    },
    d: {}
  },
  d: {},
  e: [1, 2, { b: 'B' }]
};

console.log(deepAssign(A, B));
