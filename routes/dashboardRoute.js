const router  = require('express').Router();
const dashboardController = require('../controllers/dashboardController')
const {isAuthenticated} = require('../middleware/authMiddleware')
const createProfileMiddleWare = require('../middleware/createProfileMiddleware')
const createProfileValidator = require('../validator/dashboard/createProfileValidator')

const upload = require('../middleware/uploadMiddleware')

router.get('/', isAuthenticated, createProfileMiddleWare('dashboard'), dashboardController.dashboard)
router.get('/create-profile', isAuthenticated, createProfileMiddleWare('create-profile'), dashboardController.createProfile)
router.post('/create-profile', isAuthenticated, createProfileMiddleWare('create-profile'), upload.single('profile_photo'), createProfileValidator, dashboardController.createProfilePost)
router.post('/upload-profile-photo', isAuthenticated, upload.single('profile-photo'), dashboardController.uploadProfilePhoto)
router.get('/remove-profile-photo', isAuthenticated, dashboardController.removeProfilePhoto)

router.get('/edit-profile', isAuthenticated, createProfileMiddleWare('edit-profile'), dashboardController.editProfile)
router.post('/update-profile', isAuthenticated, createProfileValidator, dashboardController.updateProfile)



module.exports = router