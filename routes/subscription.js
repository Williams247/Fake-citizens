const express = require('express');

const router = express.Router();

// @GET REQUEST - Renders the subscription page
router.get('/subscription', (request, response) => {
    response.render('subscription', {
        title: 'Subscription'
    })
});

module.exports = router;
