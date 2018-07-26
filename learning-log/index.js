const $ = (selector) => document.querySelector(selector);
const readFile = (file, cb) => {
  const fileReader = new FileReader();

  fileReader.onload = () => {
    cb(fileReader.result);
  };

  fileReader.readAsDataURL(file);
};

$('[name="test"]').addEventListener('change', function() {
  readFile(this.files[0], (dataURL) => {
    const img = new Image();

    img.src = dataURL;
    document.body.appendChild(img);
  })
});

$('.drag-uploader').addEventListener('dragover', (event) => event.preventDefault(), false);
$('.drag-uploader').addEventListener('drop', function(event) {
  event.preventDefault();
  readFile(event.dataTransfer.files[0], (dataURL) => {
    const img = new Image();

    img.src = dataURL;
    document.body.appendChild(img);
  });
}, false);
