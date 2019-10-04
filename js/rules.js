'use strict';

window.rules = (function () {
  var COMMENTS_COUNT = {
    MIN: 1,
    MAX: 3,
  };

  var AVATARS_COUNT = {
    MIN: 1,
    MAX: 6,
  };

  var LIKES_COUNT = {
    MIN: 15,
    MAX: 200,
  };

  var PHOTOS_COUNT = 25;

  return {
    COMMENTS: COMMENTS_COUNT,
    AVATARS: AVATARS_COUNT,
    LIKES: LIKES_COUNT,
    PHOTOS_COUNT: PHOTOS_COUNT,
  };
})();
