import React from "react";
import {Card, ListGroup} from "react-bootstrap";
import NewsItem from "./NewsItem";

const NewsCard = (props) => {
    const {newsData} = props;
    if(!newsData || newsData.length === 0) return null;
    const {title, symbol} = newsData[0];
    return <Card style={{width: '100%', fontSize: "small", padding: 0}}>
        <Card.Header style={{ height: '20px', padding: 0, fontWeight: 'bold'}}>{symbol}</Card.Header>
        <Card.Body style={{margin: 0}}>
            {newsData.map(e=> <NewsItem data={e}></NewsItem>)}
        </Card.Body>

        {/*<Card.Body style={{marginLeft: '-18px', paddingTop: '10px'}}>{JSON.stringify(newsData[0])}</Card.Body>*/}
    </Card>
}

export default NewsCard;
