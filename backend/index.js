const express = require('express');
const app = express();
const cors = require('cors');
const server = require("http").createServer(app);
const helmet = require('helmet');
const router = require('./routes/router');
const secureRouter = require('./routes/secureRouter')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { Server } = require("socket.io");

// Fixed CORS origin protocol
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
    console.log(token)
    if (!token) return res.status(403).send("A token is required for authentication");
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
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

app.use("/unsecure-route", router);

io.on("connection", (socket) => {
    console.log('A user connected');

    // Example of handling authentication with Socket.IO
    socket.on('authenticate', ({ token }) => {
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            console.log('User authenticated', user);
        } catch (error) {
            socket.disconnect();
        }
    });
});

// Use server.listen instead of app.listen when working with Socket.IO
server.listen(4000, () => {
    console.log("Server is now listening at port 4000");
});
