// 求字符串最长回文子串
export function searchPalindromeString(str) {
  const len = str.length;
  let ret = '';

  for (let i = 0; i < len; i++) {
    let text = '';
    for (let j = i; j < len; j++) {
      text += str[j];
      if (text === [...text].reverse().join('') && text.length > ret.length) {
        ret = text;
      }
    }
  }
  return ret;
}

export function searchPalindromeString2(str = '') {
  const len = str.length;
  let ret = str[0];

  for (let i = 0; i < len; i++) {
    let center = str[i];
    let cur = '';
    let left = '';
    let right = '';
    let l = i;
    let r = i;

    while (l >= 0 && r < len) {
      let prevLeft = left;
      let prevRight = right;

      left += str[--l];
      right += str[++r];

      if (
        left !== right &&
        center !== right &&
        left !== center &&
        center + prevLeft !== right &&
        left !== center + prevRight
      ) {
        break;
      }

      let start = l;
      let end = r;

      if (left !== right) {
        // aabbaa
        if (left === center || left === center + prevRight) {
          end--;
        } else if (center === right || center + prevLeft === right) {
          start++;
        }
      }

      cur = str.slice(start, end + 1);

      if (cur.length > ret.length) {
        ret = cur;
      }
    }
  }

  return ret;
}

function searchPalindromeString3(str) {
  let ret = '';

  for (let i = 0; i < str.length; i++) {
    let center = str[i];
    let current = '';
    let left = '';
    let right = '';
    let leftCursor = i;
    let rightCursor = i;
    let centerCursor = i;

    while (leftCursor >= 0 && rightCursor < str.length) {
      if (str[centerCursor + 1] === str[i]) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        center += str[++centerCursor];
        rightCursor = centerCursor;
        continue;
      }
      left += str[--leftCursor] || '';
      right += str[++rightCursor] || '';

      if (left && right && left !== right) {
        break;
      }

      let start = leftCursor;
      let end = rightCursor + 1;

      // "baa" or "abb"
      // cbaabac
      if (left !== right) {
        if (left) {
          start = start + 1;
        }
        if (right) {
          end = end - 1;
        }
      }

      if (start < 0) {
        start = 0;
      }
      if (end >= str.length) {
        end = str.length;
      }

      current = str.slice(start, end);
      if (current.length > ret.length) {
        ret = current;
      }
    }
  }

  return ret;
}

[
  'a',
  'aa',
  'baaa',
  'aabb',
  'aaab',
  'abba',
  '12321aba',
  'afjdsaabbaa',
  'baaaa',
  'aaaab',
  'baaaaaa',
  'aaaaaab',
  'bab',
  'aabbaa',
  'abc',
  'aba1',
  'aabbcbbaa11111',
  'abccba12345654321',
  '123abc123cba123456654321',
  'aabcabcAcbacbaa12345654321',
  'aabcabcAAcbacbaa12345654321',
  'aaa',
  'aaaa',
  'aaaaa',
  'aaaaaa1',
  'baaaaabbac',
].forEach((str, i) => {
  const r = searchPalindromeString3(str);
  console.log(`${i + 1}: ${str} -> "${r}"`);
});
