'use strict';

(function () {
  var RANDOM_PHOTOS_COUNT = 10;
  var photosContainer = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');
  var filterButtons = filters.querySelectorAll('button');
  var popular = filters.querySelector('#filter-popular');
  var random = filters.querySelector('#filter-random');
  var discussed = filters.querySelector('#filter-discussed');

  function shuffleArray(array, number) {
    var inputArray = array.slice();
    var outputArray = [];
    for (var i = 0; i < number; i++) {
      var index = Math.floor(Math.random() * inputArray.length);
      outputArray.push(inputArray[index]);
      inputArray.splice(index, 1);
    }
    return outputArray;
  }

  function clearPicturesContainer() {
    var pictures = photosContainer.querySelectorAll('.picture');
    pictures.forEach(function (elem) {
      elem.remove();
    });
  }

  // эта функция берет коллекцию кнопок, ищет кнопки у которых стоит класс img-filters__button--active и у них выпиливает этот класс, это я так переключение состояния у кнопок реализовал)))
  function toggleButtonActiveClass() {
    Array.prototype.filter.call(filterButtons, function (button) {
      if (button.classList.contains('img-filters__button--active')) {
        button.classList.remove('img-filters__button--active');
      }
    });
  }

  function randomButtonClickHandler(evt) {
    clearPicturesContainer();
    var shuffled = shuffleArray(window.photos.slice(), RANDOM_PHOTOS_COUNT);
    window.picture.renderPhotos(shuffled);
    toggleButtonActiveClass();
    evt.target.classList.add('img-filters__button--active');
  }

  function popularButtonClickHandler(evt) {
    clearPicturesContainer();
    window.picture.renderPhotos(window.photos);
    toggleButtonActiveClass();
    evt.target.classList.add('img-filters__button--active');
  }

  function discussedButtonClickHandler(evt) {
    clearPicturesContainer();
    var sorted = window.photos.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    window.picture.renderPhotos(sorted);
    toggleButtonActiveClass();
    evt.target.classList.add('img-filters__button--active');
  }

  random.addEventListener('click', randomButtonClickHandler);
  popular.addEventListener('click', popularButtonClickHandler);
  discussed.addEventListener('click', discussedButtonClickHandler);
})();
