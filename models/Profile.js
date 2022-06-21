const {Schema, model} = require('mongoose')
const Post = require('./Post')
const User = require('./User')

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    title: {
        type: String,
        trim: true
    },
    bio: {
        type: String,
        trim: true
    },
    profilePic: string,
    links: {
        facebook: String,
        website: String,
        twitter: String,
        github: String
    },
    posts : [
        {
            type: Schema.Types.ObjectId,
            ref: Post
        }
    ],
    bookmarks : [
        {
            type: Schema.Types.ObjectId,
            ref: Post
        }
    ]
},{
    timestamps: true
})

const Profile = model('profile', profileSchema);
module.exports = Profile