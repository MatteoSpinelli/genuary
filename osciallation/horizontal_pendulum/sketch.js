const amplitude = 100
const period = 120


function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);
  translate(width / 2, height / 2)
  let x = amplitude * sin(TWO_PI * frameCount / period)
  stroke(0)
  fill(127)
  circle(x, 0, 20)
  line(0, 0, x, 0)
}
