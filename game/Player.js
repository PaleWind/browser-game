class Player {

    constructor(game) {
        this.game = game
        this.width = 100
        this.height = 100 
        this.x = this.game.width * 0.5 - this.width * 0.5
        this.y = this.game.height * 0.5 - this.height * 0.5
        this.speed = 5
    }

    render(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    update() {
        this.handlePlayerInput()
    }

    handlePlayerInput() {
        const moveLeft = this.game.keys.includes('ArrowLeft') ? -1 : 0;
        const moveRight = this.game.keys.includes('ArrowRight') ? 1 : 0;
        const moveUp = this.game.keys.includes('ArrowUp') ? -1 : 0;
        const moveDown = this.game.keys.includes('ArrowDown') ? 1 : 0;

        this.x += (moveRight + moveLeft) * this.speed;
        this.y += (moveDown + moveUp) * this.speed;
    }
}

export default Player