const express = require('express');
const inventoryController = require('../controllers/inventoryController');
const router = express.Router();

router.post('/addItem', inventoryController.addItem);
router.put('/deleteItem/:id', inventoryController.deleteItem);
router.put('/updateItem/:id', inventoryController.updateItem);
router.get('/getAllItems', inventoryController.getAllItems)

module.exports = router;