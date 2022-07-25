const userProfileModel = require('../models/Profile')

module.exports = (page) =>{
    return async (req, res, next) => {
        try{
            let profile = await userProfileModel.findOne({user:req.user._id})
            if(page === 'dashboard' && !profile){
                return res.redirect('/dashboard/create-profile');
            }

            if(page === 'create-profile' && profile){
                return res.redirect('/dashboard/edit-profile');
            }

            next();

        }
        catch(e){
            next(e);
        }

    }
}
