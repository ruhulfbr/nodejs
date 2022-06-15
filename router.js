const router = require('express').Router()
const userController = require('./user_controller')

router.get('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/signup', userController.signup);
router.get('/show/:userId', userController.show);
router.get('/', userController.list);
module.exports = router