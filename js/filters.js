'use strict';

(function () {
  var RANDOM_PHOTOS_COUNT = 10;
  var photosContainer = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');
  var popular = filters.querySelector('#filter-popular');
  var random = filters.querySelector('#filter-random');
  var discussed = filters.querySelector('#filter-discussed');

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

  function filterPictures(evt, data) {
    clearPicturesContainer();
    window.picture.renderPhotos(data);
    removeButtonActiveClass();
    evt.target.classList.add('img-filters__button--active');
  }

  function randomButtonClickHandler(evt) {
    var shuffled = window.util.shuffleArray(window.photos.slice(), RANDOM_PHOTOS_COUNT);
    window.photos = shuffled;
    filterPictures(evt, shuffled);
  }

  function popularButtonClickHandler(evt) {
    window.photos = window.photosData;
    filterPictures(evt, window.photos);
  }

  function discussedButtonClickHandler(evt) {
    var sorted = window.photos.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    window.photos = sorted;
    filterPictures(evt, sorted);
  }

  var randomButtonClickHandlerWithDebounce = window.debounce(randomButtonClickHandler);

  var popularButtonClickHandlerWithDebounce = window.debounce(popularButtonClickHandler);

  var discussedButtonClickHandlerWithDebounce = window.debounce(discussedButtonClickHandler);

  filters.addEventListener('click', function (evt) {
    if (evt.target === random) {
      randomButtonClickHandlerWithDebounce(evt);
    }
    if (evt.target === popular) {
      popularButtonClickHandlerWithDebounce(evt);
    }
    if (evt.target === discussed) {
      discussedButtonClickHandlerWithDebounce(evt);
    }
  });
})();
