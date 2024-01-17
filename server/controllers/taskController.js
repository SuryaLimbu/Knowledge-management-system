const Task = require('../models/task');

const getTask = async (req, res) => {
    try {
        const task = await Task.find();
        res.status(201).json(task)
    } catch (error) {
        // handle any error that occurs when finding the user
        res.status(500).json({ message: error.message });
    }
}
const getSingleTask = async (req, res) => {
    try {
        const projectId = req.params['id'];

        // console.log(userId) 
        // find the users from the database
        const task = await Task.findOne({ projectId: projectId });
        // console.log(user) 
        // respond with the found users
        res.status(201).json(task);
    } catch (error) {
        // handle any error that occurs when finding the user
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getTask, getSingleTask
}