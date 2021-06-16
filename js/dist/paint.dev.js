"use strict";

var canvas = document.querySelector('#draw');
var btnOne = document.querySelector("#btnOne");
var btnTwo = document.querySelector("#btnTwo");
var btnThree = document.querySelector("#btnThree");
var ctx = canvas.getContext('2d'); // canvas.width = window.innerWidth;
// canvas.heigth = window.innerHeight;

ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 100; //ctx.globalCompositeOperation = 'difference'

var isDrawing = false;
var lastX = 0;
var lastY = 0;
var hue = 0;
var direction = true;

function draw(e) {
  if (!isDrawing) return; //stop the function from running when they are not moused down
  //console.log(e);

  ctx.strokeStyle = "hsl(".concat(hue, ", 100% , 50%");
  ctx.beginPath(); //start from

  ctx.moveTo(lastX, lastY); //go to

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  var _ref = [e.offsetX, e.offsetY];
  lastX = _ref[0];
  lastY = _ref[1];
  hue++; //change the color

  if (hue >= 360) {
    hue = 0;
  } //change the width


  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 10) {
    direction = !direction;
  }

  direction ? ctx.lineWidth++ : ctx.lineWidth--;
}

canvas.addEventListener('mousedown', function (e) {
  isDrawing = true;
  var _ref2 = [e.offsetX, e.offsetY];
  lastX = _ref2[0];
  lastY = _ref2[1];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', function () {
  return isDrawing = false;
});
canvas.addEventListener('mouseout', function () {
  return isDrawing = false;
});
btnOne.addEventListener('click', function () {
  ctx.globalCompositeOperation = 'difference';
});
btnTwo.addEventListener('click', function () {
  ctx.globalCompositeOperation = 'source-over';
});
btnThree.addEventListener('click', function () {
  ctx.globalCompositeOperation = 'destination-out';
});