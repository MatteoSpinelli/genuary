let vector

function setup() {
  createCanvas(700, 700);
  vector = createVector(100, 100)
}

function draw() {
  translate(width / 2, height / 2)
  background(220);
  updateDistanceColors()
  line(0, -height / 2, 0, height / 2)
  line(- width / 2, 0, width / 2, 0)

  arrowHead(createVector(0,0), vector)
  line(0, 0, vector.x, vector.y)

  if (mouseIsPressed) {
    const mouseVector = createVector(mouseX - width / 2, mouseY - height / 2)
    const vectorCopy = vector.copy()
    const distance = vectorCopy.sub(mouseVector).mag()
    console.log(distance)
    if (distance < 25) {
      vector.x = mouseX - width / 2
      vector.y = mouseY - height / 2
    }
  }
}

function arrowHead(start, vector){
  push()   //start new drawing state
  var norm = createVector(vector.x, vector.y)
  norm.normalize()
  applyMatrix(norm.x,norm.y,-norm.y, norm.x, vector.x - start.x,vector.y - start.y)

  triangle(0,6,12,0,0,-6)
  pop()
}


function updateDistanceColors() {
  loadPixels()
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++ ) {
      const pixel = createVector(i - width / 2, j - height / 2)
      const dotProduct = vector.dot(pixel)
      if (dotProduct < 0) {
        set(i, j, [0, 170, 0, 255])
        continue
      } 
     
    }
  }
  updatePixels()
}

