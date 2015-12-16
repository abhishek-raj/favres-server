var http = require('http');

var routes = require('./modules/routes-handler');

var server = http.createServer(routes.handler);

var port = process.env.PORT || 8124;

server.listen(port);

console.log('Server running at http://127.0.0.1:'+port);

//GET /restauratants