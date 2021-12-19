const express = require('express')
const app = express()
const port = 3001;
const axios = require('axios');
const _ = require('lodash')

app.get('/getData', (req, res) => {

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
        res.send(response.data)
      })
      .catch(function (error) {
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
        res.send(response.data)
      })
      .catch(function (error) {
        res.send(error)
      });
})

app.get('/news', (req,res) =>{

  const {symbol} = req.query

  var config = {
    method: 'get',
    url: `https://ycharts.com/news/articles?num=30&securityId=${symbol}&useCountryCodeFilter=false`,
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
        res.send(response.data)
      })
      .catch(function (error) {
        res.send(error)
      });

})

app.get('/getUS', (req,res) =>{

  var config = {
    method: 'get',
    url: 'https://www.marketwatch.com/api/marketoverview/type/US',
    headers: {
      'authority': 'www.marketwatch.com',
      'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
      'tracestate': '1022681@nr=0-1-1684273-753720625-4f6f1ac2e07aff00----1639623480489',
      'traceparent': '00-7dca6630a70084821501f0ef5d014260-4f6f1ac2e07aff00-01',
      'sec-ch-ua-mobile': '?0',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36',
      'newrelic': 'eyJ2IjpbMCwxXSwiZCI6eyJ0eSI6IkJyb3dzZXIiLCJhYyI6IjE2ODQyNzMiLCJhcCI6Ijc1MzcyMDYyNSIsImlkIjoiNGY2ZjFhYzJlMDdhZmYwMCIsInRyIjoiN2RjYTY2MzBhNzAwODQ4MjE1MDFmMGVmNWQwMTQyNjAiLCJ0aSI6MTYzOTYyMzQ4MDQ4OSwidGsiOiIxMDIyNjgxIn19',
      'accept': 'application/html',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://www.marketwatch.com/investing/stock/AMZN',
      'accept-language': 'en-US,en;q=0.9',
      'cookie': 'kayla=g=3b0063e2e4744829acb5bc8c15853e2f; gdprApplies=false; ab_uuid=181e360f-1da3-42ea-8113-3b16f3f2d61a; CBSMWQuoteSeen=1; _pnvl=false; pushly.user_puuid=VFENj7H9txC2MfYvEjfbr2wmCVuTGzn0; _pndnt=; letsGetMikey=enabled; _ncg_id_=4c75aefb-1295-4cea-a53f-74dd817c5f6a; _sp_v1_uid=1:845:60a847df-8aec-4f26-b9c8-428365a16600; _sp_v1_ss=1:H4sIAAAAAAAAAItWqo5RKimOUbLKK83J0YlRSkVil4AlqmtrlXSoqiwWACMYp9h2AAAA; _sp_v1_opt=1:; _sp_v1_csv=null; _sp_v1_lt=1:; consentUUID=16183ddf-c4c5-4e2e-b543-b777ce557ee0; AMCVS_CB68E4BA55144CAA0A4C98A5%40AdobeOrg=1; _rdt_uuid=1638854778645.cd518e8d-0cf6-402d-8170-a11e4b719b6b; _ncg_g_id_=a261eccd-3685-41cb-afd7-3a281b10a669; _gcl_au=1.1.1610030327.1638854779; cX_P=kwvntkdt8x3kj7h5; usr_bkt=rGgki1wrhs; cX_S=kwvntkdzitm6lc26; _fbp=fb.1.1638854778807.1721938035; __gads=ID=bdf9ea9a1d3457d8:T=1638854778:S=ALNI_MY9LJjuuyrnyJkQvk7JYS1KiwyhBQ; s_cc=true; cX_G=cx%3A2qmv6vxnwbi432fqk3lzpakcpp%3A3amev8livnjn2; kuid=v1z2ci5ic; _pnlspid=11018; recentqsmkii=Stock-US-AMZN; permutive-id=9da6b9df-2f7f-454b-b324-a13295ad6348; mw_loc=%7b%22Country%22%3a%22US%22%2c%22Region%22%3a%22AR%22%2c%22City%22%3a%22BENTONVILLE%22%2c%22Continent%22%3a%22NA%22%2c%22County%22%3a%5b%22BENTON%22%5d%7d; _ncg_sp_ses.f57d=*; AMCV_CB68E4BA55144CAA0A4C98A5%40AdobeOrg=1585540135%7CMCIDTS%7C18978%7CMCMID%7C63837260424387838350943148174020185448%7CMCAAMLH-1640226405%7C9%7CMCAAMB-1640226405%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1639628805s%7CNONE%7CMCAID%7CNONE%7CvVersion%7C4.4.0; _parsely_session={%22sid%22:3%2C%22surl%22:%22https://www.marketwatch.com/tools/quotes/lookup.asp%22%2C%22sref%22:%22https://www.google.com/%22%2C%22sts%22:1639621605810%2C%22slts%22:1639194265114}; _parsely_visitor={%22id%22:%22pid=aebd421e3cf43f1ed5e41cc28d828a3c%22%2C%22session_count%22:3%2C%22last_session_ts%22:1639621605810}; fullcss-quote=quote-b112386e71.min.css; icons-loaded=true; ksg=u078fu8l7,vlpkh3fty,t9f4zevbn,vow5tmibz,uhhxj8as8,t963r1c9g,vow7nrapf,uaac1ephd,uaachbgmo,vpud310cy,t9998rd02,uaouthrkv,u00fyqzbu,ug4pdktsx,ub7cvsdvn,t98rq0q4o,uaos8yyz5,uicrvbqb7,vmurdl1tf,u6mi3tzwa; _pnss=blocked; permutive-session=%7B%22session_id%22%3A%22be7d0614-ea51-4040-97df-0b3e410afb97%22%2C%22last_updated%22%3A%222021-12-16T02%3A54%3A32.890Z%22%7D; cto_bundle=F0KPB196amllT0NucG4lMkYlMkJZelBQNG04OXNZc2VaOVBmRDRQOUo4UjdRSGxrVkVXUERsdmxUQmw1MW00VWhpRldKNTJjMTgxTlklMkZiWHNPbnpwUGxMVjRGSk1WR2kxTmd6Y3pNUmRXUzNpWnhKUEVYenBuTE43cVlLQmllY1VsaiUyRlpPNVl3a2RUVlRSWko5SHlZSUtZMEhBU0dKRzQ3NlVCdSUyQk5jT0tjQUsxbjRrMjZyTTZvMGRCVUFxM2FlQ1cwdVdQMSUyQmtMWGJTcHl6R05YV2xlT0JLY0hpMzVRJTNEJTNE; utag_main=v_id:017d935b5c6e004408e55584287805078001c07000942$_sn:3$_ss:0$_st:1639625269501$vapi_domain:marketwatch.com$ses_id:1639621605038%3Bexp-session$_pn:4%3Bexp-session$_prevpage:MW_Quote_Page%3Bexp-1639627069506; _ncg_sp_id.f57d=4c75aefb-1295-4cea-a53f-74dd817c5f6a.1638854778.3.1639623470.1639194454.d3b38d39-3953-4e9e-8578-0b45e0318bc1; _sp_v1_data=2:371411:1638854778:0:10:0:10:0:0:_:-1; cX_T=kx8dhangp5sqootw; s_tp=4614; s_ppv=MW_Quote_Page%2C17%2C17%2C789; s_sq=djglobal%3D%2526c.%2526a.%2526activitymap.%2526page%253DMW_Quote_Page%2526link%253DEurope%2526region%253DBODY%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c%2526pid%253DMW_Quote_Page%2526pidt%253D1%2526oid%253Dhttps%25253A%25252F%25252Fwww.marketwatch.com%25252Fmarkets%25252Feurope-middle-east%2526ot%253DA; gdprApplies=false'
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

app.get('/getStockDetails', (req,res) =>{

  const {symbol} = req.query

  var config = {
    method: 'get',
    url: `https://www.wsj.com/market-data/quotes/${symbol}?id=%7B%22ticker%22%3A%22${symbol}%22%2C%22countryCode%22%3A%22US%22%2C%22exchange%22%3A%22%22%2C%22type%22%3A%22STOCK%22%2C%22path%22%3A%22%2F${symbol}%22%7D&type=quotes_chart`,
    headers: {
      'authority': 'www.wsj.com',
      'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
      'sec-ch-ua-mobile': '?0',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      'sec-ch-ua-platform': '"macOS"',
      'accept': '*/*',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': `https://www.wsj.com/market-data/quotes/${symbol}`,
      'accept-language': 'en-US,en;q=0.9',
      'cookie': 'DJSESSION=country%3Dus%7C%7Ccontinent%3Dna%7C%7Cregion%3Dks%7C%7Ccity%3Dstilwell%7C%7Clatitude%3D38.7858%7C%7Clongitude%3D-94.6907%7C%7Ctimezone%3Dcst%7C%7Czip%3D66085; wsjregion=na%2Cus; gdprApplies=false; ccpaApplies=false; usr_prof_v2=eyJpYyI6MH0%3D; ab_uuid=9fa1d722-c96d-4f73-9317-87618b79f240; usr_bkt=q85AaJVP78; cX_P=kxc34r6c7qy9zc4x; cX_S=kxc34r6gt57ffb44; wsjregion=na%2Cus; gdprApplies=false; ccpaApplies=false; usr_prof_v2=eyJpYyI6MX0%3D'
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

app.get('/getStockHistory', (req,res) =>{

  const {symbol} = req.query

  var config = {
    method: 'get',
    url: 'https://api-secure.wsj.net/api/michelangelo/timeseries/history?json=%7B%22Step%22%3A%22P1D%22%2C%22TimeFrame%22%3A%22P29D%22%2C%22EntitlementToken%22%3A%2257494d5ed7ad44af85bc59a51dd87c90%22%2C%22IncludeMockTick%22%3Atrue%2C%22FilterNullSlots%22%3Afalse%2C%22FilterClosedPoints%22%3Atrue%2C%22IncludeClosedSlots%22%3Afalse%2C%22IncludeOfficialClose%22%3Atrue%2C%22InjectOpen%22%3Afalse%2C%22ShowPreMarket%22%3Afalse%2C%22ShowAfterHours%22%3Afalse%2C%22UseExtendedTimeFrame%22%3Atrue%2C%22WantPriorClose%22%3Atrue%2C%22IncludeCurrentQuotes%22%3Afalse%2C%22ResetTodaysAfterHoursPercentChange%22%3Afalse%2C%22Series%22%3A%5B%7B%22Key%22%3A%22STOCK%2FUS%2FXNAS%2FAMZN%22%2C%22Dialect%22%3A%22Charting%22%2C%22Kind%22%3A%22Ticker%22%2C%22SeriesId%22%3A%22s1%22%2C%22DataTypes%22%3A%5B%22Last%22%5D%7D%5D%7D&ckey=57494d5ed7',
    headers: {
      'Connection': 'keep-alive',
      'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Dylan2010.EntitlementToken': '57494d5ed7ad44af85bc59a51dd87c90',
      'sec-ch-ua-mobile': '?0',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      'sec-ch-ua-platform': '"macOS"',
      'Origin': 'https://www.wsj.com',
      'Sec-Fetch-Site': 'cross-site',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Dest': 'empty',
      'Referer': 'https://www.wsj.com/',
      'Accept-Language': 'en-US,en;q=0.9'
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
