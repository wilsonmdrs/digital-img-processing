import React, { useEffect, useRef, useState } from 'react'

const Canvas = props => {

    const { drawImage, urlImage, resultImage, image, result, onGetPixel, setContext, firstImage, secondImage,
        onSetSelectedArea, onSetFirstImage, ...rest } = props
    const canvasRef = useRef(null)
    const [imageObj, setImageObj] = useState(null)
    const [drag, setDrag] = useState(false)
    const [rect, setRect] = useState({})
    
    useEffect(() => {
        if (!!image) {
            const canvas = canvasRef.current
            canvas.width = image.width
            canvas.height = image.height
            const context = canvas.getContext('2d')
            context.putImageData(image, 0, 0,)
        }
    // eslint-disable-next-line
    }, [image] )
        

    useEffect(() => {
        if (!!resultImage) {
            const canvas = canvasRef.current
            canvas.width = resultImage.width
            canvas.height = resultImage.height
            const context = canvas.getContext('2d')
            context.putImageData(resultImage, 0, 0,)
        }
    // eslint-disable-next-line
    }, [resultImage] )

    useEffect(() => {
        if (!!urlImage && !result) {
            const canvas = canvasRef.current

            const image = new Image()
            image.src = urlImage
            image.onload = () => {
                canvas.width = image.width
                canvas.height = image.height
                const context = canvas.getContext('2d')
                if (!!firstImage) {
                    drawImage(context, urlImage, "firstImage")
                }
                if (!!secondImage) {
                    drawImage(context, urlImage, "secondImage")
                }
            }
            setImageObj(image)
        }
    // eslint-disable-next-line
    }, [urlImage]) 

    const mouseDown = e => {
        let startX = e.nativeEvent.offsetX
        let startY = e.nativeEvent.offsetY
        setRect({ ...rect, startX, startY })
        setDrag(true)
    }

    const onReturn = () => {

    }

    const onCutImage = (e) => {
        const canvas = canvasRef.current
        const ctx = e.target.getContext('2d')
        const imageData = ctx.getImageData(rect.startX, rect.startY, rect.width, rect.height)
        console.log('imageData', imageData)
        canvas.width = rect.width
        canvas.height = rect.height
        ctx.putImageData(imageData, 0,0)
    }

    const mouseUp = (e) => {
        let width = e.nativeEvent.offsetX - rect.startX;
        let height = e.nativeEvent.offsetY - rect.startY;
        const ctx = e.target.getContext('2d')
        const imageData = ctx.getImageData(rect.startX, rect.startY, width, height)
        onSetSelectedArea({imageData, startX:rect.startX, startY:rect.startY, width, height, endX:(rect.startX + width), endY:(rect.startY + height)})
        setDrag(false)
    }

    const mouseMove = e => {
        onGetPixel(e)
        if (!!drag && !!imageObj) {
            const ctx = e.target.getContext('2d')
            ctx.clearRect(0, 0, e.target.width, e.target.height);
            ctx.drawImage(imageObj, 0, 0);
            let w = e.nativeEvent.offsetX - rect.startX;
            let h = e.nativeEvent.offsetY - rect.startY;
            setRect({...rect, width:w, height:h})
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.strokeRect(rect.startX, rect.startY, w, h);
        }
    }

    return <canvas id={!!result ? "result" : "myCanvas"}
        ref={canvasRef} {...rest}
        onMouseMove={event => mouseMove(event)}
        onMouseDown={event => mouseDown(event)}
        onMouseUp={event => mouseUp(event)}
    />
}
export default Canvas