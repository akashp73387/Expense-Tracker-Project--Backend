const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_KEY, {
        expiresIn: '30d',
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'Development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60
    });

    return token;
}

module.exports = generateToken;