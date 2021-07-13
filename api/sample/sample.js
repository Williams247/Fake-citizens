/* SAMPLE API */

const express = require('express');
const router = express.Router();
const sample = require('../../constants/sample/sample.json');

router.get('/sample', (request, response) => {
    response.status(200).json(sample)
})

module.exports = router;
