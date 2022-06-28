const router  = require('express').Router();

const authController = require('../controllers/authController')

router.get('/signup', authController.signup)
router.post('/signup', authController.signup)

router.get('/login', authController.login)
router.post('/login', authController.login)

router.get('/logout', authController.logout)



module.exports = router