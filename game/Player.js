class Player {

    constructor(game) {
        this.game = game
        this.width = 100
        this.height = 100 
        this.mX = this.width * 0.5 // middle of the player model x-axis
        this.mY = this.height * 0.5 // middle of the player model y-axis
        this.x = this.game.width * 0.5 - this.mX
        this.y = this.game.height * 0.5 - this.mY
        this.speed = 5
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
        const moveLeft = this.game.keys.includes('ArrowLeft') ? -1 : 0;
        const moveRight = this.game.keys.includes('ArrowRight') ? 1 : 0;
        const moveUp = this.game.keys.includes('ArrowUp') ? -1 : 0;
        const moveDown = this.game.keys.includes('ArrowDown') ? 1 : 0;

        this.x += (moveRight + moveLeft) * this.speed;
        this.y += (moveDown + moveUp) * this.speed;
    }

}

export default Player