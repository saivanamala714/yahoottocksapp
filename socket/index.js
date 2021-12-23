// Node.js WebSocket server script
const http = require('http');
const axios = require("axios");
const WebSocketServer = require('websocket').server;
const server = http.createServer();
const _ = require('lodash');
server.listen(9898);
const wsServer = new WebSocketServer({
    httpServer: server
});

function startProcess() {




}

wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);
    setInterval(function(){
        console.log('comes here')

        var data = 'draw=3&columns%5B0%5D%5Bdata%5D=Symbol&columns%5B0%5D%5Bname%5D=Symbol&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=CompanyName&columns%5B1%5D%5Bname%5D=CompanyName&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=CurrentPrice&columns%5B2%5D%5Bname%5D=CurrentPrice&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=PricePctChg&columns%5B3%5D%5Bname%5D=PricePctChg&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=TradeCount&columns%5B4%5D%5Bname%5D=TradeCount&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=TotalVolume&columns%5B5%5D%5Bname%5D=TotalVolume&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=true&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=AvgVolume_90Day&columns%5B6%5D%5Bname%5D=AvgVolume_90Day&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=true&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=RelativeVolume&columns%5B7%5D%5Bname%5D=RelativeVolume&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=true&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B8%5D%5Bdata%5D=CallVolume&columns%5B8%5D%5Bname%5D=CallVolume&columns%5B8%5D%5Bsearchable%5D=true&columns%5B8%5D%5Borderable%5D=true&columns%5B8%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B8%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B9%5D%5Bdata%5D=PutVolume&columns%5B9%5D%5Bname%5D=PutVolume&columns%5B9%5D%5Bsearchable%5D=true&columns%5B9%5D%5Borderable%5D=true&columns%5B9%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B9%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B10%5D%5Bdata%5D=PutPercentage&columns%5B10%5D%5Bname%5D=PutPercentage&columns%5B10%5D%5Bsearchable%5D=true&columns%5B10%5D%5Borderable%5D=true&columns%5B10%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B10%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B11%5D%5Bdata%5D=TotalNotional&columns%5B11%5D%5Bname%5D=TotalNotional&columns%5B11%5D%5Bsearchable%5D=true&columns%5B11%5D%5Borderable%5D=true&columns%5B11%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B11%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B12%5D%5Bdata%5D=AvgNotional_90Day&columns%5B12%5D%5Bname%5D=AvgNotional_90Day&columns%5B12%5D%5Bsearchable%5D=true&columns%5B12%5D%5Borderable%5D=true&columns%5B12%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B12%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B13%5D%5Bdata%5D=RelativeNotional&columns%5B13%5D%5Bname%5D=RelativeNotional&columns%5B13%5D%5Bsearchable%5D=true&columns%5B13%5D%5Borderable%5D=true&columns%5B13%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B13%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B14%5D%5Bdata%5D=CallNotional&columns%5B14%5D%5Bname%5D=CallNotional&columns%5B14%5D%5Bsearchable%5D=true&columns%5B14%5D%5Borderable%5D=true&columns%5B14%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B14%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B15%5D%5Bdata%5D=PutNotional&columns%5B15%5D%5Bname%5D=PutNotional&columns%5B15%5D%5Bsearchable%5D=true&columns%5B15%5D%5Borderable%5D=true&columns%5B15%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B15%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=11&order%5B0%5D%5Bdir%5D=desc&start=0&length=6000&search%5Bvalue%5D=&search%5Bregex%5D=false';

        var config = {
            method: 'post',
            url: 'https://marketchameleon.com/Reports/ovrMainData',
            headers: {
                'authority': 'marketchameleon.com',
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'accept': 'application/json, text/javascript, */*; q=0.01',
                'sec-ch-ua-platform': '"macOS"',
                'origin': 'https://marketchameleon.com',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                'accept-language': 'en-US,en;q=0.9'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                connection.sendUTF(JSON.stringify(response.data.data));
            })
            .catch(function (error) {
                connection.sendUTF(JSON.stringify(error));
            });
    }, 10*1000);
    connection.on('message', function(message) {
        console.log('Received Message:', message.utf8Data);
        connection.sendUTF('Hi this is WebSocket server!');
    });
    connection.on('close', function(reasonCode, description) {
        console.log('Client has disconnected.');
    });
});
