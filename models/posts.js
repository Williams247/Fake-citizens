/* POST MODEL */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const posts = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    post: {
        topic: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    },
    comments: [{
        user: { type: Schema.Types.ObjectId, ref: 'users' },
        comment: { type: String }
    }]
});

module.exports = mongoose.model('posts', posts);