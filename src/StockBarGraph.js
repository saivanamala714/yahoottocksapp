import React from 'react';
import {scaleBand, scaleLinear} from "@visx/scale";
import {Group} from "@visx/group";
import {Bar} from "@visx/shape";

const StockBarGraph = ({data}) => {



    if (!data) return null;
    const width = 1500;
    const height = 200;
    const result = data.chart.result[0];
    const timestamp = result.timestamp;
    const {open, close, high, low, volume} = result.indicators.quote[0];
    let parsedData = []

    console.log(JSON.stringify())
    for(let i=0; i < timestamp.length; i++){
        const color = close[i] > open[i] ? 'green': 'red';
        const frequency = Math.abs(open[i] - close[i]);
        parsedData.push({letter : i, frequency , color, close : close[i], open : open[i] , date : timestamp[i]})
    }


    const margin = { top: 10, bottom: 10, left: 10, right: 10 };

// Then we'll create some bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

// We'll make some helpers to get at the data we want
    const x = d => d.letter;
    const y = d => +d.frequency*100;

// And then scale the graph by our data
    const xScale = parsedData && scaleBand({
        range: [0, xMax],
        round: true,
        domain: parsedData.map(x),
        padding: 4,
    });
    const yScale = parsedData && scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...parsedData.map(y))],
    });

// Compose together the scale and accessor functions to get point functions
    const compose = (scale, accessor) => data => scale(accessor(data));
    const xPoint = compose(xScale, x);
    const yPoint = compose(yScale, y);
    const orange = '#ff7e67';
    const greens = ['#ecf4f3', '#68b0ab', '#006a71'];



    ////
    return <svg width={width} height={height}>
        {parsedData && parsedData.map((d, i) => {
            const barHeight = yMax - yPoint(d);
            return (
                <Group key={`bar-${i}`}>
                    <Bar
                        x={xPoint(d)}
                        y={yMax - barHeight}
                        height={barHeight}
                        width={xScale.bandwidth() + 4}
                        fill={d.color}

                    />
                </Group>
            );
        })}
    </svg>
}

export default StockBarGraph;