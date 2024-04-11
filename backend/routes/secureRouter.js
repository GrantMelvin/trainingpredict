const express = require('express')
const secureRouter = express.Router()
const jwt = require('jsonwebtoken');
require("dotenv").config();

secureRouter
.route("/Login")
.get(async (req, res) => {
    // User authentication logic here
    email = req.user.email
    // Assume we have a function that verifies the user's credentials
    // Query db to check account
    const user = true
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

module.exports = secureRouter 