import React from 'react';
import moment from 'moment';
import styled from 'styled-components'
import {useTable} from 'react-table'
import _ from 'lodash'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {Button, Col, Container, Row} from "react-bootstrap";
import StockCardList from "./StockCardList";
import News from "./News";
import ReactHighcharts from 'react-highcharts/ReactHighstock.src'
import LiveNews from "./Live";
import HotList from "./HotList";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    font-family: sans-serif;
    font-size: small;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

const getTimeStamp = (data) => {

    if (!data) return null;
    const result = data.chart.result[0];
    const timestamp = result.timestamp;
    return timestamp;
}

const Table = ({columns, data}) => {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

const ParsedData = ({data}) => {

    if (!data) return null;
    const result = data.chart.result[0];
    const timestamp = result.timestamp;
    const {open, close, high, low, volume} = result.indicators.quote[0];
    return <div>{timestamp.map((item, index) => {
        var dateString = moment.unix(item).format("HH:mm:ss");
        return <li
            key={dateString}>{dateString} || {open[index]} || {close[index]} || {high[index]} || {low[index]} || {volume[index]}</li>
    })}</div>
}

const MyData = ({data}) => {
    if (!data) return <h1> No Data</h1>
    const columns1 = _.map(data.data.headers, (a, b) => {
        if (b === 'time') {
            return {
                'Header': a, 'accessor': b, Cell: ({row: {original}}) => {
                    const {time} = original;
                    if (time === 'time-not-supplied') {
                        return <p>n/a</p>
                    } else if (time === 'time-pre-market') {
                        return <p>pre</p>
                    } else {
                        return <p>post</p>
                    }

                }
            };
        } else {
            return {'Header': a, 'accessor': b}
        }

    })
    const derivedColumns = [{Header: 'Name', columns: columns1}]
    return <Table columns={derivedColumns} data={data.data.rows}></Table>

}

function App() {

    const [data, setData] = React.useState();
    const [earnings, setEarnings] = React.useState();
    const [currentDate, setCurrentDate] = React.useState(new Date());
    const [symbols, setSymbols] = React.useState(['TSLA', 'AMZN', 'WMT'])
    const [map, setMap] = React.useState()
    const [stockHistory, setStockHistory] = React.useState(null)
    const [priceData, setPriceData] = React.useState([]);
    const [configPrice, setConfigPrice] = React.useState(null);
    React.useEffect(() => {
        readEarningsData()
    }, [])

    const alphabet = ['A', 'B'];

    // const options = {
    //     chart: {
    //         type: 'spline'
    //     },
    //     title: {
    //         text: 'My chart'
    //     },
    //     series: [
    //         {
    //             data: [{x: 1, y: 2}]
    //         }
    //     ]
    // };

    // const getOptions = () =>{
    //     if(!stockHistory) return []
    //     for (let a  = 0; a < stockHistory.TimeInfo.Ticks.length < 0; a++){
    //         console.log(stockHistory.TimeInfo[a])
    //     }
    // }


    const readEarningsData = (name) => {
        axios.get(`/earnings?date=${moment(currentDate).format('yyyy-MM-DD')}`)
            .then(res => {
                const persons = res.data;

                setEarnings(persons);
                if(persons.data && persons.data.rows){
                    const symbols1 = persons.data.rows ? persons.data.rows.map(e => e.symbol) : []
                    setSymbols(symbols1)
                }


            })
    }

    const getPlotGraph = () => {


        ///

        console.log(priceData.length)
        console.log(priceData)
        console.log('Hello')
        console.log([[1637539200000, 3572.57], [1637625600000, 3400.57]])

        const options = {style: 'currency', currency: 'USD'};
        const numberFormat = new Intl.NumberFormat('en-US', options);
        const configPrice = {

            yAxis: [{
                offset: 20,

                labels: {
                    formatter: function () {
                        return numberFormat.format(this.value)
                    }
                    ,
                    x: -15,
                    style: {
                        "color": "#000", "position": "absolute"

                    },
                    align: 'left'
                },
            },

            ],
            tooltip: {
                shared: true,
                formatter: function () {
                    return numberFormat.format(this.y, 0) + '</b><br/>' + moment(this.x).format('MMMM Do YYYY, h:mm')
                }
            },
            plotOptions: {
                series: {
                    showInNavigator: true,
                    gapSize: 6,

                }
            },
            rangeSelector: {
                selected: 1
            },
            title: {
                text: `Bitcoin stock price`
            },
            chart: {
                height: 600,
            },

            credits: {
                enabled: false
            },

            legend: {
                enabled: true
            },
            xAxis: {
                type: 'date',
            },
            rangeSelector: {
                buttons: [{
                    type: 'day',
                    count: 1,
                    text: '1d',
                }, {
                    type: 'day',
                    count: 7,
                    text: '7d'
                }, {
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'month',
                    count: 3,
                    text: '3m'
                },
                    {
                        type: 'all',
                        text: 'All'
                    }],
                selected: 4
            },
            series: [{
                name: 'Price',
                type: 'spline',

                data: priceData,
                tooltip: {
                    valueDecimals: 2
                },

            }
            ]
        };

        setConfigPrice(configPrice);

    }

    const getStockHistory = (name) => {
        axios.get(`/getStockHistory?symbol=${name}`)
            .then(res => {
                const persons = res.data;

                const priceData = []
                for (let a = 0; a < persons.TimeInfo.Ticks.length; a++) {
                    //const x = moment.utc(persons.TimeInfo.Ticks[a]).toString()
                    const x = persons.TimeInfo.Ticks[a];
                    let data = []
                    //data.push([x,  persons.Series[0].DataPoints[a][0]])
                    data.push(x)
                    data.push(persons.Series[0].DataPoints[a][0])
                    //data.push([x,  a]);
                    priceData.push(data)
                    setPriceData([...priceData, data])
                }
            })
    }

    const readApiData = (name) => {

        axios.get('/getUS')
            .then(res => {
                const persons = res.data;
                setMap(persons);
            })
    }
    //const itema = () => <NewsCard newsData={{title: 'Sai', symbol: 'Ram'}}></NewsCard>
    const itema = () => <div style={{height: '80px', width: '80px', backgroundColor: 'red'}}>Ram</div>


    return (
        // <Container style={{padding: 0, maxWidth: "none"}}>
        //     <Row style={{padding: 0, margin: 0}}>
        //         <Col sm={4} style={{padding: 0, margin: 0}}><div style={{height: '10x', backgroundColor: 'red'}}>Hello</div></Col>
        //         <Col sm={4} style={{padding: 0, margin: 0}}><div style={{height: '10x', backgroundColor: 'red'}}>Hello</div></Col>
        //         <Col sm={4} style={{padding: 0, margin: 0}}><div style={{height: '10x', backgroundColor: 'red'}}>Hello</div></Col>
        //     </Row>
        // </Container>
        <Container style={{height: '490px', padding: 0, maxWidth: "none"}}>
            <Row style={{padding: 0, margin: 0}}>
                <Col sm={2} style={{padding: 0, margin: 0}}><StockCardList data={earnings}></StockCardList>
                    {/*<Container style={{marginLeft: '0px'}}>*/}
                    {/*    /!*<Row>*!/*/}
                    {/*    /!*    <Col sm={4}><Button onClick={readEarningsData}>Get Earnings</Button></Col>*!/*/}
                    {/*    /!*    <Col sm={4}><Button onClick={readApiData}>Get Stock Data</Button></Col>*!/*/}
                    {/*    /!*    <Col sm={4}><DatePicker value={currentDate} onChange={setCurrentDate}*!/*/}
                    {/*    /!*                            format={'MM-dd-yyyy'}></DatePicker></Col>*!/*/}
                    {/*    /!*</Row>*!/*/}
                    {/*    <Row><StockCardList data={earnings}></StockCardList></Row>*/}
                    {/*    <Row>*/}
                    {/*        <Col sm={6}><Styles><MyData data={earnings} stockData={data}></MyData></Styles></Col>*/}
                    {/*        <Col sm={6}><ParsedData data={data}></ParsedData></Col>*/}
                    {/*    </Row>*/}

                    {/*</Container>*/}
                </Col>
                <Col sm={8} style={{padding: 2, margin: 0}}>
                    <Container style={{padding: 0, margin: 0}}>
                        <Row style={{backgroundColor: 'red'}}>
                            <Col>{configPrice && <ReactHighcharts height={'100px'}config={configPrice}></ReactHighcharts>}</Col>
                        </Row>
                        <Row style={{height : '200px', backgroundColor: 'blue'}}>
                            <Col  style={{padding: 2, margin: 0}}><News symbols={symbols}></News></Col>
                        </Row>
                    </Container>
                </Col>
                {/*<Col sm={8} style={{padding: 2, margin: 0}}><News symbols={symbols}></News></Col>*/}
                <Col sm={2} style={{padding: 0, margin: 0}}><HotList data={earnings}></HotList></Col>
            </Row>
            {/*<Row>*/}
            {/*    <table dangerouslySetInnerHTML={{__html: map}}>*/}
            {/*    </table>*/}
            {/*</Row>*/}
            {/*<Row>*/}
            {/*    <FlashNews cards={[itema]}></FlashNews>*/}
            {/*</Row>*/}
            <Row>
                <Col><Button onClick={getStockHistory}>Get data</Button></Col>
                <Col><Button onClick={getPlotGraph}>Plot data</Button></Col>
            </Row>
            <Row>
                <Col>
                    <h4>{JSON.stringify(stockHistory)}</h4>
                    {/*<HighchartsReact highcharts={Highcharts} options={stockHistory} constructorType={'stockChart'}/>*/}

                </Col>
            </Row>

        </Container>


    );
}

export default App;
