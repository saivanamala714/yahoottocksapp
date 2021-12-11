import React, {useMemo} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import _ from 'lodash';
import axios from "axios";
import moment from "moment";
import {Group} from "@visx/group";
import {Bar, LinePath} from "@visx/shape";
import {scaleBand, scaleLinear} from "@visx/scale";
import { PickD3Scale, scaleTime } from '@visx/scale';
import { extent } from 'd3-array';
import {number} from "prop-types";



const StockCard = (props) => {
    const [data, setData] = React.useState();
    const getDate = (d) => new Date(d.date).valueOf();
    const getStockValue = (d) => d.close;
    const width = 1500;
    const height = 200;

    // const x1Scale = useMemo(
    //     () =>
    //         scaleTime({
    //             domain: extent(data, (d) => getDate(d)),
    //             range: [0, width],
    //         }),
    //     [width],
    // );
    // const y1Scale = useMemo(
    //     () =>
    //         scaleLinear({
    //             domain: extent(data, (d) => getStockValue(d)),
    //             range: [height - 100, 100],
    //         }),
    //     [height],
    // );



    // React.useEffect(()=> {
    //     setTimeout(()=>{
    //         axios.get('/getData')
    //             .then(res => {
    //                 const persons = res.data;
    //                 setData(persons);
    //             });
    //     }, 10000)
    //
    // }, [data])

    const readApiData = (e) => {
        const name =e.currentTarget.attributes[0].value
                 axios.get(`/getData?symbol=${name}`)
            .then(res => {
                const persons = res.data;
                setData(persons);
            });
    }

    const ParsedData = ({data}) => {

        if (!data) return null;
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


        //parsedData = letterFrequency

        console.log(JSON.stringify(parsedData))

        ///
        // We'll use some mock data from `@visx/mock-data` for this.


// Define the graph dimensions and margins

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
                        <svg width={width} height={height}>
                            {/*<LinePath*/}
                            {/*    stroke={greens[2]}*/}
                            {/*    strokeWidth={2}*/}
                            {/*    data={parsedData}*/}
                            {/*    x={(d) => x1Scale(getDate(d)) ?? 0}*/}
                            {/*    y={(d) => y1Scale(getStockValue(d)) ?? 0}*/}
                            {/*    id={JSON.stringify(d)}*/}
                            {/*/>*/}
                        </svg>
                    </Group>
                );
            })}
        </svg>
        // return <div>{timestamp.map((item, index) => {
        //     var dateString = moment.unix(item).format("HH:mm:ss");
        //     return <li
        //         key={dateString}>{dateString} || {open[index]} || {close[index]} || {high[index]} || {low[index]} || {volume[index]}</li>
        // })}</div>
    }

    return <Container>

        <Row>
            <Col sm={3}>
                    <span style={{
                        height: '40px',
                        width: '40px',
                        backgroundColor: '#bbb',
                        borderRadius: '50%',
                        fontFamily: 'sans-serif',
                        fontSize: 'x-small',
                        fontWeight: 'bolder',
                        display: 'inline-block'
                    }}><p style={{
                        marginTop: '13px',
                        marginLeft: '8px'
                    }}> {props.record.symbol}</p></span>
            </Col>
            <Col sm={3}>
                <p style={{fontSize: "x-small", width: '160px'}}>MKT Cap {props.record.marketCap}</p>
                <Button onClick={readApiData} symbol={props.record.symbol}>Click</Button>
                <ParsedData data={data}></ParsedData>
            </Col>
        </Row>
        <Row style={{width: '15500px'}}>

        </Row>

    </Container>
}

export default StockCard;