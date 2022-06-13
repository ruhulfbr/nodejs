const PORT = process.env.PORT || 8080
const express = require('express');

const app = express();

app.listen(PORT, (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`Server is running in PORT ${PORT}`);
    }
});
