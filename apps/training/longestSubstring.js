function lengthLongestSubstring(str) {
  if (str?.length <= 1) {
    return str?.length || 0;
  }
  let substring = '';
  let length = 0;
  for (const n of str) {
    const index = substring.indexOf(n);
    if (index !== -1) {
      console.log(`substring`, substring);
      substring = substring.slice(index + 1);
    }
    substring += n;
    length = Math.max(length, substring.length);
  }
  return length;
}

let ret = lengthLongestSubstring('abcabcbcc');
console.log(`ret: ${ret}`);
ret = lengthLongestSubstring('kwwkep');
console.log(`ret: ${ret}`);
ret = lengthLongestSubstring('aaaaaa');
console.log(`ret: ${ret}`);
ret = lengthLongestSubstring('aaaaab');
console.log(`ret: ${ret}`);
