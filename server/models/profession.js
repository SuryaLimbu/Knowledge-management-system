const mongoose = require('mongoose');

const professionSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String }
});

const Profession = mongoose.model("Profession", professionSchema);

module.exports = Profession;