const express = require('express')
const app = express()
const port = 3001;
const axios = require('axios');
const _ = require('lodash')

app.get('/getData', (req, res) => {

  const config = {
    method: 'get',
    url: 'https://query2.finance.yahoo.com/v8/finance/chart/AMZN?region=US&lang=en-US&includePrePost=false&interval=1m&useYfid=true&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance',
    headers: {
      'authority': 'query1.finance.yahoo.com',
      'sec-ch-ua': '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
      'sec-ch-ua-mobile': '?1',
      'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Mobile Safari/537.36',
      'sec-ch-ua-platform': '"Android"',
      'accept': '*/*',
      'origin': 'https://finance.yahoo.com',
      'sec-fetch-site': 'same-site',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'accept-language': 'en-US,en;q=0.9',
      'proxy': 'https://finance.yahoo.com/',
      'Cookie': 'B=6ll3g51gpjeru&b=3&s=qo'
    }
  };

  axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        res.send(response.data)
      })
      .catch(function (error) {
        console.log(error);
        res.send(error)
      });
})


app.get('/earnings', (req,res) =>{
  var config = {
    method: 'get',
    url: 'https://api.nasdaq.com/api/calendar/earnings?date=2021-12-07',
    headers: {
      'authority': 'api.nasdaq.com',
      'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
      'accept': 'application/json, text/plain, */*',
      'sec-ch-ua-mobile': '?1',
      'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Mobile Safari/537.36',
      'sec-ch-ua-platform': '"Android"',
      'origin': 'https://www.nasdaq.com',
      'sec-fetch-site': 'same-site',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://www.nasdaq.com/',
      'accept-language': 'en-US,en;q=0.9'
    }
  };

  axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        res.send(response.data)
      })
      .catch(function (error) {
        console.log(error);
        res.send(error)
      });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// const temp = {
//   "time": "Time",
//   "symbol": "Symbol",
//   "name": "Company Name",
//   "eps": "EPS",
//   "surprise": "% Surprise",
//   "marketCap": "Market Cap",
//   "fiscalQuarterEnding": "Fiscal Quarter Ending",
//   "epsForecast": "Consensus EPS* Forecast",
//   "noOfEsts": "# of Ests"
// }
//
// const columns = _.map(temp, (a, b)=> {return {'Header': a, 'accessor' :b}})
//
//
//
//
//
// console.log(JSON.stringify(derivedColumns))