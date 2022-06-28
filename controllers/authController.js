const bcrypt = require('bcrypt')
const userModel = require('../models/User');

exports.signup = (req, res, next)=>{
    res.render('pages/auth/signup',{
        title: "Sign Up"
    })
}

exports.signupPost = async (req, res, next)=>{
    console.log(req.body);
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

    }catch(e){
        console.log(e);
        next(e);
    }

}

exports.login = (req, res, next)=>{
    res.render({

    }, '/pages/auth/login')
}

exports.logout = (req, res, next)=>{

}