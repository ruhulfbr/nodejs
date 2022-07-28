const router  = require('express').Router();
const {isAuthenticated} = require('../middleware/authMiddleware')

const upload = require('../middleware/uploadMiddleware')

router.get('/', isAuthenticated, createProfileMiddleWare('dashboard'), dashboardController.dashboard)



module.exports = router