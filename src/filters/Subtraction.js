import Functions from './Functions'


const Subtraction = (firstImage, secondImage, percent) => {
    const data1 = firstImage.getImageData(0, 0, firstImage.canvas.width, firstImage.canvas.height)
    const data2 = secondImage.getImageData(0, 0, secondImage.canvas.width, secondImage.canvas.height)
    let width, height = 0
    if (data1.width >= data2.width ) {
        width = data1.width
    } else {
        width = data2.width
    }
    if (data1.height >= data2.height ) {
        height = data1.height
    } else {
        height = data2.height
    }
   
    let i1, i2, i3 = 0
    let canvas = document.createElement("CANVAS");
    canvas.width = width
    canvas.height = height
    let context = canvas.getContext('2d')
    let image = new Image()
    image.onload = () => {
      context.drawImage(image, 0, 0, width, height)  
    }
    context.putImageData(data1, 0, 0)
    context.putImageData(data2, 0, 0)
    let result = context.getImageData(0, 0, context.canvas.width, context.canvas.height)

    // Read image and make changes on the fly as it's read  
    for (let x = 0; x <= result.width; x++) {
        for (let y = 0; y <= result.height; y++) {
       
        i1 = data1.width >= x && data1.height >= y? Functions.getColorIndicesForCoord(x, y,data1.width) : 0
        i2 = Functions.getColorIndicesForCoord(x, y,data2.width) 
        i3 = Functions.getColorIndicesForCoord(x, y,result.width)
        result.data[i3] = (((data1.width > x && data1.height > y ) ? (data1.data[i1] * ((100 - percent) / 100)) : 0 ) ) - (((data2.width > x && data2.height > y)  ? (data2.data[i2] * (percent / 100)) : 0));
        result.data[i3 + 1] = (((data1.width > x && data1.height > y)  ? (data1.data[i1 + 1] * ((100 - percent)) / 100) : 0)  ) - (((data2.width > x && data2.height > y ) ? (data2.data[i2 + 1]* (percent / 100)): 0) )
        result.data[i3 + 2] = (((data1.width > x && data1.height > y)  ? (data1.data[i1 + 2] * ((100 - percent)) / 100) : 0) ) - (((data2.width > x && data2.height > y ) ? ( data2.data[i2 + 1] * (percent / 100)) : 0) )
        }         
    }

    return(result)
}

export default Subtraction