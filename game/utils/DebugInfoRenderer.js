export class DebugInfoRenderer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    render(game, fps) {
        // Set the font, color, and other styles for the debug text
        this.ctx.font = '16px Arial';
        this.ctx.fillStyle = '#f2e8d0';
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'top';

        // Display player information
        this.ctx.fillText(`Player Position: (${game.player.x}, ${game.player.y})`, 10, 10);

        this.ctx.fillText(`Map Size: ${game.gameMap.rows * game.gameMap.tsize}x${game.gameMap.cols * game.gameMap.tsize}`, 10, 30);

        // Display camera information
        this.ctx.fillText(`Camera Position: (${game.camera.x}, ${game.camera.y})`, 10, 50);

        this.ctx.fillText(`FPS: ${fps}`, 10, 70);

        this.ctx.fillText(`Mouse Position: ${game.player.mouse.x}, ${game.player.mouse.y}`, 10, 90);
    }
}