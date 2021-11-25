import axios from 'axios';
import React from 'react';
import moment from 'moment';
import LabeledHeatmap from './graph'

const getTimeStamp = (data) => {

    if (!data) return null;
    const result = data.chart.result[0];
    const timestamp = result.timestamp;
    return timestamp;
}

const ParsedData = ({data}) => {

    if (!data) return null;
    const result = data.chart.result[0];
    const timestamp = result.timestamp;
    const {open, close, high, low, volume} = result.indicators.quote[0];
    console.log(timestamp.length)

    return <div>{timestamp.map((item, index) =>   {
      var dateString = moment.unix(item).format("HH:mm:ss");
      return <li key={dateString}>{dateString} || {open[index]} || {close[index]} || {high[index]} || {low[index]} || {volume[index]}</li>
    } )}</div>
}

function App() {

    const [data, setData] = React.useState(null);

   const alphabet = ['A', 'B'];

    const readApiData = (name) => {
        axios.get('/getData')
            .then(res => {
                const persons = res.data;
                setData(persons);
            })
    }
    return (
        <div >
                <button onClick={readApiData}>Get Data</button>
                <ParsedData data={data}></ParsedData>
                <LabeledHeatmap/>
        </div>
    );
}

export default App;
