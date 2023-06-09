// authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Authentication token missing' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        User.findById(decoded.userId)
            .then((user) => {
                if (!user) {   
                    return res.status(401).json({ error: 'User not found' });
                }
                req.user = user;
                next();
            })
            .catch((error) => {
                return res.status(401).json({ error: 'Authentication failed' });
            });
    } catch (error) {
        return res.status(401).json({ error: 'Invalid authentication token' });
    }
};

const authorizeUser = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Not authorized' });
    }
    next();
};

module.exports = { authenticateUser, authorizeUser };
