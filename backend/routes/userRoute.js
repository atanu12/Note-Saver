const express = require('express');

// import from controllers
const {regesterUser, loginUser} = require('../controllers/userControllers')

// import router from the express
const router = express.Router();


// createing the api endpoint routes
router.route('/').post(regesterUser);
router.route('/login').post(loginUser);

module.exports = router;