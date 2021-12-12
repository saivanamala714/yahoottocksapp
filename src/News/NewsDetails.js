import React from 'react';
import _ from 'lodash';

const NewsDetails = (props) => {
    const {newsMap, latest} = props;
    if (newsMap.length < 1) return null;

    const combinedNews = []
    _.forEach(newsMap, e => {
        _.forEach(e.articles, a => combinedNews.push({title: a.title, symbol: e.symbol, time: a.time})
        )
        //_.e.articles(a => combinedNews.push(a.title))
    })

    return <ul>{combinedNews.map(e => <li>{e.symbol}|{e.time}|{e.title}</li>)}</ul>
    //return <div>{JSON.stringify(filteredmap.articles)}</div>
}

export default NewsDetails;