const express = require('express');
const app = express();
const cors = require('cors');
const server = require("http").createServer(app);
const helmet = require('helmet');
const unsecureRouter = require('./routes/unsecureRouter');
const secureRouter = require('./routes/secureRouter')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
    if (!token) return res.status(403).send("A token is required for authentication");
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        console.log('invalid')
        return res.status(401).send("Invalid Token");
    }
    return next();
};

app.use(helmet());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(express.json());

app.use(session({
    secret: 'awdjkawndkjawndawndjn',
    credentials: true,
    name: "sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.ENVIRONMENT === "production",
        httpOnly: true,
        expires: 1000 * 60 * 60 * 24 * 7, // 1 week
        sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    }
}));

// Protect specific routes with JWT authentication
app.use("/secure-route", verifyToken, secureRouter);

app.use("/unsecure-route", unsecureRouter);

// Use server.listen instead of app.listen when working with Socket.IO
server.listen(4000, () => {
    console.log("Server is now listening at port 4000");
});
