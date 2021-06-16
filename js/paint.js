const canvas = document.querySelector('#draw');
const btnOne = document.querySelector("#btnOne");
const btnTwo = document.querySelector("#btnTwo");
const btnThree = document.querySelector("#btnThree");
const ctx = canvas.getContext('2d');
// canvas.width = window.innerWidth;
// canvas.heigth = window.innerHeight;
ctx.strokeStyle = "#BADA55";
ctx.lineJoin ="round";
ctx.lineCap = "round";
ctx.lineWidth = 100;
//ctx.globalCompositeOperation = 'difference'

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  if(!isDrawing) return; //stop the function from running when they are not moused down
  //console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 100% , 50%`;
  ctx.beginPath();
  //start from
  ctx.moveTo(lastX,lastY);
  //go to
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] =[e.offsetX, e.offsetY];
  hue++;

  //change the color
  if(hue >= 360){
    hue = 0;  
  }

  //change the width
  if(ctx.lineWidth >= 100 || ctx.lineWidth <= 10){
    direction = !direction;
  }

  direction ? ctx.lineWidth++ : ctx.lineWidth-- ;
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing  = true;
  [lastX, lastY] =[e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

btnOne.addEventListener('click', () => {
    ctx.globalCompositeOperation = 'difference';
})

btnTwo.addEventListener('click' , () => {
    ctx.globalCompositeOperation = 'source-over';
})

btnThree.addEventListener('click' , () => {
    ctx.globalCompositeOperation = 'destination-out';
})