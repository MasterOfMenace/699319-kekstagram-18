'use strict';

(function () {
  var EFFECTS = {
    'chrome': 'effects__preview--chrome',
    'sepia': 'effects__preview--sepia',
    'marvin': 'effects__preview--marvin',
    'phobos': 'effects__preview--phobos',
    'heat': 'effects__preview--heat',
  };

  var SCALE_OPTIONS = {
    MIN_SCALE: 25,
    MAX_SCALE: 100,
    SCALE_STEP: 25,
  };

  var HASHTAGS_OPTIONS = {
    MAX_QAUNTITY: 5,
    MAX_LENGTH: 20,
  };

  var form = document.querySelector('.img-upload__form');
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

  function resetForm() {
    resetEffect();
    commentsInput.value = '';
    hashtagsInput.value = '';
    uploadFile.value = '';
  }

  function openEditForm() {
    uploadImgEditForm.classList.remove('hidden');
    document.addEventListener('keydown', formEscPressHandler);
  }

  function closeEditForm() {
    uploadImgEditForm.classList.add('hidden');
    document.removeEventListener('keydown', formEscPressHandler);
    resetForm();
  }

  function formEscPressHandler(evt) {
    window.util.isEscEvent(evt, closeEditForm);
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
    }).filter(function (elem) {
      return elem !== '';
    });
    hashtagsInput.value = hashtags.join(' ');

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

  // отправка формы

  function renderMessage(id, message) {
    var style = id.replace('#', '.');
    var template = document.querySelector(id).content.querySelector(style);
    var node = template.cloneNode(true);
    var main = document.querySelector('main');
    var button = node.querySelector(style + '__button');

    function messageEscPressHandler(evt) {
      window.util.isEscEvent(evt, removeMessage);
    }

    function removeMessage() {
      main.removeChild(node);
      document.removeEventListener('keydown', messageEscPressHandler);
    }

    button.addEventListener('click', removeMessage);
    document.addEventListener('keydown', messageEscPressHandler);
    node.addEventListener('click', function (evt) {
      if (evt.target === node) {
        removeMessage();
      }
    });

    if (message) {
      var nodeInner = node.querySelector(style + '__inner');
      var p = document.createElement('p');
      p.textContent = message;
      nodeInner.appendChild(p);
    }
    main.appendChild(node);
  }

  function onSuccess() {
    closeEditForm();
    renderMessage('#success');
  }

  function onError(message) {
    closeEditForm();
    renderMessage('#error', message);
  }

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.upload('https://js.dump.academy/kekstagram', new FormData(form), onSuccess, onError);
  });
})();
