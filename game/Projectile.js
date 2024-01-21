class Projectile {

    constructor() {
        this.width = 150
        this.height = 20
        this.x = 0
        this.mX = this.width * 0.5
        this.mY = this.height * 0.5
        this.y = 0
        this.speed = 10
        this.inPool = true
    }

    render(ctx) {
        if (!this.inPool) {
            console.log('projectile: ', this.x, this.y)
           ctx.fillRect(this.x -800, this.y, this.width, this.height) 
        }
    }

    update() {
        if (!this.inPool) {
            this.y -= this.speed
            if (this.y < 0) this.reset()
        }
    }

    start(x, y) {
        this.x = x - this.mX 
        this.y = y
        this.inPool = false
    }

    reset() {
        this.inPool = true
    }
}

export default Projectile