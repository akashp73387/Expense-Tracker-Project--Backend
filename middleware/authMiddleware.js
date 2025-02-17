const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.jwt || req.headers.authorization.split(' ')[1];
        if(token){
            try {
                const decoded = jwt.verify(token, process.env.JWT_KEY);
                req.user = await User.findById(decoded.userId).select('-password');
                next();
            } catch (error) {
                res.status(401).json({ message: "Unauthorised invalid token" });
            }
        }else{
            res.status(401).json({ message: "Unauthorised no token" });
        }
    } catch (error) {
        res.status(401).json({ message: "Error while fetching the token", error });
    }

}

module.exports = authMiddleware;