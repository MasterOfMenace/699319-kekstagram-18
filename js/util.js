'use strict';

window.util = (function () {
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

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === KEY_CODE.ESC) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === KEY_CODE.ENTER) {
        action();
      }
    },
    showElement: showElement,
    hideElement: hideElement
  };
})();
