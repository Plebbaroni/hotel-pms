const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.put('/deleteUser/:id', userController.deleteUser);
router.put('/updateUser/:id', userController.updateUser);
router.get('/check-auth', userController.checkAuth);
router.get('/getAllUsers', userController.getAllUsers);

module.exports = router;