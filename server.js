// import
var express    = require('express');
var bodyParser = require('body-parser');
var apiRouter   = require('./apiRouter').router;



// instansiate express
var server = express();



//body parser configuration
server.use(bodyParser.urlencoded({ extended : true}));
server.use(bodyParser.json());

// configue route
server.get('/', function (req, res){
    res.setHeader('content-type', 'text/html')
    res.status(200).send('<h1>bonjour sur mon server</h1>');
});

server.use('/api/', apiRouter)

server.listen(8080, function(){
    console.log('hello conding');
})