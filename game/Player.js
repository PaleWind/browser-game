import Game from "./Game.js"
import Timer from "../utils/Timer.js"

class Player {

    constructor(game, x, y) {
        this.game = game
        this.width = game.gameMap.tileSize
        this.height = game.gameMap.tileSize 
        this.mX = game.gameMap.cols * game.gameMap.tileSize 
        this.mY = game.gameMap.cols * game.gameMap.tileSize 
        this.x = x // this.game.canvas.width * 0.5 - this.mX
        this.y = y // this.game.canvas.height * 0.5 - this.mY
        this.speed = 5
        this.diagonalFactor = Math.sqrt(2)
    }

    render(ctx) {
        ctx.fillStyle = 'black'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    update() {
        this.#handlePlayerMovement()
    }

    shoot() {
       const projectile = this.game.getAvailableProjectile()
       if (projectile) projectile.start(this.x + this.mX, this.y) 
    }

    #handlePlayerMovement() {
        const moveHorizontal = this.game.keysBeingPressed.includes('ArrowLeft')  * -1
                             + this.game.keysBeingPressed.includes('ArrowRight') *  1

        const moveVertical   = this.game.keysBeingPressed.includes('ArrowUp')    * -1
                             + this.game.keysBeingPressed.includes('ArrowDown')  *  1

        // calculate diagonal movement like a real g
        const playerSpeed = (this.speed - (Math.abs(moveHorizontal) & Math.abs(moveVertical) * this.diagonalFactor))

        // update player position
        this.x += moveHorizontal * (playerSpeed)
        this.y += moveVertical * (playerSpeed)

        // Bounds checking
        this.x = Math.max(-this.mX, Math.min(this.x, this.game.canvas.width - this.mX));
        this.y = Math.max(-this.mY, Math.min(this.y, this.game.canvas.height - this.mY));
    }

}

export default Player