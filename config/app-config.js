var express = require("express");
var app = express();
var path  = require('path');
const mysql = require('mysql');
const cassandra = require('cassandra-driver');
const jwt = require('jsonwebtoken');
var db = require('./mysql');
var dbfunc = require('./db-function');
var http  = require('http')
var bodyParser = require('body-parser');
var UserRoute = require('../app/routes/user.route');
var AuthenticRoute = require('../app/routes/authentic.route');
var ZoneRoute = require('../app/routes/zone.route');
var MqttSubsriber = require('../app/services/mqtt/subscriber');
var TcpServer = require('../app/services/tcp/tcp');
var errorCode = require('../common/error-code')
var errorMessage = require('../common/error-methods')
var checkToken = require('./secureRoute');
var mqtt = require('mqtt');
var mosca = require('mosca');
var client  = mqtt.connect('mqtt://192.168.5.110');
let net = require('net');



var TcpSettings = {
  port: 5000,
  host: '127.0.0.1'
}

var Mqttsettings = {
  port:1883
  };
var server = new mosca.Server(Mqttsettings);  

server.on('ready', function(){
  console.log("Mosca broker running on port 1883..")
});

dbfunc.connectionCheck.then((data) =>{
    console.log(data);
 }).catch((err) => {
     console.log(err);
 });


 
 app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());

var router = express.Router();
app.use('/api',router);
AuthenticRoute.init(router);

var secureApi = express.Router();

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware

app.use('/secureApi',secureApi);
secureApi.use(checkToken);


app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// index route
app.get('/', (req,res) => {
    res.send('hello world');
});

var ApiConfig = {
  app: app
}

UserRoute.init(secureApi);
ZoneRoute.init(secureApi);

MqttSubsriber.init(client);

TcpServer.init(net, TcpSettings)

module.exports = ApiConfig;