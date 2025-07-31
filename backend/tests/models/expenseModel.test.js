// Expense model validation and method tests

const User = require('../../models/userModel');
const Category = require('../../models/categoryModel');
const Expense = require('../../models/expenseModel');
const { testUsers, sampleExpense, sampleCategory } = require('../testHelpers');


describe('Expense Model', () => {
    let user;
    let category;

    beforeEach(async () => {
        user = await User.create(testUsers.user1);
        category = await Category.create({
            ...sampleCategory,
            user: user._id
        });
    });

    describe('Validation', () => {
        test('should create expense with valid data', async () => {
            const expense = await Expense.create({
                ...sampleExpense,
                user: user._id,
                category: category._id
            });

            expect(expense._id).toBeDefined();
            expect(expense.title).toBe(sampleExpense.title);
            expect(expense.user.toString()).toBe(user._id.toString());
            expect(expense.category.toString()).toBe(category._id.toString());
            expect(expense.type).toBe('Expense'); // Default value
        });

        test('should require all mandatory fields', async () => {
            const expense = new Expense({ user: user._id });
            
            let error;
            try {
                await expense.save();
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined();
            expect(error.errors.title).toBeDefined();
            expect(error.errors.amount).toBeDefined();
            expect(error.errors.category).toBeDefined();
            expect(error.errors.description).toBeDefined();
            expect(error.errors.date).toBeDefined();
        });

        test('should require user reference', async () => {
            let error;
            try {
                await Expense.create({
                    ...sampleExpense,
                    category: category._id
                    // missing user field
                });
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined();
            expect(error.errors.user).toBeDefined();
        });

        test('should require category reference', async () => {
            let error;
            try {
                await Expense.create({
                    ...sampleExpense,
                    user: user._id
                    // missing category field
                });
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined();
            expect(error.errors.category).toBeDefined();
        });

        test('should accept valid ObjectId for category', async () => {
            const expense = await Expense.create({
                ...sampleExpense,
                user: user._id,
                category: category._id
            });

            expect(expense.category).toBeDefined();
            expect(expense.category.toString()).toBe(category._id.toString());
        });

        test('should populate category information', async () => {
            const expense = await Expense.create({
                ...sampleExpense,
                user: user._id,
                category: category._id
            });

            const populatedExpense = await Expense.findById(expense._id).populate('category');
            
            expect(populatedExpense.category).toBeDefined();
            expect(populatedExpense.category.name).toBe(sampleCategory.name);
        });

        test('should set timestamps automatically', async () => {
            const expense = await Expense.create({
                ...sampleExpense,
                user: user._id
            });

            expect(expense.createdAt).toBeDefined();
            expect(expense.updatedAt).toBeDefined();
            expect(expense.createdAt).toBeInstanceOf(Date);
        });
    });
});