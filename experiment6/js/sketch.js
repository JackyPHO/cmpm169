// sketch.js - purpose and description here
// Author: Jacky Ho
// Date: February 20, 2025

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// Globals
let myFont;
let offset = 0.0;
let blockWall;
let txt;
let texts = ["Welcome to the Neon Sign", "Let's get started", "Add your custom text"]
let textIndex = 0;
let button, redButton, greenButton, blueButton;
let r,g,b;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

// Define variables
function preload() {
  myFont = loadFont('ShadeBlue-2OozX.ttf');
  blockWall = loadImage('black-fabric-texture-background-vector.jpg');
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  rectMode(CENTER/2);
  textAlign(CENTER/2);
  
  noFill();
  stroke('white');
  strokeWeight(3);  
  textFont(myFont);
  textSize(108);

  
  pixelDensity(2); // eliminate jaggies
  frameRate(24); // offet pixel density drag on processin

  //User text input from https://editor.p5js.org/Samizdat/sketches/eUsieMk6j 
  txt = createInput('');
  txt.size(500,50)
  txt.hide()
D
  button = createButton('Confirm');
  button.position(700, 570);
  button.size(100,50);
  button.hide()

  redButton = createButton('Red');
  redButton.position(600, 570);
  redButton.size(100,50);
  redButton.hide()

  greenButton = createButton('Green');
  greenButton.position(700, 570);
  greenButton.size(100,50);
  greenButton.hide()

  blueButton = createButton('Blue');
  blueButton.position(800, 570);
  blueButton.size(100,50);
  blueButton.hide()

  r = 255;
  g = 0;
  b = 0;
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  //Imitate: https://editor.p5js.org/magicsfirst/sketches/nFfUODa-B
  // https://editor.p5js.org/mt4610/sketches/3H7gCs93H
  image(blockWall, 0, 0);
  fill(r, g, b, sin(frameCount * 0.1) * 255); //fills the text and adds a flicker effect to it
  textNeon(color(r,g,b));
}

function textNeon(glowColor) {
  glow(glowColor, 500);
  text(texts[textIndex], width/6, height/2);
  text(texts[textIndex], width/6, height/2);
  glow(glowColor, 100);
  text(texts[textIndex], width/6, height/2);
  text(texts[textIndex], width/6, height/2);
  glow(glowColor, 0);
  text(texts[textIndex], width/6, height/2);
  text(texts[textIndex], width/6, height/2);
}

function glow(glowColor, blurriness) {
  drawingContext.shadowColor = glowColor;
  drawingContext.shadowBlur = blurriness;
}

function flickering() {
  offset += 0.08;
  let n = noise(offset);
  if (n < 0.30) return 0;
  else return 100;
}
function mouseClicked(){
  if(textIndex == 2){
    txt.show();
    txt.position(500,height/1.2);
    button.show();
    button.mousePressed(changeText)
  }
  if(textIndex < 2){
    textIndex++;
  }
}
function changeText(){
  let name = txt.value()
  if(name){
    append(texts, name);
    textIndex++;
    txt.hide()
    button.hide()
    redButton.show()
    blueButton.show()
    greenButton.show()
    redButton.mousePressed(redColor)
    blueButton.mousePressed(blueColor)
    greenButton.mousePressed(greenColor)
  }
}
function redColor(){
  r = 255;
  b = 0;
  g = 0;
}
function blueColor(){
  r = 0;
  b = 255;
  g = 0;
}
function greenColor(){
  r = 0;
  b = 0;
  g = 255;
}