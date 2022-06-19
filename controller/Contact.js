const baseViewPath = 'pages/contact/';
const ContactModel = require('../model/Contact');

exports.list = (req, res)=>{
    // res.render(baseViewPath+'index', {
    //     title: 'Contact List Page'
    // })

    res.send('Contact List page');
}

exports.show = (req, res)=>{
    res.send('Single Contact');
}

exports.create = (req, res)=>{
    let {name, email, phone} = req.body

    if(name && email && phone){
        let contactData = new ContactModel({
            name: name,
            email: email,
            phone: phone
        })
    
        contactData.save()
        .then((data)=>{
            res.status(200).json({
                status: 'suceess',
                message: 'New contact successfully created',
                data: data
            });
        })
        .catch((err)=>{
            res.status(500).json({
                status: 'error',
                message: err
            });
        })
    }
    else{
        res.status(500).json({
            status: 'error',
            message: 'name, email and phone are required'
        });
    }
}

exports.update = (req, res)=>{
    
}

exports.delete = (req, res)=>{
   
}