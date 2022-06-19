const {Schema, model} = require('mongoose')

const conatctSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    }
});


const Contact = model('Contact', conatctSchema);

module.exports = Contact