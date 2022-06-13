const PORT = process.env.PORT || 8080
const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    console.log(req.query.hello); //To read query parameter
    res.send('<h1>I am here</h1>')
});

app.listen(PORT, (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`Server is running in PORT ${PORT}`);
    }
});
