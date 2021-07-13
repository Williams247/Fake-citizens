/* USER MODEL */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const users = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    apiKey: {
        type: String,
        required: true
    },
    notification: {
        isNotified: Boolean,
        notifications: [String]
    },
    subscrption: Number
});

module.exports = mongoose.model('users', users);
