'use strict';

window.data = (function () {
  var MOCK_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  var MOCK_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

  var MOCK_DESCRIPTIONS_FIRST = ['Иван Васильевич', 'Моя бабушка', 'Виктор Цой', 'Братишка', 'Юрий Лоза'];

  var MOCK_DESCRIPTIONS_SECOND = ['меняет', 'курит', 'поджигает', 'принес', 'критикует'];

  var MOCK_DESCRIPTIONS_THIRD = ['профессию', 'трубку', 'Икарус', 'покушать', 'плот'];

  // var COMMENTS = {
  //   MIN: 1,
  //   MAX: 3,
  // };

  // var AVATARS = {
  //   MIN: 1,
  //   MAX: 6,
  // };

  // var LIKES = {
  //   MIN: 15,
  //   MAX: 200,
  // };

  // var PHOTOS_COUNT = 25;

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
    photo.description = MOCK_DESCRIPTIONS_FIRST[window.util.getRandomNumber(0, MOCK_DESCRIPTIONS_FIRST.length - 1)] + ' ' + MOCK_DESCRIPTIONS_SECOND[window.util.getRandomNumber(0, MOCK_DESCRIPTIONS_SECOND.length - 1)] + ' ' + MOCK_DESCRIPTIONS_THIRD[window.util.getRandomNumber(0, MOCK_DESCRIPTIONS_THIRD.length - 1)];
    photo.likes = window.util.getRandomNumber(window.rules.LIKES.MIN, window.rules.LIKES.MAX);
    photo.comments = createArray(window.util.getRandomNumber(window.rules.COMMENTS.MIN, window.rules.COMMENTS.MAX), createComment);
    return photo;
  }

  // создает комментарий
  function createComment() {
    var comment = {};
    comment.avatar = 'img/avatar-' + window.util.getRandomNumber(window.rules.AVATARS.MIN, window.rules.AVATARS.MAX) + '.svg';
    comment.message = MOCK_COMMENTS[window.util.getRandomNumber(0, MOCK_COMMENTS.length - 1)];
    comment.name = MOCK_NAMES[window.util.getRandomNumber(0, MOCK_NAMES.length - 1)];
    return comment;
  }

  var photos = createArray(window.rules.PHOTOS_COUNT, createPhoto);

  return {
    photos: photos,
  };
})();
