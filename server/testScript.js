const mongoose = require("mongoose");
const connectDB = require("./db"); // Change the path as needed
const Project = require("./models/project");
const Client = require("./models/client")
const faker = require('faker');

connectDB();





// Function to generate dummy data and insert into the database
const insertDummyClientData = async (numRecords) => {
    try {
        for (let i = 0; i < numRecords; i++) {
            const dummyClient = {
                title: faker.company.companyName(),
                address: faker.address.streetAddress(),
                logo: faker.image.imageUrl(),
                users: [faker.random.number(), faker.random.number(), faker.random.number()]
            };

            await Client.create(dummyClient);
            console.log(`Inserted record ${i + 1} of ${numRecords}`);
        }

        console.log('Dummy data insertion completed.');
    } catch (error) {
        console.error('Error inserting dummy data:', error);
    } finally {
        mongoose.disconnect();
    }
};

// Usage: Call the function with the number of dummy records you want to insert
insertDummyClientData(10); // Example: Insert 10 dummy records
