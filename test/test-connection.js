require('dotenv').config({ path: '../.env' });  // Adjust path to point to your .env file
const mongoose = require('mongoose');

console.log('Attempting to connect to MongoDB...');
console.log('URI:', process.env.MONGODB_URI.substring(0, 20) + '...');  // Only show start of URI for security

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✓ Successfully connected to MongoDB Atlas!');
        console.log('Database connection state:', mongoose.connection.readyState);
        mongoose.connection.db.admin().serverStatus()
            .then(info => {
                console.log('MongoDB version:', info.version);
                console.log('Database name:', mongoose.connection.name);
            })
            .catch(err => console.log('Could not get server status:', err.message))
            .finally(() => {
                console.log('Closing connection...');
                mongoose.connection.close();
            });
    })
    .catch(err => {
        console.error('✗ Connection error:', err.message);
        console.log('Please check:');
        console.log('1. Your network connection');
        console.log('2. MongoDB Atlas IP whitelist');
        console.log('3. Database credentials');
        process.exit(1);
    });