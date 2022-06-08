
console.log('Step 1');
console.log('Step 2');

setTimeout(function(){
    console.log('Step 3');
}, 3000);

console.log('Step 4');

let a = 10;
let b = 20;

let resolveData = new Promise((resolve, reject)=>{
    setTimeout(function(){
        resolve(40)
    }, 2000);
});

resolveData.then(function(data){
    console.log(a+data);
})


