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
  }

  applyForce(force) {
    // A = F / M
    // consider M = 1
    // this code should already account for the case of multiple forces
    let f = p5.Vector.div(force, this.mass)
    this.acceleration.add(f)
  }

  move() {
    this.position.add(this.velocity)
    this.velocity.add(this.acceleration)

    this.acceleration.mult(0)

    this.checkEdges()
    this.draw()
  }

  draw() {
    fill("white")
    circle(this.position.x, this.position.y, this.mass)
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

class Liquid {
  constructor(x, y, w, h, c) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.c = c
  }

  show() {
    fill(0, 100, 200, 100)
    rect(this.x, this.y, this.w, this.h)
  }

  contains(obj) {
    /* let vertex0 = createVector(this.x, this.y)
    let vertex1 = createVector(this.x + this.w, this.y)
    let vertex2 = createVector(this.x + this.w, this.y + this.h)
    let vertex3 = createVector(this.x, this.y + this.h)
    let vertices = [vertex0, vertex1, vertex2, vertex3]
    let diag = sqrt(this.w ** 2 + this.h ** 2)
    for (let vertex of vertices) {
      let distancefromvertex = sqrt((obj.position.x - vertex.x) ** 2 + (obj.position.y - vertex.y) ** 2)
      if (distancefromvertex > diag) {
        return false
      }
    } */
    let pos = obj.position
    return (this.x < pos.x && this.x + this.w > pos.x) && (this.y < pos.y && this.y + this.h > pos.y)
  }
}

let movers = []
let liquids = []

function setup() {
  createCanvas(600, 600);
  for (i = 0; i < 1; i++) {
    movers.push(new Mover(30, random(100, width - 100), random(100, height - 100)))
  }
  for (i = 0; i < 1; i++) {
    liquids.push(new Liquid(300, 300, 100, 100, 1))
  }
}

function draw() {
  background(0);
  let gravity = createVector(0, 0.1)
  for (let liquid of liquids) {
    liquid.show()
  }
  for (let mover of movers) {

    // gravity

    mover.applyForce(p5.Vector.mult(gravity, mover.mass))

    // friction

    if (mover.contactBottom()) {
      let c = 0.1
      let friction = mover.velocity.copy()
      friction.mult(-1)
      friction.setMag(c)
      mover.applyForce(friction)
    }

    // drag

    for (let liquid of liquids) {
      console.log(liquid.contains(mover))
      if (liquid.contains(mover)) {
        let speed = mover.velocity.mag()
        let dragMagnitude = liquid.c * speed * speed
        let drag = mover.velocity.copy()
        drag = drag.mult(-1)
        drag.setMag(dragMagnitude)
        mover.applyForce(drag)
      }
    }

    // mouse attraction force

    if (mouseIsPressed) {
      let distanceX = (mouseX - mover.position.x) * 0.1
      let distanceY = (mouseY - mover.position.y) * 0.1
      let force = createVector(distanceX, distanceY)
      mover.applyForce(force)
    }

    mover.move()
  }
}

