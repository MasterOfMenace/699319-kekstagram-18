'use strict';

(function () {
  var NOT_PICTURES_NODES = 2;

  var picturesContainer = document.querySelector('.pictures');
  var previewCloseButton = document.querySelector('#picture-cancel');

  function renderPreview(elem) {
    var parent = elem.parentNode;
    var index = Array.prototype.indexOf.call(parent.children, elem) - NOT_PICTURES_NODES;
    window.preview.renderBigPhoto(window.photos[index]);
    window.preview.renderComments(window.photos[index]);
  }

  function pictureClickHandler(evt) {
    if (evt.target.className === 'picture__img') {
      var child = evt.target.parentNode;
      renderPreview(child);
    }
  }

  function pictureEnterPressHandler(evt) {
    window.util.isEnterEvent(evt, function () {
      if (evt.target.className === 'picture') {
        var child = evt.target;
        renderPreview(child);
      }
    });
  }

  window.backend.load('https://js.dump.academy/kekstagram/data', window.picture.onSuccess, window.picture.renderError);
  // window.util.hideElement('.social__comment-count', 'visually-hidden');
  // window.util.hideElement('.comments-loader', 'visually-hidden');

  picturesContainer.addEventListener('click', pictureClickHandler);
  picturesContainer.addEventListener('keydown', pictureEnterPressHandler);

  previewCloseButton.addEventListener('click', function () {
    window.util.hideElement('.big-picture', 'hidden');
  });
})();
