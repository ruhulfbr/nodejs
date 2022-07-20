const userModel = require('../models/User')

exports.bindUserWithRequest = () =>{
    return async (req, res, next) => {
        if( !req.session.isLogin ){
          return next();
        }

        try{
            let user = await userModel.findById(req.session.user._id)
            req.user = user;
            next();
        }
        catch(e){
            console.log('Some Error',e)
            next(e);
        }

    }
}

exports.isNotAuthenticated = (req, res, next) =>{
    if( req.session.isLogin ){
        return res.redirect('back');
    }

    next()
}

exports.isAuthenticated = (req, res, next) =>{
    if( !req.session.isLogin ){
        return res.redirect('/auth/login')
    }

    next()
}