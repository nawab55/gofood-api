const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const jwtSecretKey = "ThisIsJwtSecretKeyForApp"

const signup = async (req, res) => {
    // Check for validation errors using express-validator middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    // If validation succeeds, continue with creating the user
    try {
        const { name, email, password, location } = req.body;

        // Check if the user with the provided email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'Email already exists' });
        }

        let secPassword = await bcrypt.hash(password, 10);
        
        const newUser = await User.create({ name, email, password: secPassword, location});
        res.status(201).json({ success: true, message: 'User created successfully', user: newUser });


        // bcrypt.hash(password, 10, async (err, hash) => {
            // console.log(err);
            // Create a new user
            // const newUser = await User.create({ username, email, password: hash, location});
             // Respond with success message
            // res.status(201).json({ success: true, message: 'User created successfully', user: newUser });
        // });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    // Check for validation errors using express-validator middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const {email, password } = req.body;
            // Find user by email
        const userData = await User.findOne({ email });

        if (!userData) {
            // User not found
            return res.status(404).json({success: false, errors:'Try loggging with correct credentials', message: 'User not found' });
        }

        const data = {
            user: {
                id: userData.id
            }
        }

        const authToken = jwt.sign(data, jwtSecretKey);

        //      // Verify password
        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if(isPasswordValid){
            // Password is valid, login successful
            return res.status(200).json({success: true, message: 'User logged in successfully', authToken: authToken});
        }else {
            // Incorrect password
            // console.error('Password mismatch for user:', userData.email);
            return res.status(401).json({success: false, message: 'Password is incorrect',errors:'Try loggging with correct credentials' });
        }

    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }

};

module.exports = {
    signup,
    login
};

// try {
//     const { email, password } = req.body;

//     if(isStringValid(email) || isStringValid(password)){
//         return res.status(400).json({ message: "Email or Password is missing", success: false });
//     }

//     // Find user by email
//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//         // User not found
//         return res.status(404).json({success: false, message: 'User not found' });
//     }

//      // Verify password
//      const isPasswordValid = await bcrypt.compare(password, user.password);

//      if (isPasswordValid) {
//          // Password is valid, login successful
//          return res.status(200).json({success: true, message: 'User logged in successfully', token: generateAccessToken(user.id, user.username, user.ispremiumuser)});
//      } else {
//          // Incorrect password
//          console.error('Password mismatch for user:', user.email);
//          return res.status(401).json({success: false, message: 'Password is incorrect' });
//      }
   
// } catch (err) {
//     console.error('Error during login:', err);
//     res.status(500).json({ err: 'Internal Server Error', success: false, message: err });
// }



        // const { username, email, password } = req.body;
        
        // // Check some validation
        // if(isStringValid(username) || isStringValid(email) || isStringValid(password)){
        //     return res.status(400).json({ error: "Bad parameters, something is missing" });
        // }
        
        // // Check if user with the same email already exists
        // const existingUser = await User.findOne({ where: { email } });
        // if (existingUser) {
        //     return res.status(400).json({ error: 'User with this email already exists.', User: existingUser });
            
        // }

        // bcrypt.hash(password, 10, async (err, hash) => {
        //     console.log(err);
        //     // Create a new user
        //     const newUser = await User.create({ username, email, password: hash});
        //     // Redirect or send a success response
        //     res.status(201).json({ message: "Successful create a new user."});
        // });