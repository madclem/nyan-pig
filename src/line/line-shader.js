import * as PIXI from 'pixi.js'
import frag from './line-shader-frag'
import vert from './line-shader-vert'

export default class LineShader extends PIXI.Shader {
  constructor (options) {
    super(PIXI.Program.from(vert, frag), {
      thickness: 60,
      uRainbow: PIXI.Texture.from('rainbow')
    })
  }

  init (options = {}) {
  }
}
