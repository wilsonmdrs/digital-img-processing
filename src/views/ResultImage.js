import React from 'react'
import Histogram from '../components/Histogram'

const ResultImage = ({firstImage, secondImage, resultImage, resultContext, histogram}) => {
    console.log(histogram)

    return (
        <div>
            {!!firstImage && (
                <div className="chart">
                    <Histogram data={histogram.first} title="Primeira Imagem" type="rgb" />
                </div>
            )}
            {!!secondImage && (
                <div className="chart">
                    <Histogram data={histogram.second} title="Segunda Imagem" type="rgb" />
                </div>

            )}
            {!!resultImage && (
                <div className="chart">
                    <Histogram data={histogram.result} title="Resultado" type="rgb" />
                </div>
            )}
        </div>

    )
}

export default ResultImage