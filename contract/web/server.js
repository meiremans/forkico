var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const file = './contracts/Token.sol';

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const generationOfContract = require('./../config/generateCrowdsaleFile');
const generationOfToken = require('./../config/generateTokenFile');

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.post('/generateToken', function (req, res) {
    generationOfContract.generateWaves(req.body.waves);
    generationOfToken.generateTokenFile(req.body.token.name,req.body.token.ticker,18,file,function(){
        res.send(200);
    });
});

app.post('/generateContract', function (req, res) {
    let waveData = req.body.waveData;
    let wallets = req.body.wallets;
    let meta = req.body.meta;

    generationOfContract.fillInConfig(waveData,wallets,meta,function(){
        res.send(200);
    });
});

app.listen(3000);