const http = require('http');

http.createServer((request, response)=>{
    response.writeHead(200, {'Content-Type': 'text\html'});
    response.write(JSON.stringify({name:'ruhul', age:'27'}));
    response.end();
}).listen(3000);