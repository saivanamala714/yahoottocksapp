import React from 'react';
import {Button, Container, Row} from "react-bootstrap";
import NewsHeader from "./NewsHeader";
import NewsDetails from "./NewsDetails";
import axios from "axios";

const News = (props) => {
    const { innerWidth: width, innerHeight: height } = window;
    const headerHeight = 100;
    const detailsHeight = height - 100;
    const [newsMap, setNewsMap] = React.useState([]);
    const [latest, setLatest] = React.useState();
    const {symbols} = props;
    if(!symbols) return null;
    if(symbols.length < 1) return null;


    const getNews = () => {

        axios.get('/news')
            .then(res => {
                const data = res.data;
                console.log(JSON.stringify(data))
                setNewsMap([...newsMap,data ])
                setLatest(data.last_updated)
            })

    }


   return <Container style={{paddingRight: '0px'}}>
       <Row style={{height: `${headerHeight}px`, width: '100%'}}>
           <Button onClick={getNews}>get news</Button>
           <NewsHeader></NewsHeader>
       </Row>
       <Row style={{height: `${detailsHeight}px`, width: '100%'}}>
           <NewsDetails newsMap={newsMap} latest={latest}></NewsDetails>
       </Row>

   </Container>
}

export default News;