const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: { type: Number, unique: true, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, required: true },
    postcode: { type: String, required: true },
    profession: { type: String, required: true },
    file: { type: String },
    status: { type: Boolean, default: true },
    createdDate: { type: Date, default: Date.now() },
    updateDate: { type: Date, default: null },
});


const User = mongoose.model("User", userSchema);

module.exports = User;