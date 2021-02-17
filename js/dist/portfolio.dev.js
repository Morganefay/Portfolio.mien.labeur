"use strict";

var book = $('.bk-book');
var bookPage = book.children('div.bk-page');
var viewBookLink = book.find('.bk-bookview');
var viewBackLink = book.find('.bk-bookback');
var changeColorLink = book.find('.change-color');
var colorContainers = book.find('.color-container');

var bookDefault = function bookDefault() {
  book.data({
    opened: false,
    flip: false
  }).removeClass('bk-viewback bk-viewinside').addClass('bk-bookdefault');
};

var bookBack = function bookBack() {
  book.data({
    opened: false,
    flip: true
  }).removeClass('bk-viewinside bk-bookdefault').addClass('bk-viewback');
};

var bookInside = function bookInside() {
  book.data({
    opened: true,
    flip: false
  }).removeClass('bk-viewback bk-bookdefault').addClass('bk-viewinside');
};

bookDefault();
viewBackLink.on('click', function () {
  if (book.data('flip')) {
    bookDefault();
  } else {
    bookBack();
  }

  return false;
});
viewBookLink.on('click', function () {
  bookInside();
  return false;
}); //Detect click outside book

$('html').on('click', function (event) {
  if ($(event.target).parents('.bk-book').length == 0) {
    bookDefault();
    if (!colorContainers.hasClass('hidden')) changeColorLink.click();
  }

  return false;
}); //Change color

var colorLabel = function () {
  var labels = ['Change Color', '❤ this color'];
  return function () {
    labels.push(labels.shift());
    return labels[0];
  };
}();

changeColorLink.click(function () {
  colorContainers.toggleClass('hidden');
  $(this).text(colorLabel());
});
var css = $("<style type='text/css'></style>").appendTo('head');
colorContainers.find('.color-square').click(function () {
  var color = $(this).attr('class').match(/background-color-([a-f0-9]{6})/i)[1];
  css.text('.highlight { color: #' + color + '; }');
}); //Bookblock clone and setup

var bookBlock = $('.bb-bookblock');
var backCover = bookBlock.parents('.bk-book').find('.bk-cover-back');
var backCoverBookBlock = bookBlock.clone();
backCoverBookBlock.appendTo(backCover);

var bookBlockFirst = function bookBlockFirst() {
  bookBlock.bookblock('first');
  backCoverBookBlock.bookblock('first');
};

var bookBlockLast = function bookBlockLast() {
  bookBlock.bookblock('last');
  backCoverBookBlock.bookblock('last');
};

var bookBlockLastIndex = bookBlock.children().length - 1;

var bookBlockNext = function bookBlockNext() {
  if (book.data('flip')) return bookDefault();
  if (!book.data('opened')) return bookInside();
  if (bookBlock.find('.bb-item:visible').index() === bookBlockLastIndex) return bookBack() + bookBlockFirst();
  bookBlock.bookblock('next');
  backCoverBookBlock.bookblock('next');
};

var bookBlockPrev = function bookBlockPrev() {
  if (book.data('flip')) return bookBlockLast() + bookInside();
  if (!book.data('opened')) return bookBack();
  if (bookBlock.find('.bb-item:visible').index() === 0) return bookDefault();
  bookBlock.bookblock('prev');
  backCoverBookBlock.bookblock('prev');
};

bookBlock.children().add(backCoverBookBlock.children()).on({
  'swipeleft': function swipeleft(event) {
    bookBlockPrev();
    return false;
  },
  'swiperight': function swiperight(event) {
    bookBlockPrev();
    return false;
  },
  'click': function click(event) {
    if ($(event.target).parents('.bk-cover-back').length == 0) bookBlockNext();else bookBlockPrev();
    return false;
  }
});
bookBlock.bookblock({
  speed: 800,
  shadow: false
});
backCoverBookBlock.bookblock({
  speed: 800,
  shadow: false
});

var throttleFunc = function throttleFunc(func, limit, limitQueue) {
  var lastTime = +new Date();
  var queued = 0;
  return function throttledFunc() {
    var now = +new Date();
    var args = Array.prototype.slice.call(arguments);

    if (now - lastTime > limit) {
      func.apply(this, args);
      lastTime = +new Date();
    } else {
      var boundFunc = throttledFunc.bind.apply(throttledFunc, [this].concat(args));
      queued++;
      if (queued < limitQueue) window.setTimeout(boundFunc, lastTime + limit - now);
    }
  };
};

$(document).keydown(throttleFunc(function (e) {
  var keyCode = e.keyCode || e.which,
      arrow = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
  };

  switch (keyCode) {
    case arrow.left:
      bookBlockPrev();
      break;

    case arrow.right:
      bookBlockNext();
      break;
  }
}, 500, 2));