function create2DVector(numRows, numCols) {
  let arr = []
  for (let i = 0; i < numRows; i++) {
    arr.push([])
    for (let j = 0; j < numCols; j++) {
      arr[i].push(0)
    }
  }
  return arr
}

let w = 1
let sandbox
let numRows
let numCols
let t = 1
let z = 0
let mapColor
let radius = 40
function setup() {
  createCanvas(600, 400);
  console.log(width)
  numRows = ceil(height / w)
  numCols = ceil(width / w)
  sandbox = create2DVector(numRows, numCols)
  mapColor = create2DVector(numRows, numCols)
}

function draw() {
  background(0)

  if (mouseIsPressed) {
    let i = floor(mouseY / w)
    let j = floor(mouseX / w)
    let iStart = i - radius
    let jStart = j - (radius / 2)
    for (let z = iStart; z < iStart + radius; z++) {
      for (let c = jStart; c < jStart + radius; c++) {
        if (random() > 0.01) {
          continue
        }
        sandbox[z][c] = 1
        mapColor[z][c] = [map(noise(z, t), 0, 1, 0, 255), map(noise(t, t), 0, 1, 0, 255), map(noise(t, z), 0, 1, 0, 255)]
      }
    }
    
  }


  let newSandobox = create2DVector(numRows, numCols)
  for (let i = 0; i < sandbox.length; i++) {

    for (let j = 0; j < sandbox[i].length; j++) {

      let square = sandbox[i][j]
      if (square == 0) {
        continue
      }

      let color = [0, 0, 0]
      color = mapColor[i][j]
      fill(...color)
      stroke(...color)
      rect(j * w, i * w, w, w)


      newSandobox[i][j] = 1

      let bottom = sandbox[i + 1] ? sandbox[i + 1][j] : null
      let diagonalLeft = sandbox[i + 1] ? sandbox[i + 1][j - 1] : null
      let diagonalRight = sandbox[i + 1] ? sandbox[i + 1][j + 1] : null

      if (bottom === 0) {
        newSandobox[i][j] = 0
        newSandobox[i + 1][j] = 1
        mapColor[i + 1][j] = mapColor[i][j]
        mapColor[i][j] = [0, 0, 0]
        continue
      }

      if (diagonalLeft === 0 && diagonalRight !== 0) {
        newSandobox[i][j] = 0
        newSandobox[i + 1][j - 1] = 1
        mapColor[i + 1][j - 1] = mapColor[i][j]
        mapColor[i][j] = [0, 0, 0]
        continue
      }

      if (diagonalRight === 0 && diagonalLeft !== 0) {
        newSandobox[i][j] = 0
        newSandobox[i + 1][j + 1] = 1
        mapColor[i + 1][j + 1] = mapColor[i][j]
        mapColor[i][j] = [0, 0, 0]
        continue
      }

      if (diagonalRight === 0 && diagonalLeft === 0) {
        newSandobox[i][j] = 0
        let diagonal = round(random())
        if (diagonal === 0) {
          newSandobox[i + 1][j - 1] = 1
          mapColor[i + 1][j - 1] = mapColor[i][j]
          mapColor[i][j] = [0, 0, 0]
        } else {
          newSandobox[i + 1][j + 1] = 1
          mapColor[i + 1][j + 1] = mapColor[i][j]
          mapColor[i][j] = [0, 0, 0]
        }
        continue
      }

    }
  }
  sandbox = newSandobox
  t += 0.0000000001
  z += 0.00000001
  console.log(t)
}



