'use strict';

window.backend = (function () {
  var XHR_SUCCESS_STATUS = 200;

  function download(url, onSucess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', url);

    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_SUCCESS_STATUS) {
        onSucess(xhr.response);
      } else {
        onError('Статус ответа ' + xhr.status + xhr.statusText);
      }
    });
    xhr.send();
  }

  function upload(url, data, onSucess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('POST', url);

    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_SUCCESS_STATUS) {
        onSucess(xhr.response);
      } else {
        onError('Статус ответа ' + xhr.status + xhr.statusText);
      }
    });
    xhr.send(data);
  }

  return {
    download: download,
    upload: upload,
  };
})();
