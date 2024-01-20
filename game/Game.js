import Camera from "./Camera.js"
import Player from "./Player.js"
import Projectile from "./Projectile.js"
import VillageMap from "./map/tileMaps/VillageMap.js"

class Game { 

    constructor() {
        const boardWidth = 12 // in tiles*
        const boardHeight = 12 // in tiles*
        const tileSize = 40

        this.canvas = document.getElementById('myCanvas')
        this.canvas.width = boardWidth * tileSize
        this.canvas.height = boardHeight * tileSize
        this.ctx = this.canvas.getContext('2d')
    
        // Other properties
        this.camera
        this.player
        this.keysBeingPressed = []
        this.projectilePoolSize = 10
        this.projectilePool = []
        this.menuKeyMap = {}
        this.gameKeyMap = {}
        this.gameMap = new VillageMap()
    
        this.bindInputcontrols()
        this.loadProjectilePool()
        this.#loadKeyMaps()
        this.#loadGameMap()
    }

    init() {
        this.player = new Player(this)
        this.camera = new Camera(this.gameMap.map, 512, 512)
        this.camera.follow(this.player)
    }

    update() {
        this.player.update()
        this.camera.update()
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) 
        this.gameMap.render(this.ctx, this.player.x, this.player.y)
        this.player.render(this.ctx)
        this.projectilePool.forEach(projectile => {
            projectile.update()
            projectile.render(this.ctx)
        })
    }

    bindInputcontrols() {
        //player input listeners
        window.addEventListener('keydown', (e) => {
            console.log(e.key)
            if (this.keysBeingPressed.indexOf(e.key) === -1) {
                this.keysBeingPressed.push(e.key)
            }
            this.gameKeyMap[e.key]?.()
            // if (e.key === '1') this.player.shoot()
            // if (e.key === ' ') this.player.shoot()
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

    #loadGameMap() {
        
    }

}

export default Game