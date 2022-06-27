const router  = require('express').Router();

const authController = require('../controllers/authController')

router.get('/sign-up', authController.signup)
router.post('/sign-up', authController.signup)

router.get('/login', authController.login)
router.post('/login', authController.login)

router.get('/logout', authController.logout)



module.exports = router