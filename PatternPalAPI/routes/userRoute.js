const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Basic CRUD for Accounts
router.get('/getAllUsers', userController.getAllUsers);

module.exports = router;