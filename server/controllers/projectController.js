const Project = require("../models/project");


// get all branch

const getProject = async (req, res) => {
    try {
        const project = await Project.find();
        res.status(201).json(project)
    } catch (error) {
        // handle any error that occurs when finding the user
        res.status(500).json({ message: error.message });
    }
}

const getSingleProject = async (req, res) => {
    try {
        const projectId = req.params['title'];

        // console.log(userId) 
        // find the users from the database
        const project = await Project.findOne({ title: projectId });
        // console.log(user) 
        // respond with the found users
        res.status(201).json(project);
    } catch (error) {
        // handle any error that occurs when finding the user
        res.status(500).json({ message: error.message });
    }
}


function generateUnique8DigitId(users) {

    let newId;
    do {
        newId = Math.floor(10000000 + Math.random() * 90000000); // Generate an 8-digit number
    } while (users.some(user => user.userId === newId));

    return newId;
}

// Creating one
const createProject = async (req, res) => {


    // create a new user object
    const project = new Project({
        // response with the created user
        porjectId: generateUnique8DigitId(users),
        clientId: req.body.clientId,
        users: req.body.users,
        projectName: req.body.projectName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        desc: req.body.desc,
        projectManger: req.body.porjectManger,
        budget: req.body.budget
    });
    try {
        // save user data to the database
        const newProject = await Project.create(project);
        // response with the created user
        res.status(201).json(newProject);
    } catch (error) {
        console.error('Error creating user:', error);
        console.error('Error details:', error.response?.data); // Log detailed error information
        // Handle error, e.g., show an error message
    }

}

// Updating one

const updateClient = async (req, res) => {
    const title = req.params['title'];
    // console.log(branchId);

    // create a new user object
    const updatedFields = new Client({
        title: req.body.title,
        address: req.body.address,
        logo: req.body.logo,
        users: [req.body.users]
    });

    try {
        const response = await Client.updateOne({ title: title }, { $set: updatedFields });

        if (!response) {
            return res.status(404).json({ message: 'Branch not found' });
        }

        res.status(201).json(response);
    } catch (error) {
        console.error('Error updating user:', error);
        console.error('Error details:', error.response?.data);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Deleting one


module.exports = {
    getSingleProject, getProject, createProject
}