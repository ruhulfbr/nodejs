const Flash = require('../utils/Flash')

module.exports = () =>{
    return (req, res, next)=>{

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