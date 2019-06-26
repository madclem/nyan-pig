import * as PIXI from 'pixi.js'
import LineGeometry from './line-geometry'
import LineShader from './line-shader'

export default class Line extends PIXI.Mesh {
  constructor (options) {
    const geometry = new LineGeometry(options)
    const shader = new LineShader(options)
    super(geometry, shader, null, PIXI.DRAW_MODES.TRIANGLE_STRIP)
    this.state.depthTest = false
    this.state.culling = false
    this.skip = true
  }

  update (points) {
    this.geometry.update(points)
    this.size = this.geometry.indexBuffer.data.length - 2

    this.visible = points.length > 4
  }

  _render () {
    if (this.skip) {
      this.skip = false
    } else {
      super._render(window.renderer)
    }
  }
}
