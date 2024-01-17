const mongoose = require('mongoose')
const User = require('./User');
const client = require('./client');


const branchSchema = new mongoose.Schema ({
    title: {type: String, required: true},
    address: {type: String, required: true},
    country: {type: String, required: true},
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    client:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }]

})

const branch = mongoose.model('Branch', branchSchema);

module.exports = branch;