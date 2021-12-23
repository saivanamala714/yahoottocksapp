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

    const earningTime = (time) => {
        console.log(time)
        switch (time) {
            case 'time-after-hours': return 'AH'
            case 'time-pre-market': return  'PM'
            default : return 'NA';
        }
    }

    return <Container style={{padding: 0, margin: 0}}>

        <Row style={{padding : 0, margin : 0}}>
            <Col style={{padding : 1, margin : 1, fontSize: '16px', fontWeight: 700, fontFamily: 'Source Sans Pro,Arial,Helvetica Neue,Helvetica,sans-serif'}}>{props.record.symbol}</Col>
            <Col style={{padding : 1, margin : 1, fontSize: 'x-small'}}>{props.record.marketCap}</Col>
        </Row>
        <Row style={{padding : 0, margin : 0}}>
            <Col style={{padding : 1, margin : 1, fontSize: 'x-small'}}>{earningTime(props.record.time)}</Col>
            <Col style={{padding : 1, margin : 1, fontSize: 'x-small'}}>{stockData && (stockData.data.quoteData.Financials.PublicFloat/1000000000).toFixed(3) + 'B'}</Col>
        </Row>
    </Container>
}

export default StockCard;
