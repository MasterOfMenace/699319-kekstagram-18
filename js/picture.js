'use strict';

window.picture = (function () {
  var photosContainer = document.querySelector('.pictures');

  function createPhotoElement(photo) {
    var template = document.querySelector('#picture').content.querySelector('.picture');
    var photoElement = template.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    return photoElement;
  }

  function renderPhotos(photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      var photo = createPhotoElement(photos[i]);
      fragment.appendChild(photo);
    }

    photosContainer.appendChild(fragment);
  }

  function renderError(message) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var main = document.querySelector('main');
    var errorNode = errorTemplate.cloneNode(true);
    errorNode.querySelector('.error__title').innerHTML = 'Ошибка соединения с сервером <br>' + message;
    main.appendChild(errorNode);
  }

  return {
    renderPhotos: renderPhotos,
    renderError: renderError,
  };
})();
