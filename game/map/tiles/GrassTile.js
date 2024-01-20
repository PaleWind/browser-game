import MapTile from "./MapTile.js"

export default class GrassTile extends MapTile {

    render(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}

