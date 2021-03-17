const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller')
const auth = require('../middleware/auth')


router.get('/:id', auth,profileController.profile);



//exporting router
module.exports = router