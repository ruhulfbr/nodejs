const PORT = process.env.PORT || 8080
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs')


app.get('/', (req, res)=>{
    res.send('Work with mongo DB');
});

app.get('*', (req, res)=>{
    res.send('<h1>404 page not found</h1>')
});


mongoose.connect('mongodb://localhost:27017/test-DB', {useNewUrlParser: true})
.then(()=>{
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


