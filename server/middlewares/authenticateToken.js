// JWT secrete key
require('dotenv').config();

// JWT 
const jwt = require('jsonwebtoken');

// Middleware to verify JWT 
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        // console.log('auth Header:', authHeader);
        const token = authHeader && authHeader.split(' ')[1];
        // console.log('token:', token);
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        // console.log('jwt secret key:', jwtSecretKey);

        if (token == null) {
            return res.status(401).send('Access denied');
        }

        jwt.verify(token, jwtSecretKey, (err, user) => {
            console.log('verify');
            console.log(err);

            if (err) {
                console.log('verify failed');
                return res.status(403).send('Invalid token from middleware');
            }

            if(user){
                console.log('verified user');
                console.log(user);
            }

            req.user = user;
            next();

        });
    }

};


module.exports = {
    authenticateToken
}