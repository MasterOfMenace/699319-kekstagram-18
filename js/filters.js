'use strict';

(function () {
  var RANDOM_PHOTOS_COUNT = 10;
  var photosContainer = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');
  var popular = filters.querySelector('#filter-popular');
  var random = filters.querySelector('#filter-random');
  var discussed = filters.querySelector('#filter-discussed');
  var timeout;
  var interval = 500;

  function debounce(callback) {
    if (timeout) {
      window.clearTimeout(timeout);
    }
    timeout = window.setTimeout(callback, interval);
  }

  function clearPicturesContainer() {
    var pictures = photosContainer.querySelectorAll('.picture');
    pictures.forEach(function (elem) {
      elem.remove();
    });
  }

  function removeButtonActiveClass() {
    var activeButton = document.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
  }

  function randomButtonClickHandler(evt) {
    debounce(function () {
      clearPicturesContainer();
      var shuffled = window.util.shuffleArray(window.photos.slice(), RANDOM_PHOTOS_COUNT);
      window.picture.renderPhotos(shuffled);
      removeButtonActiveClass();
      evt.target.classList.add('img-filters__button--active');
    });
  }

  function popularButtonClickHandler(evt) {
    debounce(function () {
      clearPicturesContainer();
      window.picture.renderPhotos(window.photos);
      removeButtonActiveClass();
      evt.target.classList.add('img-filters__button--active');
    });
  }

  function discussedButtonClickHandler(evt) {
    debounce(function () {
      clearPicturesContainer();
      var sorted = window.photos.slice().sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      window.picture.renderPhotos(sorted);
      removeButtonActiveClass();
      evt.target.classList.add('img-filters__button--active');
    });
  }

  random.addEventListener('click', randomButtonClickHandler);
  popular.addEventListener('click', popularButtonClickHandler);
  discussed.addEventListener('click', discussedButtonClickHandler);
})();
