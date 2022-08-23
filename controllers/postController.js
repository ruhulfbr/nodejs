const {validationResult} = require('express-validator')
const Flash = require('../utils/Flash')
//load helpers
const helper = require('../helpers/appHelper');

const userModel = require('../models/User')
const postModel = require('../models/Post');
const { set } = require('mongoose');
const fs = require('fs');


//Some Constant
let defaultPhoto = '/uploads/nophoto.jpg';

exports.list = (req, res, next)=>{
    res.render('pages/post/index',{
        title: "Posts",
        errors:{},
        value: {}
    })
}

exports.view = (req, res, next)=>{
    res.render('pages/post/index',{
        title: "Post Details",
        errors:{},
        value: {}
    })
}

exports.create = (req, res, next)=>{
    res.render('pages/dashboard/create-profile',{
        title: "Create Profile",
        errors:{},
        value: {}
    })
}

exports.createPost = async (req, res, next)=>{
    const errors = validationResult(req).formatWith(helper.validationErrorformatter)
    if(!errors.isEmpty()){

        if(req.file){
            fs.unlinkSync('public/uploads/'+req.file.filename)
        }

        req.flash('error', 'Validation error occured');
        return res.render('pages/dashboard/create-profile',{
            title: "Create Profile",
            errors: errors.mapped(),
            value: req.body,
            flashMessage: Flash.getMessage(req)
        })
    }
    else{

        let postData = req.body
        let profileData = {
            user: req.user._id,
            name: postData.name,
            title: postData.title,
            bio: postData.bio,
            profilePic: req.user.profilePic,
            links:{
                facebook: postData.facebook,
                twitter: postData.twitter,
                website: postData.website,
                github: postData.github
            }
        }
        try{
            let userProfile = await userProfileModel.create(profileData)

            console.log('userProfile', userProfile);
            await userModel.findByIdAndUpdate(
                req.user._id, 
                {$set: {profile: userProfile._id}}
            )

            await uploadPhoto(req, userProfile._id)

            req.flash('success', 'Profile created successfully');
            res.redirect('/dashboard');
        }
        catch(e){
            next(e);
        }
    }
}

exports.edit = async (req, res, next)=>{
    let userProfile = await userProfileModel.findOne({user: req.user._id});
        userProfile.facebook = userProfile.links.facebook ? userProfile.links.facebook : '';
        userProfile.github   = userProfile.links.github ? userProfile.links.github : ''
        userProfile.twitter  = userProfile.links.twitter ? userProfile.links.twitter : ''
        userProfile.website  = userProfile.links.website ? userProfile.links.website : ''

        if (!fs.existsSync(`public${userProfile.profilePic}`)) {
            userProfile.profilePic = defaultPhoto
        }

    res.render('pages/dashboard/edit-profile',{
        title: "Edit Profile",
        errors:{},
        value: userProfile
    })
}

exports.updatePost = async (req, res, next)=>{
    
    const errors = validationResult(req).formatWith(helper.validationErrorformatter)
    if(!errors.isEmpty()){
        req.flash('error', 'Validation error occured');
        return res.render('pages/dashboard/edit-profile',{
            title: "Edit Profile",
            errors: errors.mapped(),
            value: req.body,
            flashMessage: Flash.getMessage(req)
        })
    }
    else{

        let postData = req.body
        let profileData = {
            user: req.user._id,
            name: postData.name,
            title: postData.title,
            bio: postData.bio,
            profilePic: req.user.profilePic,
            links:{
                facebook: postData.facebook,
                twitter: postData.twitter,
                website: postData.website,
                github: postData.github
            }
        }
        try{
            let userProfile = await userProfileModel.findOneAndUpdate({user: req.user._id}, {$set: profileData})

            req.flash('success', 'Profile updated successfully');
            res.redirect('/dashboard/edit-profile');
        }
        catch(e){
            next(e);
        }
    }
}

uploadPhoto = async (req, profileId)=>{

    if(req.file){
        try{
            let profilePic = '/uploads/'+req.file.filename
            await userModel.findByIdAndUpdate(
                req.user._id, 
                {$set: {profilePic: profilePic}}
            )

            await userProfileModel.findByIdAndUpdate(
                profileId, 
                {$set: {profilePic: profilePic}}
            )

            if( req.user.profilePic !== defaultPhoto ){
                var filePath = `public${req.user.profilePic}`; 
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }

            return {
                type: 'success',
                message: 'Profile photo uploaded successfully'
            }

        }
        catch(e){
            return {
                type: 'error',
                message: e.message,
                filename: profilePic
            }
        }
    }
    else{
        return {
            type: 'error',
            message: 'Photo no uploaded, maybe something went wrong'
        }        
    }
}