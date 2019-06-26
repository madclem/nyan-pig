import * as PIXI from 'pixi.js'

export default class Star extends PIXI.Sprite {
  constructor () {
    super(PIXI.Texture.from('shapes/shape1.png'))
    this.anchor.set(.5)
    this.scale.set(.5)
    this.tick = Math.floor(Math.random() * 100)
    this.life = Math.floor(Math.random() * 20 + 10)
    this.shapes = [
      'shape5.png',
      'shape4.png',
      'shape3.png',
      'shape2.png',
      'shape1.png',
      'shape5.png',
      'shape4.png',
      'shape3.png',
      'shape2.png',
      'shape1.png',
      'pig.png'
    ]
  }

  updateTransform() {
    super.updateTransform()

    this.tick++
    this.position.x -= 4

    if (this.position.x < 0) {
      this.position.x += this.dist * 2
    }
    if (this.tick % this.life === 0) {
      let ind = Math.floor(Math.random() * this.shapes.length)
      this.texture = PIXI.Texture.from(`shapes/${this.shapes[ind]}`)
    }
  }
}