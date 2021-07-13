const express = require('express');

const router = express.Router();

// @GET REQUEST - Renders the homepage
router.get('/', (request, response) => {
    response.render('home', {
      title: 'Home'
    })
});

module.exports = router;
