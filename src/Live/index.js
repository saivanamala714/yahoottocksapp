import React from 'react';
import {w3cwebsocket as W3CWebSocket} from "websocket";

const client = new W3CWebSocket('wss://websocket.stocktwits.com/stream?symbol_stream=686&symbols=AAL,AAPL,ACB,ADA.X,ALDX,AMC,AMD,AMZN,AQST,ATOS,BA,BABA,BAC,BB,BE,BFRI,BNGO,BRG,BTC.X,BYND,CCL,CEI,CGC,CLOV,COIN,CRON,CTRM,DAL,DGNS,DIA,DIS,DJIA,DKNG,DOGE.X,ENPH,ETH.X,F,FB,FCEL,FSR,GE,GEVO,GILD,GME,GNUS,GOOG,GOOGL,GPRO,HCMC,HEX.X,HNST,IBIO,IDEX,INO,INTC,JAGX,JNUG,JPM,LCID,LQDT,LTC.X,LTRY,LUNA.X,MARA,MRNA,MSFT,MU,MVIS,NAKD,NFLX,NIO,NKE,NKLA,NKTR,NNDM,NOK,NVAX,NVDA,OCGN,PFE,PLBY,PLTR,PLUG,PRPL,PYPL,QQQ,RBA,RIOT,RKT,ROKU,SAVA,SBUX,SHIB.X,SHOP,SNAP,SNDL,SOPA,SOS,SPCE,SPX,SPY,SQ,SRNE,T,TLRY,TOPS,TSLA,TWTR,UBER,UVXY,V,VISL,VSAT,VXRT,WISH,WKHS,WMT,XOM,XRP.X,XSPA,YFI.X,ZOM');

const client1 = new W3CWebSocket('wss://websocket.stocktwits.com/stream?symbols=DIA,QQQ,SPY');

const LiveNews = () => {
    const [data, setData] = React.useState([]);
    client.onmessage = (message) => {

        const temp = JSON.parse(message.data);

        setData([...data, JSON.parse(message.data)])
    }
    return <h4>{JSON.stringify(data.filter(e=> e.symbol === 'AMZN'))}</h4>
}

export default LiveNews;
