const {body}  = require('express-validator')

module.exports = [
    body('name')
        .trim()
        .not().notEmpty().withMessage('Full name field is required')
        .isLength({min:2}).withMessage('Full name must be between 2 to 15 character'),
    body('title')
        .trim()
        .not().notEmpty().withMessage('Sort Title field is required')
        .isLength({min:2}).withMessage('Sort title must be between 2 to 15 character'),
    body('bio')
        .trim()
        .not().notEmpty().withMessage('Sort bio field is required')
        .isLength({min:10, max:300}).withMessage('Sort title must be between 10 to 200 character'),
    body('facebook')
        .trim()
        .not().notEmpty().withMessage('Facebook profile URL field is required')
        .isURL().withMessage('Facebook profile URL field must be a valid URL'),
    body('twitter')
        .trim()
        .not().notEmpty().withMessage('Twitter profile URL field is required')
        .isURL().withMessage('Twitter profile URL field must be a valid URL'),
    body('website')
        .trim()
        .not().notEmpty().withMessage('Website profile URL field is required')
        .isURL().withMessage('Website profile URL field must be a valid URL'),
    body('github')
        .trim()
        .not().notEmpty().withMessage('Github profile URL field is required')
        .isURL().withMessage('Github profile URL field must be a valid URL'),
    body('profile_photo')
        .custom(async (profile_photo, {req}) => {
            if( req.file ){
                return true;
            }
            else{
                throw new Error('Profile photo is required')
            }
            
        })
];