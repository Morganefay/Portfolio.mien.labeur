"use strict";

$(document).ready(function () {
  setTimeout(function () {
    $("#name").removeClass("larger");
    $("#name span").each(function () {
      $(this).css("-webkit-transition-delay", $(this).data("delay") + "ms").css("transition-delay", $(this).data("delay") + "ms");
      $(this).addClass("visible");
    });
  }, 1000);
});