import Timer from "../game/utils/Timer.js"
import Game from "../game/Game.js"
import AssetLoader from "../game/utils/AssetLoader.js"
import { DebugInfoRenderer } from "../game/utils/DebugInfoRenderer.js"

let frames = 0
let fps = 0

window.addEventListener('load', function(){

  AssetLoader.loadImage('villageMap', '../game/assets/tiles.png')
  AssetLoader.loadImage('player', '../game/assets/AnimationSheet_Character.png')

  const TILE_SIZE = 64
  const CAMERA_WIDTH = TILE_SIZE * 8
  const CAMERA_HEIGHT = TILE_SIZE * 8

  let accumulatedTime = 0
  const frameTime = 1000 / 60

  const canvas = document.getElementById('myCanvas')
  canvas.width = CAMERA_WIDTH 
  canvas.height = CAMERA_HEIGHT
  const ctx = canvas.getContext('2d')
  const debugInfoRenderer = new DebugInfoRenderer(ctx);
  const game = new Game(ctx)
  game.init(ctx) 

  let mouse = { x: 0, y: 0}
  function updateMousePosition(evt) {
    const rect = canvas.getBoundingClientRect()
    mouse.x = Math.floor(evt.clientX - rect.left)
    mouse.y = Math.floor(evt.clientY - rect.top)
  }

  // Add mousemove event listener to the canvas
  canvas.addEventListener('mousemove', updateMousePosition);

  function animate() {
    let delta = Timer.deltaTime 
    accumulatedTime += delta
    game.updateMouse(mouse)
    while (accumulatedTime > frameTime) {
      accumulatedTime -= frameTime
      frames++
      game.update(delta)
      game.render(ctx)
      debugInfoRenderer.render(game, fps)
    }
    requestAnimationFrame(animate)
  }
 animate()
})

setInterval(() => {
  // console.log(frames)
  fps = frames
  frames = 0
  // console.clear()
}, 1000)