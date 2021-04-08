import React, {useEffect, useRef, useState} from 'react'

const Canvas = props => {

    const { drawImage, urlImage, resultImage, result, onGetPixel, setContext, firstImage, secondImage, ...rest } = props
    const canvasRef = useRef(null)
    // const [ctx, setCtx] = useState(null)
    const [imageObj, setImageObj] = useState(null)
    const [drag, setDrag] = useState(false)
    const [rect, setRect] = useState({})
    var origX, origY, fabric
    // var ctx = null
    useEffect(() => {
        if (!!resultImage) {
            const canvas = canvasRef.current
            canvas.width = resultImage.width
            canvas.height = resultImage.height
            const context = canvas.getContext('2d')
            console.log(resultImage)
            context.putImageData(resultImage, 0,0,)
        }
    },[resultImage])

    useEffect(() => {
        if (!!urlImage && !result){
            const canvas = canvasRef.current
            
            const image = new Image()
            image.src = urlImage
            image.onload = () => {
                console.log(image.width, image.height)
                canvas.width = image.width
                canvas.height = image.height
                const context = canvas.getContext('2d')
                // ctx = context
                // setCtx(context)
                // if (!result) {
                    //     drawImage(context, urlImage, "result")
                    // } 
                    if (!!firstImage) {
                        drawImage(context, urlImage, "firstImage")
                    } 
                    if (!!secondImage) {
                        drawImage(context, urlImage, "secondImage")
                    } 
                }
                setImageObj(image)
            // canvas.addEventListener('mousedown', mouseDown, false);
            // canvas.addEventListener('mouseup', mouseUp, false);
            // canvas.addEventListener('mousemove', mouseMove, false);
        }
       
    },[urlImage])

    const mouseDown = e => {
        let startX = e.nativeEvent.offsetX
        let startY = e.nativeEvent.offsetY
        setRect({ ...rect, startX, startY })
        setDrag(true)
    }

    const mouseUp = () => {
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
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.strokeRect(rect.startX, rect.startY, w, h);
           
        }
    }
    
    
    
        


    return <canvas  id={!!result ? "result" : "myCanvas"} 
            ref={canvasRef} {...rest}  
            onMouseMove={event => mouseMove(event)} 
            onMouseDown={e => mouseDown(e)}
            onMouseUp={() => mouseUp()}
        />
}
export default Canvas