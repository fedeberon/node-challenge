const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized access' });
    }

    const token = authHeader.substring(7);
    const jwtSecret = process.env.JWT_SECRET;

    try {
        req.user = jwt.verify(token, jwtSecret);
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = authMiddleware;
