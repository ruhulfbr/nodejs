const multer = require('multer');
const { type } = require('os');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb)=>{
        cb(null, file.fieldname+'-'+Date.now()+'-'+file.originalname);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) =>{

        console.log('file', file);

        const types = /jpeg|jpg|png|gif/
        const fileExt = types.test(path.extname(file.originalname).toLocaleLowerCase());
        const mimeType = types.test(file.mimetype)

        console.log('fileExt', fileExt);
        console.log('mimeType', mimeType);

        if( fileExt && mimeType ){
            cb(null, true)
        }else{
            cb(new Error('Invalid file type'));
        }
    }
});

module.exports = upload
