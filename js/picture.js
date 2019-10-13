'use strict';

window.picture = (function () {
  var photosContainer = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');

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

  function onSuccess(data) {
    window.photos = data;
    filters.classList.remove('img-filters--inactive');
    renderPhotos(data);
  }

  function renderError(message) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var main = document.querySelector('main');
    var errorNode = errorTemplate.cloneNode(true);
    errorNode.querySelector('.error__title').innerHTML = 'Ошибка соединения с сервером <br>' + message;
    main.appendChild(errorNode);
  }

  // function shuffleArray(array, number) {
  //   var inputArray = array.slice();
  //   var outputArray = [];
  //   for (var i = 0; i < number; i++) {
  //     var index = Math.floor(Math.random() * inputArray.length);
  //     outputArray.push(inputArray[index]);
  //     inputArray.splice(index, 1);
  //   }
  //   return outputArray;
  // }

  // var filters = document.querySelector('.img-filters');
  // var filterButtons = filters.querySelectorAll('button');
  // var popular = filters.querySelector('#filter-popular');
  // var random = filters.querySelector('#filter-random');
  // var discussed = filters.querySelector('#filter-discussed');

  // function clearPicturesContainer() {
  //   var pictures = photosContainer.querySelectorAll('.picture');
  //   pictures.forEach(function (elem) {
  //     elem.remove();
  //   });
  // }

  // function toggleButtonActiveClass() {
  //   Array.prototype.filter.call(filterButtons, function (button) {
  //     if (button.classList.contains('img-filters__button--active')) {
  //       button.classList.remove('img-filters__button--active');
  //     }
  //   });
  // }

  // function randomButtonClickHandler(evt) {
  //   clearPicturesContainer();
  //   var shuffled = shuffleArray(window.photos.slice(), 10);
  //   renderPhotos(shuffled);
  //   toggleButtonActiveClass();
  //   evt.target.classList.add('img-filters__button--active');
  // }

  // function popularButtonClickHandler(evt) {
  //   clearPicturesContainer();
  //   renderPhotos(window.photos);
  //   toggleButtonActiveClass();
  //   evt.target.classList.add('img-filters__button--active');
  // }

  // function discussedButtonClickHandler(evt) {
  //   clearPicturesContainer();
  //   var sorted = window.photos.slice().sort(function (a, b) {
  //     return b.comments.length - a.comments.length;
  //   });
  //   renderPhotos(sorted);
  //   toggleButtonActiveClass();
  //   evt.target.classList.add('img-filters__button--active');
  // }

  // random.addEventListener('click', randomButtonClickHandler);
  // popular.addEventListener('click', popularButtonClickHandler);
  // discussed.addEventListener('click', discussedButtonClickHandler);

  return {
    onSuccess: onSuccess,
    renderError: renderError,
    renderPhotos: renderPhotos,
  };
})();
