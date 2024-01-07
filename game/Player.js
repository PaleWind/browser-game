class Player {

    constructor(game) {
        this.game = game
        this.width = 100
        this.height = 100 
        this.x = 100
        this.y = 433
    }

    render(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

}

export default Player