var sort = (data) => {
  let ret = [].concat(data),
    len = ret.length,
    i = 0, 
    j;

  for (i; i < len; i++) {
    let changed = false;

    for (j = len - 1; j > i; j--) {
      if (ret[j - 1] > ret[j]) {
        let heavier = ret[j - 1];
        ret[j - 1] = ret[j];
        ret[j] = heavier;
        changed = true;
      }
    }

    if (!changed) {
      break;
    }
  }

  return ret;
};

const fibonacci = (n) => {
  const list = new Array(n);
  
  return list.fill(0).reduce((ret, cur, i) => {
    ret.push(i <= 1 ? 1 : ret[i - 1] + ret[i - 2]);
    return ret;
  }, []);
};
