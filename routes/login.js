const express = require('express');
const bycript = require('bcryptjs');
const User = require('../models/users');

const router = express.Router();

// @GET REUQEST - Renders the login page
router.get('/login', (request, response) => {
    let error;
    const signUpError = request.flash('signUpError');
    if (signUpError.length > 0) {
        error = signUpError[0]
    } else {
        error = null
    }
    response.render('login', {
      title: 'Login',
      error: error
    })
});

// @POST REQUEST - Middleware to login a user
router.post('/login', async (request, response) => {
    // Request bodies
    const { email, password } = request.body;

    // Throws an error if no email is provided
    if (!email) {
        request.flash('signUpError', 'Please enter your email');
        return response.redirect('/login');
    }

    // Throws an error is no password is provided
    if (!password) {
        request.flash('signUpError', 'Please enter a password');
        return response.redirect('/login');
    }
    
    // Finds a user by email
    const user = await User.findOne({ email: email });

    // Throws an error if the email provided does not exist
    if (!user) {
        request.flash('signUpError', `This email ""${email}"" does not exist, please try again`);
        return response.redirect('/login');
    }

    // Throws an error if the password provided does not match with the one from the database
    const hashedPassword = await bycript.compare(password, user.password);
    if (!hashedPassword) {
        request.flash('signUpError', 'Password incorrect');
        return response.redirect('/login');
    }

    // Creates a sessionand logs in a user if there was no error
    request.session.user = user;
    request.session.user.save((error) => {
        if (error) {
            console.log(error);
            return false
        }
        response.redirect('/')
    })
});

module.exports = router;
