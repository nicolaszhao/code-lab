// 双指针！！！
const arr = [1, 2, 3, 4, 5, 6, 7];
let last = 3;
let j = 3 - 1;
let r;

for (let i = 0; i < arr.length; i++) {
  if (j++ === arr.length - 1) {
    r = arr[i];
    break;
  }
}

console.log(`result: ${r}`);
