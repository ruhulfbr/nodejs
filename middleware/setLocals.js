const Flash = require('../utils/Flash')
let defaultPhoto = '/uploads/nophoto.jpg';

module.exports = () =>{
    return (req, res, next)=>{

        res.locals.userDefaultPhoto = defaultPhoto
        res.locals.flashMessage = Flash.getMessage(req)

        if(req.hasOwnProperty('session') && req.session.hasOwnProperty('isLogin')){
            res.locals.isLogin = req.session.isLogin;
        }
        else{
            res.locals.isLogin = false;
        }
        res.locals.user = req.user

        next()
    }
}