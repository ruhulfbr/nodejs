const router  = require('express').Router();
const authController = require('../controllers/authController')
const signupValidator = require('../validator/auth/signupValidator')
const loginValidator = require('../validator/auth/loginValidator')

const {isNotAuthenticated} = require('../middleware/authMiddleware')



router.get('/signup', isNotAuthenticated, authController.signup)
router.post('/signup', isNotAuthenticated, signupValidator, authController.signupPost)

router.get('/login', isNotAuthenticated, authController.login)
router.post('/login', isNotAuthenticated, loginValidator, authController.loginPost)

router.get('/logout', authController.logout)



module.exports = router