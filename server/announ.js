
// const Announcement = require('./announcement'); // Adjust the import path based on your actual file structure
// Connect to MongoDB
const express = require("express");
const connectDB = require("./db");

const mongoose = require('mongoose');
const Announcement = require('./models/announcement'); // Adjust the import path based on your actual file structure


connectDB();

// Dummy data for announcements
const dummyAnnouncements = [
    { userId: 1, title: 'Important Announcement 1', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', announcementFor: ['all'], announcementDate: new Date() },
    { userId: 2, title: 'Upcoming Event', desc: 'Nulla facilisi. Aenean vel urna non ligula sagittis.', announcementFor: ['students'], announcementDate: new Date() },
    // Add more dummy data as needed
];

// Function to insert dummy data
async function insertDummyAnnouncements() {
    try {
        // Insert dummy announcements
        const insertedAnnouncements = await Announcement.insertMany(dummyAnnouncements);
        console.log('Dummy announcement data inserted successfully:', insertedAnnouncements);
    } catch (error) {
        console.error('Error inserting dummy announcement data:', error);
    } finally {
        // Disconnect from the database after insertion
        mongoose.disconnect();
    }
}

// Call the function to insert dummy data
insertDummyAnnouncements();
