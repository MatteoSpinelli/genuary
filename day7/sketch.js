class FloppyProgressBar {
  s
  e
  c1
  c2

  constructor() {
    this.s = createVector(150, 300)
    this.e = createVector(450, 300)
    this.c1 = createVector(200, 300)
    this.c2 = createVector(400, 300)
  }

  draw() {
    noFill()
    bezier(this.s.x, this.s.y, this.c1.x, this.c1.y, this.c2.x, this.c2.y, this.e.x, this.e.y);
    bezier(this.s.x, this.s.y + 20, this.c1.x, this.c1.y + 20, this.c2.x, this.c2.y + 20, this.e.x, this.e.y + 20);
    line(this.s.x, this.s.y, this.s.x, this.s.y + 20)
    line(this.e.x, this.e.y, this.e.x, this.e.y + 20)
  }

  move() {
    this.e.x = mouseX
    this.e.y = mouseY
    draw()
  }
  
}

let progressBar;

function setup() {
  createCanvas(600, 600);
  progressBar = new FloppyProgressBar()
}

function draw() {
  background(220);
  progressBar.draw()
}

function mouseDragged() {
  progressBar.move()
}
