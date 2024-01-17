// Example logout route

const RefreshTokenModel = require('../models/refreshToken');

const Logout = async (req, res) => {
    try {
        const { userId, refreshToken } = req.body;

        // Find the refresh token in the database
        const refreshTokenDocument = await RefreshTokenModel.findOne({ userId });
        
        // console.log(refreshTokenDocument);

        // if (!refreshTokenDocument) {
        //     return res.status(401).json({ message: 'Invalid refresh token' });
        // }

        // Remove the refresh token from the database
        // await refreshTokenDocument.deleteOne({ userId });

        res.json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    Logout
};
