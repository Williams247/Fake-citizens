const express = require('express');
const bycript = require('bcryptjs');

const router = express.Router();

const User = require('../models/users');
const uniqueId = require('../utils/unique-id');

// @GET REQUEST - Renders the settings page
router.get('/settings', async (request, response) => {
  const updateError = request.flash('update_error');
  const updateSuccess = request.flash('update_successful');

  let updateErr;

  if (updateError.length > 0) {
    updateErr = updateError[0]
  } else {
    updateErr = null
  }

  let updateSucc;

  if (updateSuccess.length > 0) {
    updateSucc = updateSuccess[0]
  } else {
    updateSucc = null
  }

  const { username, email, apiKey } = await User.findByIdAndUpdate(request.session.user._id);
    response.render('settings', {
      title: 'Settings',
      data: {
        username: username,
        emal: email,
        apiKey: apiKey
      },
      error: updateErr,
      success: updateSucc,
    })
});

// @POST REQUEST - Updates a user's status
router.post('/settings', async (request, response) => {
    const { name, user_email, current_password, new_password } = request.body;
    const userId = request.session.user._id;
    const user = await User.findByIdAndUpdate(userId);

    const doMatch = await bycript.compare(current_password, user.password);
    if (!doMatch) {
      request.flash('update_error', 'Please enter your login password')
      return response.redirect('/settings')
    }

    let createNewPassword;

    if (!new_password) {
      createNewPassword = user.password;
    } else {
      createNewPassword = await bycript.hash(new_password, 10)
    }

    user.username = name;
    user.email = user_email;
    user.password = createNewPassword;
    await user.save();
    request.flash('update_successful', 'You have updated your account')
    return response.redirect('/settings');
});

// @PUT REQUEST - Modifies a user's API key
router.put('/modify-api-key', async (request, response) => {
    const userId = request.session.user._id;
    try {
      const user = await User.findByIdAndUpdate(userId);
      user.apiKey = uniqueId();
      await user.save();
      response.status(200).json({ message: 'API key modified' })
    }
    catch (error) {
      response.status(404).json({ error: 'Could not find user' })
    }
})

module.exports = router;
