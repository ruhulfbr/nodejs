const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const userModel = require('../models/User');

//load helpers
const helper = require('../helpers/appHelper');

exports.signup = (req, res, next)=>{
    res.render('pages/auth/signup',{
        title: "Sign Up",
        errors:{},
        value: {}
    })
}

exports.signupPost = async (req, res, next)=>{

    const errors = validationResult(req).formatWith(helper.validationErrorformatter)
    if(!errors.isEmpty()){
        return res.render('pages/auth/signup',{
            title: "Sign Up",
            errors:errors.mapped(),
            value: req.body
        })
    }
    let postData = req.body
    try{

        let hashPassword = await bcrypt.hash(postData.password, 11);
        
        const user = new userModel({
            name: postData.name,
            username: postData.username,
            email: postData.email,
            password: hashPassword
        })

        let newCreatedUser = await user.save();

        console.log(newCreatedUser);

        console.log('user created successfully', newCreatedUser);
        res.render('pages/auth/signup',{
            title: "Sign Up"
        })

        res.redirect('auth/login');

    }catch(e){
        console.log(e);
        next(e);
    }

}

exports.login = (req, res, next)=>{

    console.log(req.session.isLogin, req.session.user);

    console.log('req.user', req.user);

    res.render('pages/auth/login', {
        title: 'Login',
        errors: {},
        value: {}
    })
}

exports.loginPost = async (req, res, next)=>{
    const errors = validationResult(req).formatWith(helper.validationErrorformatter)
    if(!errors.isEmpty()){
        return res.render('pages/auth/login',{
            title: "Login",
            errors:errors.mapped(),
            value: req.body
        })
    }

    const {email, password} = req.body;

    try{
        const user = await userModel.findOne({email});

        if(!user){
           return res.json({
                status: 'error',
                message : 'User not fund with this email'
            })
        }

        let passwordMatch = await bcrypt.compare(password, user.password);
        if( !passwordMatch ){
            return res.json({
                status: 'error',
                message : 'Invalid password'
            })
        }

        req.session.isLogin = true;
        req.session.user = user;

        res.render('pages/auth/login', {
            title: 'Login',
            errors: {},
            value: {}
        })

    }catch(e){
        console.log(e);
        next(e)
    }
}

exports.logout = (req, res, next)=>{

}