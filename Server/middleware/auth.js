const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure the correct path to your User model
const { secret } = require('../keys');

const auth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authorization.replace('Bearer ', '');
    try {
        const {_id} = jwt.verify(token, secret);
        const user = await User.findById(_id);
        if (!user) {
            return res.status(401).json({ error: 'Invalid token or user not found' });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
module.exports = auth
