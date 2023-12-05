const express = require('express');
const transactionController = require('../controllers/transactionController');
const router = express.Router();

router.put('/handleCheckOut/:roomNumber', transactionController.handleCheckOut)

module.exports = router;