const express = require('express');
const inventoryController = require('../controllers/inventoryController');
const router = express.Router();

router.post('/addItem', inventoryController.addItem);
router.get('/getAllItems', inventoryController.getAllItems)
module.exports = router;