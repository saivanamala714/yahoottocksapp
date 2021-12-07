import axios from 'axios';
import React from 'react';
import moment from 'moment';
import LabeledHeatmap from './graph'
import styled from 'styled-components'
import { useTable } from 'react-table'
import _ from 'lodash'
// import CssBaseline from '@material-ui/core/CssBaseline'
// import MaUTable from '@material-ui/core/Table'
// import TableBody from '@material-ui/core/TableBody'
// import TableCell from '@material-ui/core/TableCell'
// import TableHead from '@material-ui/core/TableHead'
// import TableRow from '@material-ui/core/TableRow'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row} from "react-bootstrap";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

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

const  Table = ({ columns, data })  => {
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
    console.log(timestamp.length)

    return <div>{timestamp.map((item, index) =>   {
      var dateString = moment.unix(item).format("HH:mm:ss");
      return <li key={dateString}>{dateString} || {open[index]} || {close[index]} || {high[index]} || {low[index]} || {volume[index]}</li>
    } )}</div>
}

const MyData = ({data, columns}) => {
    if(!data) return <h1> No Data</h1>
    const columns1 = _.map(data.data.headers, (a, b)=> {return {'Header': a, 'accessor' :b}})
    const derivedColumns = [{Header: 'Name', columns: columns1}]
    return <Table columns={derivedColumns} data={data.data.rows}></Table>

}

function App() {

    const [data, setData] = React.useState();
    const [earnings, setEarnings] = React.useState();



    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                columns: [
                    {
                        Header: 'First Name',
                        accessor: 'symbol',
                    },
                    {
                        Header: 'Last Name',
                        accessor: 'lastName',
                    },
                ],
            },
            {
                Header: 'Info',
                columns: [
                    {
                        Header: 'Age',
                        accessor: 'age',
                    },
                    {
                        Header: 'Visits',
                        accessor: 'visits',
                    },
                    {
                        Header: 'Status',
                        accessor: 'status',
                    },
                    {
                        Header: 'Profile Progress',
                        accessor: 'progress',
                    },
                ],
            },
        ],
        []
    )

   const alphabet = ['A', 'B'];

    const readEarningsData = (name) => {
        axios.get('/earnings')
            .then(res => {
                const persons = res.data;
                setEarnings(persons);
            })
    }
    const readApiData = (name) => {
        axios.get('/getData')
            .then(res => {
                const persons = res.data;
                setData(persons);
            })
    }
    return (
        <Styles>
        <div >
                <button onClick={readEarningsData}>Get Data</button>
            <button onClick={readApiData}>Get Data</button>

                {/*<labeledheatmap/>*/}

            {/*(data && <Table   data={data.rows} />)*/}
            <Container>
                <Row>
                    <Col sm={6}><MyData data={earnings} columns={columns}></MyData></Col>
                    <Col sm={6}><ParsedData data={data}></ParsedData></Col>

                </Row>
            </Container>
        </div>
        </Styles>
    );
}

export default App;
