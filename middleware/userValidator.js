const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require("../models/User");

// Define validation middleware for the createuser route
const validateCreateUser = [
    // Validate name field
    body('name').notEmpty().withMessage('Name is required'),

    // Validate email field
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),

    // Validate password field
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    // Validate location field (optional)
    body('location').optional().notEmpty().withMessage('Location is required')
];

// Define validation middleware for the loginuser route
const validateLoginUser = [
    // Validate email field
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),

    // Validate password field
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

module.exports = {
    validateCreateUser,
    validateLoginUser
};

// const jwt = require('jsonwebtoken');
// const { User } = require('../models/usermodel');

// const authenticate = (req, res, next) => {
//     try {
//         const token = req.header('Authorization');
//         if (!token) {
//             return res.status(401).json({ success: false, message: 'Unauthorized: Missing token' });
//         }

//         const user = jwt.verify(token, 'secretkey');
//         console.log("userId >>>>", user.userId);

//         User.findByPk(user.userId).then(user => { 
//             if (!user) {
//                 throw new Error('User not found');
//             }

//             req.user = user;
//             next();
//         }).catch(err => {
//             throw new Error(err);
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
//     }
// };

// module.exports = {
//     authenticate
// };

