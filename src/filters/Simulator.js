import Functions from "./Functions"

const Simulator = {
    Inverter(context, quadrantes) {
        const width = context.canvas.width
        const height = context.canvas.height
        const imgData = context.getImageData(0, 0, width, height)
        const data = imgData.data
        let pixel
        let pixelInverter
        let canvas = document.createElement("CANVAS");
        canvas.width = width
        canvas.height = height
        let ctx = canvas.getContext('2d')
        let image = new Image()
        image.onload = () => {
            ctx.drawImage(image, 0, 0, width, height)
        }
        ctx.putImageData(imgData, 0, 0)
        let result = ctx.getImageData(0, 0, width, height)
        //Read image and make changes on the fly as it's read  
        if (!!quadrantes.first) {
            const w = width / 2
            const h = height / 2
            for (let x = 0; x <= w; x++) {
                for (let y = 0; y <= h; y++) {
                    pixel = Functions.getColorIndicesForCoord(x, y, width)
                    pixelInverter = Functions.getColorIndicesForCoord((w - x), (h - y), width)
                    result.data[pixel] = data[pixelInverter]
                    result.data[pixel + 1] = data[pixelInverter + 1]
                    result.data[pixel + 2] = data[pixelInverter + 2]
                    result.data[pixel + 3] = data[pixelInverter + 3]
                }
            }
        }
        if (!!quadrantes.second) {
            const w = width / 2
            const h = height / 2
            for (let x = w; x <= width; x++) {
                for (let y = 0; y <= h; y++) {
                    pixel = Functions.getColorIndicesForCoord(x, y, width)
                    pixelInverter = Functions.getColorIndicesForCoord(((width - x) + w), (h - y), width)
                    result.data[pixel] = data[pixelInverter]
                    result.data[pixel + 1] = data[pixelInverter + 1]
                    result.data[pixel + 2] = data[pixelInverter + 2]
                    result.data[pixel + 3] = data[pixelInverter + 3]
                }
            }
        }
        if (!!quadrantes.third) {
            const w = width / 2
            const h = height / 2
            for (let x = 0; x <= w; x++) {
                for (let y = h; y <= height; y++) {
                    pixel = Functions.getColorIndicesForCoord(x, y, width)
                    pixelInverter = Functions.getColorIndicesForCoord((w - x), ((height - y) + h), width)
                    result.data[pixel] = data[pixelInverter]
                    result.data[pixel + 1] = data[pixelInverter + 1]
                    result.data[pixel + 2] = data[pixelInverter + 2]
                    result.data[pixel + 3] = data[pixelInverter + 3]
                }
            }
        }
        if (!!quadrantes.fourth) {
            const w = width / 2
            const h = height / 2
            for (let x = w; x <= width; x++) {
                for (let y = h; y <= height; y++) {
                    pixel = Functions.getColorIndicesForCoord(x, y, width)
                    pixelInverter = Functions.getColorIndicesForCoord(((width - x) + w), ((height - y) + h), width)
                    result.data[pixel] = data[pixelInverter]
                    result.data[pixel + 1] = data[pixelInverter + 1]
                    result.data[pixel + 2] = data[pixelInverter + 2]
                    result.data[pixel + 3] = data[pixelInverter + 3]
                }
            }
        }
        return (result)
    },

    weightedAverage() {
      
    }
}

export default Simulator