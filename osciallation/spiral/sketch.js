let angle = 0
let r = 1
function setup() {
  createCanvas(600, 600);
  
}

function draw() {
  translate(width / 2, height / 2)
  fill(0);
  let circlex = cos(angle) * r
  let circley = sin(angle) * r
  circle(circlex, circley, 20)
  
  angle += 0.01
  r += 0.1
}



