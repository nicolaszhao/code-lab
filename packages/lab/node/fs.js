const fs = require('fs');

const watchFileChange = (filename) => {
  fs.watch(filename)
  .on('change', (eventType, filename) => {
    console.log(`${filename} changed!`);
  });
};

const appendFile = (filename, data) => {
  fs.appendFile(filename, data, (err) => {
    if (err) {
      return console.log('出错了：%s', err.message);
    }
  });
};

const copyFile = (src, dest) => {
  fs.copyFile(src, dest, (err) => {
    if (err) {
      return console.log('出错了：%s', err.message);
    }
    console.log(`${src} was copied to ${dest}.`);
  });
};

const progressbar = () => {
  if (!progressbar.start) {
    progressbar.start = Date.now();
  }

  process.stdout.write('.');
  setTimeout(() => {
    if ((Date.now() - progressbar.start) / 1000 < 60) {
      progressbar();
    }
  }, 1000);
};
