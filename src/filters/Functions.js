const Functions = {
    /**
    * Receive the Pixel Position and Return the Red Pixel Position on an image data
    * @param {Number} x image coordenate
    * @param {Number} y image coordenate
    * @param {Number} image width
    * @returns {Number} Red Pixel Position
    */
    getColorIndicesForCoord(x, y, width) {
        var red = y * (width * 4) + x * 4;
        return red;
    },
}

export default Functions