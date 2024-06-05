require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const cors = require('cors');

const app = express();

const corsConfig = {
    origin: "*",
    credential: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], 
};

app.options("", cors(corsConfig));
app.use(cors(corsConfig));

// Middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/users', userRoutes);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to DB & listening on port ${process.env.PORT}`);
        });
    })
    .catch(error => {
        console.log(error);
    });
