const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Basic CRUD for Accounts
router.get('/getAllUsers', userController.getAllUsers);

router.post('/createUser', userController.createUser);

router.get('/loginUser', userController.loginUser);

module.exports = router;