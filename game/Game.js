import AssetLoader from "../assets/AssetLoader.js"
import Camera from "./Camera.js"
import Player from "./Player.js"
import Projectile from "./Projectile.js"
import VillageMap from "./map/tileMaps/VillageMap.js"


class Game { 

    constructor() {
        this.tileAtlas
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

    init(ctx) {
        this.tileAtlas = AssetLoader.getImage('villageMap');
        this.player = new Player(this, 350, 350)
        this.camera = new Camera(this.gameMap, ctx.canvas.width, ctx.canvas.height)
        this.camera.follow(this.player)
    }

    update(delta) {
        this.player.update(delta)
        this.camera.update()
    }

    render(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height) 
        this.#drawMapLayer(0, ctx)
        this.player.render(ctx)
        this.projectilePool.forEach(projectile => {
            projectile.update()
            projectile.render(ctx)
        })
        this.#drawMapLayer(1, ctx)
    }

    bindInputcontrols() {
        window.addEventListener('keydown', (e) => {
            console.log(e.key)
            if (this.keysBeingPressed.indexOf(e.key) === -1) {
                this.keysBeingPressed.push(e.key)
            }
            this.gameKeyMap[e.key]?.()
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

    #drawMapLayer(layer, ctx) {
        // console.log("drawing layer")
        var startCol = Math.floor(this.camera.x / this.gameMap.tsize);
        var endCol = startCol + (this.camera.width / this.gameMap.tsize);
        var startRow = Math.floor(this.camera.y / this.gameMap.tsize);
        var endRow = startRow + (this.camera.height / this.gameMap.tsize);
        var offsetX = -this.camera.x + startCol * this.gameMap.tsize;
        var offsetY = -this.camera.y + startRow * this.gameMap.tsize;
        // console.log(startCol, endCol, startRow, endRow, offsetX, offsetY)

        for (var c = startCol; c <= endCol; c++) {
            for (var r = startRow; r <= endRow; r++) {
                var tile = this.gameMap.getTile(layer, c, r);
                var x = (c - startCol) * this.gameMap.tsize + offsetX;
                var y = (r - startRow) * this.gameMap.tsize + offsetY;
                if (tile !== 0) { // 0 => empty tile
                    ctx.drawImage(
                        this.tileAtlas, // image
                        (tile - 1) * this.gameMap.tsize, // source x
                        0, // source y
                        this.gameMap.tsize, // source width
                        this.gameMap.tsize, // source height
                        Math.round(x),  // target x
                        Math.round(y), // target y
                        this.gameMap.tsize, // target width
                        this.gameMap.tsize // target height
                    );
                }
            }
        }
    }

}

export default Game