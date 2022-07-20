
//load helpers
const helper = require('../helpers/appHelper');

exports.dashboard = (req, res, next)=>{
    res.render('pages/dashboard/index',{
        title: "Dashboard",
        errors:{},
        value: {}
    })
}