const router = require('express').Router()

router.get('/login', (req, res)=>{
    res.send('I am in login route');
});

router.get('/logout', (req, res)=>{
    res.send('I am in logout route');
});

router.get('/signup', (req, res)=>{
    res.send('I am in signup route');
});

module.exports = router