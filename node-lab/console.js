const fs = require('fs');

const { Console } = console;

const output = fs.createWriteStream('./log/stdout.log');
const errorOutput = fs.createWriteStream('./log/stderr.log');

const logger = new Console(output, errorOutput);

const count = 5;
logger.log('count: %d', count);
logger.error('xxxx');
logger.dir({
  a: 1,
  b: {
    c: 2,
    d: "D",
    e() {
      return false;
    }
  }
});
logger.group('test1');
logger.log('jfdsjfjslfjls')