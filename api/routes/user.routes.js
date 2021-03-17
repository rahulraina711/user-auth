const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_routes.controller')

// creating user routes //

//registeration
router.post('/register', userController.register);

//login
router.post('/login', userController.login)

//exporting router
module.exports = router
