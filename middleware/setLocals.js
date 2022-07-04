module.exports = () =>{
    return (req, res, next)=>{

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