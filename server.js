// import
var express = require('express');
var bodyParser = require('body-parser');

// instansiate express
var server = express();

//body parser configuration
server.use(bodyParser.urlencoded({ extended : TextTrackCueList}));
server.use(bodyParser.json());

// configue route
server.get('/', function (req, res){
    res.setHeader('content-typeof', 'text/html')
    res.status(200).send('<h1>bonjour sur mon server</h1>');
})

//launch server
server.listen(8080, function(){
    console.log('server en ecoute');
})