
// Connect to MongoDB
const express = require("express");
const connectDB = require("./db");

const mongoose = require('mongoose');
const Client = require('./models/client'); // Adjust the import path based on your actual file structure


connectDB();

// Dummy data
const dummyClients = [
    { title: 'Client 1', address: 'Address 1', logo: 'logo1.jpg', users: [1, 2, 3] },
    { title: 'Client 2', address: 'Address 2', logo: 'logo2.jpg', users: [4, 5, 6] },
    // Add more dummy data as needed
];

// Function to insert dummy data
async function insertDummyData() {
    try {
        // Insert dummy clients
        const insertedClients = await Client.insertMany(dummyClients);
        console.log('Dummy data inserted successfully:', insertedClients);
    } catch (error) {
        console.error('Error inserting dummy data:', error);
    } finally {
        // Disconnect from the database after insertion
        mongoose.disconnect();
    }
}

// Call the function to insert dummy data
insertDummyData();
