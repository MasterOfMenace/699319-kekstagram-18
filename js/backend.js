'use strict';

window.backend = (function () {
  var XHR_SUCCESS_STATUS = 200;

  function load(onSucess, onError) {
    var URL = 'https://js.dump.academy/kekstagram/data';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_SUCCESS_STATUS) {
        onSucess(xhr.response);
      } else {
        onError('Статус ответа ' + xhr.status + xhr.statusText);
      }
    });
    xhr.send();
  }

  return {
    load: load,
  };
})();
