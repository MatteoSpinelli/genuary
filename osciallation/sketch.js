function setup() {
  createCanvas(600, 600);
}

let angle = 0

let angularVelocity = 0

let angularAcc = 0.01

const DRAG = 0.1


function draw() {
  background(255)
  
  translate(width / 2, height / 2);
  rotate(angle);

  stroke(0);
  fill(127);
  
  line(-60, 0, 60, 0);
  circle(60, 0, 16);
  circle(-60, 0, 16);

  angularVelocity += angularAcc

  // add drag

  let dragForce = DRAG * (angularVelocity ** 2)
  angularVelocity -= dragForce
  console.log(angularVelocity)

  angle += angularVelocity


}
