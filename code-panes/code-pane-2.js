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

function func2(str) {
  const len = str.length;
  let ret = str[0];

  for (let i = 0; i < len; i++) {
    let l = i;
    let r = i;
    let c = str[i];
    let temp = '';
    let left = '';
    let right = '';

    while (true) {
      if (l - 1 >= 0 && r + 1 < len) {
        left += str[--l];
        right += str[++r];

        if (left !== right && c !== left && c !== right) {
          break;
        }

        if (left === right) {
          temp = left + c + right;
        } else if (c === left) {
          temp = left + c;
        } else if (c === right) {
          temp = c + right;
        }
        
        if (temp.length > ret.length) {
          ret = temp;
        }
      } else {
        break;
      }
    }
  }  

  return ret;
}

const text = func2('ABCa3bacb1bcab2a');
console.log(text);

