const jwt = require('jsonwebtoken');
const UserSchema = require('../models/userModel');
const { getJWTSecret } = require('../utils/config');

const protect = async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Authorisation failed: no token' });
    }

    try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, getJWTSecret());

        // Get user from the token
        req.user = await UserSchema.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authorisation failed' });
    }
};

module.exports = { protect };