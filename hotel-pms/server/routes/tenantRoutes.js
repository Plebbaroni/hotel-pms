const express = require('express');
const tenantController = require('../controllers/tenantController');
const router = express.Router();

router.post('/createTenant', tenantController.createTenant);
router.get('/getTenantByBooking/:booking_id', tenantController.getTenantByBooking);
router.get('/getTenantByRoom/:roomNumber', tenantController.getTenantByRoom);

module.exports = router;