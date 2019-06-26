
import * as PIXI from 'pixi.js'

export default class LineGeometry extends PIXI.Geometry {
  constructor () {
    super()

    let points = []

    let index = []
    let iCount = 0

    let half = 0.1 * 150

    for (let i = 0; i < 4; i++) {
      points.push((i * 0.1) - half, Math.sin(i * 0.1) * 10)

      index.push(iCount++, iCount++)
    }

    let doubleUpArray = []
    let directionArray = []
    let distArray = []
    let uvsArray = []

    doubleUpArray.push(points[0], points[1])
    doubleUpArray.push(points[0], points[1])
    uvsArray.push(0, 0)
    directionArray.push(-1, 1)

    for (let i = 0; i < points.length; i += 2) {
      doubleUpArray.push(points[i], points[i + 1])
      doubleUpArray.push(points[i], points[i + 1])

      directionArray.push(-1, 1)
      uvsArray.push(i / points.length, i / points.length)
      distArray.push(i, i)
    }

    let i = points.length / 2
    i -= 3 * 2

    doubleUpArray.push(points[i], points[i + 1])
    doubleUpArray.push(points[i], points[i + 1])

    uvsArray.push(i / points.length, i / points.length)
    directionArray.push(-1, 1)
    distArray.push(i, i)

    let data = PIXI.Buffer.from(doubleUpArray)

    this
      .addAttribute('direction', directionArray, 1)
      .addAttribute('aUv', uvsArray, 1)
      .addAttribute('dist', distArray, 1)
      .addAttribute('position', data, 2, null, null, 0, 4 * 4)
      .addAttribute('next', data, 2, null, null, 0, 8 * 4)
      .addAttribute('prev', data, 2, null, null, 0, 0)
      .addIndex(index)// [0, 1, 2, 3, 4, 5])

    this.drawMode = PIXI.DRAW_MODES.TRIANGLE_STRIP
  }

  update (points) {
    if (points.length < 4) return

    let buffer = this.getBuffer('position')
    let uvsBuffer = this.getBuffer('aUv')
    let directionBuffer = this.getBuffer('direction')
    let distBuffer = this.getBuffer('dist')
    let indexBuffer = this.getIndex()

    let uvsArray = []
    let doubleUpArray = []
    let directionArray = []
    let distArray = []
    let index = []

    doubleUpArray.push(points[0], points[1])
    doubleUpArray.push(points[2].x, points[3])
    uvsArray.push(0, 0)
    directionArray.push(-1, 1)

    let count = 0

    for (let i = 0; i < points.length; i += 2) {
      doubleUpArray.push(points[i], points[i + 1])
      doubleUpArray.push(points[i], points[i + 1])
      directionArray.push(-1, 1)
      uvsArray.push(i / (points.length / 2), i / (points.length / 2))

      index.push(count++, count++)
    }

    distArray.push(0, 0)

    let lx = points[0].x
    let ly = points[0].y

    let disty = 0

    for (let i = 1; i < points.length; i += 2) {
      let x = points[i]
      let y = points[i + 1]

      let dx = x - lx
      let dy = y - ly
      let segDist = Math.sqrt(dx * dx + dy * dy)
      disty += segDist
      lx = x
      ly = y

      distArray.push(disty / 100, disty / 100)
    }

    let i = points.length / 2
    i -= 2

    doubleUpArray.push(points[i], points[i + 1])
    doubleUpArray.push(points[i], points[i + 1])
    uvsArray.push(i / (points.length / 2), i / (points.length / 2))
    directionArray.push(-1, 1)

    distArray.push(disty / 100000, disty / 100000)

    let posArray = new Float32Array(doubleUpArray)
    let uvArray = new Float32Array(uvsArray)
    let dirArray = new Float32Array(directionArray)
    let disArray = new Float32Array(distArray)
    let indexArray = new Uint16Array(index)

    buffer.update(posArray)
    directionBuffer.update(dirArray)
    uvsBuffer.update(uvArray)
    distBuffer.update(disArray)
    indexBuffer.update(indexArray)

    this.start = 2
    this.size = index.length - 2
  }

  reset () {
    // /this.size = 3;
  }
}
