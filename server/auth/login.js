require('dotenv').config();

const User = require('../models/User');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const RefreshTokenModel = require('../models/refreshToken');
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtSecretRefreshKey = process.env.JWT_REFRESH_SECRET_KEY;


const Login = async (req, res) => {
    try {
        const { userId, password } = req.body;
        const user = await User.findOne({ userId });

        // console.log("hash password: " + user.password);
        // console.log("plain password: " + password);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Invalid UserId or Password');
        }
        if (!jwtSecretKey) {
            return res.status(500).send('JWT secret key is not defined');
        }
        if (!jwtSecretRefreshKey) {
            return res.status(500).send('JWT secret refresh key is not defined');
        }
        // generate jwt token
        const accessToken = jwt.sign({ userId: user.userId }, jwtSecretKey, { expiresIn: '1min' });
        const refreshToken = jwt.sign({ userId: user.userId }, jwtSecretRefreshKey);

        // Inside your login route
        const existingRefreshTokenDocument = await RefreshTokenModel.findOne({ userId: user.userId });

        if (existingRefreshTokenDocument) {
            // If an existing refresh token is found, update its value
            existingRefreshTokenDocument.token = refreshToken;
            await existingRefreshTokenDocument.save();
        } else {
            // If no existing refresh token is found, create a new document
            const newRefreshTokenDocument = new RefreshTokenModel({ userId: user.userId, token: refreshToken });
            await newRefreshTokenDocument.save();
        }

        res.json({
            userId: user.userId,
            userType: user.role,
            accessToken,
            refreshToken
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    Login
}