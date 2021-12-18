import React from "react";
import {Carousel} from "react-bootstrap";

const FlashNews = ({cards}) => {

    const [news, setNews] = React.useState(['AAAAAAAAAAAAAA', 'BBBBBBBBBBBBBBBB'])
    const My = () => <h1>Hello</h1>

    return <Carousel style={{backgroundColor:'#efbfbfa1'}}>
        {cards.map(e=> <Carousel.Item interval={4000}>{e()}</Carousel.Item>)}
        {/*{news.map(e=> <Carousel.Item interval={4000}>{e}</Carousel.Item>)}*/}
    </Carousel>


}

export default FlashNews;
