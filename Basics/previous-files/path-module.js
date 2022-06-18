const path = require('path');

let myfilepath = __filename
console.log(path.dirname(myfilepath));
console.log(path.basename(myfilepath));
console.log(path.extname(myfilepath));
console.log(path.isAbsolute(myfilepath));
console.log(path.isAbsolute('./index.js'));


let newObj = {
    dir: 'user/data',
    name:'sona',
    ext: '.php'
}

console.log(path.format(newObj))

console.log(path.join('user', 'data','sona.php'))
console.log(path.resolve(__dirname, 'scripts', 'hello.js'))
console.log(path.parse(myfilepath))

