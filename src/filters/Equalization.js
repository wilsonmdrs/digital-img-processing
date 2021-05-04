import Functions from './Functions'
import Historgram from './HistogramChart'
/**
 * This method made an addition with two images 
 * @param {Object} firstImage -  First Image Context
 * @param {Object} secondImage  - Second Image Context
 * @param {Number} percent - Second Image Percentage
 * @returns 
 */
const Equalization = {
    countChanels(array) {
        let count = 0
        array.forEach(element => {
            if (element !== 0) {
                count = count + 1
            }
        });
        return count
    },
    validChanels(context) {
        // Getting the Image Data from context
        let width = context.canvas.width
        let height = context.canvas.height
        const image = context.getImageData(0, 0, width, height)


        // Initializing pixel variable
        let pixel
        let n = width * height
        let histogram = Historgram.RGB(context)
        let acumulated = Historgram.Acumulated(histogram)
        let redL = this.countChanels(histogram.red)
        let greenL = this.countChanels(histogram.green)
        let blueL = this.countChanels(histogram.blue)
        console.log('L', redL, greenL, blueL)

        // Read image and make changes on the fly as it's read  
        for (let x = 0; x <= width; x++) {
            for (let y = 0; y <= height; y++) {
                // Selecting the red Pixel coordenate accordding to the image
                pixel = Functions.getColorIndicesForCoord(x, y, parseInt(width))

                // Setting the pixel of the image created according to the percentage
                image.data[pixel] = Math.round(((redL - 1) / n) * acumulated.red[image.data[pixel]])
                image.data[pixel + 1] = Math.round(((greenL - 1) / n) * acumulated.green[image.data[pixel + 1]])
                image.data[pixel + 2] = Math.round(((blueL - 1) / n) * acumulated.blue[image.data[pixel + 2]])
            }
        }
        return (image)
    },

    allChanels(context) {
        // Getting the Image Data from context
        let width = context.canvas.width
        let height = context.canvas.height
        const image = context.getImageData(0, 0, width, height)


        // Initializing pixel variable
        let pixel
        let n = width * height
        let histogram = Historgram.RGB(context)
        let acumulated = Historgram.Acumulated(histogram)
        let l = 256
        


        // Read image and make changes on the fly as it's read  
        for (let x = 0; x <= width; x++) {
            for (let y = 0; y <= height; y++) {
                // Selecting the red Pixel coordenate accordding to the image
                pixel = Functions.getColorIndicesForCoord(x, y, parseInt(width))

                // Setting the pixel of the image created according to the percentage
                image.data[pixel] = Math.round(((l - 1) / n) * acumulated.red[image.data[pixel]])
                image.data[pixel + 1] = Math.round(((l - 1) / n) * acumulated.green[image.data[pixel + 1]])
                image.data[pixel + 2] = Math.round(((l - 1) / n) * acumulated.blue[image.data[pixel + 2]])
            }
        }
        return (image)
    }
}

export default Equalization