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
    cutImage(width, height, imageData) {
         // Creating a new Canvas Element
        let canvas = document.createElement("CANVAS");
        // Setting the Size (Width and Height)
        canvas.width = width
        canvas.height = height
        // Getting the Context
        let context = canvas.getContext('2d')
        // Creating an Empty Image
        let result = context.createImageData(width, height)
         // Read image and make changes on the fly as it's read
         let pixel = 0  
        for (let x = 0; x <= width; x++) {
            for (let y = 0; y <= height; y++) {
                // Selecting the red Pixel coordenate accordding to the image
                pixel = this.getColorIndicesForCoord(x, y, imageData.width)
    
                // Setting the pixel of the image created according to the percentage
                result.data[pixel] = imageData.data[pixel]
                result.data[pixel + 1] = imageData.data[pixel + 1]
                result.data[pixel + 2] = imageData.data[pixel + 2]
                result.data[pixel + 3] = imageData.data[pixel + 3]
            }
            
        }
    }

   
}

export default Functions