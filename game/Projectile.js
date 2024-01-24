class Projectile {

    constructor() {
        this.screenWidth = 512
        this.screenHeight = 512
        this.width = 8
        this.height = 20
        this.x = 0
        this.y = 0
        this.slope = 0
        this.middleX = this.width * 0.5
        this.middleY = this.height * 0.5
        this.speed = 10
        this.inPool = true
        this.targetX = 0
        this.targetY = 0
        this.startX = 0
        this.startY = 0
    }

    render(ctx) {
        if (!this.inPool) {
            let angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
            ctx.save();
            ctx.translate(this.x + this.middleX, this.y + this.middleY); // Translate to the center of the projectile
            ctx.rotate(angle);
            ctx.fillRect(-this.middleX, -this.middleY, this.width, this.height); // Draw the rectangle centered on the new origin
            ctx.restore();
        }
    }
    
    update() {
        if (!this.inPool) {
            const directionX = this.targetX - this.startX;
            const directionY = this.targetY - this.startY;
            const length = Math.sqrt(directionX * directionX + directionY * directionY);
            const unitX = directionX / length;
            const unitY = directionY / length;
    
            this.x += unitX * this.speed;
            this.y += unitY * this.speed;
    
            // Improved end condition
            const hasPassedTargetX = (unitX > 0 && this.x >= this.targetX) || (unitX < 0 && this.x <= this.targetX);
            const hasPassedTargetY = (unitY > 0 && this.y >= this.targetY) || (unitY < 0 && this.y <= this.targetY);
    
            if (hasPassedTargetX && hasPassedTargetY) {
                this.reset();
            }
        }
    }

    start(x, y, targetX, targetY) {
        this.targetX = targetX
        this.targetY = targetY
        this.startX = x
        this.startY = y
        this.x = x 
        this.y = y
        this.inPool = false
    }

    reset() {
        this.inPool = true
    }
}

export default Projectile