// sketch.js - purpose and description here
// Author: Jacky Ho
// Date: January 29, 2025

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;
const waveInterval = 1000;

// Globals
let yPos = 0.0;
let wave = {}; // A single wave object
let lastWaveTime = 0;
let cloudx = 0;
let cloudy = 100;
let bg;
let dayX = 0, nightX = 0;
let oceanColor;
let isDay = false, isNight = false;
let xInc = 0.05, yInc = 0.01;

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
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
  bg = color(128,226,255);
  oceanColor = color(20, 130, 255);
  isDay = true;
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(bg);

    //Innovate: Allow certain conditions based on day/night
    if(isDay){
      //Integrate: Creating a sun/moon using ellipse method https://p5js.org/reference/p5/ellipse/
      fill(color(235,252,87));
      ellipse(dayX, 100, 100, 100);
      //Imitate: Cloud Animation from https://editor.p5js.org/mena-landry/sketches/D7ql4Nd3V
      makeCloud(cloudx - 50, cloudy + 50);
      makeCloud(cloudx - 400, cloudy + 100);
      makeCloud(cloudx - 800, cloudy + 25);
      cloudx+=1;
      if(cloudx == 4000){
        cloudx = 0;
      }
    }
    if(isNight){
      makeStars();
      cloudx = 0;
      fill(color(128,128,128));
      ellipse(nightX, 100, 100, 100);
    }

  let xPos = 0;
  fill(oceanColor);

  noStroke();
  beginShape();

  // Imitate: Ocean Wave Animation from https://editor.p5js.org/Ghalia/sketches/0w48Z27JTf
  for (let x = 0; x <= width; x += 10) {
    let y = map(noise(xPos, yPos), 0, 1, 350, 550);
    vertex(x, y);
    xPos += xInc;
  }

  yPos += yInc;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  // Wave Movements from ChatGPT
  if (millis() - lastWaveTime > waveInterval) {
    wave = {
      x: random(0, 650), // Start at a random position
      maxAmplitude: random(20,100), // Vary amplitude
      width: random(0, 150), // Vary width
      speed: random(1, 10), // Vary speed
      startTime: millis(),
      growDuration: 500, // 0.5 seconds to peak
    };
    lastWaveTime = millis();
  }

  // **Move and Fade the Wave**
  wave.x += wave.speed;

  if (millis() - wave.startTime > wave.growDuration) {
    wave.maxAmplitude *= 0.98;
  }

  if (wave.maxAmplitude < 1) {
    wave = {};
  }
}

function makeCloud(cloudx, cloudy) {
  fill(250);
  noStroke();
  ellipse(cloudx, cloudy, 70, 50);
  ellipse(cloudx + 10, cloudy + 10, 70, 50);
  ellipse(cloudx - 20, cloudy + 10, 70, 50);
}
function makeStars() {
  fill('white');
    for(let i = 0; i < 10; i++){
      ellipse(random(width), random(height), random(5,10), random(5,10));
    }
}

//Integrate: Change mouse position https://p5js.org/reference/p5/mouseClicked/
function mouseClicked(){
  //Innovate: Change conditions based on day/night
  if(isDay){
    dayX = mouseX;
    oceanColor = color(20, 130 - dayX/60, 255 - dayX/30);
  }
  if(isNight){
    nightX = mouseX;
    xInc = 0.05 + (0.05/3000 * nightX);
    yInc = 0.01 + (0.05/3000 * nightX);
  }
}


//Innovate: Day and Night buttons
$('#Daytime').click(function() {
  bg = color(128,226,255);
  isDay = true;
  isNight = false;
})
$('#Nighttime').click(function() {
  bg = color(6,10,71);
  isNight = true;
  isDay = false;
})
