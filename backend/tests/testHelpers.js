// Test utilities

const User = require('../models/userModel');
const Category = require('../models/categoryModel');
const jwt = require('jsonwebtoken');
const { getJWTSecret } = require('../utils/config');


//-----------USER Helpers------------------

// Test user data
const testUsers = {
    user1: {
        name: 'John Doe',
        email: 'john@test.com',
        password: 'johnPassword123'
    },
    user2: {
        name: 'Jane Smith',
        email: 'jane@test.com',
        password: 'janePassword123'
    }
};

// Create a test user
const createTestUser = async (userData = testUsers.user1) => {
    const user = await User.create(userData);
    return user;
};

// Generate JWT token for testing
// generates directly without login process to aid testing protected routes
const generateTestToken = (userId) => {
    return jwt.sign({ id: userId }, getJWTSecret(), {
        expiresIn: '1d'
    });
};

// Create user and return token
const createUserAndToken = async (userData = testUsers.user1) => {
    const user = await createTestUser(userData);
    const token = generateTestToken(user._id);
    return { user, token };
};

// Create a test category for a user
const createTestCategoryForUser = async (userId, categoryData = sampleCategory) => {
    const category = await Category.create({
        ...categoryData,
        user: userId
    });
    return category;
};


// --------------MODEL Helpers--------------------
// Sample expense data
const sampleExpense = {
    title: 'Test Expense',
    amount: 50.99,
    // category set in tests
    description: 'Food expense testndescription',
    date: new Date('2024-01-15')
};

// Sample income data
const sampleIncome = {
    amount: 1000,
    date: new Date('2024-01-15'),
    weekday_hours: 40,
    weekend_hours: 8,
    tax: 200
};

// Sample category data
const sampleCategory = {
    name: 'Food',
    budget_per_month: 500
};



module.exports = {
    testUsers,
    createTestUser,
    generateTestToken,
    createUserAndToken,
    createTestCategoryForUser,
    sampleExpense,
    sampleIncome,
    sampleCategory
};