require('dotenv').config();

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const RefreshTokenModel = require('../models/refreshToken');
const accessTokenSecret = process.env.JWT_SECRET_KEY;
const jwtSecretRefreshKey = process.env.JWT_REFRESH_SECRET_KEY;


const Token = async (req, res) => {

    try {
        const refreshToken = req.body.token;
        console.log(req.body);
        console.log('refresh Token: ', refreshToken);

        if (!refreshToken) {
            return res.status(401).json("You are not authenticated!");
        }

        const decoded = jwt.verify(refreshToken, jwtSecretRefreshKey);

        const { userId, role } = decoded;

        // Use Mongoose's findById method and async/await
        const user = await User.findOne({ userId });

        if (!user) {
            console.log('user not found');
            return res.status(403).json("Forbidden user not found");
        }

        const newAccessToken = jwt.sign({ userId, role }, accessTokenSecret, { expiresIn: '30m' });
        const newRefreshToken = jwt.sign({ userId: user.userId }, jwtSecretRefreshKey);

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

        return res.json({
            userId: user.userId,
            userType: user.role,
            newAccessToken,
            newRefreshToken
        });
    } catch (error) {
        console.error('Error decoding or querying user:', error);
        return res.status(403).json("Forbidden request");
    }
};



module.exports = { Token };