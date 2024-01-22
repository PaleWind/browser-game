export class DebugInfoRenderer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    render(game, fps) {
        // Set the font, color, and other styles for the debug text
        this.ctx.font = '16px Arial';
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'top';

        // Display player information
        this.ctx.fillText(`Player Position: (${game.player.x}, ${game.player.y})`, 10, 10);

        this.ctx.fillText(`Map Size: ${game.gameMap.width}x${game.gameMap.height}`, 10, 30);

        // Display camera information
        this.ctx.fillText(`Camera Position: (${game.camera.x}, ${game.camera.y})`, 10, 50);

        // Add more information as needed
        this.ctx.fillText(`FPS: ${fps}`, 10, 70);
    }
}