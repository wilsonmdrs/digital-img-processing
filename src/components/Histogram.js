import React,{ useEffect, useState} from 'react'
import Chart from './Chart'

const Histogram = ({context, title, data}) => {

    // const [histogram, setHistogram] = useState({red:[], green:[], blue:[]})

    // // useEffect(() => {
    // //     if (!!sessionStorage.getItem("histogram")) {
    // //         setHistogram(sessionStorage.getItem("histogram"))
    // //     }
    // // },[context])
    
    // const getRGBHistogram = (ctx) => {
    //     const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
   
    //     let red = new Array(256).fill(0)
    //     let green = new Array(256).fill(0)
    //     let blue = new Array(256).fill(0)

    //     // Read image and make changes on the fly as it's read  
    //     for (let i = 0; i < imageData.data.length; i += 4) {
    //         red[imageData.data[i]] = red[imageData.data[i]] + 1
    //         green[imageData.data[i + 1]] = green[imageData.data[i + 1]] + 1
    //         blue[imageData.data[i + 2]] = blue[imageData.data[i + 2]] + 1
                   
    //     }
    //     setHistogram({red, green, blue})
    //     }
    
    // useEffect(() => {
    //     if (!!context)  {
    //         getRGBHistogram(context)
    //     }
    // },[context])

    return (
        <Chart data={data} title={title} />
    )
}

export default Histogram