const util = require('util');
const fs = require('fs');
const { URL } = require('url');
const os = require('os');
const path = require('path');

const fn = (n) => {
  if (n <= 1) {
    return n;
  }
    
  return fn(n - 2) + fn(n - 1);
};

const generate = (n) => {
  const copy = Array(n).fill(0),
    ret = [];

  copy.reduce((r, m, i) => {
    if (i <= 1) {
      r.push(1);
    } else {
      r.push(r[i - 2] + r[i - 1]);
    }

    return r;
  }, ret);

  return ret;
};

const random = (size) => {
  const data = new Set();

  while (data.size < size) {
    const n = Math.floor(Math.random() * size + 1);
    data.add(n);
  }

  return [...data];
};

const promisify = (fn) => {
  fn = util.promisify(fn);

  return (...args) => fn(...args);
};

