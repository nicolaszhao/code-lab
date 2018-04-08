const fs = require('fs');

const cws = fs.createWriteStream('./text2.txt');
cws.write('jldsajlfsdlfjsadlf\n');
cws.write('xxxx');
cws.end();