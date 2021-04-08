const NoiseReduction = {
    /**
     * Receive the Pixel Position and Return the Red Pixel Position
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} width
     * @returns {Number} Red Pixel Position
     */
    getColorIndicesForCoord(x, y, width) {
        var red = y * (width * 4) + x * 4;
        return red;
      },

    /**
     * Receive one Array and return the  Content Values Average
     * @param {Array} values 
     * @returns Number
     */
    onApplyAverage(values) {
        let count = 0
        for (let index = 0; index < values.length; index++) {
            count = count + values[index];
            
        }
        const average = count/values.length
        return average
      },

    /**
     * Receive one Array and return the  Content Values Median
     * @param {Array} values 
     * @returns Number
     */
    onApplyMedian(values) {
        const newValues = values.sort((a, b) => {return a - b})
        const index = Math.floor(values.length/2)

        if(values.length % 2)
            return newValues[index];
        else
            return (newValues[index-1] + newValues[index]) / 2.0;
    },

    
    diagonalMedian(context) {
        if (!!context) {
            // get Image from context
            const imgData = context.getImageData(0, 0, context.canvas.width, context.canvas.height)
            // Creating the variables d = diagonal (1, 2, 3, 4), color (red, green, blue), pixel (the one to modify)
            let d1, d2, d3, d4, red, green, blue, pixel = 0

            const width = parseInt(imgData.width)
            const height = parseInt(imgData.height)

            //Read every image's pixel and apply the color changes
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    // Get the The Pixel to modify
                    pixel = this.getColorIndicesForCoord(x,y,width)
                    
                    // Left Top Corner
                    if (x === 0 && y === 0) {
                        d4 =  this.getColorIndicesForCoord(x + 1,y + 1,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[d4]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[d4 + 1] ])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[d4 + 2] ])
                    // Right Top Corner
                     } else if (x === width && y === height){
                        d1 =  this.getColorIndicesForCoord(x - 1,y - 1,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[d1]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[d1 + 1] ])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[d1 + 2] ])
                    // Left Bottom Corner
                     } else if (x === 0 && y === height) {
                        d2 =  this.getColorIndicesForCoord(x + 1,y - 1,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[d2]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[d2 + 1] ])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[d2 + 2] ])
                    // Right Bottom Corner 
                     } else if (x === width && y === 0) {
                        d3 =  this.getColorIndicesForCoord(x - 1,y + 1,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[d3]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[d3 + 1] ])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[d3 + 2] ])
                        // Top Line 
                     } else if ((x > 0  && x < width) && y === 0 ) {
                        d3 =  this.getColorIndicesForCoord(x + 1,y + 1,width)
                        d4 =  this.getColorIndicesForCoord(x - 1,y + 1,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[d3], imgData.data[d4]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[d3 + 1], imgData.data[d4 + 1] ])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[d3 + 2], imgData.data[d4 + 2] ])
                        // Bottom Line 
                     } else if ((x > 0  && x < width) && y ===  (height) ) {
                        d1 =  this.getColorIndicesForCoord(x + 1,y - 1,width)
                        d2 =  this.getColorIndicesForCoord(x - 1,y - 1,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[d1], imgData.data[d2]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[d1 + 1], imgData.data[d2 + 1] ])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[d1 + 2], imgData.data[d2 + 2] ])
                        // Left Column 
                     } else if (x === 0 && (y > 0 && y < height)) {
                        d2 =  this.getColorIndicesForCoord(x + 1,y - 1,width)
                        d4 =  this.getColorIndicesForCoord(x + 1,y + 1,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[d2], imgData.data[d4]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[d2 + 1], imgData.data[d4 + 1] ])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[d2 + 2], imgData.data[d4 + 2] ])
                        // Right Column 
                    }else if ((x > width && x < width && y ===  height) ) {
                        d1 =  this.getColorIndicesForCoord(x - 1,y + 1,width)
                        d3 =  this.getColorIndicesForCoord(x - 1,y - 1,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[d1], imgData.data[d3]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[d1 + 1], imgData.data[d1 + 1] ])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[d1 + 2], imgData.data[d1 + 2] ])
                     }else {
                        //  Center's Pixels
                        d1 =  this.getColorIndicesForCoord(x - 1,y - 1,width)
                        d2 =  this.getColorIndicesForCoord(x + 1,y - 1,width)
                        d3 =  this.getColorIndicesForCoord(x - 1,y + 1,width)
                        d4 =  this.getColorIndicesForCoord(x + 1,y - 1,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[d1], imgData.data[d2], imgData.data[d3], imgData.data[d4]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[d1 + 1], imgData.data[d2 + 1], imgData.data[d3 + 1], imgData.data[d4 + 1] ])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[d1 + 2], imgData.data[d2 + 2], imgData.data[d3 + 2], imgData.data[d4 + 2] ])
                     }
                     
                    // Set Color Values on Pixels
                    imgData.data[pixel] = red
                    imgData.data[pixel + 1] = green
                    imgData.data[pixel + 2] = blue
                }
            }
            return imgData
    
        } else {
            alert("no Image selected")
        }
    },

    diagonalAverage(context) {
        if (!!context) {
            // get Image from context
            const imgData = context.getImageData(0, 0, context.canvas.width, context.canvas.height)
            // Creating the variables d = diagonal (1, 2, 3, 4), color (red, green, blue), pixel (the one to modify)
            let d1, d2, d3, d4, red, green, blue, pixel = 0
            const width = parseInt(imgData.width) 
            const height = parseInt(imgData.height)  
            //Read every image's pixel and apply the color changes
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    // Get the The Pixel to modify
                    pixel = this.getColorIndicesForCoord(x,y,width)
                    
                    // Left Top Corner
                    if (x === 0 && y === 0) {
                        d4 =  this.getColorIndicesForCoord(x + 1,y + 1,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[d4]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[d4 + 1] ])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[d4 + 2] ])
                    // Right Top Corner
                     } else if (x === width && y === height){
                        d1 =  this.getColorIndicesForCoord(x - 1,y - 1,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[d1]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[d1 + 1] ])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[d1 + 2] ])
                    // Left Bottom Corner
                     } else if (x === 0 && y === height) {
                        d2 =  this.getColorIndicesForCoord(x + 1,y - 1,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[d2]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[d2 + 1] ])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[d2 + 2] ])
                    // Right Bottom Corner 
                     } else if (x === width && y === 0) {
                        d3 =  this.getColorIndicesForCoord(x - 1,y + 1,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[d3]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[d3 + 1] ])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[d3 + 2] ])
                        // Top Line 
                     } else if ((x > 0  && x < width) && y === 0 ) {
                        d3 =  this.getColorIndicesForCoord(x + 1,y + 1,width)
                        d4 =  this.getColorIndicesForCoord(x - 1,y + 1,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[d3], imgData.data[d4]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[d3 + 1], imgData.data[d4 + 1] ])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[d3 + 2], imgData.data[d4 + 2] ])
                        // Bottom Line 
                     } else if ((x > 0  && x < width) && y ===  height -1 ) {
                        d1 =  this.getColorIndicesForCoord(x + 1,y - 1,width)
                        d2 =  this.getColorIndicesForCoord(x - 1,y - 1,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[d1], imgData.data[d2]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[d1 + 1], imgData.data[d2 + 1] ])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[d1 + 2], imgData.data[d2 + 2] ])
                        // Left Column 
                     } else if (x === 0 && (y > 0 && y < height)) {
                        d2 =  this.getColorIndicesForCoord(x + 1,y - 1,width)
                        d4 =  this.getColorIndicesForCoord(x + 1,y + 1,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[d2], imgData.data[d4]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[d2 + 1], imgData.data[d4 + 1] ])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[d2 + 2], imgData.data[d4 + 2] ])
                        // Right Column 
                    }else if ((x > width && x < width && y ===  height) ) {
                        d1 =  this.getColorIndicesForCoord(x - 1,y + 1,width)
                        d3 =  this.getColorIndicesForCoord(x - 1,y - 1,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[d1], imgData.data[d3]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[d1 + 1], imgData.data[d1 + 1] ])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[d1 + 2], imgData.data[d1 + 2] ])
                     }else {
                        //  Center's Pixels
                        d1 =  this.getColorIndicesForCoord(x - 1,y - 1,width)
                        d2 =  this.getColorIndicesForCoord(x + 1,y - 1,width)
                        d3 =  this.getColorIndicesForCoord(x - 1,y + 1,width)
                        d4 =  this.getColorIndicesForCoord(x + 1,y - 1,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[d1], imgData.data[d2], imgData.data[d3], imgData.data[d4]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[d1 + 1], imgData.data[d2 + 1], imgData.data[d3 + 1], imgData.data[d4 + 1] ])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[d1 + 2], imgData.data[d2 + 2], imgData.data[d3 + 2], imgData.data[d4 + 2] ])
                     }
                     
                    // Set Color Values on Pixels
                    imgData.data[pixel] = red
                    imgData.data[pixel + 1] = green
                    imgData.data[pixel + 2] = blue
                }
            }
            return imgData
    
        } else {
            alert("no Image selected")
        }
    },

    linearMedian(context) {
        if (!!context) {
            // get Image from context
            const imgData = context.getImageData(0, 0, context.canvas.width, context.canvas.height)
            // Creating the variables l = linear (top, bottom, right, left), color (red, green, blue), pixel (the one to modify)
            let lt, lb, lr, ll, red, green, blue, pixel = 0
            const width = parseInt(imgData.width)
            const height = parseInt(imgData.height)
            //Read every image's pixel and apply the color changes
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    // Get the The Pixel to modify
                    pixel = this.getColorIndicesForCoord(x,y,width)
                    
                    // Left Top Corner
                    if (x === 0 && y === 0) {
                        lr =  this.getColorIndicesForCoord(x + 1,y ,width)
                        lb =  this.getColorIndicesForCoord(x,y + 1 ,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[lr], imgData.data[lb]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[lr + 1], imgData.data[lb + 1]])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[lr + 2], imgData.data[lb + 2]])
                    // Right Top Corner
                     } else if (x === width && y === height){
                        lt =  this.getColorIndicesForCoord(x,y - 1,width)
                        ll =  this.getColorIndicesForCoord(x - 1,y,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[lt], imgData.data[ll]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[lt + 1], imgData.data[ll + 1]])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[lt + 2], imgData.data[ll + 2]])
                    // Left Bottom Corner
                     } else if (x === 0 && y === height) {
                        lt =  this.getColorIndicesForCoord(x,y - 1,width)
                        lr =  this.getColorIndicesForCoord(x + 1,y,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[lt], imgData.data[lr]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[lt + 1],imgData.data[lr + 1]])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[lt + 2], imgData.data[lr + 2]])
                    // Right Bottom Corner 
                     } else if (x === width && y === 0) {
                        ll =  this.getColorIndicesForCoord(x - 1,y,width)
                        lb =  this.getColorIndicesForCoord(x,y + 1,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[ll], imgData.data[lb]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[ll + 1], imgData.data[lb + 1]])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[ll + 2], imgData.data[lb + 2]])
                        // Top Line 
                     } else if ((x > 0  && x < width) && y === 0 ) {
                        ll =  this.getColorIndicesForCoord(x - 1,y,width)
                        lr =  this.getColorIndicesForCoord(x + 1,y,width)
                        lb =  this.getColorIndicesForCoord(x,y + 1,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[ll], imgData.data[lr], imgData.data[lb]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[ll + 1], imgData.data[lr + 1], imgData.data[lb + 1] ])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[ll + 2], imgData.data[lr + 2], imgData.data[lb + 2] ])
                        // Bottom Line 
                     } else if ((x > 0  && x < width) && y ===  height ) {
                        ll =  this.getColorIndicesForCoord(x - 1,y,width)
                        lr =  this.getColorIndicesForCoord(x + 1,y,width)
                        lt =  this.getColorIndicesForCoord(x,y - 1,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[ll], imgData.data[lr], imgData.data[lt]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[ll + 1], imgData.data[lr + 1], imgData.data[lt + 1] ])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[ll + 2], imgData.data[lr + 2], imgData.data[lt + 2] ])
                        // Left olumn 
                     } else if (x === 0 && (y > 0 && y < height)) {
                        lr =  this.getColorIndicesForCoord(x + 1,y,width)
                        lb =  this.getColorIndicesForCoord(x,y + 1,width)
                        lt =  this.getColorIndicesForCoord(x,y - 1,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[lr], imgData.data[lb], imgData.data[lt]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[lr + 1], imgData.data[lb + 1], imgData.data[lt + 1] ])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[lr + 2], imgData.data[lb + 2], imgData.data[lt + 2] ])
                        // Right Column 
                    }else if ((x > width && x < width && y ===  height) ) {
                        ll =  this.getColorIndicesForCoord(x - 1,y,width)
                        lb =  this.getColorIndicesForCoord(x,y + 1,width)
                        lt =  this.getColorIndicesForCoord(x,y - 1,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[ll], imgData.data[lb], imgData.data[lt]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[ll + 1], imgData.data[lb + 1], imgData.data[lt + 1] ])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[ll + 2], imgData.data[lb + 2], imgData.data[lt + 2] ])
                     }else {
                        //  Center's Pixels
                        ll =  this.getColorIndicesForCoord(x - 1,y,width)
                        lr =  this.getColorIndicesForCoord(x + 1,y,width)
                        lt =  this.getColorIndicesForCoord(x,y - 1,width)
                        lb =  this.getColorIndicesForCoord(x,y + 1,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[ll], imgData.data[lr], imgData.data[lt], imgData.data[lb]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[ll + 1], imgData.data[lr + 1], imgData.data[lt + 1], imgData.data[lb + 1] ])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[ll + 2], imgData.data[lr + 2], imgData.data[lt + 2], imgData.data[lb + 2] ])
                     }
                     
                    // Set Color Values on Pixels
                    imgData.data[pixel] = red
                    imgData.data[pixel + 1] = green
                    imgData.data[pixel + 2] = blue
                }
            }
            return imgData
    
        } else {
            alert("no Image selected")
        }
    },

    linearAverage(context) {
        if (!!context) {
            // get Image from context
            const imgData = context.getImageData(0, 0, context.canvas.width, context.canvas.height)
            // Creating the variables l = linear (top, bottom, right, left), color (red, green, blue), pixel (the one to modify)
            let lt, lb, lr, ll, red, green, blue, pixel = 0
            const width = parseInt(imgData.width)
            const height = parseInt(imgData.height)
            //Read every image's pixel and apply the color changes
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    // Get the The Pixel to modify
                    pixel = this.getColorIndicesForCoord(x,y,width)
                    
                    // Left Top Corner
                    if (x === 0 && y === 0) {
                        lr =  this.getColorIndicesForCoord(x + 1,y ,width)
                        lb =  this.getColorIndicesForCoord(x,y + 1 ,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[lr], imgData.data[lb]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[lr + 1], imgData.data[lb + 1]])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[lr + 2], imgData.data[lb + 2]])
                    // Right Top Corner
                     } else if (x === width && y === height){
                        lt =  this.getColorIndicesForCoord(x,y - 1,width)
                        ll =  this.getColorIndicesForCoord(x - 1,y,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[lt], imgData.data[ll]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[lt + 1], imgData.data[ll + 1]])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[lt + 2], imgData.data[ll + 2]])
                    // Left Bottom Corner
                     } else if (x === 0 && y === height) {
                        lt =  this.getColorIndicesForCoord(x,y - 1,width)
                        lr =  this.getColorIndicesForCoord(x + 1,y,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[lt], imgData.data[lr]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[lt + 1],imgData.data[lr + 1]])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[lt + 2], imgData.data[lr + 2]])
                    // Right Bottom Corner 
                     } else if (x === width && y === 0) {
                        ll =  this.getColorIndicesForCoord(x - 1,y,width)
                        lb =  this.getColorIndicesForCoord(x,y + 1,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[ll], imgData.data[lb]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[ll + 1], imgData.data[lb + 1]])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[ll + 2], imgData.data[lb + 2]])
                        // Top Line 
                     } else if ((x > 0  && x < width) && y === 0 ) {
                        ll =  this.getColorIndicesForCoord(x - 1,y,width)
                        lr =  this.getColorIndicesForCoord(x + 1,y,width)
                        lb =  this.getColorIndicesForCoord(x,y + 1,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[ll], imgData.data[lr], imgData.data[lb]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[ll + 1], imgData.data[lr + 1], imgData.data[lb + 1] ])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[ll + 2], imgData.data[lr + 2], imgData.data[lb + 2] ])
                        // Bottom Line 
                     } else if ((x > 0  && x < width) && y ===  height - 1 ) {
                        ll =  this.getColorIndicesForCoord(x - 1,y,width)
                        lr =  this.getColorIndicesForCoord(x + 1,y,width)
                        lt =  this.getColorIndicesForCoord(x,y - 1,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[ll], imgData.data[lr], imgData.data[lt]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[ll + 1], imgData.data[lr + 1], imgData.data[lt + 1] ])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[ll + 2], imgData.data[lr + 2], imgData.data[lt + 2] ])
                        // Left Column 
                     } else if (x === 0 && (y > 0 && y < height)) {
                        lr =  this.getColorIndicesForCoord(x + 1,y,width)
                        lb =  this.getColorIndicesForCoord(x,y + 1,width)
                        lt =  this.getColorIndicesForCoord(x,y - 1,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[lr], imgData.data[lb], imgData.data[lt]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[lr + 1], imgData.data[lb + 1], imgData.data[lt + 1] ])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[lr + 2], imgData.data[lb + 2], imgData.data[lt + 2] ])
                        // Right Column 
                    }else if ((x > width && x < width && y ===  height) ) {
                        ll =  this.getColorIndicesForCoord(x - 1,y,width)
                        lb =  this.getColorIndicesForCoord(x,y + 1,width)
                        lt =  this.getColorIndicesForCoord(x,y - 1,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[ll], imgData.data[lb], imgData.data[lt]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[ll + 1], imgData.data[lb + 1], imgData.data[lt + 1] ])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[ll + 2], imgData.data[lb + 2], imgData.data[lt + 2] ])
                     }else {
                        //  Center's Pixels
                        ll =  this.getColorIndicesForCoord(x - 1,y,width)
                        lr =  this.getColorIndicesForCoord(x + 1,y,width)
                        lt =  this.getColorIndicesForCoord(x,y - 1,width)
                        lb =  this.getColorIndicesForCoord(x,y + 1,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[ll], imgData.data[lr], imgData.data[lt], imgData.data[lb]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[ll + 1], imgData.data[lr + 1], imgData.data[lt + 1], imgData.data[lb + 1] ])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[ll + 2], imgData.data[lr + 2], imgData.data[lt + 2], imgData.data[lb + 2] ])
                     }
                     
                    // Set Color Values on Pixels
                    imgData.data[pixel] = red
                    imgData.data[pixel + 1] = green
                    imgData.data[pixel + 2] = blue
                }
            }
            return imgData
    
        } else {
            alert("no Image selected")
        }
    },

    bothMedian(context) {
        if (!!context) {
            // get Image from context
            const imgData = context.getImageData(0, 0, context.canvas.width, context.canvas.height)
            // Creating the variables d = diagonal (1, 2, 3, 4), linear(left, right, top, bottom), color (red, green, blue), pixel (the one to modify)
            let d1, d2, d3, d4, ll, lr, lt, lb, red, green, blue, pixel = 0
            const width = parseInt(imgData.width)
            const height = parseInt(imgData.height)
            //Read every image's pixel and apply the color changes
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    // Get the The Pixel to modify
                    pixel = this.getColorIndicesForCoord(x,y,width)
                    
                    // Left Top Corner
                    if (x === 0 && y === 0) {
                        d4 =  this.getColorIndicesForCoord(x + 1,y + 1,width)
                        lr =  this.getColorIndicesForCoord(x + 1,y ,width)
                        lb =  this.getColorIndicesForCoord(x,y + 1 ,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[lr], imgData.data[lb], imgData.data[d4] ])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[lr + 1], imgData.data[lb + 1], imgData.data[d4 + 1]])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[lr + 2], imgData.data[lb + 2], imgData.data[d4 + 2]])
                    // Right Top Corner
                     } else if (x === width && y === height){
                        d1 =  this.getColorIndicesForCoord(x - 1,y - 1,width)
                        lt =  this.getColorIndicesForCoord(x,y - 1,width)
                        ll =  this.getColorIndicesForCoord(x - 1,y,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[lt], imgData.data[ll], imgData.data[d1]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[lt + 1], imgData.data[ll + 1], imgData.data[d1 + 1]])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[lt + 2], imgData.data[ll + 2], imgData.data[d1 + 2]])
                    // Left Bottom Corner
                     } else if (x === 0 && y === height) {
                        d2 =  this.getColorIndicesForCoord(x + 1,y - 1,width)
                        lt =  this.getColorIndicesForCoord(x,y - 1,width)
                        lr =  this.getColorIndicesForCoord(x + 1,y,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[lt], imgData.data[lr], imgData.data[d2]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[lt + 1],imgData.data[lr + 1], imgData.data[d2 + 1]])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[lt + 2], imgData.data[lr + 2], imgData.data[d2 + 2]])
                    // Right Bottom Corner 
                     } else if (x === width && y === 0) {
                        d3 =  this.getColorIndicesForCoord(x - 1,y + 1,width)
                        ll =  this.getColorIndicesForCoord(x - 1,y,width)
                        lb =  this.getColorIndicesForCoord(x,y + 1,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[ll], imgData.data[lb], imgData.data[d3]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[ll + 1], imgData.data[lb + 1], imgData.data[d3 + 1]])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[ll + 2], imgData.data[lb + 2], imgData.data[d3 + 2]])
                        // Top Line 
                     } else if ((x > 0  && x < width) && y === 0 ) {
                        d3 =  this.getColorIndicesForCoord(x + 1,y + 1,width)
                        d4 =  this.getColorIndicesForCoord(x - 1,y + 1,width)
                        ll =  this.getColorIndicesForCoord(x - 1,y,width)
                        lr =  this.getColorIndicesForCoord(x + 1,y,width)
                        lb =  this.getColorIndicesForCoord(x,y + 1,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[ll], imgData.data[lr], imgData.data[lb], imgData.data[d3], imgData.data[d4] ])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[ll + 1], imgData.data[lr + 1], imgData.data[lb + 1] , imgData.data[d3 + 1], imgData.data[d4 + 1] ])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[ll + 2], imgData.data[lr + 2], imgData.data[lb + 2] , imgData.data[d3 + 2], imgData.data[d4 + 2] ])
                        // Bottom Line 
                     } else if ((x > 0  && x < width) && y ===  height ) {
                        d1 =  this.getColorIndicesForCoord(x + 1,y - 1,width)
                        d2 =  this.getColorIndicesForCoord(x - 1,y - 1,width)
                        ll =  this.getColorIndicesForCoord(x - 1,y,width)
                        lr =  this.getColorIndicesForCoord(x + 1,y,width)
                        lt =  this.getColorIndicesForCoord(x,y - 1,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[ll], imgData.data[lr], imgData.data[lt], imgData.data[d1], imgData.data[d2]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[ll + 1], imgData.data[lr + 1], imgData.data[lt + 1], imgData.data[d1 + 1], imgData.data[d2 + 1]])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[ll + 2], imgData.data[lr + 2], imgData.data[lt + 2], imgData.data[d1 + 2], imgData.data[d2 + 2]])
                        // Left olumn 
                     } else if (x === 0 && (y > 0 && y < height)) {
                        d2 =  this.getColorIndicesForCoord(x + 1,y - 1,width)
                        d4 =  this.getColorIndicesForCoord(x + 1,y + 1,width)
                        lr =  this.getColorIndicesForCoord(x + 1,y,width)
                        lb =  this.getColorIndicesForCoord(x,y + 1,width)
                        lt =  this.getColorIndicesForCoord(x,y - 1,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[lr], imgData.data[lb], imgData.data[lt], imgData.data[d2], imgData.data[d4]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[lr + 1], imgData.data[lb + 1], imgData.data[lt + 1], imgData.data[d2 + 1], imgData.data[d4 + 2]])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[lr + 2], imgData.data[lb + 2], imgData.data[lt + 2], imgData.data[d2 + 1], imgData.data[d4 + 2]])
                        // Right Column 
                    }else if ((x > width && x < width && y ===  height) ) {
                        d1 =  this.getColorIndicesForCoord(x - 1,y + 1,width)
                        d3 =  this.getColorIndicesForCoord(x - 1,y - 1,width)
                        ll =  this.getColorIndicesForCoord(x - 1,y,width)
                        lb =  this.getColorIndicesForCoord(x,y + 1,width)
                        lt =  this.getColorIndicesForCoord(x,y - 1,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[ll], imgData.data[lb], imgData.data[lt], imgData.data[d1], imgData.data[d3]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[ll + 1], imgData.data[lb + 1], imgData.data[lt + 1], imgData.data[d1 + 1], imgData.data[d3 + 1]])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[ll + 2], imgData.data[lb + 2], imgData.data[lt + 2], imgData.data[d1 + 2], imgData.data[d3 + 2]])
                     }else {
                        //  Center's Pixels
                        d1 =  this.getColorIndicesForCoord(x - 1,y - 1,width)
                        d2 =  this.getColorIndicesForCoord(x + 1,y - 1,width)
                        d3 =  this.getColorIndicesForCoord(x - 1,y + 1,width)
                        d4 =  this.getColorIndicesForCoord(x + 1,y - 1,width)
                        ll =  this.getColorIndicesForCoord(x - 1,y,width)
                        lr =  this.getColorIndicesForCoord(x + 1,y,width)
                        lt =  this.getColorIndicesForCoord(x,y - 1,width)
                        lb =  this.getColorIndicesForCoord(x,y + 1,width)
                        red = this.onApplyMedian([imgData.data[pixel], imgData.data[ll], imgData.data[lr], imgData.data[lt], imgData.data[lb], imgData.data[d1], imgData.data[d2], imgData.data[d3], imgData.data[d4]])
                        green = this.onApplyMedian([imgData.data[pixel +1], imgData.data[ll + 1], imgData.data[lr + 1], imgData.data[lt + 1], imgData.data[lb + 1], imgData.data[d1 + 1], imgData.data[d2 + 1], imgData.data[d3 + 1], imgData.data[d4 + 1]])
                        blue = this.onApplyMedian([imgData.data[pixel + 2], imgData.data[ll + 2], imgData.data[lr + 2], imgData.data[lt + 2], imgData.data[lb + 2], imgData.data[d1 + 2], imgData.data[d2 + 2], imgData.data[d3 + 2], imgData.data[d4 + 2]])
                     }
                     
                    // Set Color Values on Pixels
                    imgData.data[pixel] = red
                    imgData.data[pixel + 1] = green
                    imgData.data[pixel + 2] = blue
                }
            }
            return imgData
    
        } else {
            alert("no Image selected")
        }
    },

    bothAverage(context) {
        if (!!context) {
            // get Image from context
            const imgData = context.getImageData(0, 0, context.canvas.width, context.canvas.height)
            // Creating the variables d = diagonal (1, 2, 3, 4), linear(left, right, top, bottom), color (red, green, blue), pixel (the one to modify)
            let d1, d2, d3, d4, ll, lr, lt, lb, red, green, blue, pixel = 0
            const width = parseInt(imgData.width)
            const height = parseInt(imgData.height)
            //Read every image's pixel and apply the color changes
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    // Get the The Pixel to modify
                    pixel = this.getColorIndicesForCoord(x,y,width)
                    
                    // Left Top Corner
                    if (x === 0 && y === 0) {
                        d4 =  this.getColorIndicesForCoord(x + 1,y + 1,width)
                        lr =  this.getColorIndicesForCoord(x + 1,y ,width)
                        lb =  this.getColorIndicesForCoord(x,y + 1 ,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[lr], imgData.data[lb], imgData.data[d4] ])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[lr + 1], imgData.data[lb + 1], imgData.data[d4 + 1]])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[lr + 2], imgData.data[lb + 2], imgData.data[d4 + 2]])
                    // Right Top Corner
                     } else if (x === width && y === height){
                        d1 =  this.getColorIndicesForCoord(x - 1,y - 1,width)
                        lt =  this.getColorIndicesForCoord(x,y - 1,width)
                        ll =  this.getColorIndicesForCoord(x - 1,y,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[lt], imgData.data[ll], imgData.data[d1]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[lt + 1], imgData.data[ll + 1], imgData.data[d1 + 1]])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[lt + 2], imgData.data[ll + 2], imgData.data[d1 + 2]])
                    // Left Bottom Corner
                     } else if (x === 0 && y === height) {
                        d2 =  this.getColorIndicesForCoord(x + 1,y - 1,width)
                        lt =  this.getColorIndicesForCoord(x,y - 1,width)
                        lr =  this.getColorIndicesForCoord(x + 1,y,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[lt], imgData.data[lr], imgData.data[d2]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[lt + 1],imgData.data[lr + 1], imgData.data[d2 + 1]])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[lt + 2], imgData.data[lr + 2], imgData.data[d2 + 2]])
                    // Right Bottom Corner 
                     } else if (x === width && y === 0) {
                        d3 =  this.getColorIndicesForCoord(x - 1,y + 1,width)
                        ll =  this.getColorIndicesForCoord(x - 1,y,width)
                        lb =  this.getColorIndicesForCoord(x,y + 1,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[ll], imgData.data[lb], imgData.data[d3]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[ll + 1], imgData.data[lb + 1], imgData.data[d3 + 1]])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[ll + 2], imgData.data[lb + 2], imgData.data[d3 + 2]])
                        // Top Line 
                     } else if ((x > 0  && x < width) && y === 0 ) {
                        d3 =  this.getColorIndicesForCoord(x + 1,y + 1,width)
                        d4 =  this.getColorIndicesForCoord(x - 1,y + 1,width)
                        ll =  this.getColorIndicesForCoord(x - 1,y,width)
                        lr =  this.getColorIndicesForCoord(x + 1,y,width)
                        lb =  this.getColorIndicesForCoord(x,y + 1,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[ll], imgData.data[lr], imgData.data[lb], imgData.data[d3], imgData.data[d4] ])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[ll + 1], imgData.data[lr + 1], imgData.data[lb + 1] , imgData.data[d3 + 1], imgData.data[d4 + 1] ])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[ll + 2], imgData.data[lr + 2], imgData.data[lb + 2] , imgData.data[d3 + 2], imgData.data[d4 + 2] ])
                        // Bottom Line 
                     } else if ((x > 0  && x < width) && y ===  height -1 ) {
                        d1 =  this.getColorIndicesForCoord(x + 1,y - 1,width)
                        d2 =  this.getColorIndicesForCoord(x - 1,y - 1,width)
                        ll =  this.getColorIndicesForCoord(x - 1,y,width)
                        lr =  this.getColorIndicesForCoord(x + 1,y,width)
                        lt =  this.getColorIndicesForCoord(x,y - 1,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[ll], imgData.data[lr], imgData.data[lt], imgData.data[d1], imgData.data[d2]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[ll + 1], imgData.data[lr + 1], imgData.data[lt + 1], imgData.data[d1 + 1], imgData.data[d2 + 1]])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[ll + 2], imgData.data[lr + 2], imgData.data[lt + 2], imgData.data[d1 + 2], imgData.data[d2 + 2]])
                        // Left olumn 
                     } else if (x === 0 && (y > 0 && y < height)) {
                        d2 =  this.getColorIndicesForCoord(x + 1,y - 1,width)
                        d4 =  this.getColorIndicesForCoord(x + 1,y + 1,width)
                        lr =  this.getColorIndicesForCoord(x + 1,y,width)
                        lb =  this.getColorIndicesForCoord(x,y + 1,width)
                        lt =  this.getColorIndicesForCoord(x,y - 1,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[lr], imgData.data[lb], imgData.data[lt], imgData.data[d2], imgData.data[d4]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[lr + 1], imgData.data[lb + 1], imgData.data[lt + 1], imgData.data[d2 + 1], imgData.data[d4 + 2]])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[lr + 2], imgData.data[lb + 2], imgData.data[lt + 2], imgData.data[d2 + 1], imgData.data[d4 + 2]])
                        // Right Column 
                    }else if ((x > width && x < width && y ===  height) ) {
                        d1 =  this.getColorIndicesForCoord(x - 1,y + 1,width)
                        d3 =  this.getColorIndicesForCoord(x - 1,y - 1,width)
                        ll =  this.getColorIndicesForCoord(x - 1,y,width)
                        lb =  this.getColorIndicesForCoord(x,y + 1,width)
                        lt =  this.getColorIndicesForCoord(x,y - 1,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[ll], imgData.data[lb], imgData.data[lt], imgData.data[d1], imgData.data[d3]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[ll + 1], imgData.data[lb + 1], imgData.data[lt + 1], imgData.data[d1 + 1], imgData.data[d3 + 1]])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[ll + 2], imgData.data[lb + 2], imgData.data[lt + 2], imgData.data[d1 + 2], imgData.data[d3 + 2]])
                     }else {
                        //  Center's Pixels
                        d1 =  this.getColorIndicesForCoord(x - 1,y - 1,width)
                        d2 =  this.getColorIndicesForCoord(x + 1,y - 1,width)
                        d3 =  this.getColorIndicesForCoord(x - 1,y + 1,width)
                        d4 =  this.getColorIndicesForCoord(x + 1,y - 1,width)
                        ll =  this.getColorIndicesForCoord(x - 1,y,width)
                        lr =  this.getColorIndicesForCoord(x + 1,y,width)
                        lt =  this.getColorIndicesForCoord(x,y - 1,width)
                        lb =  this.getColorIndicesForCoord(x,y + 1,width)
                        red = this.onApplyAverage([imgData.data[pixel], imgData.data[ll], imgData.data[lr], imgData.data[lt], imgData.data[lb], imgData.data[d1], imgData.data[d2], imgData.data[d3], imgData.data[d4]])
                        green = this.onApplyAverage([imgData.data[pixel +1], imgData.data[ll + 1], imgData.data[lr + 1], imgData.data[lt + 1], imgData.data[lb + 1], imgData.data[d1 + 1], imgData.data[d2 + 1], imgData.data[d3 + 1], imgData.data[d4 + 1]])
                        blue = this.onApplyAverage([imgData.data[pixel + 2], imgData.data[ll + 2], imgData.data[lr + 2], imgData.data[lt + 2], imgData.data[lb + 2], imgData.data[d1 + 2], imgData.data[d2 + 2], imgData.data[d3 + 2], imgData.data[d4 + 2]])
                     }
                     
                    // Set Color Values on Pixels
                    imgData.data[pixel] = red
                    imgData.data[pixel + 1] = green
                    imgData.data[pixel + 2] = blue
                }
            }
            return imgData
    
        } else {
            alert("no Image selected")
        }
    },
    
}

export default NoiseReduction