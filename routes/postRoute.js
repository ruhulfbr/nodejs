const router  = require('express').Router();
const {isAuthenticated} = require('../middleware/authMiddleware')

const upload = require('../middleware/uploadMiddleware')
const postController = require('./../controllers/postController')

router.get('/', isAuthenticated, postController.list)
router.get('/view', isAuthenticated, postController.view)



module.exports = router