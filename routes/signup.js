const express = require('express');
const bycript = require('bcryptjs');
const User = require('../models/users');
const uniqueId = require('../utils/unique-id');

const router = express.Router();

// @GET REUQEST - Renders the signup page
router.get('/signup', (request, response) => {
    let error;
    const signUpError = request.flash('signUpError');
    if (signUpError.length > 0) {
        error = signUpError[0]
    } else {
        error = null
    }
    response.render('signup', {
        title: 'Signup',
        error: error
    })
});

// @POST REQUEST - Gets an imcomming request from the client
router.post('/signup', async (request, response) => {
    const { username, email, password } = request.body;

    const emailRegX = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}.){1,8}[a-zA-Z]{2,63}$/;

    if (!username) {
        request.flash('signUpError', 'Please enter your username');
        return response.redirect('/signup');
    }

    if (!email || !emailRegX.test(email)) {
        request.flash('signUpError', 'Please enter a valid email');
        return response.redirect('/signup');
    }

    if (password.length < 8) {
        request.flash('signUpError', 'Your password has to be more than 8 characters');
        return response.redirect('/signup');
    }

    if (!password) {
        request.flash('signUpError', 'Please enter a password');
        return response.redirect('/signup');
    }

    const isUser = await User.findOne({ email: email });

    if (isUser) {
        request.flash('signUpError', `This email ""${email}"" has already been taken`);
        return response.redirect('/signup');
    }

    const hashPassword = await bycript.hash(password, 10);

    const createNewUser = new User({
        username: username,
        email: email,
        password: hashPassword,
        apiKey: uniqueId()
    });

    await createNewUser.save();

    response.redirect('/login');
});

module.exports = router;
