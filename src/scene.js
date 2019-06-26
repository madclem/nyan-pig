import * as PIXI from 'pixi.js'
import Line from './line/line'
import Stars from './stars'
import { PixelateFilter } from 'pixi-filters'

export default class Scene {
  constructor (app) {
    this.view = app.stage

    console.log('PixelateFilter', PixelateFilter);
    
    this.gap = 10

    this.view.interactive = true
    this.view.mousemove = this.view.touchmove = this._onMove
    this.background = new PIXI.Sprite(PIXI.Texture.WHITE)
    this.background.tint = 0x0E4572
    this.view.addChild(this.background)
    window.PIXI = PIXI

    this.points = []

    this.stars = new Stars()
    this.view.addChild(this.stars)
    
    this.line = new Line()
    this.view.addChild(this.line)

    this.pigzbe = PIXI.Sprite.from('pigzbe.png')
    this.pigzbe.anchor.set(.5)
    this.pigzbe.scale.set(.75)
    this.view.addChild(this.pigzbe)


    let filter = new PixelateFilter(5)
    this.view.filters = [filter]
  }

  _onMove = (e) => {    
    let pt = e.data.getLocalPosition(this.view)
    
    this.points[this.points.length - 1] = pt.y
    this.points[this.points.length - 2] = pt.x

    this.pigzbe.position.x = pt.x + this.pigzbe.width / 4
    this.pigzbe.position.y = pt.y + 8
  }

  update () {

    for (let i = this.points.length - 3; i > -1; i-=2) {
      // let x = this.points[i-1]
      
      let y = this.points[i]
      let prevX = this.points[i-1 + 2]
      let prevY = this.points[i + 2]

      this.points[i-1] += (prevX - this.gap - this.points[i - 1]) * .6
      this.points[i] += (prevY - this.points[i]) * .6
      
      
    }
    this.line.update(this.points)
  }

  resize (w, h) {
    this.background.width = w
    this.background.height = h

    let nbPoints = w / this.gap
    for (let i = 0; i < nbPoints; i++) {
      this.points.push(0, 0) 
    }

    
    this.line.update(this.points)
    this.stars.resize(w, h)
  }
}