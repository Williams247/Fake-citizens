/* NIGERIA API */

const express = require('express');
const User = require('../../../../models/users');
const nigeria = require('../../../../constants/continents/africa/nigeria/nigeria.json');
const router = express.Router();

router.get('/nigerian-citizens/:id', async (request, response) => {
    const userId = request.params.id;

    try {

        if (!userId) {
            return response.status(400).json({ error: 'Please add your valid user ID' })
        }
        
        await User.findById(userId);
        return response.status(200).json(nigeria);

    } catch (error) {
        response.status(400).json({ error: 'Please add a valid user ID, or signup to get one' })
    }

});

module.exports = router;
