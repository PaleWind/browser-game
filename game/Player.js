import Game from "./Game.js"
import Timer from "../utils/Timer.js"

class Player {

    constructor(game) {
        this.game = game
        this.width = 50
        this.height = 50 
        this.mX = this.width * 0.5 // middle of the player model x-axis
        this.mY = this.height * 0.5 // middle of the player model y-axis
        this.x = this.game.width * 0.5 - this.mX
        this.y = this.game.height * 0.5 - this.mY
        this.speed = 5
        this.diagonalFactor = Math.sqrt(2)
    }

    render(ctx) {
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
        this.x = Math.max(-this.mX, Math.min(this.x, this.game.width - this.mX));
        this.y = Math.max(-this.mY, Math.min(this.y, this.game.height - this.mY));
    }

}

export default Player