const baseViewPath = 'pages/user/';

exports.login = (req, res)=>{
    res.render(baseViewPath+'login', {
        title: 'Login Page'
    })
}

exports.signup = (req, res)=>{
    res.render(baseViewPath+'signup', {
        title: 'Sign Page'
    })
}

exports.logout = (req, res)=>{
    res.render(baseViewPath+'logout', {
        title: 'Logout Page'
    })
}

exports.list = (req, res)=>{
    res.render(baseViewPath+'list', {
        title: 'User List Page'
    })
}

exports.show = (req, res)=>{
    res.render(baseViewPath+'view', {
        title: 'User View Page', 
        user_id: req.params.userId
    })
}