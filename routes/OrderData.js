const express = require('express');
const orderDataController = require('../controllers/OrderData')

const router = express.Router();


router.post('/orderData', orderDataController.orderData );
router.post('/myOrderData', orderDataController.myOrderData );

module.exports = router;