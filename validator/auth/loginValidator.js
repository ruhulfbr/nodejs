
const {body}  = require('express-validator')

module.exports = [
    body('email')
        .not().notEmpty().withMessage('Email is required'),
    body('password')
        .not().notEmpty().withMessage('Password is required')
];