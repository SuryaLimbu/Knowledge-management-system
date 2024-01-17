const Client = require("../models/client");


// get all branch

const getClient = async (req, res) => {
    try {
        const client = await Client.find();
        res.status(201).json(client)
    } catch (error) {
        // handle any error that occurs when finding the user
        res.status(500).json({ message: error.message });
    }
}

const getSingleClient = async (req, res) => {
    try {
        const ClientId = req.params['title'];

        // console.log(userId) 
        // find the users from the database
        const client = await Branch.findOne({ title: ClientId });
        // console.log(user) 
        // respond with the found users
        res.status(201).json(client);
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
const createClient = async (req, res) => {


    // create a new user object
    const client = new Client({
        // response with the created user
        title: req.body.title,
        address: req.body.address,
        logo: req.body.logo,
        users: [req.body.users]
    });
    try {
        // save user data to the database
        const newClient = await Client.create(client);
        // response with the created user
        res.status(201).json(newClient);
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
    getClient, getSingleClient, createClient, updateClient
}