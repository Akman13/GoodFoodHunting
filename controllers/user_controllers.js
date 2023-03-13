const express = require('express');
const router = express.Router();

router.get('/users'); // A list of users
router.post('/users'); // Create a user
router.delete('/users/:id'); // Delete a user
router.put('/users/:id'); // Update a user
router.get('/users/new'); // Get a new-user form
router.get('/users/:id'); //Get a user's details
