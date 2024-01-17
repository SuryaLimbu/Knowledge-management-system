const Branch = require('../models/branch');


// get all branch

const getBranch = async (req, res) => {
    try {
        const branch = await Branch.find();
        res.status(201).json(branch)
    } catch (error) {
        // handle any error that occurs when finding the user
        res.status(500).json({ message: error.message });
    }
}

const getSingleBranch = async (req, res) => {
    try {
        const branchId = req.params['title'];

        // console.log(userId) 
        // find the users from the database
        const branch = await Branch.findOne({ title: branchId });
        // console.log(user) 
        // respond with the found users
        res.status(201).json(branch);
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
const createBranch = async (req, res) => {


    // create a new user object
    const branch = new Branch({
        title: req.body.title,
        address: req.body.address,
        country: req.body.country
    });
    try {
        // save user data to the database
        const newBranch = await Branch.create(branch);
        // response with the created user
        res.status(201).json(newBranch);
    } catch (error) {
        console.error('Error creating user:', error);
        console.error('Error details:', error.response?.data); // Log detailed error information
        // Handle error, e.g., show an error message
    }

}

// Updating one

const updateBranch = async (req, res) => {
    const title = req.params['title'];
    // console.log(branchId);

    // create a new user object
    const updatedFields = new Branch({
        title: req.body.title,
        address: req.body.address,
        country: req.body.country
    });

    try {
        const response = await Branch.updateOne({ title: title }, { $set: updatedFields });

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
const deleteBranch = async (req, res) => {
    try {
        const branchId = req.params['title'];

        console.log("delete id:", branchId)
        // find the users from the database
        const branch = await Branch.deleteOne({ title: branchId });
        console.log("user remove:", branch)
        // respond with the found users
        res.status(201).json(branch);
    } catch (error) {
        // handle any error that occurs when finding the user
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getBranch, getSingleBranch, createBranch, updateBranch, deleteBranch
}