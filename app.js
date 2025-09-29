// app.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./client/server/config/db');
const session = require('express-session');
const MongoStore = require('connect-mongo');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// Sessions
app.use(
  session({
    secret: process.env.JWT_SECRET || 'fallbacksecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions',
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

// Routes
app.use('/api/admin', require('./client/server/routes/admin'));

// 👇 FIXED PORT CONFIG FOR RENDER 👇
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on port ${PORT}`);
});
