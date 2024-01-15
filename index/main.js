import Timer from "../utils/Timer.js"
import Game from "../game/Game.js"

const boardWidth = 500
const boardHeight = 600
let frames = 0

window.addEventListener('load', function(){
  // JavaScript to draw on the canvas
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
  canvas.width = boardWidth 
  canvas.height = boardHeight
  
  const game = new Game(canvas)
  
  let accumulatedTime = 0;
  const frameTime = 1000 / 60; 

  function animate() {
    accumulatedTime += Timer.deltaTime;
    while (accumulatedTime > frameTime) {
      accumulatedTime -= frameTime;
      frames++
      ctx.clearRect(0, 0, canvas.width, canvas.height) 
      game.render(ctx)
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