import React from "react";
import {Container, Row, Col} from "react-bootstrap";

const NewsItem = ({data}) => {
   return <Container style={{padding: 0}}>
        <Row>
            <Col sm={1} style={{padding: 0}}>{data.time}</Col>
            <Col sm={11} style={{textAlign: 'left', padding: 0}}>{data.title}</Col>
        </Row>
    </Container>
}

export default NewsItem;
