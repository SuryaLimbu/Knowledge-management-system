const Profession = require('../models/profession');

// Getting all

const getProfessions = async (req, res) => {
    try {
        const profession = await Profession.find();
        res.status(201).json(profession);
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

const createProfession = async (req, res) => {
    const profession = new Profession({
        title: req.body.title,
        desc: req.body.desc
    });
    try {
        const newProfession = await profession.save();
        res.status(201).json(newProfession);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getProfessions,
    createProfession,
}