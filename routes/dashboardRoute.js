const router  = require('express').Router();
const dashboardController = require('../controllers/dashboardController')
const {isAuthenticated} = require('../middleware/authMiddleware')
const createProfileMiddleWare = require('../middleware/createProfileMiddleware')

const upload = require('../middleware/uploadMiddleware')

router.get('/', isAuthenticated, createProfileMiddleWare('dashboard'), dashboardController.dashboard)
router.post('/upload-file', isAuthenticated, upload.single('profile-photo'), (req, res, next)=>{
    if(req.file){
        console.log(req.file)
    }

    console.log(req.body);

    res.redirect('/dashboard')
})

router.get('/create-profile', isAuthenticated, createProfileMiddleWare('create-profile'), dashboardController.createProfile)



module.exports = router