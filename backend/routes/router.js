const express = require('express')
const router = express.Router()

console.log('3')

router
    .route("/login")
    .post(async (req, res) => {
        // User authentication logic here
        console.log('yes')
        const { email, password } = req.body;
        // Assume we have a function that verifies the user's credentials
        const user = true
        
        if (user) {
            console.log('2')
            const token = jwt.sign(
                { userId: user.id, email },
                process.env.JWT_SECRET,
                {
                    expiresIn: '24h', // token will expire in 24 hours
                }
            );
            
            // Return the token. Alternatively, you can set it in an HTTP-only cookie
            return res.status(200).json({ token });
        } else {
            return res.status(400).send("Invalid Credentials");
        }
    });

module.exports = router 