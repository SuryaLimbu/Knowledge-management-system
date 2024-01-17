const mongoose = require('mongoose')



const announcementSchema = new mongoose.Schema({
    userId: { type: Number, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    announcementFor: [String],
    announcementDate: { type: Date }



})

const announcement = mongoose.model('Announcement', announcementSchema);

module.exports = announcement;