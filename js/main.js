'use strict';

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

var KEY_CODE = {
  ESC: 27,
  ENTER: 13,
};

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

// function showElement(element) {
//   document.querySelector(element).classList.remove('hidden');
// } скрыл чтобы не ругался линтер, эту функцию испольлзую для открытия элемента .big-picture

function visuallyHideElement(element) {
  document.querySelector(element).classList.add('visually-hidden');
}

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

// showElement('.big-picture');

var bigImg = document.querySelector('.big-picture__img').getElementsByTagName('img')[0];
var likesCount = document.querySelector('.likes-count');
var commentsCount = document.querySelector('.comments-count');
var photoDescription = document.querySelector('.social__caption');

renderBigPhoto(photos[0]);

var commentsList = document.querySelector('.social__comments');

renderComments(photos[0]);

visuallyHideElement('.social__comment-count');
visuallyHideElement('.comments-loader');

// 4 раздел обработчики

var EFFECTS = {
  'chrome': 'effects__preview--chrome',
  'sepia': 'effects__preview--sepia',
  'marvin': 'effects__preview--marvin',
  'phobos': 'effects__preview--phobos',
  'heat': 'effects__preview--heat',
};

var uploadFile = document.querySelector('#upload-file');
var uploadImgEditForm = document.querySelector('.img-upload__overlay');
var uploadCancelButton = document.querySelector('#upload-cancel');
var imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
var effectNone = document.querySelector('#effect-none');
var effectChrome = document.querySelector('#effect-chrome');
var effectSepia = document.querySelector('#effect-sepia');
var effectMarvin = document.querySelector('#effect-marvin');
var effectPhobos = document.querySelector('#effect-phobos');
var effectHeat = document.querySelector('#effect-heat');
var effectLevel = document.querySelector('.effect-level');

function changeEffect(evt) {
  var currentEffect = imgPreview.classList;
  var newEffect;
  if (evt.target.value === currentEffect) {
    return;
  }

  newEffect = EFFECTS[evt.target.value];
  imgPreview.classList = '';
  imgPreview.classList.add(newEffect);
}

function resetEffect() {
  imgPreview.classList = '';
}

function openEditForm() {
  uploadImgEditForm.classList.remove('hidden');
  document.addEventListener('keydown', formEscPressHandler);
}

function closeEditForm() {
  uploadImgEditForm.classList.add('hidden');
  document.removeEventListener('keydown', formEscPressHandler);
  uploadFile.value = '';
}

function formEscPressHandler(evt) {
  if (evt.keyCode === KEY_CODE.ESC) {
    closeEditForm();
  }
}

uploadFile.addEventListener('change', function () {
  openEditForm();
});

uploadCancelButton.addEventListener('click', function () {
  closeEditForm();
});

effectNone.addEventListener('click', function () {
  resetEffect();
  effectLevel.classList.add('hidden');
});

effectChrome.addEventListener('click', function (evt) {
  changeEffect(evt);
  effectLevel.classList.remove('hidden');
});

effectSepia.addEventListener('click', function (evt) {
  changeEffect(evt);
  effectLevel.classList.remove('hidden');
});

effectMarvin.addEventListener('click', function (evt) {
  changeEffect(evt);
  effectLevel.classList.remove('hidden');
});

effectPhobos.addEventListener('click', function (evt) {
  changeEffect(evt);
  effectLevel.classList.remove('hidden');
});

effectHeat.addEventListener('click', function (evt) {
  changeEffect(evt);
  effectLevel.classList.remove('hidden');
});

// масштабирование картинки

var SCALE_OPTIONS = {
  MIN_SCALE: 25,
  MAX_SCALE: 100,
  SCALE_STEP: 25,
};

var scaleConrol = document.querySelectorAll('.scale__control');
var smaller = scaleConrol[0];
var scaleValue = scaleConrol[1];
var bigger = scaleConrol[2];

bigger.addEventListener('click', biggerScale);

smaller.addEventListener('click', smallerScale);

function biggerScale() {
  var currentScale = Number(scaleValue.value.slice(0, -1));
  var step = SCALE_OPTIONS.SCALE_STEP;
  currentScale = currentScale + step;
  if (currentScale <= SCALE_OPTIONS.MAX_SCALE) {
    scaleValue.value = currentScale + '%';
    imgPreview.style = 'transform: scale' + '(' + currentScale / 100 + ')';
  }
}

function smallerScale() {
  var currentScale = Number(scaleValue.value.slice(0, -1));
  var step = SCALE_OPTIONS.SCALE_STEP;
  currentScale = currentScale - step;
  if (currentScale >= SCALE_OPTIONS.MIN_SCALE) {
    scaleValue.value = currentScale + '%';
    imgPreview.style = 'transform: scale' + '(' + currentScale / 100 + ')';
  }
}

// валидация хэштегов

var HASHTAGS_OPTIONS = {
  MAX_QAUNTITY: 5,
  MAX_LENGTH: 20,
};

var hashtagsInput = document.querySelector('.text__hashtags');
hashtagsInput.addEventListener('change', validationHashtags);
hashtagsInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', formEscPressHandler);
});
hashtagsInput.addEventListener('blur', function () {
  document.addEventListener('keydown', formEscPressHandler);
});

function validationHashtags() {
  var hashtags = hashtagsInput.value.split(' ').map(function (elem) {
    return elem.toLowerCase();
  });

  for (var i = 0; i < hashtags.length; i++) {
    var firstToken = hashtags[i][0];
    var inkr = i + 1;
    if (firstToken !== '#') {
      hashtagsInput.setCustomValidity('Хэштег должен начинаться с #');
    } else if (firstToken === '#' && hashtags[i].length === 1) {
      hashtagsInput.setCustomValidity('Хэштег не может состоять из одной решетки');
    } else if (hashtags[i].length > HASHTAGS_OPTIONS.MAX_LENGTH) {
      hashtagsInput.setCustomValidity('Хэштег не иожет быть длиннее 20 символов, включая решетку');
    } else if (hashtags.length > HASHTAGS_OPTIONS.MAX_QAUNTITY) {
      hashtagsInput.setCustomValidity('не более 5 хэштегов');
    } else if (hashtags.indexOf(hashtags[i], inkr) !== -1) {
      hashtagsInput.setCustomValidity('Хэштеги не могут повторяться');
      break; // если не выйти из цикла, то при проходе до конца скидывается setCustomValidity
    } else if (hashtags[i].indexOf('#', 1) !== -1) {
      hashtagsInput.setCustomValidity('Хэштеги должны разделяться пробелом');
      break; // если не выйти из цикла, то при проходе до конца скидывается setCustomValidity
    } else {
      hashtagsInput.setCustomValidity('');
    }
  }
}

// обработчики на textarea с комментариями

var commentsInput = document.querySelector('.text__description');
commentsInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', formEscPressHandler);
});
commentsInput.addEventListener('blur', function () {
  document.addEventListener('keydown', formEscPressHandler);
});
