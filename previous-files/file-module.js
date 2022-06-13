const fs = require('fs');

let myObj = {
    name: 'Ruhul',
    phone: '017448552',
    profession: 'Engineer',
    family:{
        wife: 'mumu',
        son: 'Abdullah Amin Shahad'
    }
}

myObj = JSON.stringify(myObj)

// fs.writeFile('./test.json', myObj, (err)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log('Successfuly write in a file');
//     }
// });

fs.readFile('./test.json', (err, data)=>{
    if(err){
        console.log(err);
    }

    console.log(JSON.parse(data));

});