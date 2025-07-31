// Test-specific app configuration

const express = require('express');
const cors = require('cors');
const routes = require('../routes/routes');

// Create Express app for testing
const app = express();

// Set test environment
process.env.NODE_ENV = 'test';
process.env.JWT_TEST_SECRET="test_secret_x1y2z3a4b5c6d7e8f9g0h1i2j3k4l5m6";

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1', routes);

// Error handling middleware for tests
app.use((err, req, res, next) => {
    console.error('Test Error:', err);
    res.status(500).json({ 
        message: err.message,
        stack: process.env.NODE_ENV === 'test' ? err.stack : undefined
    });
});

module.exports = app;