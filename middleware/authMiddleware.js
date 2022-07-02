const userModel = require('../models/User')

exports.bindUserWithRequest = () =>{
    return async (req, res, next) => {
        if( !req.session.isLogin ){
           next();
        }

        try{
            let user = await userModel.findById(req.session.user._id)
            req.user = user;

            next();
        }
        catch(e){
            console.log(e)
            next(e);
        }

    }
}