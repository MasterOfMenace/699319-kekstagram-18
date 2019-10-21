'use strict';

(function () {
  var NOT_PICTURES_NODES = 2;
  var START_COMMENTS_COUNT = 0;
  // console.log(window.photos.slice());
  var picturesContainer = document.querySelector('.pictures');

  function renderPreview(elem) {
    var parent = elem.parentNode;
    var index = Array.prototype.indexOf.call(parent.children, elem) - NOT_PICTURES_NODES;
    window.preview.renderBigPhoto(window.photos[index]);
    window.preview.renderComments(window.photos[index], START_COMMENTS_COUNT, window.preview.defaultRenderedCommentsCount);
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

  picturesContainer.addEventListener('click', pictureClickHandler);
  picturesContainer.addEventListener('keydown', pictureEnterPressHandler);
})();
