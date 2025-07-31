// Global test config

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let testdb;

// Set test environment first
process.env.NODE_ENV = 'test';

require('dotenv').config();

// setup before all tests
beforeAll(async () => {
    // verify test environment
    if (process.env.NODE_ENV !== 'test') {
        throw new Error('Tests must run in test environment');
    }
    try {
        // create in-memory MongoDB instance
        testdb = await MongoMemoryServer.create();
        const uri = testdb.getUri();
        
        // connect mongoose to the in-memory database
        await mongoose.connect(uri);
        
        console.log('📝 Test database connected');
    } catch (error) {
        console.error('❌ Setup failed:', error.message);
    }
}, 120000);

// cleanup after each test
afterEach(async () => {
    // clear collections after each test
    const collections = mongoose.connection.collections;
    
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
});

// cleanup after all tests
afterAll(async () => {
    // close mongoose connection
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    
    // stop in-memory MongoDB instance
    await testdb.stop();
    
    console.log('🧹 Test database cleaned up');
}, 30000);

// increase timeout for db operations
jest.setTimeout(60000);