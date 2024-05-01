const express = require('express');
const foodDataController = require('../controllers/foodData')

const router = express.Router();

router.get('/foodData', foodDataController.addFoodData);

module.exports = router;