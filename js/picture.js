'use strict';

window.picture = (function () {
  // создает миниатюру

  var template = document.querySelector('#picture').content.querySelector('.picture');

  var photosContainer = document.querySelector('.pictures');

  function createPhotoElement(photo) {
    var photoElement = template.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    return photoElement;
  }

  // отрисовывает миниатюры
  function renderPhotos(photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      var photo = createPhotoElement(photos[i]);
      fragment.appendChild(photo);
    }

    photosContainer.appendChild(fragment);
  }

  // renderPhotos(window.data.photos);

  return {
    renderPhotos: renderPhotos,
  };

})();
