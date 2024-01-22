class Projectile {

    constructor() {
        this.width = 150
        this.height = 20
        this.x = 0
        this.middleX = this.width * 0.5
        this.middleY = this.height * 0.5
        this.y = 0
        this.speed = 10
        this.inPool = true
    }

    render(ctx) {
        if (!this.inPool) {
            console.log('projectile: ', this.x, this.y)
           ctx.fillRect(this.x, this.y, this.width, this.height) 
        }
    }

    update() {
        if (!this.inPool) {
            this.y -= this.speed
            if (this.y < 0) this.reset()
        }
    }

    start(x, y) {
        this.x = x - this.middleX 
        this.y = y
        this.inPool = false
    }

    reset() {
        this.inPool = true
    }
}

export default Projectile