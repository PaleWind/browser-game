class BaseMap {
    constructor(cols, rows, tsize) {
        this.cols = cols;
        this.rows = rows;
        this.tsize = tsize;
        this.layers = []; // Initialize as an empty array
    }

    // Method to be used by subclasses to initialize layers
    initLayers(layers) {
        this.layers = layers;
    }
    
    getTile(layer, col, row) {
        return this.layers[layer][row * this.cols + col];
    }

    getTileFromXY(x, y) {
        var col = Math.floor(x / this.tsize);
        var row = Math.floor(y / this.tsize);
        var solid = this.layers.reduce((res, layer, index) => {
            var tile = this.getTile(index, col, row);
            var isSolid = tile === 3 || tile === 5;
            return res || isSolid;
        }, false); // Note the use of arrow function here
    
        var tile = {
            x: col * this.tsize, // Note: should be 'col', not 'row'
            y: row * this.tsize, // Note: should be 'row', not 'col'
            width: this.tsize,
            height: this.tsize,
            isSolid: solid
        }
        return tile;
    }
    

    isSolidTileAtXY(x, y) {
        var col = Math.floor(x / this.tsize);
        var row = Math.floor(y / this.tsize);

        // tiles 3 and 5 are solid -- the rest are walkable
        // loop through all layers and return TRUE if any tile is solid
        return this.layers.reduce(function (res, layer, index) {
            var tile = this.getTile(index, col, row);
            var isSolid = tile === 3 || tile === 5;
            return res || isSolid;
        }.bind(this), false);
    }

    getCol(x) {
        return Math.floor(x / this.tsize);
    }

    getRow(y) {
        return Math.floor(y / this.tsize);
    }

    getX(col) {
        return col * this.tsize;
    }

    getY(row) {
        return row * this.tsize;
    }

}

export default BaseMap;