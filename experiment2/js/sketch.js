// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;
var tileCount = 20;
var actRandomSeed = 0;

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
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  strokeCap(SQUARE);
  colorMode(HSB, 360, 75, 25);
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  
}

// Imitate: draw() function from http://www.generative-gestaltung.de/2/sketches/?01_P/P_2_0_01
function draw() {
  //Integrate: color changing properties from http://www.generative-gestaltung.de/2/sketches/?01_P/P_1_0_01 
  background(0);
  randomSeed(actRandomSeed);
  stroke(mouseY / 2, 75, 25);
  strokeWeight(mouseY / 500);

  //Innovate: transforming grid circles from http://www.generative-gestaltung.de/2/sketches/?01_P/P_2_1_2_01
  let spacing = width / (tileCount + 1); // Distance between shapes
  
  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {

      var posX = width / tileCount * gridX;
      var posY = height / tileCount * gridY;
      var shiftX = random(-mouseX, mouseX) / 20;
      var shiftY = random(-mouseX, mouseX) / 20;

      //Multiple instances of the shape from ChatGPT
      push(); 
      translate(posX + shiftX, posY + shiftY);

      // Draw the shape
      let circleResolution = int(map(mouseY, 0, height, 2, 50));
      let radius = spacing / 2; // Adjust radius to fit within grid spacing
      let angle = TAU / circleResolution;

      for (let i = 0; i <= circleResolution; i++) {
        let x = cos(angle * i) * radius;
        let y = sin(angle * i) * radius;
        line(0, 0, x, y);
      }

      pop();
    }
  }
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  actRandomSeed = random(100000);
}