import React from 'react';
import _ from 'lodash';
import moment from "moment";
import {Container, Row} from "react-bootstrap";
import NewsCard from './NewsCard';

const NewsDetails = (props) => {
    const {newsMap, latest} = props;
    if (newsMap.length < 1) return null;

    const combinedNews1 = []
    _.forEach(newsMap, e => {
        _.forEach(e.articles, a => combinedNews1.push({
                title: a.title,
                symbol: e.symbol,
                time: moment(a.time).format('MM-DD')
            })
        )
    })

    const combinedNews = _.orderBy(combinedNews1, ['time'], ['desc']).filter(a => a.time < moment().format('MM-DD') + 1)
    const dates = _.map(_.uniqBy(combinedNews, 'time'), 'time')
    let grouped_data = _.groupBy(combinedNews, 'time')
    console.log('unique', dates.length, JSON.stringify(grouped_data))

    //return <ul>{combinedNews.map(e => <li>{e.symbol}|{e.time.toString()}|{e.title}</li>)}</ul>
    //return <div>{JSON.stringify(filteredmap.articles)}</div>
    return <Container>{_.map(dates, (a) => <Row>
        <h4>{a}</h4>
        <Container>
            {grouped_data[a].map(b => <Row><NewsCard newsData={b}></NewsCard></Row>)}
        </Container>
    </Row>)}</Container>
}

export default NewsDetails;