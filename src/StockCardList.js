import React from 'react';
import {Card, ListGroup} from "react-bootstrap";
import StockCard from "./StockCard";

const StockCardList = (props) => {
    if(props.data == undefined || props.data.data == undefined ||props.data.data.rows == undefined) return null;
    return <Card style={{width: '100%'}}>
        <Card.Header>Earnings</Card.Header>
        <ListGroup variant="flush" style={{margin: 0, padding : 0}}>
            {props.data.data.rows.map(e=> <ListGroup.Item style={{margin: 0, padding: 0}}><StockCard record={e}></StockCard></ListGroup.Item>)}
        </ListGroup>
    </Card>
}

export default StockCardList;
