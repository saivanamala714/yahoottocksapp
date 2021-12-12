const express = require('express')
const app = express()
const port = 3001;
const axios = require('axios');
const _ = require('lodash')

app.get('/getData', (req, res) => {

  console.log(req.query)
  const {symbol} = req.query

  const config = {
    method: 'get',
    url: `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?region=US&lang=en-US&includePrePost=false&interval=1m&useYfid=true&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance`,
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
  console.log(req.query.date)
  const {date} = req.query;
  var config = {
    method: 'get',
    url: `https://api.nasdaq.com/api/calendar/earnings?date=${date}`,
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
        //console.log(JSON.stringify(response.data));
        res.send(response.data)
      })
      .catch(function (error) {
        console.log(error);
        res.send(error)
      });
})

app.get('/news', (req,res) =>{

  console.log(req.query)
  const {symbol} = req.query

  var config = {
    method: 'get',
    url: `https://ycharts.com/news/articles?num=100&securityId=${symbol}&useCountryCodeFilter=false`,
    headers: {
      'authority': 'ycharts.com',
      'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
      'accept': 'application/json, text/plain, */*',
      'x-requested-with': 'XMLHttpRequest',
      'sec-ch-ua-mobile': '?1',
      'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Mobile Safari/537.36',
      'sec-ch-ua-platform': '"Android"',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://ycharts.com/companies/AMZN',
      'accept-language': 'en-US,en;q=0.9',
      'cookie': 'ycsessionid=nj5gbstqbz34z4sr7zed5dhzkhi3z81b; _ga=GA1.2.1999833280.1639275468; _gid=GA1.2.1971042957.1639275468; __gads=ID=26c16c421502d515:T=1639275468:S=ALNI_MYQT8yMxvf5QoJnmh2D-_049ibAIQ; __hstc=69688216.d791d385ce1fc8e7d91421980dbc95aa.1639275470496.1639275470496.1639275470496.1; hubspotutk=d791d385ce1fc8e7d91421980dbc95aa; __hssrc=1; _gcl_au=1.1.777972877.1639275471; _fbp=fb.1.1639275470999.695507323; messagesUtk=2137a056052844bc82dea8c9d53c9dd8; __hssc=69688216.3.1639275470497; page_view_ctr=4; ycsessionid=nj5gbstqbz34z4sr7zed5dhzkhi3z81b'
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
  //console.log(`Example app listening at http://localhost:${port}`)
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