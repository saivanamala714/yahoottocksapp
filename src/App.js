import React from 'react';
import moment from 'moment';
import styled from 'styled-components'
import {useTable} from 'react-table'
import _ from 'lodash'
// import CssBaseline from '@material-ui/core/CssBaseline'
// import MaUTable from '@material-ui/core/Table'
// import TableBody from '@material-ui/core/TableBody'
// import TableCell from '@material-ui/core/TableCell'
// import TableHead from '@material-ui/core/TableHead'
// import TableRow from '@material-ui/core/TableRow'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {Button, Col, Container, Row} from "react-bootstrap";
import StockCardList from "./StockCardList";
import DatePicker from 'react-date-picker';

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

    const alphabet = ['A', 'B'];



    const readEarningsData = (name) => {
        axios.get(`/earnings?date=${moment(currentDate).format('yyyy-MM-DD')}`)
            .then(res => {
                const persons = res.data;
                setEarnings(persons);
            })
    }

    const readApiData = (name) => {

        // axios.get('/getData')
        //     .then(res => {
        //         const persons = res.data;
        //         setData(persons);
        //     })
    }
    return (
                <Container style={{marginLeft: '0px'}}>

                    <Row>
                        <Col sm={2}><Button onClick={readEarningsData}>Get Earnings</Button></Col>
                        <Col sm={2}><Button onClick={readApiData}>Get Stock Data</Button></Col>
                        <Col sm={5}><DatePicker value={currentDate} onChange={setCurrentDate} format={'MM-dd-yyyy'}></DatePicker></Col>
                        <Col sm={5}></Col>
                    </Row>
                    <Row><StockCardList data={earnings}></StockCardList></Row>
                    <Row>
                        <Col sm={6}><Styles><MyData data={earnings} stockData={data}></MyData></Styles></Col>
                        <Col sm={6}><ParsedData data={data}></ParsedData></Col>
                    </Row>

                </Container>
    );
}

export default App;
