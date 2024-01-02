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
        // handle any errors that happened during the save operation
        res.status(400).json({ message: error.message });
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
// Deleting one

module.exports = {
    getUsers,
    createUser
}