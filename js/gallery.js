'use strict';

(function () {
  var NOT_PICTURES_NODES = 2;

  var picturesContainer = document.querySelector('.pictures');
  var previewCloseButton = document.querySelector('#picture-cancel');

  function pictureClickHandler(evt) {
    if (evt.target.className === 'picture__img') {
      var child = evt.target.parentNode;
      var parent = child.parentNode;
      var index = Array.prototype.indexOf.call(parent.children, child) - NOT_PICTURES_NODES;
      window.preview.renderBigPhoto(window.photos[index]);
      window.preview.renderComments(window.photos[index]);
    }
  }

  function pictureEnterPressHandler(evt) {
    window.util.isEnterEvent(evt, function () {
      if (evt.target.className === 'picture') {
        var child = evt.target;
        var parent = child.parentNode;
        var index = Array.prototype.indexOf.call(parent.children, child) - NOT_PICTURES_NODES;
        window.preview.renderBigPhoto(window.photos[index]);
        window.preview.renderComments(window.photos[index]);
      }
    });
  }

  window.backend.load(window.picture.onSuccess, window.picture.renderError);
  window.util.hideElement('.social__comment-count', 'visually-hidden');
  window.util.hideElement('.comments-loader', 'visually-hidden');

  picturesContainer.addEventListener('click', pictureClickHandler);
  picturesContainer.addEventListener('keydown', pictureEnterPressHandler);

  previewCloseButton.addEventListener('click', function () {
    window.util.hideElement('.big-picture', 'hidden');
  });
})();
