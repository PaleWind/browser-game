import Timer from "../game/utils/Timer.js"
import Game from "../game/Game.js"
import AssetLoader from "../assets/AssetLoader.js"
import { DebugInfoRenderer } from "../game/utils/DebugInfoRenderer.js"

window.addEventListener('load', function(){
  const TILE_SIZE = 64
  const CAMERA_WIDTH = TILE_SIZE * 8
  const CAMERA_HEIGHT = TILE_SIZE * 8

  let frames = 0
  let accumulatedTime = 0
  const frameTime = 1000 / 60

  const canvas = document.getElementById('myCanvas')
  canvas.width = CAMERA_WIDTH 
  canvas.height = CAMERA_HEIGHT
  const ctx = canvas.getContext('2d')
  AssetLoader.loadImage('villageMap', '../assets/tiles.png')
  const debugInfoRenderer = new DebugInfoRenderer(ctx);
  const game = new Game(ctx)
  game.init(ctx) 

  function animate() {
    let delta = Timer.deltaTime 
    accumulatedTime += delta
    while (accumulatedTime > frameTime) {
      accumulatedTime -= frameTime
      frames++
      game.update(delta)
      game.render(ctx)
      debugInfoRenderer.render(game)
    }
    requestAnimationFrame(animate)
  }

  animate()
})

setInterval(() => {

  console.log(frames)
  frames = 0
  // console.clear()
}, 1000)