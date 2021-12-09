import React from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import _ from 'lodash';
import axios from "axios";
import moment from "moment";


const StockCard = (props) => {
    const [data, setData] = React.useState();

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

    const readApiData = (name) => {
                 axios.get('/getData')
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
        return <div>{timestamp.map((item, index) => {
            var dateString = moment.unix(item).format("HH:mm:ss");
            return <li
                key={dateString}>{dateString} || {open[index]} || {close[index]} || {high[index]} || {low[index]} || {volume[index]}</li>
        })}</div>
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
                <Button onClick={readApiData}>Click</Button>
            </Col>
        </Row>
        <Row style={{width: '15500px'}}>
            <ParsedData data={data}> </ParsedData>
        </Row>

    </Container>
}

export default StockCard;