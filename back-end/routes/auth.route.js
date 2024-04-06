const express = require('express');
const { registerUser, signInUser, refreshToken} = require('../controllers/auth.controller');
const router = express.Router();

// Registration route
router.post('/sign-up', registerUser);


// Signin route
router.post('/sign-in', signInUser);

router.post('/refresh-token', refreshToken);


module.exports = router;