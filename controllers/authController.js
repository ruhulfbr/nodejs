const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const userModel = require('../models/User');
const Flash = require('../utils/Flash')

//load helpers
const helper = require('../helpers/appHelper');

exports.signup = (req, res, next)=>{
    res.render('pages/auth/signup',{
        title: "Sign Up",
        errors:{},
        value: {},
        flashMessage: Flash.getMessage(req)
    })
}

exports.signupPost = async (req, res, next)=>{

    const errors = validationResult(req).formatWith(helper.validationErrorformatter)
    if(!errors.isEmpty()){

        req.flash('error', 'Validation error occured');

        return res.render('pages/auth/signup',{
            title: "Sign Up",
            errors:errors.mapped(),
            value: req.body,
            flashMessage: Flash.getMessage(req)
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

        await user.save();

        req.flash('success', 'User created successfully');
        res.redirect('/auth/login');

    }catch(e){
        console.log(e);
        next(e);
    }

}

exports.login = (req, res, next)=>{
    res.render('pages/auth/login', {
        title: 'Login',
        errors: {},
        value: {},
        flashMessage: Flash.getMessage(req)
    })
}

exports.loginPost = async (req, res, next)=>{
    const errors = validationResult(req).formatWith(helper.validationErrorformatter)
    if(!errors.isEmpty()){
        req.flash('error', 'Validation error occured');
        return res.render('pages/auth/login',{
            title: "Login",
            errors:errors.mapped(),
            value: req.body,
            flashMessage: Flash.getMessage(req)
        })
    }

    const {email, password} = req.body;

    try{

        let hasError = false;
        const user = await userModel.findOne({email});

        if(!user){
            hasError = true
            req.flash('error', 'User not fund with this email');
        }
        else{
            let passwordMatch = await bcrypt.compare(password, user.password);
            if( !passwordMatch ){
                hasError = true
                req.flash('error', 'Invalid password');
            }
        }

        if(hasError){
            return res.render('pages/auth/login',{
                title: "Login",
                errors:errors.mapped(),
                value: req.body,
                flashMessage: Flash.getMessage(req)
            })
        }

        req.session.isLogin = true;
        req.session.user = user;
        req.session.save((err)=>{
           if(err){
                console.log(err);
                return next(err)
           }

           req.flash('success', 'Successfully Logged in');
           res.redirect('/dashboard') 
        });
    }catch(e){
        console.log(e);
        next(e)
    }
}

exports.logout = (req, res, next)=>{
    req.session.destroy((err) => {
        if(err){
            console.log(err);
            return next(err)
        }
        res.redirect('/auth/login') 
    })
}