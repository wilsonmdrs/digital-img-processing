import Functions from './Functions'

/**
 * This method made an addition with two images 
 * @param {Object} firstImage -  First Image Context
 * @param {Object} secondImage  - Second Image Context
 * @param {Number} percent - Second Image Percentage
 * @returns 
 */
const Addition = (firstImage, secondImage, percent) => {

    // Getting the Image Data from context
    const data1 = firstImage.getImageData(0, 0, firstImage.canvas.width, firstImage.canvas.height)
    const data2 = secondImage.getImageData(0, 0, secondImage.canvas.width, secondImage.canvas.height)
    let width, height = 0

    // Selecting the largest width and height
    if (data1.width >= data2.width) {
        width = data1.width
    } else {
        width = data2.width
    }
    if (data1.height >= data2.height) {
        height = data1.height
    } else {
        height = data2.height
    }

    // Initializing pixel variables
    let i1, i2, i3
    // Creating a new Canvas Element
    let canvas = document.createElement("CANVAS");
    // Setting the Size (Width and Height)
    canvas.width = width
    canvas.height = height
    // Getting the Context
    let context = canvas.getContext('2d')
    // Creating an Empty Image
    let result = context.createImageData(width, height)
    // Calculating the Images Percentage
    let img1Perc = (100 - percent) / 100
    let img2Perc = percent / 100

    // Read image and make changes on the fly as it's read  
    for (let x = 0; x <= result.width; x++) {
        for (let y = 0; y <= result.height; y++) {
            // Selecting the red Pixel coordenate accordding to the image
            i1 = Functions.getColorIndicesForCoord(x, y, parseInt(data1.width))
            i2 = Functions.getColorIndicesForCoord(x, y, parseInt(data2.width))
            i3 = Functions.getColorIndicesForCoord(x, y, result.width)

            // Setting the pixel of the image created according to the percentage
            result.data[i3] = ((data1.width > x && data1.height > y) ? (data1.data[i1] * img1Perc) : 0) + ((data2.width > x && data2.height > y) ? (data2.data[i2] * img2Perc) : 0);
            result.data[i3 + 1] = ((data1.width > x && data1.height > y) ? (data1.data[i1 + 1] * img1Perc) : 0) + ((data2.width > x && data2.height > y) ? (data2.data[i2 + 1] * img2Perc) : 0)
            result.data[i3 + 2] = ((data1.width > x && data1.height > y) ? (data1.data[i1 + 2] * img1Perc) : 0) + ((data2.width > x && data2.height > y) ? (data2.data[i2 + 2] * img2Perc) : 0)
            result.data[i3 + 3] = ((data1.width > x && data1.height > y) ? (data1.data[i1 + 3] * img1Perc) : 0) + ((data2.width > x && data2.height > y) ? (data2.data[i2 + 3] * img2Perc) : 0)
        }
    }
    return (result)
}


export default Addition