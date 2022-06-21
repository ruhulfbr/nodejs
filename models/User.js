const {Schema, model} = require('mongoose')
const Profile  = require('./Profile')

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: Profile
    }
},{
    timestamps: true
})

const User = model('user', userSchema);
module.exports = User