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
import StockBarGraph from "./StockBarGraph";



const StockCard = (props) => {
    const [data, setData] = React.useState();
    const [stockData, setStockData] = React.useState();
    React.useEffect(()=>{
        readStockData(props.record.symbol)

    }, [props])

    const readApiData = (e) => {
        const name =e.currentTarget.attributes[0].value
                 axios.get(`/getData?symbol=${name}`)
            .then(res => {
                const persons = res.data;
                setData(persons);
            });
    }

    const readStockData = (name) => {
        axios.get(`/getStockDetails?symbol=${name}`)
            .then(res => {
                const persons = res.data;
                setStockData(persons);
            });
    }

    const ParsedData = ({data}) => {

    }

    return <Container style={{padding: 0, margin: 0}}>

        <Row style={{padding : 0, margin : 0}}>
            <Col sm={2} style={{padding: 0, margin: 0}}>
                    <span style={{
                        fontFamily: 'sans-serif',
                        fontSize: 'x-small',
                        fontWeight: 'bolder',
                        display: 'inline-block'
                    }}><p style={{
                    }}> {props.record.symbol}</p></span>
            </Col>
            <Col sm={3}>
                <p style={{fontSize: "x-small", width: '160px'}}>MKT Cap {props.record.marketCap}</p>
                <p style={{fontSize: "x-small", width: '160px'}}>{props.record.time}</p>
                {stockData && <span style={{display: 'inline-block' , fontSize: 'x-small'}}>{(stockData.data.quoteData.Financials.PublicFloat/1000000000).toFixed(3) + 'B'}</span>}
                {/*<StockBarGraph data={data}></StockBarGraph>*/}
            </Col>
        </Row>
    </Container>
}

export default StockCard;
