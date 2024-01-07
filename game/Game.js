import Player from "./Player.js"

class Game { 

    constructor(canvas) {
        //properties
        this.canvas = canvas
        this.width = this.canvas.width
        this.height = this.canvas.height 
        this.player = new Player(this)
        this.keys = []

        //player input listeners
        window.addEventListener('keydown', (e) => {
            if (this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key)
            }
        })

        window.addEventListener('keyup', (e) => {
            const index = this.keys.indexOf(e.key)
            if (index > -1) this.keys.splice(index, 1)
        })

    }

    render(ctx) {
        this.player.render(ctx)
        this.player.update()
    }

}

export default Game