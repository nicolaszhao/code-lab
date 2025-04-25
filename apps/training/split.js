export function split(arr, size = 1) {
  const ret = [];
  let start = 0;
  let i = 0;

  size = Math.ceil(arr.length / size);

  while (start < arr.length) {
    ret[i++] = arr.slice(start, size + start);
    start = i * size;
  }

  return ret;
}
