const PORT = process.env.PORT || 8080
const express = require('express');
const morgan = require('morgan');
const app = express();
const userRouter = require('./router')
app.set('view engine', 'ejs')

app.use('/user', userRouter);
app.get('/', (req, res)=>{
    res.render('index',{
        'title': 'Home Page',
        'lorem_ipsum_head' : 'What is Lorem Ipsum?',
        'desc': "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    })
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
