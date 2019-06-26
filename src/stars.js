import * as PIXI from 'pixi.js'
import Star from './star'

export default class Stars extends PIXI.Container {
  constructor () {
    super()

    this.cellWidth = 200
    this.cellHeight = 180



  }

  clear() {
    this.removeChildren()
  }

  create() {
    let currentCol = 0
    for (let l = 0; l < this.nbLines; l ++) {
      let spaceBetweenC = 3

      for (let c = 0; c < 3; c++) {
        let posX = (currentCol + c * spaceBetweenC) * this.cellWidth
        let posY = l * this.cellHeight
        console.log('here', posX, posY);
        
        let sprite = new Star()
        sprite.dist = (currentCol + 2 * spaceBetweenC) * this.cellWidth
        sprite.position.x = posX
        sprite.position.y = posY + 100
        this.addChild(sprite)
      }

      currentCol += 2 + Math.floor(Math.random() * 2) 
      currentCol %= this.nbColumn

    }
  }

  resize (w, h) {
    this.nbLines = Math.floor(h / this.cellHeight)
    this.nbColumn = Math.floor(w / this.cellWidth)

    this.clear()
    this.create()
  }
}