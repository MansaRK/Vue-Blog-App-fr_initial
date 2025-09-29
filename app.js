require('dotenv').config();

const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const connectDB = require('./client/server/config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
}));

// Enable CORS for Vue (5173)
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.static('public'));

// API routes
app.use('/', require('./client/server/routes/main'));
app.use('/api/admin', require('./client/server/routes/admin'));

app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
});
