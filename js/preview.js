'use strict';

window.preview = (function () {
  var preview = document.querySelector('.big-picture');
  var bigImg = preview.querySelector('.big-picture__img').getElementsByTagName('img')[0];
  var likesCount = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');
  var photoDescription = document.querySelector('.social__caption');
  var commentsList = document.querySelector('.social__comments');

  var commentsLoadButton = document.querySelector('.comments-loader');

  // commentsLoadButton.addEventListener('click', function(photo) {
  //   var commentsCount = preview.querySelectorAll('.social__comment');
  //   console.log(commentsCount);
  //   if (commentsCount < photo.comments.length) {
  //     loadComments();
  //   } else
  // })

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

  // function createCommentsElement(photo) {
  //   var fragment = document.createDocumentFragment();

  //   for (var i = 0; i < photo.comments.length; i++) {
  //     var commentsElement = document.querySelector('.social__comment').cloneNode(true);
  //     var commentAvatar = commentsElement.querySelector('.social__picture');
  //     var commentText = commentsElement.querySelector('.social__text');
  //     commentAvatar.src = photo.comments[i].avatar;
  //     commentAvatar.alt = photo.comments[i].name;
  //     commentText.textContent = photo.comments[i].message;
  //     fragment.appendChild(commentsElement);
  //   }
  //   return fragment;
  // }

  function createCommentsElement(photo) {
    var count = photo.comments.length > 5 ? 5 : photo.comments.length;

    var fragment = document.createDocumentFragment();
    // var comments = photo.comments.slice();
    // console.log(photo.comments);
    for (var i = 0; i < count; i++) {
      // debugger;
      var commentsElement = document.querySelector('.social__comment').cloneNode(true);
      var commentAvatar = commentsElement.querySelector('.social__picture');
      var commentText = commentsElement.querySelector('.social__text');
      commentAvatar.src = photo.comments[i].avatar;
      commentAvatar.alt = photo.comments[i].name;
      commentText.textContent = photo.comments[i].message;
      // photo.comments.splice(i, 1);
      // console.log(photo.comments);
      fragment.appendChild(commentsElement);
    }

    function loadComments() {
      // var commentsCount = preview.querySelectorAll('.social__comment');
      console.log(count);
      if (count < photo.comments.length) {
        // loadComments();
        console.log(true);
      } else {
        console.log(false);
      }
    }

    commentsLoadButton.addEventListener('click', loadComments);

    return fragment;
  }

  function renderComments(photo) {
    var fragment = createCommentsElement(photo);
    // var fragment = document.createDocumentFragment();
    // var photo
    // fragment.appendChild(createCommentsElement(photo));

    commentsList.innerHTML = '';
    commentsList.appendChild(fragment);
  }

  return {
    renderBigPhoto: renderBigPhoto,
    renderComments: renderComments,
  };
})();
