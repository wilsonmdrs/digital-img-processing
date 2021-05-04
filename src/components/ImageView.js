import React, { useState } from 'react'
import { Input, Label } from "reactstrap"
import Canvas from './Canvas'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Histogram from '../components/Histogram'

const ImageView = (props) => {

    // variable to set the view
    const [view, setView] = useState({ image: true, histogram: false })
    const [selectedArea, setSelectedArea] = useState(null)
    const [historic, setHistoric] = useState(null)
    
    /**
     * This Method receive an event Object on the current mouse position
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
        const imagePositionPixel = context.getImageData(x, y, 1, 1).data
        // Transposing the Color From RGB to Hexadecimal
        const hexadecimal = rgbToHex(imagePositionPixel[0], imagePositionPixel[1], imagePositionPixel[2])
        // Setting the Red, Green and Blue values for State Variable
        props.onSetColor(imagePositionPixel[0], imagePositionPixel[1], imagePositionPixel[2], hexadecimal)
    }

    /**
     * This Method receive de Red, Green and Blue valor from a pixel and return a hexadecimal value
     * @param {Number} r 
     * @param {Number} g 
     * @param {Number} b 
     * @returns 
     */
    const rgbToHex = (r, g, b) => {
        try {
            let hexadecimal = "#" + ("000000" + ((r << 16) | (g << 8) | b).toString(16)).slice(-6)
            return hexadecimal
        } catch (error) {
            alert("Invalid color component")
        }
    }

    /**
     * This Method receive an image address and make an Object url
     * @param {Object} event
     */
    const fileSelectedHandler = (e) => {
        if (!!e.target.files[0]) {
            const url_image = URL.createObjectURL(e.target.files[0])
            props.setResult(null)
            props.setUrlImage(url_image)
            // console.log(newImageData(url_image))    
            // setHistoric()
        }
    }

    const newImageData = (urlImage) => {
        let newImage = new Image()
        newImage.src = urlImage
        let canvas = document.createElement("CANVAS");
        canvas.width = newImage.width
        canvas.height = newImage.height
        const context = canvas.getContext('2d')
        newImage.onload = () => {
            context.drawImage(newImage, 0,0,newImage.width, newImage.height)
        }
        const imageData = context.getImageData(0,0, newImage.width, newImage.height).data
        return (imageData)
    }

    // const zoom = (canvas, ctx, x, y) => {
    //     ctx.drawImage(canvas,
    //         Math.min(Math.max(0, x - 5), canvas.width - 10),
    //         Math.min(Math.max(0, y - 5), canvas.height - 10),
    //         10, 10,
    //         0, 0,
    //         100, 100);

    // }

    /**
     * This method change the view
     * @param {Object} event 
     */
    const onSetView = (e) => {
        e.preventDefault()
        if (!!props.urlImage ||  !!props.resultImage) {
            setView({image:!view.image, histogram:!view.histogram})
        }
    }

    /**
     * This Method save the image how a .png file
     */
    const saveImageHandler = () => {
        if (!!props.resultImage) {
            const canvas = document.getElementById("result")
            var img = canvas.toDataURL("image/png")
            var downloadLink = document.createElement('a')
            downloadLink.href = img
            downloadLink.download = 'result.png'
            document.body.appendChild(downloadLink)
            downloadLink.click()
            document.body.removeChild(downloadLink)
        }
    }

    const onSetFullScreen = (e) => {
        e.preventDefault()
        if (!!props.urlImage ||  !!props.resultImage) {
            let full = {first:true, second:true, result:true, all:false}
            if (props.firstImage) {full = {first:true, second:false, result:false, all:false}}
            if (props.secondImage) {full = {first:false, second:true, result:false, all:false}}
            if (props.result) {full = {first:false, second:false, result:true, all:false}}
            props.onSetFullScreen(full)
        }
    }
    const onDisableFullScreen = (e) => {
        e.preventDefault()
        if (!!props.urlImage ||  !!props.resultImage) {
            props.onSetFullScreen({first:true, second:true, result:true, all:true})
        }
    }

    // const onSetSelectedArea = (selected) => {
    //     setSelectedArea(imageData)
    // }

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
                    {props.fullScreen ? (
                        <FontAwesomeIcon className="icon" icon="expand-arrows-alt" onClick={(e) => onSetFullScreen(e)} />
                    ): (
                        <FontAwesomeIcon className="icon" icon="compress-arrows-alt" onClick={(e) => onDisableFullScreen(e)} />
                    )}
                    {props.firstImage && (
                        <>
                            <FontAwesomeIcon className="icon" icon="cut" onClick={(e) => onDisableFullScreen(e)} />
                            <FontAwesomeIcon className="icon" icon="undo" onClick={(e) => onDisableFullScreen(e)} />
                            
                        </>
                    )}
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
                        onSetSelectedArea={props.onSetSelectedArea}
                        image={historic}
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