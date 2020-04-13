function sort(data) {
  const source = [...data];
  const len = source.length;
  for (let i = 0; i < len; i++) {
    let hasChanged = false;
    for (let j = len - 1; j > i; j--) {
      if (source[j - 1] > source[j]) {
        const heavier = source[j - 1];
        source[j - 1] = source[j];
        source[j] = heavier;
        hasChanged = true;
      }
    }
    if (!hasChanged) {
      break;
    }
  }
  return source;
}

// TEST
console.log(sort([3, 4, 5, 1]));
