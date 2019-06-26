import React, { useEffect } from 'react';
import * as PIXI from 'pixi.js'
import Scene from './scene';
import Ticker from './ticker';
import './App.css';

function App() {
  
  let app = React.createRef()
  let renderer = React.createRef()
  let scene = React.createRef()
  function resize() {
    console.log('here');
    
    renderer.current.resize(window.innerWidth, window.innerHeight)

    scene.current.resize(window.innerWidth, window.innerHeight)
  }

  function update () {
    scene.current.update()
  }

  function onLoaderComplete () {
    window.addEventListener('resize', resize);
    
    scene.current = new Scene(app.current)

    Ticker.instance.start()
    Ticker.instance.add(update)

    resize()
  }

  useEffect(() => {

    app.current = new PIXI.Application({
      width: 200,
      height: 200,
      backgroundColor: 0xA0EDFF,
      resolution: 1,
      transparent: true,
      autoResize: true,
      antialias: true
    });

    window.renderer = renderer.current = app.current.renderer
    document.getElementById('App').appendChild(app.current.view);

    const loader = PIXI.Loader.shared


    loader.add('shape5', './shapes/shape5.png')
    loader.add('shape4', './shapes/shape4.png')
    loader.add('shape3', './shapes/shape3.png')
    loader.add('shape2', './shapes/shape2.png')
    loader.add('shape1', './shapes/shape1.png')
    loader.add('pig', './shapes/pig.png')
    loader.add('heart', 'heart.png')
    loader.add('rainbow', 'rainbow.jpg')
    loader.add('pigzbe', 'pigzbe.png')
    loader.onComplete.add(onLoaderComplete);
    loader.load()
    
  }, [])

  return (
    <div className="App" id="App">
    </div>
  );
}

export default App;
