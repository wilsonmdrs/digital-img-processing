import React from 'react'
import Chart from './Chart'

const Histogram = ({context, title, data}) => {

    return (
        <Chart data={data} title={title} />
    )
}

export default Histogram