class Player {

    constructor(game, x, y, image) {
        this.game = game
        this.image = image
        this.width = game.gameMap.tsize 
        this.height = game.gameMap.tsize
        this.middleX = this.width / 2
        this.mX = game.gameMap.rows * game.gameMap.tsize  
        this.mY = game.gameMap.cols * game.gameMap.tsize 
        this.canvasMiddleX = Math.floor(game.camera.width / 2)
        this.canvasMiddleY = Math.floor(game.camera.height / 2)
        this.x = x 
        this.y = y 
        this.speed = 5
        this.diagonalFactor = Math.sqrt(2)
        this.screenX = x
        this.screenY = y
        this.moveHorizontal = 0
        this.moveVertical = 0
        this.computedSpeed = 0
        this.mouse = {x: 0, y: 0}
        // Initialize animations
        this.initializeAnimations();
    }

    render(ctx) {
        //bounds check
        // ctx.fillStyle = 'white'
        // ctx.fillRect(this.screenX, this.screenY, this.width, this.height)

        let position = Math.floor(this.gameFrame/this.staggerFrames) % this.animations["run"].location.length
        this.frameX = this.spriteWidth * position
        this.frameY = this.animations["run"].location[position].y
        this.gameFrame++
        if (this.gameFrame > this.maxGameFrame) {
            this.gameFrame = 0;
        }

        if (this.mouse.x > this.screenX) {
            // Mouse is on the right half, draw sprite normally
            ctx.drawImage(this.image, this.frameX, this.frameY, this.spriteWidth, this.spriteHeight, this.screenX, this.screenY, this.width, this.height)
        } else {
            // Mouse is on the left half, draw sprite flipped
            ctx.save();
            ctx.translate(this.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(this.image, this.frameX, this.frameY, this.spriteWidth, this.spriteHeight, this.screenX*-1, this.screenY, this.width, this.height)
            ctx.restore();
        }
    }

    update(delta) {
        this.#move(delta)
    }

    shoot() {
       const projectile = this.game.getAvailableProjectile()
       if (projectile) projectile.start(this.screenX + this.middleX, this.screenY + this.middleX, this.mouse.x, this.mouse.y) 
    }

    #move(delta) {
        this.moveHorizontal = this.game.keysBeingPressed.includes('ArrowLeft') * -1 +
                                this.game.keysBeingPressed.includes('ArrowRight') * 1
        this.moveVertical = this.game.keysBeingPressed.includes('ArrowUp') * -1 +
                            this.game.keysBeingPressed.includes('ArrowDown') * 1

        this.computedSpeed = this.speed -
                                (this.diagonalFactor *
                                Math.abs(this.moveHorizontal) & Math.abs(this.moveVertical))

        let newX = this.x + this.moveHorizontal * this.computedSpeed
        let newY = this.y + this.moveVertical * this.computedSpeed

        // Separately handle X and Y collisions
        if (!this.#collidesWithSolid(newX, this.y)) {
            this.x = Math.max(0, Math.min(newX, this.mX - this.width))
        }
        if (!this.#collidesWithSolid(this.x, newY)) {
            this.y = Math.max(0, Math.min(newY, this.mY - this.height))
        }
    }

    #collidesWithSolid(x, y) {
        const buffer = 2

        return this.game.gameMap.isSolidTileAtXY(x + buffer, y + buffer) ||
                this.game.gameMap.isSolidTileAtXY(x + this.width - buffer, y + buffer) ||
                this.game.gameMap.isSolidTileAtXY(x + buffer, y + this.height - buffer) ||
                this.game.gameMap.isSolidTileAtXY(x + this.width - buffer, y + this.height - buffer)
    }
    
    initializeAnimations() {
        this.frameX = 0
        this.frameY = 0
        this.staggerFrames = 10
        this.gameFrame = 0
        this.maxGameFrame = Number.MAX_SAFE_INTEGER / 2
        this.spriteWidth = 32
        this.spriteHeight = 32
        this.animations = []
        this.animationStates = [
            { name: 'idle', frames: 2 },
            { name: 'idle2', frames: 2 },
            { name: 'walk', frames: 4 },
            { name: 'run', frames: 8 }
        ];
    
        this.animationStates.forEach((state, index) => {
            let frames = {
                location: []
            }
            for (let j=0; j<state.frames; j++) {
                let positionX = j * this.spriteWidth
                let positionY = index * this.spriteHeight
                frames.location.push({x: positionX, y: positionY})
            }
            this.animations[state.name] = frames
        })
        console.log(this.animations)
    }

}

export default Player