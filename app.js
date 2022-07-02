const PORT = process.env.PORT || 8080
const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);

//Innner Modules
const authRouter = require('./routes/authRoute')
const {bindUserWithRequest} = require('./middleware/authMiddleware')
const setLocals = require('./middleware/setLocals')


//Others variables
const MONGODB_URL = 'mongodb://localhost:27017/blog';

//Connect Mongo DB session
const store = new MongoDBStore({
    uri: MONGODB_URL,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 2
});
  
  // Catch errors
store.on('error', function(error) {
    console.log(error);
});

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
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        },
        store: store,
    }),
    bindUserWithRequest(),
    setLocals()
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


