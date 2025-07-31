//Script to clear existing data/clean database

const mongoose = require('mongoose');
require('dotenv').config();

const cleanDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
        console.log('Connected to MongoDB');

        // Clear all collections
        await mongoose.connection.db.collection('expenses').deleteMany({});
        await mongoose.connection.db.collection('incomes').deleteMany({});
        await mongoose.connection.db.collection('categories').deleteMany({});
        
        console.log('✅ All existing expenses, incomes, and categories deleted');
        console.log('🔄 Database is now ready for user-based data');
        
        // Close connection
        await mongoose.connection.close();
        console.log('Database connection closed');
        
    } catch (error) {
        console.error('Error cleaning database:', error);
    }
};

cleanDatabase();

// Run: node cleanDatabase.js