const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
require("dotenv").config();

router
    .route("/register")
    .post(async (req, res) => {
        // User authentication logic here
        const { email, password } = req.body;
        // Assume we have a function that verifies the user's credentials
        // Signup logic
        const user = true
        console.log(email)
        if (user) {
            const token = jwt.sign(
                { userId: user.id, email },
                process.env.JWT_SECRET,
                {
                    expiresIn: '24h', // token will expire in 24 hours
                }
            );
            
            // Return the token. Alternatively, you can set it in an HTTP-only cookie
            return res.status(200).json({ token, email });
        } else {
            return res.status(400).send("Invalid Credentials");
        }
    });

module.exports = router 