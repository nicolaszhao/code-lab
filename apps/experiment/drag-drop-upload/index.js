const $ = (selector) => document.querySelector(selector);

const readFile = (file, cb) => {
  const fileReader = new FileReader();

  fileReader.onload = () => {
    cb(fileReader.result);
  };

  fileReader.readAsDataURL(file);
};

$('.drag-upload').addEventListener(
  'dragover',
  (event) => {
    event.preventDefault();
    $('.drag-upload').classList.add('drag-upload-over');
  },
  false,
);

$('.drag-upload').addEventListener(
  'drop',
  function (event) {
    event.preventDefault();
    $('.drag-upload').classList.remove('drag-upload-over');
    readFile(event.dataTransfer.files[0], (dataURL) => {
      const img = new Image();

      img.src = dataURL;
      $('.drag-upload').appendChild(img);
    });
  },
  false,
);
