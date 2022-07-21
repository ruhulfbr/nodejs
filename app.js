require('dotenv').config()
const PORT = process.env.PORT || 8080
const express = require('express');
const mongoose = require('mongoose')
const config = require('config')

//Middlewares
const setMiddleWare = require('./middleware/middleware');
//Route
const setRoute = require('./routes/route');

//Others variables
const MONGODB_URL = 'mongodb://localhost:27017/blog';

const app = express();

app.set('view engine', 'ejs')
app.set('views', 'views')

//Using middleware from middleware directory
setMiddleWare(app);

//Using routes from route directory
setRoute(app);

mongoose.connect(MONGODB_URL, {useNewUrlParser: true})
.then(()=>{
    console.log('Database conncted');
    app.listen(PORT, (err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(`Server is running in PORT ${PORT}`);
        }
    });
})
.catch((e)=>{
    console.log('Error in database connection', e);
})


