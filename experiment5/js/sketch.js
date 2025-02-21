// sketch.js - purpose and description here
// Author: Jacky Ho
// Date: February 10, 2025

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// Globals
let gravityX, gravityY;
let donutColor;
let isFalling;
let isPlain;
let isStrawberry;
let isChocolate;
let plainCount = 0;
let strawberryCount = 0;
let chocolateCount = 0;
let shapes;
let shapeIndex = 0; // Current shape to draw

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
  canvas.parent("canvas-container");
  donutColor = color(213, 160, 107);
  isFalling = false;
  isPlain = true;
  textSize(32); // Set the font size
  textAlign(CENTER, CENTER); // Center the text
  // Store shape-drawing functions in an array from ChatGPT
  shapes = [
    () => torus(50, 15),   // Torus with radius 50 and thickness 15
    () => ellipsoid(50, 50, 20), // Ellipsoid with different radii
    () => sphere(25)       // Sphere with radius 50
  ];
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(250);

  push();
  fill(0, 0, 0);
  translate(mouseX - width/2, 0 - height/2, 0);;
  cylinder(70, 70);
  pop();

  //Donuts to drop
  push();
  translate(gravityX, gravityY, 0);
  if (gravityY <= (height/2 + 100) && isFalling) {
    gravityY += 20;
  }
  if(gravityY > (height/2 + 100)){
    isFalling = false;
  }
  rotateX(45);
  noStroke();
  fill(donutColor);
  translate(0, -5, 0); 
  shapes[shapeIndex]();
  pop();

  //Donut Box
  push();
  fill(255, 178, 200);
  translate(width/2 - width/2, height/2 - 50, 0);
  box(200, 200);
  pop();

  // Check for collision ensuring that donuts go inside the box from ChatGPT
  if (checkCollision(gravityX, gravityY, width/2 - width/2, height/2 - 50, 200)) {
    gravityY = 5000;
    if(isPlain){
      //Edit innerHTML text for each donut count from https://www.w3schools.com/Js/js_htmldom_html.asp 
      plainCount++;
      document.getElementById("p1").innerHTML = `Plain Donut Count: ${plainCount}`;
    }
    if(isStrawberry){
      strawberryCount++;
      document.getElementById("p2").innerHTML = `Strawberry Donut Count: ${strawberryCount}`;
    }
    if(isChocolate){
      chocolateCount++;
      document.getElementById("p3").innerHTML = `Chocolate Donut Count: ${chocolateCount}`;
    }
  }
}

function mouseClicked(){
  if(!isFalling){
    gravityX = mouseX - width/2;
    gravityY = 0 - height/2;
    isFalling = true;
    shapeIndex = (shapeIndex + 1) % shapes.length;
  }
}
//Handles key input for switch different flavors
function keyPressed() {
  if (key === '1') {
    donutColor = color(213, 160, 107);
    isPlain = true;
    isStrawberry = false;
    isChocolate = false;
  }
  if (key === '2') {
    donutColor = color(245, 103, 155);
    isPlain = false;
    isStrawberry = true;
    isChocolate = false;
  }
  if (key === '3') {
    donutColor = color(85, 48, 11);
    isPlain = false;
    isStrawberry = false;
    isChocolate = true;
  }
}

//Collision event function from ChatGPT
function checkCollision(donutX, donutY, boxX, boxY, boxSize) {
  let halfBox = boxSize / 2;
  return (
    donutX > boxX - halfBox && donutX < boxX + halfBox &&
    donutY > boxY - halfBox && donutY < boxY + halfBox
  );
}
