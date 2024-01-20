import Timer from "../utils/Timer.js"
import Game from "../game/Game.js"

let frames = 0

window.addEventListener('load', function(){

  const game = new Game()
  game.init() 
  let accumulatedTime = 0;
  const frameTime = 1000 / 60; 

  function animate() {
    accumulatedTime += Timer.deltaTime;
    while (accumulatedTime > frameTime) {
      accumulatedTime -= frameTime;
      frames++
      game.update()
      game.render()
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