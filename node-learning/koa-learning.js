const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const read = async function(fileName) {
  const data = await readFile(fileName);
  return data;
};

read('./text.txt').then(data => console.log(`text.txt content: ${data}`));