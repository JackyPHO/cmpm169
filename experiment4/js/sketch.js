// sketch.js - purpose and description here
// Author: Jacky Ho
// Date: February 4, 2025

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// Globals
let img;

function preload() {
  img = loadImage('puppy.jpg');
}

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts

function setup() {
  if (!img) {
    console.error("Image not loaded yet.");
    return;
  }

  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(img.width, img.height);
  canvas.parent("canvas-container");

  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function () {
    resizeScreen();
  });

  resizeScreen();
  noLoop();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  //Imitate: https://dev.to/andyhaskell/convert-images-to-mosaics-in-p5js-2dlc
  drawMosaic(3, color(30, 30, 30)); 
}

const columnWidth = (dotRadius) => dotRadius * 3;

const numberOfColumns = (dotRadius) =>
  Math.ceil(width / columnWidth(dotRadius));

function drawMosaic(dotRadius, backgroundColor) {
  background(backgroundColor);
  for (let i = 0; i < numberOfColumns(dotRadius); i++) {
    offsetX = i * columnWidth(dotRadius);
    drawColumnDots(dotRadius, offsetX);
  }
}

function drawColumnDots(dotRadius, offsetX) {
  // [TODO] Replace the line with a column of dots

  let dotDiameter = dotRadius * 2;
  let dotHeightWithPadding = dotDiameter + 2;
  let numDotsInColumn = Math.floor(height / dotHeightWithPadding);

  for (let i = 0; i < numDotsInColumn; i++) {
    let centerX = Math.floor(random(
      offsetX + dotRadius,
      offsetX + columnWidth(dotRadius) - dotRadius,
    ))

    let centerY = i * dotHeightWithPadding + dotRadius;
    let dotColor = img.get(centerX, centerY);
    noStroke()
    fill(dotColor);

    ellipse(centerX, centerY, dotDiameter, dotDiameter);
  }
}


function mouseClicked(){
}