const mongoose = require('mongoose');
const User = require('./User');

const clientSchema = new mongoose.Schema({
    title: { type: string, required: true },
    address: { type: string, required: true },
    logo: { type: string, required: true },
    users: [User]
})

const client = mongoose.model('Client', clientSchema);

module.exports = client;