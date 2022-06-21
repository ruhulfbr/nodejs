const PORT = process.env.PORT || 8080
const express = require('express');
const mongoose = require('mongoose')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs')


app.get('/', (req, res)=>{
    res.json({
        title: 'Home Page'
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


