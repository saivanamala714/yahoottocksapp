var axios = require('axios');
var _ = require('lodash');
var data = 'draw=3&columns%5B0%5D%5Bdata%5D=Symbol&columns%5B0%5D%5Bname%5D=Symbol&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=CompanyName&columns%5B1%5D%5Bname%5D=CompanyName&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=CurrentPrice&columns%5B2%5D%5Bname%5D=CurrentPrice&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=PricePctChg&columns%5B3%5D%5Bname%5D=PricePctChg&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=TradeCount&columns%5B4%5D%5Bname%5D=TradeCount&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=TotalVolume&columns%5B5%5D%5Bname%5D=TotalVolume&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=true&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=AvgVolume_90Day&columns%5B6%5D%5Bname%5D=AvgVolume_90Day&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=true&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=RelativeVolume&columns%5B7%5D%5Bname%5D=RelativeVolume&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=true&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B8%5D%5Bdata%5D=CallVolume&columns%5B8%5D%5Bname%5D=CallVolume&columns%5B8%5D%5Bsearchable%5D=true&columns%5B8%5D%5Borderable%5D=true&columns%5B8%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B8%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B9%5D%5Bdata%5D=PutVolume&columns%5B9%5D%5Bname%5D=PutVolume&columns%5B9%5D%5Bsearchable%5D=true&columns%5B9%5D%5Borderable%5D=true&columns%5B9%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B9%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B10%5D%5Bdata%5D=PutPercentage&columns%5B10%5D%5Bname%5D=PutPercentage&columns%5B10%5D%5Bsearchable%5D=true&columns%5B10%5D%5Borderable%5D=true&columns%5B10%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B10%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B11%5D%5Bdata%5D=TotalNotional&columns%5B11%5D%5Bname%5D=TotalNotional&columns%5B11%5D%5Bsearchable%5D=true&columns%5B11%5D%5Borderable%5D=true&columns%5B11%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B11%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B12%5D%5Bdata%5D=AvgNotional_90Day&columns%5B12%5D%5Bname%5D=AvgNotional_90Day&columns%5B12%5D%5Bsearchable%5D=true&columns%5B12%5D%5Borderable%5D=true&columns%5B12%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B12%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B13%5D%5Bdata%5D=RelativeNotional&columns%5B13%5D%5Bname%5D=RelativeNotional&columns%5B13%5D%5Bsearchable%5D=true&columns%5B13%5D%5Borderable%5D=true&columns%5B13%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B13%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B14%5D%5Bdata%5D=CallNotional&columns%5B14%5D%5Bname%5D=CallNotional&columns%5B14%5D%5Bsearchable%5D=true&columns%5B14%5D%5Borderable%5D=true&columns%5B14%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B14%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B15%5D%5Bdata%5D=PutNotional&columns%5B15%5D%5Bname%5D=PutNotional&columns%5B15%5D%5Bsearchable%5D=true&columns%5B15%5D%5Borderable%5D=true&columns%5B15%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B15%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=11&order%5B0%5D%5Bdir%5D=desc&start=0&length=6000&search%5Bvalue%5D=&search%5Bregex%5D=false';

var config = {
    method: 'post',
    url: 'https://marketchameleon.com/Reports/ovrMainData',
    headers: {
        'authority': 'marketchameleon.com',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-mobdisp': 'true',
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'sec-ch-ua-platform': '"macOS"',
        'origin': 'https://marketchameleon.com',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'accept-language': 'en-US,en;q=0.9',
        'Cookie': 'ASP.NET_SessionId=ydkp2ggmhyavrwfvtg2n1ic3; v1=46050630; ak_bmsc=4C3D9834FE06F908FE9F916D0A4CD6F7~000000000000000000000000000000~YAAQT2bNFzryGL19AQAAiKG95Q6ri4XI/HE0ynl6yHNinJLNPapSLDcqarIR2OFH2r77zr2HwAGp25o5pVj8sVvT/Jh2ewotau3GFsGTeAo3u8C62axSbOBMmmGOT1G3zEkYCf66R6Q07iy0NLwf6oFhkjc86GgoB9VT+svKZkWHtFcd1/o7y9M1wtZ66qgK336Jq/n7A3NiuybLmLxzwe5xkYZb0PVbaJgrE7hXgomoZouy/B2K2r3kPCca/8KXzOEgSJ0uvJTySo/oWMvnBBOTf8NrunFs4RtwqJa/+633CSNS2lOyfhF4onmg5A8D7ZwbEF8rbrKvr7I0vo/PK+53WWRWOonhKDvJniKGmf9/f+TSSM5hcC7rqdFMVGScAPmI; bm_sv=767AC12BB7AE8C58A0CF7E1C848E6E67~DymIBayHhBT+nB9HjCRspwurbAYrpaQsAQ/F+2yZiZ89wKi8fY5y9kbrIDNFre2HI6LEFH2NyACqEzyJ8pmaKBHKCP9Ee5c+cOnKO5pFI2bLKn2NqbTg1t4gXl6Q2TXsLzbVI2i+QglCEPz5KVvBIjyQTCjMtCTnTTTvz4fvoaY='
    },
    data : data
};

axios(config)
    .then(function (response) {
        const parsedData = _.map(response.data.data, e=> {
            e.SymbolLinkHtml = null;
            return e})
       // console.log(JSON.stringify(parsedData))
    })
    .catch(function (error) {
        console.log(error);
    });


