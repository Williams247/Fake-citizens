const express = require('express');

const router = express.Router();

const User = require('../models/users')

// @GET REQUEST - Renders the profile page
router.get('/profile', async (request, response) => {
    try {
        const user = await User.findById(request.session.user._id);
        console.log(user);
        const { username, email, notification: { notifications } } = user;
        response.render('profile', {
            title: 'Profile',
            user: {
              name: username,
              email: email,
              notifications: notifications
            }
        })
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;
