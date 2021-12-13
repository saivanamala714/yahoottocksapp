import React from "react";
import {Card, ListGroup} from "react-bootstrap";

const NewsCard = (props) => {
    const {newsData} = props;
    const {title, symbol} = newsData;
    return <Card style={{width: '100%'}}>
        <Card.Header>{symbol}</Card.Header>
        <Card.Body>{JSON.stringify(title)}</Card.Body>
    </Card>
}

export default NewsCard;