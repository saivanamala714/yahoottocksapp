import React from 'react';
import {Card, ListGroup} from "react-bootstrap";
import StockCard from "./StockCard";

const StockCardList = (props) => {
    if(props.data == undefined) return null;
    return <Card style={{width: '18rem'}}>
        <Card.Header>Featured</Card.Header>
        <ListGroup variant="flush">
            {props.data.data.rows.map(e=> <ListGroup.Item><StockCard record={e}></StockCard></ListGroup.Item>)}
        </ListGroup>
    </Card>
}

export default StockCardList;