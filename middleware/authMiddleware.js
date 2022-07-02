const userModel = require('../models/User')

exports.bindUserWithRequest = () =>{
    return async (req, res, next) => {
        if( !req.session.isLogin ){
           next();
        }

        console.log('req.session = ', req.session);

        try{

            if(req.hasOwnProperty('session') && req.session.hasOwnProperty('user')){
                let user = await userModel.findById(req.session.user._id)
                req.user = user;
            }
            else{
                req.user = null;
            }

            next();
        }
        catch(e){
            console.log(e)
            next(e);
        }

    }
}