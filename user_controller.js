exports.login = (req, res)=>{
    res.send('I am in login route');
}

exports.signup = (req, res)=>{
    res.send('I am in logout route');
}

exports.logout = (req, res)=>{
    res.send('I am in signup route');
}

exports.list = (req, res)=>{
    res.send('I am in user list  route');
}

exports.show = (req, res)=>{
    res.send('I am in user view  route and user id is '+ req.params.userId);
}