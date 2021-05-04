import React, { useEffect, useState } from 'react'
import Content from './Content'
import Sidebar from './Sidebar'

// Functions Filters
import {
    GreyScales,
    Threshold,
    NoiseReduction,
    Addition,
    Subtraction,
    HistogramChart,
    Equalization,
    Simulator,
    FirstExam

} from '../filters'


const App = () => {

    // First Image Context State Variable (Object Canvas Context)
    const [firstImage, setFirstImage] = useState(null)
    // Second Image Context State Variable (Object Canvas Context)
    const [secondImage, setSecondImage] = useState(null)
    // Resuklt Image Data State Variable (Image Data Array)
    const [resultImage, setResultImage] = useState(null)
    // Histogram State Variable
    const [histogram, setHistogram] = useState({ first: { red: [], green: [], blue: [] }, second: { red: [], green: [], blue: [] }, result: { red: [], green: [], blue: [] } })
    //  GreyScale weighted Average State Variable
    const [range, setRange] = useState({ red: 50, green: 25, blue: 25 })
    //  Threshold Initial State Variable
    const [threshold, setThreshold] = useState({ colorful: 125, greyScale: 125 })
    // Noise reduction Initial State Values
    const [noiseReduction, setNoiseReduction] = useState({ filter: "média", neighborhood: { diagonal: false, linear: false } })
    // Addition and Subtraction Initial State Values
    const [addSub, setAddSub] = useState({ percent: 50, filter: "addition" })
    // Estado Genérico
    const [state, setState] = useState(null)
    const [selectedArea, setSelectedArea] = useState(null)

    // Update first Image State
    const onSetFirstImage = content => setFirstImage(content)

    // Update Second Image State
    const onSetSecondImage = content => setSecondImage(content)

    // Update Result Image State
    const onSetResultImage = content => setResultImage(content)

    // Update Range State
    const onSetRange = content => setRange(content)

    // Update AddSub State
    const onSetAddSub = content => setAddSub(content)

    // Update Noise Reduction State
    const onSetNoiseReduction = content => setNoiseReduction(content)

    // Update Threshold State
    const onSetThreshold = content => setThreshold(content)

    const onSetSelectedArea = (selected) => {
        setSelectedArea(selected)
    }
    /**
     * Set the Selected Image inside Canvas Context
     * @param {Object} ctx (Canvas Context)
     * @param {String} url_image (Image Address)
     * @param {String} imageState (Name of the State Variable)
     */
    const drawImage = (ctx, url_image, imageState) => {
        // Create an Image Element
        const image = new Image()
        // Setting the source address
        image.src = url_image
        // drawing the image on canvas context after fully upload
        image.onload = () => {
            ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height)
        }
        // saving the context on image context
        if (imageState === "secondImage") {
            setSecondImage(ctx)
        }
        if (imageState === "firstImage") {
            setFirstImage(ctx)
        }
        if (imageState === "result") {
            setResultImage(ctx)
        }
    }

    /**
     * Method to apply Grey Scale with Weighted Average
     */
    const onApplyGreyScale = () => {
        const checkPercent = range.red + range.green + range.blue
        if (checkPercent === 100) {
            let imageData = GreyScales.weightedAverage(firstImage, range)
            setResultImage(imageData)
        } else {
            alert('A soma dos valores precisa ser igual a 100')
        }
    }

    /**
     * Method to apply Threshold on a Colorful image
     * @param {Number} value 
     */
    const onChangeThresholdColorFul = value => {
        if (!!firstImage) {
            let imageData = firstImage.getImageData(0, 0, firstImage.canvas.width, firstImage.canvas.height)
            imageData = Threshold(imageData, value)
            setResultImage(imageData)
            setThreshold({ ...threshold, colorful: value })
        }
    }

    /**
     * Method to apply Threshold on a Grey Scale image
     * @param {Number} value 
     */
    const onChangeThresholdGreyScale = value => {
        if (!!firstImage) {
            let imageData = GreyScales.aritmeticAverage(firstImage)
            imageData = Threshold(imageData, value)
            setResultImage(imageData)
            setThreshold({ ...threshold, greyScale: value })
        }
    }

    /**
     * Method to apply Noise Reduction Filter
     */
    const onApplyNoiseReduction = () => {
        let image
        if (!!noiseReduction.neighborhood.diagonal && !!noiseReduction.neighborhood.linear) {
            console.log("Both")
            if (noiseReduction.filter === "média") {
                console.log("média")
                image = NoiseReduction.bothAverage(firstImage)
            } else {
                console.log("mediana")
                image = NoiseReduction.bothMedian(firstImage)
            }
        } else if (noiseReduction.neighborhood.diagonal && !noiseReduction.neighborhood.linear) {
            console.log("diagonal")
            if (noiseReduction.filter === "média") {
                console.log("média")
                image = NoiseReduction.diagonalAverage(firstImage)
            } else {
                console.log("mediana")
                image = NoiseReduction.diagonalMedian(firstImage)
            }
        } else if (!noiseReduction.neighborhood.diagonal && !!noiseReduction.neighborhood.linear) {
            console.log("Linear")
            if (noiseReduction.filter === "média") {
                console.log("média")
                image = NoiseReduction.linearAverage(firstImage)
            } else {
                console.log("mediana")
                image = NoiseReduction.linearMedian(firstImage)
            }
        }

        setResultImage(image)
    }

    /**
     * Method to Apply Addition Filter
     */
    const onApplyAddition = () => {
        if (!!firstImage && !!secondImage) {
            const image = Addition(firstImage, secondImage, addSub.percent)
            setResultImage(image)
            setAddSub({ ...addSub, filter: "addition" })
        } else {
            alert("selecione duas imagens para aplicar esse Filtro")
        }
    }

    /**
     * Method to Apply Subtraction Filter
     */
    const onApplySubtraction = () => {
        if (!!firstImage && !!secondImage) {
            const image = Subtraction(firstImage, secondImage, addSub.percent)
            setResultImage(image)
            setAddSub({ ...addSub, filter: "subtraction" })
        } else {
            alert("selecione duas imagens para aplicar esse Filtro")
        }
    }


    useEffect(() => {
        if (!!secondImage && !!firstImage) {
            if (addSub.filter === "addition") {
                onApplyAddition()
            } else {
                onApplySubtraction()
            }
        }
        // eslint-disable-next-line
    }, [addSub.percent])

    const resultContext = () => {
        if (!!resultImage) {
            const context = document.getElementById("result").getContext('2d')
            return context
        } else {
            return null
        }
    }

    const onSetEqualization = (type) => {
        if (!!firstImage) {
            let imageData
            if (type === "valid") {
                imageData = Equalization.validChanels(firstImage)
            }else {
                imageData = Equalization.allChanels(firstImage)
            }
            setResultImage(imageData)
        }
    }

    const onApplyInverter = (quandrantes) => {
        if (!!firstImage) {
            console.log(quandrantes)
            const imageData = Simulator.Inverter(firstImage, quandrantes)
            setResultImage(imageData)
        }
    }

    const onApplyColumns = (columns) => {
        if (!!firstImage) {
            const imageData = FirstExam.first(firstImage, columns)
            setResultImage(imageData)
        }
    }
    
    const onAppyInvertSelection = () => {
        if (!!firstImage && !!selectedArea) {
            const imageData = FirstExam.second(firstImage, selectedArea)
            setResultImage(imageData)
        }
    }
    
    const onCheckGeometry = () => {
        if (!!firstImage) {
            const filled = FirstExam.third(firstImage)
            if (filled) {
                alert("O quadrado está Preenchido")
            }else {
                alert("O quadrado não está Preenchido")
            }
        }
    }

     /**
     * Modify Histogram State when the First Image change
     */
    useEffect(() => {
        if (!!firstImage) {
            setHistogram({ ...histogram, first: HistogramChart.RGB(firstImage) })
        }
        // eslint-disable-next-line
    }, [firstImage])

     /**
     * Modify Histogram State when the Second Image change
     */
    useEffect(() => {
        if (!!secondImage) {
            setHistogram({ ...histogram, second: HistogramChart.RGB(secondImage) })
        }
        // eslint-disable-next-line
    }, [secondImage])

    /**
     * Modify Histogram State when the result Image change
     */
     useEffect(() => {
        if (!!resultImage) {
            setHistogram({ ...histogram, result: HistogramChart.RGB(resultContext(resultImage)) })
        }
        // eslint-disable-next-line
    }, [resultImage])


    return (
        <div id="container">
            <Sidebar
                // Methods
                onChangeThresholdColorFul={onChangeThresholdColorFul}
                onChangeThresholdGreyScale={onChangeThresholdGreyScale}
                onApplyGreyScale={onApplyGreyScale}
                onApplyNoiseReduction={onApplyNoiseReduction}
                onApplyAddition={onApplyAddition}
                onApplySubtraction={onApplySubtraction}
                onApplyInverter={onApplyInverter}
                onApplyColumns={onApplyColumns}
                onApplyInvertSelection={onAppyInvertSelection}
                onCheckGeometry={onCheckGeometry}
                // Alter State
                onSetFirstImage={onSetFirstImage}
                onSetSecondImage={onSetSecondImage}
                onSetResultImage={onSetResultImage}
                onSetRange={onSetRange}
                onSetAddSub={onSetAddSub}
                onSetNoiseReduction={onSetNoiseReduction}
                onSetThreshold={onSetThreshold}
                onSetEqualization={onSetEqualization}
                // State Variables
                addition={addSub}
                range={range}
                threshold={threshold}
                noiseReduction={noiseReduction}
                firstImage={firstImage}
                secondImage={secondImage}
                resultImage={resultImage}
                state={state}

            />
            <Content
                firstImage={firstImage}
                secondImage={secondImage}
                resultImage={resultImage}
                drawImage={drawImage}
                onSetFirstImage={setFirstImage}
                onSetSecondImage={setSecondImage}
                onSetResult={setResultImage}
                resultContext={resultContext}
                histogram={histogram}
                onSetSelectedArea={onSetSelectedArea}
            />
        </div>
    )
}

export default App