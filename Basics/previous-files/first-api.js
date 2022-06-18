const http = require('http');
const data = require('./data')

http.createServer((request, response)=>{
    response.writeHead(200, {'Content-Type': 'text\html'});
    response.write(JSON.stringify(data));
    response.end();
}).listen(3000);