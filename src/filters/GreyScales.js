const GreyScales = {
    aritmeticAverage(context) {
        if (!!context) {
            const imgData = context.getImageData(0, 0, context.canvas.width, context.canvas.height)
            const data = imgData.data
            let red = [];
            let green = [];
            let blue = [];
            let average = 0
            //Read image and make changes on the fly as it's read  
            for (let i = 0; i < data.length; i += 4) {
                // Calculating Average
                average = (imgData.data[i] +   imgData.data[i + 1] + imgData.data[i +2]) /3
                // Renaming the Pixel with the Average Value
                red[i] = average
                green[i] = average
                blue[i] = average
            }
    
            // Write the image back to the canvas
            for (let i = 0; i < data.length; i += 4) {
                imgData.data[i] = red[i];
                imgData.data[i + 1] = green[i];
                imgData.data[i + 2] = blue[i];
            }
            return(imgData)
    
        } else {
            alert("no Image selected")
        }
    },

    weightedAverage(context, range) {
        if (!!context) {
            const imgData = context.getImageData(0, 0, context.canvas.width, context.canvas.height)
            const data = imgData.data
            let red = [];
            let green = [];
            let blue = [];
            let average = 0
            
            //Read image and make changes on the fly as it's read  
            for (let i = 0; i < data.length; i += 4) {
                // Calculating Average
                average = ((imgData.data[i] * range.red ) + (imgData.data[i + 1] * range.green) + (imgData.data[i +2] * range.blue)) / 100
                // Renaming the Pixel with the Average Value
                red[i] = average
                green[i] = average
                blue[i] = average
            }
    
            // Write the image back to the canvas
            for (let i = 0; i < data.length; i += 4) {
                imgData.data[i] = red[i];
                imgData.data[i + 1] = green[i];
                imgData.data[i + 2] = blue[i];
            }
            return(imgData)
    
        } else {
            alert("no Image selected")
        }
    }
}

export default GreyScales