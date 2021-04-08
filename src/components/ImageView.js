import React, { useState } from 'react'
import { Button, Input, Label } from "reactstrap"
import Canvas from './Canvas'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Histogram from '../components/Histogram'

const ImageView = (props) => {

    const [view, setView] = useState({ image: true, histogram: false })

    // Variable to store the Image Component

    /**
     * This Method receive a event Object on the current mouse position
     * to get the Image Color (RGB) 
     * @param {Object} event
     */
    const onGetPixel = (event) => {
        // Getting the Element (Canvas) Position on Page
        const x = event.nativeEvent.offsetX
        // Calculating the Mouse Y Position
        const y = event.nativeEvent.offsetY
        // Getting the Element (Canvas) Context
        const context = event.target.getContext('2d')
        // Getting The Image Data from Mouse Position
        const imagePositionData = context.getImageData(x, y, 1, 1).data
        // Transposing the Color From RGB to Hexadecimal
        const hexadecimal = "#" + ("000000" + rgbToHex(imagePositionData[0], imagePositionData[1], imagePositionData[2])).slice(-6);
        // Setting the Red, Green and Blue values for State Variable
        props.onSetColor(imagePositionData[0], imagePositionData[1], imagePositionData[2], hexadecimal)

        // var original = document.getElementById("original").getContext('2d')
        // // console.log(event.clientX)
        // zoom(event.target, original, x,y)

    }

    const rgbToHex = (r, g, b) => {
        try {
            return ((r << 16) | (g << 8) | b).toString(16);
        } catch (error) {
            alert("Invalid color component")
        }
    }

    const fileSelectedHandler = (e) => {
        if (!!e.target.files[0]) {
            const url_image = URL.createObjectURL(e.target.files[0])
            props.setResult(null)
            props.setUrlImage(url_image)
        }
    }

    const zoom = (canvas, ctx, x, y) => {
        ctx.drawImage(canvas,
            Math.min(Math.max(0, x - 5), canvas.width - 10),
            Math.min(Math.max(0, y - 5), canvas.height - 10),
            10, 10,
            0, 0,
            100, 100);

    }

    const onSetView = (e) => {
        e.preventDefault()
        if (!!props.urlImage ||  !!props.resultImage) {
            setView({image:!view.image, histogram:!view.histogram})
        }
    }

    const saveImageHandler = () => {
        if (!!props.resultImage) {
            const canvas = document.getElementById("result")
            console.log(canvas)
            var img = canvas.toDataURL("image/png");
            var downloadLink = document.createElement('a');
            downloadLink.href = img;
            downloadLink.download = 'result.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

        }

    }



    return (
        <div id="image-view">
            <div className="header">
                <Label>
                    {!!props.result ? (
                        <>
                            <FontAwesomeIcon className="icon" icon="save" onClick={() => saveImageHandler()} />
                        </>
                    ) : (
                        <>
                            <Input type="file" onChange={event => fileSelectedHandler(event)} />
                            <FontAwesomeIcon className="icon" icon="image" />
                        </>
                    )}
                    <FontAwesomeIcon className="icon" icon="chart-bar" onClick={(e) => onSetView(e)} />


                </Label>
            </div>
            {/* <div className="pixel-zoom">
                <canvas id="original" />
            </div> */}
            <div className="image-container">

                {view.image && (
                    <Canvas
                        setContext={props.context}
                        className={!!props.shadow ? "shadowImage" : ""}
                        result={!!props.result ? true : false}
                        firstImage={!!props.firstImage ? true : false}
                        secondImage={!!props.secondImage ? true : false}
                        urlImage={props.urlImage}
                        drawImage={props.drawImage}
                        onGetPixel={onGetPixel}
                        resultImage={props.resultImage}
                    />
                )}


                {(view.histogram &&  (!!props.urlImage ||  !!props.resultImage )) && (
                   
                    <Histogram data={props.data} title="" type="rgb"  />
                )}

            </div>
        </div>
    )
}

export default ImageView