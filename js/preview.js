'use strict';

window.preview = (function () {
  var preview = document.querySelector('.big-picture');
  var bigImg = preview.querySelector('.big-picture__img').getElementsByTagName('img')[0];
  var likesCount = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');
  var photoDescription = document.querySelector('.social__caption');
  var commentsList = document.querySelector('.social__comments');

  function closePreview() {
    window.util.hideElement('.big-picture', 'hidden');
    document.removeEventListener('keydown', previewEscPressHandler);
  }

  function previewEscPressHandler(evt) {
    window.util.isEscEvent(evt, closePreview);
  }

  function renderBigPhoto(photo) {
    bigImg.src = photo.url;
    likesCount.textContent = photo.likes;
    commentsCount.textContent = photo.comments.length;
    photoDescription.textContent = photo.description;
    window.util.showElement('.big-picture');
    document.addEventListener('keydown', previewEscPressHandler);
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

  return {
    renderBigPhoto: renderBigPhoto,
    renderComments: renderComments,
  };
})();
