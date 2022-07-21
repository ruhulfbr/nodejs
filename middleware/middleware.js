const express = require('express');
const morgan = require('morgan')
const session = require('express-session')
const flash = require('connect-flash');
const MongoDBStore = require('connect-mongodb-session')(session);

//Custom Middlewares
const {bindUserWithRequest} = require('../middleware/authMiddleware')
const setLocals = require('../middleware/setLocals')

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

const middlewares = [
    //morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        secret: process.env.SERRET_KEY || 'SIMPLE-BLOG',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        },
        store: store,
    }),
    flash(),
    bindUserWithRequest(),
    setLocals()
];

module.exports = app =>{
    middlewares.forEach(m =>{
        app.use(m)
    })
}