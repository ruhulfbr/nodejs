const fs = require('fs')
const http = require('http');

const mainFIle = http.createServer((req, res)=>{
    fs.readFile('./index.html',(err, data)=>{
        res.write(data);
        res.end()
    });
});

mainFIle.listen(3000, (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('Searver is running');
    }
});

