const {Schema, model} = require('mongoose')
const Comment = require('./Comment')
const User = require('./User')

const postSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 150
    },
    body: {
        type: String,
        trim: true,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    thumbnail: String,
    readTime: String,
    likes: [Schema.Types.ObjectId],
    dislikes: [Schema.Types.ObjectId],
    comments : [
        {
            type: Schema.Types.ObjectId,
            ref: Comment
        }
    ],
},{
    timestamps: true
})

const Post = model('post', postSchema);
module.exports = Post