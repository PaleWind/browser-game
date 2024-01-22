class MapTile {

    constructor(x, y, width, height) {
        if (new.target === MapTile) {
            throw new Error("MapTile is an abstract class and cannot be instantiated directly.");
        }

        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
    
    render(ctx) {
        throw new Error("Abstract method 'render' must be implemented in derived classes.");        
    }
}

export default MapTile