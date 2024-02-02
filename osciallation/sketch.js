function setup() {
  createCanvas(600, 600);
}

let t = 0

function draw() {
  background(220);
  translate(300, 300)
  let posx = cos((100 + t)) * 141
  let posy = sin((100 + t)) * 141
  translate(cos((100 + t)) * 141, sin((100 + t)) * 141)
  circle(-posx, posy, 30)
  circle(posx, -posy, 30)
  t += 0.01
}
