const Role = require('../models/role');

//Getting all
const getRole = async (req, res) => {
    try {
        const role = await Role.find();
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Creating a new role

const createRole = async (req, res) => {
    const role = new Role({
        roleName: req.body.roleName
    });
    
    try {
        const newRole = await role.save();
        res.status(201).json(newRole);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports = {
    getRole,
    createRole
}