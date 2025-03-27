const mongoose = require('mongoose')
require('dotenv').config()


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {});

        console.log('You have been connected to MongoDB');

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB Connection Error:', err);
        });

    } catch (err) {
        console.error('You were not able to connect to MongoDB:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
