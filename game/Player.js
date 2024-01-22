class Player {

    constructor(game, x, y) {
        this.game = game
        this.width = game.gameMap.tsize - 4
        this.height = game.gameMap.tsize - 4
        this.mX = game.gameMap.rows * game.gameMap.tsize  
        this.mY = game.gameMap.cols * game.gameMap.tsize 
        this.x = x 
        this.y = y 
        this.speed = 5
        this.diagonalFactor = Math.sqrt(2)
        this.screenX = x
        this.screenY = y
        this.moveHorizontal = 0
        this.moveVertical = 0
        this.computedSpeed = 0
    }

    render(ctx) {
        ctx.fillStyle = 'black'
        ctx.fillRect(this.screenX, this.screenY, this.width, this.height)
    }

    update(delta) {
        this.#move2()
    }

    shoot() {
       const projectile = this.game.getAvailableProjectile()
       if (projectile) projectile.start(this.x + this.mX, this.y) 
    }

    #move2() {
        this.moveHorizontal = this.game.keysBeingPressed.includes('ArrowLeft') * -1 +
                                this.game.keysBeingPressed.includes('ArrowRight') * 1
        this.moveVertical = this.game.keysBeingPressed.includes('ArrowUp') * -1 +
                            this.game.keysBeingPressed.includes('ArrowDown') * 1

        this.computedSpeed = this.speed -
                                (this.diagonalFactor *
                                Math.abs(this.moveHorizontal) & Math.abs(this.moveVertical))

        let newX = this.x + this.moveHorizontal * this.computedSpeed
        let newY = this.y + this.moveVertical * this.computedSpeed

        // Separately handle X and Y collisions
        if (!this.#collidesWithSolid(newX, this.y)) {
            this.x = Math.max(0, Math.min(newX, this.mX - this.width))
        }
        if (!this.#collidesWithSolid(this.x, newY)) {
            this.y = Math.max(0, Math.min(newY, this.mY - this.height))
        }
    }

    #collidesWithSolid(x, y) {
        const buffer = 0

        return this.game.gameMap.isSolidTileAtXY(x + buffer, y + buffer) ||
                this.game.gameMap.isSolidTileAtXY(x + this.width - buffer, y + buffer) ||
                this.game.gameMap.isSolidTileAtXY(x + buffer, y + this.height - buffer) ||
                this.game.gameMap.isSolidTileAtXY(x + this.width - buffer, y + this.height - buffer)
    }
    
}

export default Player