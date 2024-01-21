class Player {

    constructor(game, x, y) {
        this.game = game
        this.width = game.gameMap.tsize
        this.height = game.gameMap.tsize 
        this.mX = game.gameMap.cols * game.gameMap.tsize 
        this.mY = game.gameMap.cols * game.gameMap.tsize 
        this.x = x // this.game.canvas.width * 0.5 - this.mX
        this.y = y // this.game.canvas.height * 0.5 - this.mY
        this.speed = 5
        this.diagonalFactor = Math.sqrt(2)
    }

    render(ctx) {
        ctx.fillStyle = 'black'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    update(delta) {
        this.#move(delta)
    }

    shoot() {
       const projectile = this.game.getAvailableProjectile()
       if (projectile) projectile.start(this.x + this.mX, this.y) 
    }

    #move(delta) {
        const moveHorizontal = this.game.keysBeingPressed.includes('ArrowLeft')  * -1
                             + this.game.keysBeingPressed.includes('ArrowRight') *  1

        const moveVertical   = this.game.keysBeingPressed.includes('ArrowUp')    * -1
                             + this.game.keysBeingPressed.includes('ArrowDown')  *  1

        const playerSpeed = (this.speed - (Math.abs(moveHorizontal) & Math.abs(moveVertical) * this.diagonalFactor))

        this.x += moveHorizontal * playerSpeed
        this.y += moveVertical * playerSpeed
    
        // check if we walked into a non-walkable tile
        // this._collide(dirx, diry);
    
        // clamp values
        var maxX = this.game.camera.width
        var maxY = this.game.camera.height
        this.x = Math.max(0, Math.min(this.x, maxX));
        this.y = Math.max(0, Math.min(this.y, maxY));

        // Bounds checking
        // this.x = Math.max(-this.mX, Math.min(this.x, this.game.canvas.width - this.mX));
        // this.y = Math.max(-this.mY, Math.min(this.y, this.game.canvas.height - this.mY));
    }

}

export default Player