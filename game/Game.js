import Player from "./Player.js"

class Game { 
    constructor(canvas) {
        this.canvas = canvas
        this.width = this.canvas.width
        this.height = this.canvas.height 
        this.player = new Player(this)
    }
    render(ctx) {
        this.player.render(ctx)
    }
}

export default Game