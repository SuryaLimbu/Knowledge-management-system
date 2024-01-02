const mongoose = require('mongoose');

const refreshToken = new mongoose.Schema({
  userId: {
    type: Number, // Assuming userId is a string; adjust data type as needed
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const RefreshTokenModel = mongoose.model('RefreshToken', refreshToken);

module.exports = RefreshTokenModel;
