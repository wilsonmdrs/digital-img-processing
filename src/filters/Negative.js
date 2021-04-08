const Negative = (context) => {
    if (!!context) {
        const imgData = context.getImageData(0, 0, context.canvas.width, context.canvas.height)
        const data = imgData.data
        
        let red = [];
        let green = [];
        let blue = [];

        //Read image and make changes on the fly as it's read  
        for (let i = 0; i < data.length; i += 4) {
            red[i] = 255 - imgData.data[i];
            green[i] = 255 - imgData.data[i + 1];
            blue[i] = 255 - imgData.data[i + 2]; 
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

export default Negative