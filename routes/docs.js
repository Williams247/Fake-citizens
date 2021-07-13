const express = require('express');

const router = express.Router();

// @GET REQUEST - Renders the docs page
router.get('/docs', (request, response) => {
    response.render('docs', {
      title: 'Docs'
    })
});

module.exports = router;
