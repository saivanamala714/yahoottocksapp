import React from 'react';

const NewsHeader = (props) => {
    const {data} = props;
    return <div style={{width : '100%', height : '100%', backgroundColor: 'green'}}>{JSON.stringify(data)}</div>
}

export default NewsHeader;