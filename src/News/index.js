import React from 'react';
import {Button, Container, Row} from "react-bootstrap";
import NewsHeader from "./NewsHeader";
import NewsDetails from "./NewsDetails";
import axios from "axios";
import _ from 'lodash';

const News = (props) => {
    const {innerWidth: width, innerHeight: height} = window;
    const headerHeight = 100;
    const detailsHeight = height - 100;
    const [newsMap, setNewsMap] = React.useState([]);
    const [latest, setLatest] = React.useState();
    const {symbols} = props;
    if (!symbols) return null;
    if (symbols.length < 1) return null;

    const getNews = async (e) => {
        const temp = e.currentTarget.attributes[0].value
        const symbols = temp.split(',');
        const newsData = []
        await _.forEach(symbols, symbol=>{
            axios.get(`/news?symbol=${symbol}`)
                .then(res => {
                    const data = res.data;
                    newsData.push({symbol: symbol, last_updated: data.last_updated, articles: data.articles})
                    setNewsMap(newsData)
                    setLatest(data.last_updated)
                })
        })

    }

    const getStats = () => {
           const symbols = _.map(newsMap, e => e.symbol)
           const data = {symbols}
           return data;
    }

    return <Container style={{padding: 0}}>
        <Row style={{height: `${headerHeight}px`, width: '100%'}}>
            <Button onClick={getNews} symbols={props.symbols}>get news</Button>
            <NewsHeader data={getStats()}></NewsHeader>
        </Row>
        <Row style={{height: `${detailsHeight}px`, width: '100%', padding: 0}}>
            <NewsDetails newsMap={newsMap} latest={latest}></NewsDetails>
        </Row>

    </Container>
}

export default News;
