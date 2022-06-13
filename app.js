const PORT = process.env.PORT || 8080
const express = require('express');

const app = express();

app.get('/contact', (req, res)=>{
    res.send('<h1>I am in Contact Page</h1>')
});

app.get('/service', (req, res)=>{
    res.send('<h1>I am in Seevice Page</h1>')
});

app.get('/about', (req, res)=>{
    res.send('<h1>I am in about Page</h1>')
});

app.get('/', (req, res)=>{
    //console.log(req.query.hello); //To read query parameter
    res.send('<h1>I am here</h1>')
});

app.get('*', (req, res)=>{
    res.send('<h1>404 page not found</h1>')
});

app.listen(PORT, (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`Server is running in PORT ${PORT}`);
    }
});
