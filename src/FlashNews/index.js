import React from "react";
import {Carousel} from "react-bootstrap";

const FlashNews = (props) => {

    const [news, setNews] = React.useState(['AAAAAAAAAAAAAA', 'BBBBBBBBBBBBBBBB'])

    return <Carousel style={{height: '60px', backgroundColor:'#efbfbfa1'}}>
        {news.map(e=> <Carousel.Item interval={4000}>{e}</Carousel.Item>)}
    </Carousel>


}

export default FlashNews;