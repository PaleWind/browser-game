import Player from "./Player.js"
import Projectile from "./Projectile.js"

class Game { 

    constructor(ctx) {
        //properties
        this.canvas = ctx
        this.width = this.canvas.width
        this.height = this.canvas.height 
        this.player = new Player(this)
        this.keys = []
        this.projectilePoolSize = 10
        this.projectilePool = []

        this.bindInputcontrols()
        this.loadProjectilePool()
    }

    render(ctx) {
        this.player.update()
        this.player.render(ctx)
        this.projectilePool.forEach(projectile => {
            projectile.update()
            projectile.render(ctx)
        })
    }

    bindInputcontrols() {
        //player input listeners
        window.addEventListener('keydown', (e) => {
            console.log(e.key)
            if (this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key)
            }
            if (e.key === '1') this.player.shoot()
            if (e.key === '2') this.player.shoot()
        })

        window.addEventListener('keyup', (e) => {
            const index = this.keys.indexOf(e.key)
            if (index > -1) this.keys.splice(index, 1)
        })
    }
 
    loadProjectilePool() {
        for (let i = 0; i < this.projectilePoolSize; i++) {
            this.projectilePool.push(new Projectile())
        }
    }

    getAvailableProjectile() {
        for (let i = 0; i < this.projectilePoolSize; i++) {
            if (this.projectilePool[i].inPool) return this.projectilePool[i]
        }
    }
 
}

export default Game