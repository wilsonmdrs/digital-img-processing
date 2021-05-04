import Functions from "./Functions"

const FirstExam = {
    first(context, columns) {
        const width = context.canvas.width
        const height = context.canvas.height
        const imgData = context.getImageData(0, 0, width, height)
        const data = imgData.data
        let pixel
        const columnSize = width / columns
        let changePoint = true
        let average
        let count = 0
        console.log(columnSize)

        //Read image and make changes on the fly as it's read  

        for (let x = 0; x <= width; x++) {
            count = count + 1
            if (count >= columnSize) {
                changePoint = !changePoint
                count = 0
            }
            for (let y = 0; y <= height; y++) {
                pixel = Functions.getColorIndicesForCoord(x, y, width)
                if (!!changePoint) {
                    average = Math.floor((data[pixel] + data[pixel + 1] + data[pixel + 2]) / 3)
                    data[pixel] = average
                    data[pixel + 1] = average
                    data[pixel + 2] = average
                    data[pixel + 3] = average
                } else {
                    data[pixel] = data[pixel]
                    data[pixel + 1] = data[pixel + 1]
                    data[pixel + 2] = data[pixel + 2]
                    data[pixel + 3] = data[pixel + 3]
                }


            }
        }

        return (imgData)
    },

    second(context, selectedArea) {
        const width = context.canvas.width
        const height = context.canvas.height
        const imgData = context.getImageData(0, 0, width, height)
        let pixel
        let pixelInverter
        //Read image and make changes on the fly as it's read
        let data = selectedArea.imageData.data
        let invertedData = new Array

        for (let x = 0; x <= selectedArea.width; x++) {
            for (let y = 0; y <= selectedArea.height; y++) {
                
                pixel = Functions.getColorIndicesForCoord(x, y, selectedArea.width)
                // if (x >= selectedArea.startX && y >= selectedArea.startY && x <= selectedArea.endX && y <= selectedArea.endY)
                pixelInverter = Functions.getColorIndicesForCoord((selectedArea.width - x), (selectedArea.height - y), selectedArea.width)
               invertedData[pixel] = data[pixelInverter]
               invertedData[pixel + 1] = data[pixelInverter + 1]
               invertedData[pixel + 2] = data[pixelInverter + 2]
               invertedData[pixel + 3] = data[pixelInverter + 3]
            }
        }

        let x2 = 0
        let y2 = 0 
        const startX = selectedArea.startX - 1
        const startY = selectedArea.startY - 1
        let pixelInverted = 0
        const limitX = selectedArea.endX
        const limitY = selectedArea.endY
        
        for (let x = startX; x <= limitX; x++) {
            for (let y = startY; y <= limitY; y++) {
                pixel = Functions.getColorIndicesForCoord(x, y, width)
                pixelInverted = Functions.getColorIndicesForCoord(x2, y2, selectedArea.width)
                imgData.data[pixel] = invertedData[pixelInverted]
                imgData.data[pixel + 1] = invertedData[pixelInverted + 1]
                imgData.data[pixel + 2] = invertedData[pixelInverted + 2]
                imgData.data[pixel + 3] = invertedData[pixelInverted + 3]
               
                y2 = y2 + 1
            }
            y2 = 0
            x2 = x2 + 1
        }




        return (imgData)
    },

    third(context) {
        const width = context.canvas.width
        const height = context.canvas.height
        const imgData = context.getImageData(0, 0, width, height)
        let filled
        let pixel
        let lines = 0
        let colluns =  0
        let countPixel = 0
        let color = 0

        //Read image and make changes on the fly as it's read
        for (let x = 0; x <= width; x++) {
           
            for (let y = 0; y <= height; y++) {
                
                pixel = Functions.getColorIndicesForCoord(x, y, width)
                color = imgData.data[pixel] + imgData.data[pixel + 1] + imgData.data[pixel + 2]
                if (color === 0) {
                    countPixel = countPixel + 1
                }
            }
            if (countPixel > 2) {
                colluns = colluns + 1
                countPixel = 0
            }
        }
        console.log(colluns)
        if (colluns > 2) {
            filled = true
        }else{
            filled = false
        }

        return(filled)
    }

}

export default FirstExam