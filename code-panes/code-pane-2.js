// 求字符串最长回文子串
function func(str) {
  const len = str.length;
  let ret = '';

  for (let i = 0; i < len; i++) {
    let text = '';
    for (let j = i; j < len; j++) {
      text += str[j];
      if (text === [...text].reverse().join('') 
        && text.length > ret.length) {
        ret = text;
      }
    }
  }
  return ret;
}

const text = func('aacbcaba');
console.log(text);

