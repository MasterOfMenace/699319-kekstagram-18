'use strict';

window.util = (function () {
  var DEBOUNCE_INTERVAL = 500;
  var KEY_CODE = {
    ESC: 27,
    ENTER: 13,
  };

  function showElement(element) {
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
    } else if (element.classList.contains('visually-hidden')) {
      element.classList.remove('visually-hidden');
    }
  }

  function hideElement(element, style) {
    element.classList.add(style);
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

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

  window.debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === KEY_CODE.ESC) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === KEY_CODE.ENTER) {
        action(evt);
      }
    },
    showElement: showElement,
    hideElement: hideElement,
    getRandomNumber: getRandomNumber,
    shuffleArray: shuffleArray,
  };
})();
