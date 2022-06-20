const baseViewPath = 'pages/contact/';
const ContactModel = require('../model/Contact');

exports.list = (req, res)=>{
    ContactModel.find()
        .then((data)=>{
            res.render('contacts',{
                title: 'Contacts',
                contacts: data
            });
        })
        .catch((err)=>{
            res.status(500).json({
                status: 'error',
                message: err
            });
        })
}

exports.show = (req, res)=>{

    let {id} = req.params

    ContactModel.findById(id)
        .then((data)=>{
            res.status(200).json({
                status: 'suceess',
                message: 'Contact found with id = '+id,
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
            // res.status(200).json({
            //     status: 'suceess',
            //     message: 'New contact successfully created',
            //     data: data
            // });

            console.log(data);
            res.redirect('/contact')

        })
        .catch((err)=>{
            // res.status(500).json({
            //     status: 'error',
            //     message: err
            // });
            res.redirect('/contact')
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
    let {name, email, phone} = req.body
    let {id} = req.params

    if(name && email && phone){
        ContactModel.findByIdAndUpdate(id, {name, email, phone}, {new: true})
        .then((data)=>{
            res.status(200).json({
                status: 'suceess',
                message: 'Contact Updated',
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

exports.delete = (req, res)=>{
   let {id} = req.params

   ContactModel.findByIdAndDelete(id)
   .then((data)=>{
        res.status(200).json({
            status: 'suceess',
            message: 'Contact deleted successfull',
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