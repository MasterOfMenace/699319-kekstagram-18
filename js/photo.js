'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var uploadFile = document.querySelector('#upload-file');
  var previewImg = document.querySelector('.img-upload__preview').getElementsByTagName('img')[0];
  var effectsPreview = document.querySelectorAll('.effects__preview');

  function readerLoadHandler(reader) {
    previewImg.src = reader.result;
    effectsPreview.forEach(function (effect) {
      effect.style.backgroundImage = 'url(' + reader.result + ')';
    });
  }

  uploadFile.addEventListener('change', function () {
    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (type) {
      return fileName.endsWith(type);
    });
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        readerLoadHandler(reader);
      });

      reader.readAsDataURL(file);
    }
  });
})();
