import React from "react";
import {Card, ListGroup} from "react-bootstrap";

const NewsCard = (props) => {
    const {newsData} = props;
    const {title, symbol} = newsData;
    return <Card style={{width: '100%', marginTop: '-12px', marginLeft: '-4px', fontSize: "small"}}>
        <Card.Header style={{marginLeft: '-18px', height: '20px', paddingTop: '0px', fontWeight: 'bold'}}>{symbol}</Card.Header>
        <Card.Body style={{marginLeft: '-18px', paddingTop: '10px'}}>{JSON.stringify(title)}</Card.Body>
    </Card>
}

export default NewsCard;