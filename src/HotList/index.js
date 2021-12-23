import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import _ from 'lodash';
import {w3cwebsocket as W3CWebSocket} from "websocket";
import {ALL_STOCKS} from "../constants";
const stocks = ALL_STOCKS.split(',');
const wsURL = `wss://websocket.stocktwits.com/stream?symbol_stream=686&symbols=${stocks.slice(0,80)}`;
const wsURL2 = `wss://websocket.stocktwits.com/stream?symbol_stream=686&symbols=${stocks.slice(80,160)}`;
const wsURL_HOTLIST = 'wss://websocket.stocktwits.com/stream?symbol_stream=686&symbols=AAL,AAPL,ACB,ADA.X,ALDX,AMC,AMD,AMZN,AQST,ATOS,BA,BABA,BAC,BB,BE,BFRI,BNGO,BRG,BTC.X,BYND,CCL,CEI,CGC,CLOV,COIN,CRON,CTRM,DAL,DGNS,DIA,DIS,DJIA,DKNG,DOGE.X,ENPH,ETH.X,F,FB,FCEL,FSR,GE,GEVO,GILD,GME,GNUS,GOOG,GOOGL,GPRO,HCMC,HEX.X,HNST,IBIO,IDEX,INO,INTC,JAGX,JNUG,JPM,LCID,LQDT,LTC.X,LTRY,LUNA.X,MARA,MRNA,MSFT,MU,MVIS,NAKD,NFLX,NIO,NKE,NKLA,NKTR,NNDM,NOK,NVAX,NVDA,OCGN,PFE,PLBY,PLTR,PLUG,PRPL,PYPL,QQQ,RBA,RIOT,RKT,ROKU,SAVA,SBUX,SHIB.X,SHOP,SNAP,SNDL,SOPA,SOS,SPCE,SPX,SPY,SQ,SRNE,T,TLRY,TOPS,TSLA,TWTR,UBER,UVXY,V,VISL,VSAT,VXRT,WISH,WKHS,WMT,XOM,XRP.X,XSPA,YFI.X,ZOM';
const client = new W3CWebSocket(wsURL);
const client2 = new W3CWebSocket(wsURL2);
const client1 = new W3CWebSocket('ws://localhost:9898/');
const client_hot_list = new W3CWebSocket(wsURL_HOTLIST);

const HotList = () => {


    const [list, setList] = React.useState({});
    const [data, setData] = React.useState([]);
    const [callPutRatio, setCallPutRatio] = React.useState({});
    React.useEffect(async () => {
        await axios.get(`/getHotList?symbols=${stocks.slice(0,500)}`)
            .then(res => {
                const persons = res.data;
                setList({...persons, ...list})
            })

    }, [])

    React.useEffect(() => {
        axios.get(`/getCallPutRatio`)
            .then(res => {
                const persons = res.data;
                setCallPutRatio(persons)
            })
    }, [])

    client1.onmessage = (message) => {

        console.log('received')


    }

    client_hot_list.onmessage = (message) => {

        const temp = JSON.parse(message.data);

        setData([JSON.parse(message.data), ...data])
    }

    client.onmessage = (message) => {

        const temp = JSON.parse(message.data);

        setData([JSON.parse(message.data), ...data])
    }

    client2.onmessage = (message) => {

        const temp = JSON.parse(message.data);

        setData([JSON.parse(message.data), ...data])
    }

    const getParsedData = (list, data) => {

        return _.map(list, (a, b) => {

            const filteredData = data.filter(e => e.symbol == b)
            const latestPrice = filteredData.length > 0 ? filteredData[0].Last : 0;

            //PercentChange
            //const diff = (a.PreviousClose && latestPrice)? Math.ceil(100 * Math.abs( (a.PreviousClose - latestPrice) / ( (a.PreviousClose+latestPrice)/2 ) )) : '_';
            //const diff = (a.PreviousClose && latestPrice)? (100 * Math.abs( (a.PreviousClose - latestPrice) / ( (a.PreviousClose+latestPrice)/2 ) )).toFixed(2) : '_';
            const diff = filteredData.length > 0 ? filteredData[0].PercentChange.toFixed(2) : '_'
            const color = a.PreviousClose ? a.PreviousClose > latestPrice ? 'red' : 'green' : 'black';

            return <Row style={{fontSize: 'x-small', fontWeight: 600}}>
                <Col sm={3} style={{fontSize: 'xx-small'}}>{b}</Col>
                <Col sm={3}>{a.PreviousClose}</Col>
                <Col sm={4}>{latestPrice > 0 ?latestPrice.toFixed(2): null}</Col>
                <Col sm={2}style={{color, fontSize: 'x-small'}}>{diff}</Col>
            </Row>
        })
    }

    return <Container>
        {getParsedData(list, data)}

    </Container>
}

export default HotList;