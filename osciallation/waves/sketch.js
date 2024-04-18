
const oscillators = []
const n = 1
function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < n; i++) {
    oscillators.push(new Oscillator())
  }
}

function draw() {
  background(220);
  for (const oscillator of oscillators) {
    oscillator.show()
    oscillator.update()
  }
}
