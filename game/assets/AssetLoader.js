class AssetLoader {
    static images = {} 

    static loadImage(key, src) {
        var img = new Image();
        img.src = src;
        this.images[key] = img;
    }

    static getImage(key) {
        return this.images[key] || null;
    }
}

export default AssetLoader