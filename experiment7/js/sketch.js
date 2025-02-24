// sketch.js - purpose and description here
// Author: Jacky Ho
// Date: February 24, 2025

let myChart;
let chartData;
const circleScale = 4;
const randomNumber = 50;

function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");

  // Create the chart in the container
  let ctx = document.getElementById("myChart").getContext("2d");

  // Initialize Chart.js
  myChart = new Chart(ctx, {
    type: "bubble",
    data: {
      datasets: [
        {
          label: "Top College Major Salaries",
          data: [
            {
              x: Math.floor(Math.random() * randomNumber),
              y: 80,
              r: 20 * circleScale,
              label: "Computer Engineering",
            },
            {
              x: Math.floor(Math.random() * randomNumber),
              y: 79,
              r: 19 * circleScale,
              label: "Chemical Engineering",
            },
            {
              x: Math.floor(Math.random() * randomNumber),
              y: 78,
              r: 18 * circleScale,
              label: "Computer Science",
            },
            {
              x: Math.floor(Math.random() * randomNumber),
              y: 74,
              r: 16 * circleScale,
              label: "Aerospace Engineering",
            },
            {
              x: Math.floor(Math.random() * randomNumber),
              y: 72,
              r: 15 * circleScale,
              label: "Electrical Engineering",
            },
            {
              x: Math.floor(Math.random() * randomNumber),
              y: 71,
              r: 14 * circleScale,
              label: "Industrial Engineering",
            },
            {
              x: Math.floor(Math.random() * randomNumber),
              y: 70,
              r: 13 * circleScale,
              label: "Mechanical Engineering",
            },
            {
              x: Math.floor(Math.random() * randomNumber),
              y: 66,
              r: 10 * circleScale,
              label: "Finance",
            },
            {
              x: Math.floor(Math.random() * randomNumber),
              y: 65,
              r: 10 * circleScale,
              label: "Math",
            },
            {
              x: Math.floor(Math.random() * randomNumber),
              y: 65,
              r: 10 * circleScale,
              label: "Economics",
            },
            {
              x: Math.floor(Math.random() * randomNumber),
              y: 65,
              r: 10 * circleScale,
              label: "Civil Engineering",
            },
            {
              x: Math.floor(Math.random() * randomNumber),
              y: 64,
              r: 9 * circleScale,
              label: "Business Analytics",
            },
            {
              x: Math.floor(Math.random() * randomNumber),
              y: 62,
              r: 8 * circleScale,
              label: "Pharmacy",
            },
            {
              x: Math.floor(Math.random() * randomNumber),
              y: 62,
              r: 8 * circleScale,
              label: "Physics",
            },
          ],
          backgroundColor: function (context) {
            const index = context.dataIndex;
            const randomColor = `rgba(${Math.floor(
              Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
              Math.random() * 256
            )}, 0.5)`;
            return randomColor;
          },
          borderColor: "rgba(0, 123, 255, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        datalabels: {
          display: false, // Disable datalabel plugin as we are using p5.js for rendering the labels
        },
        tooltip: {
          callbacks: {
            // Customize the tooltip content
            title: function (tooltipItem) {
              const label =
                tooltipItem[0].dataset.data[tooltipItem[0].dataIndex].label;
              return label; // Display the major name
            },
            label: function (tooltipItem) {
              const salary = tooltipItem.raw.y * 1000; // y value multiplied by 1000 for salary
              return `Average Salary: $${salary.toLocaleString()}`;
            },
          },
        },
      },
      scales: {
        x: {
          display: false, // Hide the x-axis
          grid: {
            display: false, // Hide gridlines on the x-axis
          },
          ticks: {
            display: false, // Hide tick marks on the x-axis
          },
        },
        y: {
          display: false, // Hide the y-axis
          grid: {
            display: false, // Hide gridlines on the y-axis
          },
          ticks: {
            display: false, // Hide tick marks on the y-axis
          },
        },
      },
    },
  });

  // Store chart data for further use in p5.js
  chartData = myChart.data.datasets[0].data;
}

function draw() {
  clear();
  // Loop through each bubble in the chart and use p5.js to display the labels
  chartData.forEach((point) => {
    // Get the coordinates of the bubble
    let x = myChart.scales["x"].getPixelForValue(point.x);
    let y = myChart.scales["y"].getPixelForValue(point.y);

    // Adjust the text position to be centered inside the bubble
    textSize(12);
    fill(100); // Set the text color to white
    stroke(0);
    strokeWeight(0.1);
    textAlign(CENTER, CENTER); // Center the text within the bubble
    textSize(10);
    text(point.label, x, y); // Draw the label at the bubble's center
  });
}

function mousePressed(){
  noCanvas();
}

function mouseReleased() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
}
