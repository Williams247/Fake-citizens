const express = require('express');

const router = express.Router();

// @GET REQUEST - Middleware sends the user id to the user
router.get('/get-user-id', (request, response) => {
    const userID = request.session.user._id
    response.status(200).json({ id: userID })
});

module.exports = router;
