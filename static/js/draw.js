let canvas = document.querySelector("#canvas");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 100;
  drawLinesFromDB();
});



// a context object which provides fun for 2d drawing
let ctx = canvas.getContext("2d");

let linesDB = [];
let redoLinesDB = [];
let isPenDown = false;
let line = [];

canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);


function start(e) {
  if (redoLinesDB.length) {
    redoLinesDB = [];
  }

  isPenDown = true;
  let x = e.clientX;
  let y = e.clientY - 100;
  ctx.beginPath();
  ctx.moveTo(x, y);

  let pointObject = {
    x: x,
    y: y,
    type: "md",
    lineWidth: ctx.lineWidth,
    strokeStyle: ctx.strokeStyle,
  };
  line.push(pointObject);
};

function draw(e) {
  if (isPenDown) {
    let x = e.clientX;
    let y = e.clientY - 100;
    ctx.lineTo(x, y);
    ctx.stroke();

    let pointObject = {
      x: x,
      y: y,
      type: "mm",
    };
    line.push(pointObject);
  }
};


function stop(e) {
  isPenDown = false;

  linesDB.push(line);
  line = [];

};

