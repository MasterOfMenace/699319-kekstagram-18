'use strict';

var MOCK_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var MOCK_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var MOCK_DESCRIPTIONS_FIRST = ['Иван Васильевич', 'Моя бабушка', 'Виктор Цой', 'Братишка', 'Юрий Лоза'];

var MOCK_DESCRIPTIONS_SECOND = ['меняет', 'курит', 'поджигает', 'принес', 'критикует'];

var MOCK_DESCRIPTIONS_THIRD = ['профессию', 'трубку', 'Икарус', 'покушать', 'плот'];

var MIN_COMMENTS = 1;

var MAX_COMMENTS = 3;

var MIN_AVATARS = 1;

var MAX_AVATARS = 6;

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
  photo.likes = getRandomNumber(15, 200);
  photo.comments = createArray(getRandomNumber(MIN_COMMENTS, MAX_COMMENTS), createComment);
  return photo;
}

function createComment() {
  var comment = {};
  comment.avatar = 'img/avatar-' + getRandomNumber(MIN_AVATARS, MAX_AVATARS) + '.svg';
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

var photos = createArray(25, createPhoto);

var template = document.querySelector('#picture').content.querySelector('.picture');

var photosContainer = document.querySelector('.pictures');

renderPhotos(photos);
