const matchBrackets = (text) => {
  const ret = [];
  let regSpecials = /([()])/g;
  let specialsMatch = regSpecials.exec(text);

  while (specialsMatch) {
    const char = specialsMatch[1];
    if (char === '(') {
      ret.push(char);
    } else if (char === ')') {
      if (!ret.length) {
        return false;
      }
      ret.pop();
    }
    specialsMatch = regSpecials.exec(text);
  }

  return ret.length === 0;
};

const texts = [
  '())(()',
  '(()',
  '()))((',
  '()()',
  'a (b (c ( d ) c ) (b) ) a(())',
];

texts.forEach((text) => {
  console.log(`result: `, matchBrackets(text));
});
