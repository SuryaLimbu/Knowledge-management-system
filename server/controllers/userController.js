const User = require('../models/User');
var bcrypt = require('bcrypt');
const saltRounds = 10;

// Getting all
const getUsers = async (req, res) => {
    try {
        // find the users from the database
        const user = await User.find();

        // respond with the found users
        res.status(201).json(user);
    } catch (error) {
        // handle any error that occurs when finding the user
        res.status(500).json({ message: error.message });
    }
}
const getSingleUser = async (req, res) => {
    try {
        const userId = req.params['userId'];

        // console.log(userId) 
        // find the users from the database
        const user = await User.findOne({ userId: userId });
        // console.log(user) 
        // respond with the found users
        res.status(201).json(user);
    } catch (error) {
        // handle any error that occurs when finding the user
        res.status(500).json({ message: error.message });
    }
}

// Getting one
// Creating one
const createUser = async (req, res) => {

    // Generate salt
    const salt = await bcrypt.genSalt(saltRounds);
    // Hash the password
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const users = await User.find();
    const newUserId = generateUnique8DigitId(users);

    // create a new user object
    const user = new User({
        userId: newUserId,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: hashPassword,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        address: req.body.address,
        postcode: req.body.postcode,
        profession: req.body.profession,
        role: req.body.role,
        file: req.body.file,
    });
    try {
        // save user data to the database
        const newUser = await user.save();
        // response with the created user
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        console.error('Error details:', error.response?.data); // Log detailed error information
        // Handle error, e.g., show an error message
    }

}


function generateUnique8DigitId(users) {

    let newId;
    do {
        newId = Math.floor(10000000 + Math.random() * 90000000); // Generate an 8-digit number
    } while (users.some(user => user.userId === newId));

    return newId;
}

// Updating one

const updateUser = async (req, res) => {
    const userId = req.params['userId'];
    console.log(userId);

    const updatedFields = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        address: req.body.address,
        postcode: req.body.postcode,
        profession: req.body.profession,
        role: req.body.role,
        file: req.body.file,
    };

    try {
        const response = await User.updateOne({ userId: userId }, { $set: updatedFields });

        if (!response) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(201).json(response);
    } catch (error) {
        console.error('Error updating user:', error);
        console.error('Error details:', error.response?.data);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


// Deleting one
const deleteUser = async (req, res) => {
    try {
        const userId = req.params['userId'];

        console.log("delete id:", userId) 
        // find the users from the database
        const user = await User.deleteOne({ userId: userId });
        console.log("user remove:", user) 
        // respond with the found users
        res.status(201).json(user);
    } catch (error) {
        // handle any error that occurs when finding the user
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getUsers,
    createUser, getSingleUser, updateUser,deleteUser
}