const userModel = require('../../models/User')
const {body}  = require('express-validator')

module.exports = [
    body('username')
        .isLength({min:2, max:15}).withMessage('Username must be between 2 to 15 character')
        .custom(async username => {
            let user = await userModel.findOne({username});
            if( user ){
                return Promise.reject('An user with this username already exist')
            }

            return true;
        })
        .trim(),
    body('email')
        .isEmail().withMessage('Please provide a valid email')
        .custom(async email => {
            let user = await userModel.findOne({email});
            if( user ){
                return Promise.reject('An user with this email already exist')
            }

            return true;
        })
        .normalizeEmail(),
    body('password')
        .isLength({min:6, max:15}).withMessage('Password must be between 2 to 15 in length'),
    body('confirm_password')
        .custom(async (confirm_password, {req}) => {
            if( confirm_password !== req.body.password ){
                throw new Error('Password and confirm password does not match')
            }
            return true;
        })
];