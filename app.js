const PORT = process.env.PORT || 8080
const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const session = require('express-session')

const authRouter = require('./routes/authRoute')

const app = express();

app.use(authRouter)


app.set('view engine', 'ejs')
app.set('views', 'views')

const middlewares = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        secret: process.env.SERRET_KEY || 'SIMPLE-BLOG',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }
    })
];
app.use(middlewares)
app.use('/auth', authRouter)

app.get('/', (req, res)=>{
    res.render('pages/index', {
        title: 'Home'
    });
});

app.get('*', (req, res)=>{
    res.send('<h1>404 page not found</h1>')
});

mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true})
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


