class Mover {
  position
  velocity
  acceleration
  mass

  constructor(mass, x = width / 2, y = height / 2) {
    this.position = createVector(x, y)
    this.velocity = createVector()
    this.acceleration = createVector()
    this.mass = mass

    this.angle = 0
    this.angleVelocity = 0
    this.angleAcceleration = 0
  }

  applyForce(force) {
    // A = F / M
    // consider M = 1
    // this code should already account for the case of multiple forces
    let f = p5.Vector.div(force, this.mass)
    this.acceleration.add(f)
  }

  move() {
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
    console.log(this.velocity.mag())
    this.angleAcceleration = this.acceleration.x / 100
    this.angleVelocity += this.angleAcceleration
    this.angle += this.angleVelocity

    this.acceleration.mult(0)
    this.checkEdges()
    this.draw()
  }

  draw() {
    let facingangle = this.velocity.heading()
    push()
    translate(this.position.x, this.position.y)
    fill(255)
    rotate(facingangle  + (PI / 2))
    triangle(0, 0, 20, 30 , -20, 30 )
    circle(0, 0, 10)
    pop()
  }

  checkEdges() {
    let bounce = -0.9
    if (this.position.x > (width - this.mass / 2)) {
      this.position.x = width - this.mass / 2
      this.velocity.x *= bounce
    }
    if (this.position.x < (0 + this.mass / 2)) {
      this.position.x = 0 + this.mass / 2
      this.velocity.x *= bounce
    }
    if (this.position.y < (0 + this.mass / 2)) {
      this.position.y = 0 + this.mass / 2
      this.velocity.y *= bounce
    }
    if (this.position.y > (height - this.mass / 2)) {
      this.position.y = height - this.mass / 2
      this.velocity.y *= bounce
    }
  }

  checkEdgesWithForces() {
    let forceX = -(1 / (width - this.position.x) * 100)
    let forceY = -(1 / (height - this.position.y) * 100)
    let forceZeroX = (1 / (this.position.x) * 100)
    let forceZeroY = (1 / (this.position.y) * 100)
    let force = createVector(forceX, forceY)
    let forceZero = createVector(forceZeroX, forceZeroY)
    this.applyForce(force)
    this.applyForce(forceZero)
  }

  contactBottom() {
    return (this.position.y > height - (this.mass / 2) - 1)
  }
}




let mover
function setup() {
  createCanvas(600, 600);
  mover = new Mover(10, width / 2, height / 2)
}

function draw() {
  background(0)

  // mouse attraction force

  if (mouseIsPressed) {
    let distanceX = (mouseX - mover.position.x) * 0.1
    let distanceY = (mouseY - mover.position.y) * 0.1
    let force = createVector(distanceX, distanceY)
    mover.applyForce(force)
  }

  // controller

  let force = createVector(0,0)
  if (keyIsDown(65)) {
    force.add(-1, 0)
  }
  if (keyIsDown(68)) {
    force.add(1, 0)
  }
  if (keyIsDown(87)) {
    force.add(0, -1)
  }
  if (keyIsDown(83)) {
    force.add(0, 1)
  }
  mover.applyForce(force)


  mover.move()
}



