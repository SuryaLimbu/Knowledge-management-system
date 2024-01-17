const mongoose = require('mongoose');
// const User = require('./User');

const clientSchema = new mongoose.Schema({
    title: { type: String, required: true },
    address: { type: String, required: true },
    logo: { type: String, required: true },
    users: [Number]
})

const client = mongoose.model('Client', clientSchema);

module.exports = client;