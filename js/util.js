'use strict';

window.util = (function () {
  var DEBOUNCE_INTERVAL = 300;
  var KEY_CODE = {
    ESC: 27,
    ENTER: 13,
  };

  function showElement(element) {
    document.querySelector(element).classList.remove('hidden');
  }

  function hideElement(element, style) {
    document.querySelector(element).classList.add(style);
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
