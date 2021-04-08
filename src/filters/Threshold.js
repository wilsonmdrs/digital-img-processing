const Threshold = (imgData, threshold) => {
    if (!!imgData) {
        // const imgData = context.getImageData(0, 0, context.canvas.width, context.canvas.height)
        const data = imgData.data
        let red = [];
        let green = [];
        let blue = [];

        //Read image and make changes on the fly as it's read  
        for (let i = 0; i < data.length; i += 4) {
            if (imgData.data[i] > threshold) {
                red[i] = 0
            } else {
                red[i] = 255
            }
            if (imgData.data[i] > threshold) {
                green[i] = 0
            } else {
                green[i] = 255
            }
            if (imgData.data[i] > threshold) {
                blue[i] = 0
            } else {
                blue[i] = 255
            }
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

export default Threshold