const { response } = require('express');
const express = require('express');

const router = express.Router();

const Posts = require('../models/posts');

// @GET REQUEST - Renders the page to create an issue
router.get('/help-center', (request, response) => {
    const errorMessage = request.flash('help_error');
    const successMessage = request.flash('help_success');

    let errMsg;
    let succMsg;

    if (errorMessage.length > 0) {
        errMsg = errorMessage[0]
    } else {
        errMsg = null
    }

    if (successMessage.length > 0) {
        succMsg = successMessage[0]
    } else {
        succMsg = null
    }

    response.render('help-center', {
        title: 'Help center',
        error: errMsg,
        success: succMsg
    })
});

// @GET REQUEST - An endpoint to render some posts
router.get('/help-center-posts', async (request, response) => {
    const posts = await Posts.find().populate('user');
    console.log(posts)
    return response.status(200).json({
        posts: posts
    })
});

// @POST REQUEST - Creates a new guide post
router.post('/help-center', async (request, response) => {
    const { topic, message } = request.body;
    if (!topic) {
        request.flash('help_error', 'Please create a topic');
        response.redirect('/help-center')
    } else if (!message) {
        request.flash('help_error', 'Please create a message');
        response.redirect('/help-center')
    } else {
        const post = new Posts({
            user: request.session.user._id,
            post: {
                topic: topic,
                message: message
            },
            comments: []
        })
        await post.save();
        request.flash('help_success', 'Post created');
        response.redirect('/help-center')
    }
});

module.exports = router;
