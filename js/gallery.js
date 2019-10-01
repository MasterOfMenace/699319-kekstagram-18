'use strict';

(function () {
  var MOCK_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  var MOCK_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

  var MOCK_DESCRIPTIONS_FIRST = ['Иван Васильевич', 'Моя бабушка', 'Виктор Цой', 'Братишка', 'Юрий Лоза'];

  var MOCK_DESCRIPTIONS_SECOND = ['меняет', 'курит', 'поджигает', 'принес', 'критикует'];

  var MOCK_DESCRIPTIONS_THIRD = ['профессию', 'трубку', 'Икарус', 'покушать', 'плот'];

  var COMMENTS = {
    MIN: 1,
    MAX: 3,
  };

  var AVATARS = {
    MIN: 1,
    MAX: 6,
  };

  var LIKES = {
    MIN: 15,
    MAX: 200,
  };

  var PHOTOS_COUNT = 25;

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function createArray(number, func) {
    var array = [];
    for (var i = 1; i <= number; i++) {
      var object = func(i);
      array.push(object);
    }
    return array;
  }

  function createPhoto(i) {
    var photo = {};
    photo.url = 'photos/' + i + '.jpg';
    photo.description = MOCK_DESCRIPTIONS_FIRST[getRandomNumber(0, MOCK_DESCRIPTIONS_FIRST.length - 1)] + ' ' + MOCK_DESCRIPTIONS_SECOND[getRandomNumber(0, MOCK_DESCRIPTIONS_SECOND.length - 1)] + ' ' + MOCK_DESCRIPTIONS_THIRD[getRandomNumber(0, MOCK_DESCRIPTIONS_THIRD.length - 1)];
    photo.likes = getRandomNumber(LIKES.MIN, LIKES.MAX);
    photo.comments = createArray(getRandomNumber(COMMENTS.MIN, COMMENTS.MAX), createComment);
    return photo;
  }

  function createComment() {
    var comment = {};
    comment.avatar = 'img/avatar-' + getRandomNumber(AVATARS.MIN, AVATARS.MAX) + '.svg';
    comment.message = MOCK_COMMENTS[getRandomNumber(0, MOCK_COMMENTS.length - 1)];
    comment.name = MOCK_NAMES[getRandomNumber(0, MOCK_NAMES.length - 1)];
    return comment;
  }

  function createPhotoElement(photo) {
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

  var photos = createArray(PHOTOS_COUNT, createPhoto);

  var template = document.querySelector('#picture').content.querySelector('.picture');

  var photosContainer = document.querySelector('.pictures');

  renderPhotos(photos);

  // просмотр изображений

  function renderBigPhoto(photo) {
    bigImg.src = photo.url;
    likesCount.textContent = photo.likes;
    commentsCount.textContent = photo.comments.length;
    photoDescription.textContent = photo.description;
  }

  function createCommentsElement(photo) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photo.comments.length; i++) {
      var commentsElement = document.querySelector('.social__comment').cloneNode(true);
      var commentAvatar = commentsElement.querySelector('.social__picture');
      var commentText = commentsElement.querySelector('.social__text');
      commentAvatar.src = photo.comments[i].avatar;
      commentAvatar.alt = photo.comments[i].name;
      commentText.textContent = photo.comments[i].message;
      fragment.appendChild(commentsElement);
    }
    return fragment;
  }

  function renderComments(photo) {
    var fragment = createCommentsElement(photo);
    commentsList.innerHTML = '';
    commentsList.appendChild(fragment);
  }

  // window.util.showElement('.big-picture');

  var bigImg = document.querySelector('.big-picture__img').getElementsByTagName('img')[0];
  var likesCount = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');
  var photoDescription = document.querySelector('.social__caption');

  renderBigPhoto(photos[0]);

  var commentsList = document.querySelector('.social__comments');

  renderComments(photos[0]);

  window.util.hideElement('.social__comment-count', 'visually-hidden');
  window.util.hideElement('.comments-loader', 'visually-hidden');
})();
