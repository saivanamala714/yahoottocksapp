import React from 'react';

const NewsDetails = (props) => {
     const {newsMap, latest} = props;
     const filteredmap = newsMap.find(e=> e.last_updated === latest)
     if(!filteredmap) return  null;

     return <ul>{filteredmap.articles.map(e=> <li>{e.title}</li>)}</ul>
     //return <div>{JSON.stringify(filteredmap.articles)}</div>
}

export default NewsDetails;