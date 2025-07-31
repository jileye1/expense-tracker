// Global test config

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let testdb;

// setup before all tests
beforeAll(async () => {
    // create in-memory MongoDB instance
    testdb = await MongoMemoryServer.create();
    const uri = testdb.getUri();
    
    // connect mongoose to the in-memory database
    await mongoose.connect(uri);
    
    console.log('📝 Test database connected');
});

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
});

// increase timeout for db operations
jest.setTimeout(30000);