import MapTile from "./MapTile.js"

class DirtTile extends MapTile {

    render(ctx) {
        ctx.fillStyle = 'brown';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}

export default DirtTile