const PORT = process.env.PORT || 8080
const express = require('express');
const morgan = require('morgan');

const app = express();
const router = express.Router()

router.get('/login', (req, res)=>{
    res.send('I am in login route');
});

router.get('/logout', (req, res)=>{
    res.send('I am in logout route');
});

router.get('/signup', (req, res)=>{
    res.send('I am in signup route');
});

app.use('/user', router);

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
