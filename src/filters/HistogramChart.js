const HistogramChart = {
    RGB(ctx) {
        const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
   
        let red = new Array(256).fill(0)
        let green = new Array(256).fill(0)
        let blue = new Array(256).fill(0)

        // Read image and make changes on the fly as it's read  
        for (let i = 0; i < imageData.data.length; i += 4) {
            red[imageData.data[i]] = red[imageData.data[i]] + 1
            green[imageData.data[i + 1]] = green[imageData.data[i + 1]] + 1
            blue[imageData.data[i + 2]] = blue[imageData.data[i + 2]] + 1
                   
        }
        return({red, green, blue})
        
    },

    Acumulated(histogram) {
        
        let red = [...histogram.red]
        let green = [...histogram.green]
        let blue = [...histogram.blue]
      

      
        for (let index = 1; index < 256; index++) {
               red[index] = red[index] + red[index - 1]         
               green[index] =  green[index] +  green[index - 1]
               blue[index] = blue[index - 1] + blue[index]  
        }
        return({red, green, blue})
    }
}

export default HistogramChart