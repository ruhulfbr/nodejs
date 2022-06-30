const router  = require('express').Router();
const authController = require('../controllers/authController')
const signupValidator = require('../validator/auth/signupValidator')
const loginValidator = require('../validator/auth/loginValidator')



router.get('/signup', authController.signup)
router.post('/signup', signupValidator, authController.signupPost)

router.get('/login', authController.login)
router.post('/login',loginValidator, authController.loginPost)

router.get('/logout', authController.logout)



module.exports = router