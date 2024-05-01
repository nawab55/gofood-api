const express = require('express');
const userController = require('../controllers/user');
const userauthentication = require('../middleware/userValidator');


const router = express.Router();

router.post('/createuser', userauthentication.validateCreateUser, userController.signup);

router.post('/loginuser', userauthentication.validateLoginUser, userController.login);

module.exports = router;