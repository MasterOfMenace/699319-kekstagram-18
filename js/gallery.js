'use strict';

(function () {
  window.backend.load(window.picture.renderPhotos, window.picture.renderError);

  window.preview.renderBigPhoto(window.data.photos[0]);
  window.preview.renderComments(window.data.photos[0]);

  window.util.hideElement('.social__comment-count', 'visually-hidden');
  window.util.hideElement('.comments-loader', 'visually-hidden');

})();
