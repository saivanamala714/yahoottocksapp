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

    const readApiData = (e) => {
        const name =e.currentTarget.attributes[0].value
                 axios.get(`/getData?symbol=${name}`)
            .then(res => {
                const persons = res.data;
                setData(persons);
            });
    }

    const ParsedData = ({data}) => {

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
                <StockBarGraph data={data}></StockBarGraph>
            </Col>
        </Row>
        <Row style={{width: '15500px'}}>

        </Row>

    </Container>
}

export default StockCard;