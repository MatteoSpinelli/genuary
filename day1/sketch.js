class particle {
  location
  velocity
  acceleration 
  startvelocity
  mult = 0.01
  color
  constructor(posX, posY) {
    this.location = createVector(posX, posY)
    this.velocity = createVector(random(-3, 3), random(-3, 3))
    this.acceleration = createVector(-this.velocity.x * this.mult, -this.velocity.y * this.mult)
    this.color = [random(255), random(255), random(255)]
  }

  move() {
    if (!this.validate()) {
      return
    }
    this.location.add(this.velocity.x, this.velocity.y)
    this.velocity.add(this.acceleration.x, this.acceleration.y)
    this.draw()
  }

  validate() {
    /* if (this.velocity.mag() < 1) {
      return false;
    } */
    return true;
  }

  draw() {
    let opacity = map(this.velocity.mag(), 0, sqrt(18), 0, 255)
    fill(...this.color, opacity)
    stroke(0, 0, 0, 0)
    circle(this.location.x, this.location.y, 15)
  }
}

let particles = [];

function setup() {
  createCanvas(window.innerWidth , window.innerHeight + 500)
}

function draw() {
  background(0);
  for (const particle of particles) {
    particle.move()
  }
  
  if (mouseIsPressed) {
    for (let i = 0; i < 3; i++) {
      particles.push(
        new particle(mouseX, mouseY)
      )
      if (particles.length > 1000) {
        particles.shift()
      }
    }
  }
}


