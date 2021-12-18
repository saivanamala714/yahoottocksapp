import React from 'react';

const NewsHeader = (props) => {
    const {data} = props;
    return <div style={{width : '100%', height : '100%', backgroundColor: 'green', fontSize: 'xx-small'}}>{JSON.stringify(data.symbols.toString())}</div>
}

export default NewsHeader;
