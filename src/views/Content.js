import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import ImageView from '../components/ImageView'
import ResultImage from './ResultImage'


const Content = (props) => {

    const [color, setColor] = useState({ red: 0, green: 0, blue: 0, hexadecimal: "#fff" })
    const [urlImage, setUrlImage] = useState(null)
    const [view, setView] = useState(false)
    const [urlSecondImage, setUrlSecondImage] = useState(null)
   
    const onSetColor = (red, green, blue, hexadecimal) => {
        setColor({ red, green, blue, hexadecimal })
    }

    const setHexadecimalValue = (c) => {

        let hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;

    }

    const rgbToHex = (r, g, b) => {
        return "#" + setHexadecimalValue(r) + setHexadecimalValue(g) + setHexadecimalValue(b);
    }



    return (
        <div id="content">
            <div className="rgb">
                <div className="histogram">
                    <FontAwesomeIcon icon="chart-bar" onClick={() => setView(!view)} />
                </div>
                <div className="color">
                    <label style={{ backgroundColor: color.hexadecimal }}>Color</label>
                </div>
                <div className="red">
                    <p>Red</p>
                    <label style={{ backgroundColor: rgbToHex(color.red, 0, 0) }}>{color.red}</label>
                    {/* <p>{color.red}</p> */}
                </div>
                <div className="green">
                    <p>Green</p>
                    <label style={{ backgroundColor: rgbToHex(0, color.green, 0) }}>{color.green}</label>
                </div>
                <div className="blue">
                    <p>Blue</p>
                    <label style={{ backgroundColor: rgbToHex(0, 0, color.blue) }}>{color.blue}</label>
                </div>
            </div>
            
            {!view && (
            <div className="images">
                <div id="image-1">
                    <ImageView
                        shadow={!!urlImage ? true : false}
                        onSetColor={onSetColor}
                        drawImage={props.drawImage}
                        expand={props.expand}
                        setExpand={props.setExpand}
                        urlImage={urlImage}
                        setUrlImage={setUrlImage}
                        context={props.onSetFirstImage}
                        setResult={props.onSetResult}
                        data={props.histogram.first}
                        firstImage
                    />
                    <ImageView
                        shadow={!!urlSecondImage ? true : false}
                        onSetColor={onSetColor}
                        drawImage={props.drawImage}
                        expand={props.expand}
                        setExpand={props.setExpand}
                        urlImage={urlSecondImage}
                        setUrlImage={setUrlSecondImage}
                        context={props.onSetSecondImage}
                        setResult={props.onSetResult}
                        data={props.histogram.second}
                        secondImage
                    />
                </div>
                <div id="image-2">
                    <ImageView
                        shadow={!!props.resultImage ? true : false}
                        onSetColor={onSetColor}
                        drawImage={props.drawImage}
                        context={props.onSetResultImage}
                        result
                        resultImage={props.resultImage}
                        expand={props.expand}
                        setExpand={props.setExpand}
                        data={props.histogram.result}
                        urlImage={urlImage}
                        setResult={props.onSetResult}
                    />
                </div>
            </div>
            )}
            {view && (
                <ResultImage
                    firstImage={props.firstImage}
                    secondImage={props.secondImage}
                    resultImage={props.resultImage}
                    resultContext={props.resultContext}
                    histogram={props.histogram}
                />
            )}
           
        </div>
    )
}

export default Content