import Game from "../game/Game.js";

const boardWidth = 500
const boardHeight = 600

window.addEventListener('load', function(){
  // JavaScript to draw on the canvas
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
  canvas.width = boardWidth 
  canvas.height = boardHeight
  
  const game = new Game(canvas)
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height) 
    game.render(ctx)
    requestAnimationFrame(animate)
  }
  animate()
})
