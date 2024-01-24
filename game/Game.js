import AssetLoader from "./utils/AssetLoader.js";
import Camera from "./Camera.js";
import Player from "./Player.js";
import Projectile from "./Projectile.js";
import VillageMap from "./map/tileMaps/VillageMap.js";

class Game {
    constructor() {
        this.tileAtlas;
        this.camera;
        this.player;
        this.keysBeingPressed = [];
        this.projectilePoolSize = 10;
        this.projectilePool = [];
        this.menuKeyMap = {};
        this.gameKeyMap = {};
        this.gameMap = new VillageMap();

        this.#bindInputControls();
        this.#loadProjectilePool();
        this.#loadKeyMaps();
        this.#loadGameMap();
    }

    init(ctx) {
        this.tileAtlas = AssetLoader.getImage('villageMap');
        const playerImage = AssetLoader.getImage('player');
        this.camera = new Camera(this.gameMap, ctx.canvas.width, ctx.canvas.height);
        this.player = new Player(this, 350, 350, playerImage);
        this.camera.follow(this.player);
    }

    update(delta) {
        this.player.update(delta);
        this.camera.update();
        this.#updateProjectiles();
    }

    updateMouse(mouse) {
        this.player.mouse = mouse;
    }

    render(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.#drawMapLayer(0, ctx);
        this.player.render(ctx);
        this.#renderProjectiles(ctx);
        this.#drawMapLayer(1, ctx);
    }

    // Private methods
    #bindInputControls() {
        window.addEventListener('keydown', (e) => {
            if (!this.keysBeingPressed.includes(e.key)) {
                this.keysBeingPressed.push(e.key);
            }
            this.gameKeyMap[e.key]?.();
        });

        window.addEventListener('keyup', (e) => {
            const index = this.keysBeingPressed.indexOf(e.key);
            if (index > -1) this.keysBeingPressed.splice(index, 1);
        });
    }

    #loadProjectilePool() {
        for (let i = 0; i < this.projectilePoolSize; i++) {
            this.projectilePool.push(new Projectile());
        }
    }

    getAvailableProjectile() {
        return this.projectilePool.find(projectile => projectile.inPool);
    }

    #loadKeyMaps() {
        this.menuKeyMap['1'] = () => {};
        this.gameKeyMap['1'] = () => { this.player.shoot(); };
        this.gameKeyMap[' '] = () => { this.player.shoot(); };
    }

    #loadGameMap() {
        // Load game map logic here
    }

    #drawMapLayer(layer, ctx) {
        const startCol = Math.floor(this.camera.x / this.gameMap.tsize);
        const endCol = startCol + (this.camera.width / this.gameMap.tsize);
        const startRow = Math.floor(this.camera.y / this.gameMap.tsize);
        const endRow = startRow + (this.camera.height / this.gameMap.tsize);
        const offsetX = -this.camera.x + startCol * this.gameMap.tsize;
        const offsetY = -this.camera.y + startRow * this.gameMap.tsize;

        for (let c = startCol; c <= endCol; c++) {
            for (let r = startRow; r <= endRow; r++) {
                const tile = this.gameMap.getTile(layer, c, r);
                const x = (c - startCol) * this.gameMap.tsize + offsetX;
                const y = (r - startRow) * this.gameMap.tsize + offsetY;
                if (tile !== 0) { // 0 => empty tile
                    ctx.drawImage(
                        this.tileAtlas, 
                        (tile - 1) * this.gameMap.tsize, 
                        0, 
                        this.gameMap.tsize, 
                        this.gameMap.tsize, 
                        Math.round(x),
                        Math.round(y),
                        this.gameMap.tsize,
                        this.gameMap.tsize
                    );
                }
            }
        }
    }

    #updateProjectiles() {
        this.projectilePool.forEach(projectile => {
            projectile.update();
        });
    }

    #renderProjectiles(ctx) {
        this.projectilePool.forEach(projectile => {
            projectile.render(ctx);
        });
    }
}

export default Game;
