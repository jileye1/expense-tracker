// Expense model validation and method tests

const User = require('../../models/userModel');
const Category = require('../../models/categoryModel');
const { testUsers, sampleCategory } = require('../testHelpers');


describe('Category Model', () => {
    let user;

    beforeEach(async () => {
        user = await User.create(testUsers.user1);
    });

    describe('Validation', () => {
        test('should create category with valid data', async () => {
            const category = await Category.create({
                ...sampleCategory,
                user: user._id
            });

            expect(category._id).toBeDefined();
            expect(category.name).toBe(sampleCategory.name);
            expect(category.user.toString()).toBe(user._id.toString());
            expect(category.budget_per_month).toBeDefined();
            expect(category.budget_per_year).toBeDefined();
            expect(category.budget_per_week).toBeDefined();
        });

        test('should require all mandatory fields', async () => {
            const category = new Category({ user: user._id });
            
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
    });
});