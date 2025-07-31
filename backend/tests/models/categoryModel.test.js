// Expense model validation and method tests

const User = require('../../models/userModel');
const Category = require('../../models/categoryModel');
const { testUsers, sampleCategory } = require('../testHelpers');


describe('Category Model', () => {
    let user1, user2;

    beforeEach(async () => {
        user1 = await User.create(testUsers.user1);
        user2 = await User.create(testUsers.user2);
    });

    describe('Validation', () => {
        test('should create category with valid data', async () => {
            const category = await Category.create({
                ...sampleCategory,
                user: user1._id
            });

            expect(category._id).toBeDefined();
            expect(category.name).toBe(sampleCategory.name);
            expect(category.user.toString()).toBe(user1._id.toString());
            expect(category.budget_per_month).toBeDefined();
            expect(category.budget_per_year).toBeDefined();
            expect(category.budget_per_week).toBeDefined();
        });

        test('should require all mandatory fields', async () => {
            const category = new Category({ user: user1._id });
            
            let error;
            try {
                await category.save();
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined();
            expect(error.errors.name).toBeDefined();
        });

        test('should require user reference', async () => {
            let error;
            try {
                await Category.create({
                    ...sampleCategory
                    // missing user field
                });
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined();
            expect(error.errors.user).toBeDefined();
        });

        test('should enforce unique category names per user', async () => {
            // Create first category for user1
            await Category.create({
                ...sampleCategory,
                user: user1._id
            });

            // Try to create second category with same name for same user
            let error;
            try {
                await Category.create({
                    ...sampleCategory,
                    user: user1._id,
                    budget_per_month: 600 // Different budget, same name
                });
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined();
            expect(error.code).toBe(11000); // MongoDB duplicate key error
        });

        test('should allow same category name for different users', async () => {
            // Create category for user1
            const category1 = await Category.create({
                ...sampleCategory,
                user: user1._id
            });

            // Create category with same name for user2 
            const category2 = await Category.create({
                ...sampleCategory,
                user: user2._id
            });

            expect(category1.name).toBe(category2.name);
            expect(category1.user.toString()).toBe(user1._id.toString());
            expect(category2.user.toString()).toBe(user2._id.toString());
            expect(category1._id.toString()).not.toBe(category2._id.toString());
        });

        test('should trim category names', async () => {
            const category = await Category.create({
                ...sampleCategory,
                name: '  Food & Dining  ', // extra spaces
                user: user1._id
            });

            expect(category.name).toBe('Food & Dining'); // trimmed
        });

    });
});