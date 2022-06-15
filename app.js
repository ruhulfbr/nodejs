const PORT = process.env.PORT || 8080
const express = require('express');
const morgan = require('morgan');
const app = express();
const userRouter = require('./router')


app.use('/user', userRouter);

app.get('/', (req, res)=>{
    res.send('<h1>I am in home page</h1>')
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
