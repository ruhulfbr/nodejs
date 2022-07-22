
//load helpers
const helper = require('../helpers/appHelper');

exports.dashboard = (req, res, next)=>{
    res.render('pages/dashboard/index',{
        title: "Dashboard",
        errors:{},
        value: {}
    })
}

exports.createProfile = (req, res, next)=>{
    res.render('pages/dashboard/create-profile',{
        title: "Create Profile",
        errors:{},
        value: {}
    })
}