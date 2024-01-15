import Player from "./Player.js"
import Projectile from "./Projectile.js"

class Game { 

    constructor(ctx) {
        //properties
        this.canvas = ctx
        this.width = this.canvas.width
        this.height = this.canvas.height 
        this.player = new Player(this)
        this.keysBeingPressed = []
        this.projectilePoolSize = 10
        this.projectilePool = []
        this.menuKeyMap = {}
        this.gameKeyMap = {}

        this.bindInputcontrols()
        this.loadProjectilePool()
        this.#loadKeyMaps()
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
            if (this.keysBeingPressed.indexOf(e.key) === -1) {
                this.keysBeingPressed.push(e.key)
            }
            this.gameKeyMap[e.key]?.() // TODO: Menus
        })

        window.addEventListener('keyup', (e) => {
            const index = this.keysBeingPressed.indexOf(e.key)
            if (index > -1) this.keysBeingPressed.splice(index, 1)
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

    #loadKeyMaps() {
        this.menuKeyMap['1'] = () => {}
        this.gameKeyMap['1'] = () => { this.player.shoot() }
        this.gameKeyMap[' '] = () => { this.player.shoot() }
    }

}

export default Game