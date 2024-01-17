// db.js
require('dotenv').config()
const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}

module.exports = connectDB;
