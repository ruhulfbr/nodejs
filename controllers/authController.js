exports.signup = (req, res, next)=>{

    console.log(req.body);

    res.render('pages/auth/signup',{
        title: "Sign Up"
    })
}

exports.login = (req, res, next)=>{
    res.render({

    }, '/pages/auth/login')
}

exports.logout = (req, res, next)=>{

}