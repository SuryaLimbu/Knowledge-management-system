
const Announcement = require('../models/announcement');


// get all branch

const getAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.find();
        res.status(201).json(announcement)
    } catch (error) {
        // handle any error that occurs when finding the user
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getAnnouncement
}