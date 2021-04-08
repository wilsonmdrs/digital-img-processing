import React, { useEffect, useState } from 'react'
import Content from './Content'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import Histogram from '../components/Histogram'
import Sidebar from './Sidebar'

// Functions Filters
import {
    GreyScales,
    Threshold,
    NoiseReduction,
    Addition,
    Subtraction,
    HistogramChart

} from '../filters'


const App = (props) => {

    const [firstImage, setFirstImage] = useState(null)
    const [histogram, setHistogram] = useState({first:{red:[],green:[],blue:[]}, second:{red:[],green:[],blue:[]}, result:{red:[],green:[],blue:[]}})
    const [secondImage, setSecondImage] = useState(null)
    const [range, setRange] = useState({ red: 100, green: 0, blue: 0 })
    const [resultImage, setResultImage] = useState(null)
    const [threshold, setThreshold] = useState({ colorful: 125, greyScale: 125 })
    const [noiseReduction, setNoiseReduction] = useState({ filter: "média", neighborhood: { diagonal: false, linear: false } })
    const [addition, setAddition] = useState({ percent: 50, filter: "addition" })
    const [modal, setModal] = useState(false)
    

    const onSetFirstImage = content => setFirstImage(content)

    const onSetSecondImage = content => setSecondImage(content)
    
    const onSetResultImage = content => setResultImage(content)

    const onSetRange = content => setRange(content)

    const onSetAddition = content => setAddition(content)

    const onSetNoiseReduction = content => setNoiseReduction(content)

    const onSetThreshold = content => setThreshold(content)

    const toggle = () => setModal(!modal)

    const drawImage = (ctx, url_image, state) => {
        const image = new Image()
        image.src = url_image
        image.onload = () => {
            ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height)
        }
        if (state === "secondImage") {
            setSecondImage(ctx)
        }
        if (state === "firstImage") {
            setFirstImage(ctx)
        }
        if (state === "result") {
            setResultImage(ctx)
        }
    }

    const onApplyGreyScale = (name, value) => {

        const checkPercent = range.red + range.green + range.blue
        if (checkPercent === 100) {
            let imageData = GreyScales.weightedAverage(firstImage, range)
            setResultImage(imageData)
        } else {
            alert('A soma dos valores precisa ser igual a 100')
        }
    }

    const onChangeThresholdColorFull = value => {
        if (!!firstImage) {
            let imageData = firstImage.getImageData(0, 0, firstImage.canvas.width, firstImage.canvas.height)
            imageData = Threshold(imageData, value)
            setResultImage(imageData)
            setThreshold({ ...threshold, colorful: value })
        }
    }

    const onChangeThresholdGreyScale = value => {
        if (!!firstImage) {
            let imageData = GreyScales.aritmeticAverage(firstImage)
            imageData = Threshold(imageData, value)
            setResultImage(imageData)
            setThreshold({ ...threshold, greyScale: value })
        }
    }

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

    const onApplyAddition = () => {
        if (!!firstImage && !!secondImage) {
            const image = Addition(firstImage, secondImage, addition.percent)
            setResultImage(image)
            setAddition({ ...addition, filter: "addition" })
        } else {
            alert("selecione duas imagens para aplicar esse Filtro")
        }
    }

    const onApplySubtraction = () => {
        if (!!firstImage && !!secondImage) {
            const image = Subtraction(firstImage, secondImage, addition.percent)
            setResultImage(image)
            setAddition({ ...addition, filter: "subtraction" })
        } else {
            alert("selecione duas imagens para aplicar esse Filtro")
        }
    }

    useEffect(() => {
        if (!!secondImage && !!firstImage) {
            if (addition.filter === "addition") {
                onApplyAddition()
            } else {
                onApplySubtraction()
            }
        }
    }, [addition.percent])

    const resultContext = () => {
        if (!!resultImage) {
            const context = document.getElementById("result").getContext('2d')
            return context
        }else {
            return null
        }
    }

    useEffect(() => {
        if (!!resultImage) {
            setHistogram({...histogram, result:HistogramChart.RGB(resultContext(resultImage))})
        }
    },[resultImage])

    useEffect(() => {
        if (!!firstImage) {
            setHistogram({...histogram, first:HistogramChart.RGB(firstImage)})
        }
    },[firstImage])

    useEffect(() => {
        if (!!secondImage) {
            setHistogram({...histogram, second:HistogramChart.RGB(secondImage)})
        }
    },[secondImage])

    return (
        <div id="container">
           <Sidebar 
                // Methods
                onChangeThresholdColorFull={onChangeThresholdColorFull}
                onChangeThresholdGreyScale={onChangeThresholdGreyScale}
                onApplyGreyScale={onApplyGreyScale}
                onApplyNoiseReduction={onApplyNoiseReduction}
                onApplyAddition={onApplyAddition}
                onApplySubtraction={onApplySubtraction}
                
                onSetFirstImage={onSetFirstImage}
                onSetSecondImage={onSetSecondImage}
                onSetResultImage={onSetResultImage}
                onSetRange={onSetRange}
                onSetAddition={onSetAddition}
                onSetNoiseReduction={onSetNoiseReduction}
                onSetThreshold={onSetThreshold}
                // Variables
                addition={addition}
                range={range}
                threshold={threshold}
                noiseReduction={noiseReduction}
                firstImage={firstImage}
                secondImage={secondImage}
                resultImage={resultImage}

           />
           
            <Content
                firstImage={firstImage}
                secondImage={secondImage}
                resultImage={resultImage}
                drawImage={drawImage}
                onSetFirstImage={setFirstImage}
                onSetSecondImage={setSecondImage}
                onSetResult={setResultImage}
                toggle={toggle}
                resultContext={resultContext}
                histogram={histogram}
            />
            <Modal isOpen={modal} toggle={toggle} className="modal-histogram">
                <ModalHeader toggle={toggle}>Histograma</ModalHeader>
                <ModalBody>
                    {!!firstImage && (
                        <div className="chart">
                            <p>Imagem 1</p>
                            <Histogram context={firstImage}  type="rgb" />
                        </div>
                    )}
                    {!!secondImage && (
                        <div  className="chart">
                            <p>Imagem 2</p>
                            <Histogram context={secondImage}  type="rgb" />
                        </div>

                    )}
                    {!!resultImage && (
                        <div  className="chart">
                            <p>Imagem 3</p>
                            <Histogram context={resultContext()} type="rgb" />
                        </div>
                    )}
                    {(!firstImage && !secondImage && !resultImage) && (
                        <div>
                            <p>
                                Carregue pelo menos uma Imagem para ser Possível a Visualização do Histograma
                            </p>
                        </div>
                    ) }
                </ModalBody>
            </Modal>
        </div>
    )
}

export default App