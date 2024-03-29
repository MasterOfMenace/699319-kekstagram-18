'use strict';

window.preview = (function () {
  var DEFAULT_RENDERED_COMMENTS_COUNT = 5;
  var preview = document.querySelector('.big-picture');
  var bigImg = preview.querySelector('.big-picture__img').getElementsByTagName('img')[0];
  var likesCount = document.querySelector('.likes-count');
  var commentsCountElement = document.querySelector('.comments-count');
  var photoDescription = document.querySelector('.social__caption');
  var commentsList = document.querySelector('.social__comments');
  var previewCloseButton = document.querySelector('#picture-cancel');

  var commentsLoadButton = document.querySelector('.comments-loader');
  var currentPhoto;
  var commentsCount = document.querySelectorAll('.social__comment').length;

  function closePreview() {
    window.util.hideElement(preview, 'hidden');
    document.removeEventListener('keydown', previewEscPressHandler);
    commentsList.innerHTML = '';
    window.util.showElement(commentsLoadButton);
    commentsCount = 0;
  }

  function previewEscPressHandler(evt) {
    window.util.isEscEvent(evt, closePreview);
  }

  function renderBigPhoto(photo) {
    currentPhoto = photo;
    bigImg.src = photo.url;
    likesCount.textContent = photo.likes;
    commentsCountElement.textContent = photo.comments.length;
    photoDescription.textContent = photo.description;
    window.util.showElement(preview);
    document.addEventListener('keydown', previewEscPressHandler);
  }

  function createComment() {
    var fragment = document.createDocumentFragment();
    var commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    var commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.width = 35;
    commentAvatar.height = 35;
    var commentText = document.createElement('p');
    commentText.classList.add('social__text');

    commentElement.appendChild(commentAvatar);
    commentElement.appendChild(commentText);
    fragment.appendChild(commentElement);
    return fragment;
  }

  function renderComments(photo, startCount, endCount) {
    var fragment = document.createDocumentFragment();
    var commentsRendered = preview.querySelector('.comments__count--render');

    for (var i = startCount; i < endCount; i++) {
      if (i <= photo.comments.length - 1) {
        var comment = createComment();
        comment.querySelector('.social__picture').src = photo.comments[i].avatar;
        comment.querySelector('.social__picture').alt = photo.comments[i].name;
        comment.querySelector('.social__text').textContent = photo.comments[i].message;
        fragment.appendChild(comment);

        commentsRendered.textContent = i + 1;
        commentsCount = commentsCount + 1;

        if (i >= photo.comments.length - 1) {
          window.util.hideElement(commentsLoadButton, 'visually-hidden');
        }
      }
    }
    commentsList.appendChild(fragment);
  }


  commentsLoadButton.addEventListener('click', function () {
    var endCount = commentsCount + DEFAULT_RENDERED_COMMENTS_COUNT;
    renderComments(currentPhoto, commentsCount, endCount);
  });

  previewCloseButton.addEventListener('click', closePreview);

  return {
    renderBigPhoto: renderBigPhoto,
    renderComments: renderComments,
    defaultRenderedCommentsCount: DEFAULT_RENDERED_COMMENTS_COUNT,
  };
})();
