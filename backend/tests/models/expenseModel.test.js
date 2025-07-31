// Expense model validation and method tests

const User = require('../../models/userModel');
const Expense = require('../../models/expenseModel');
const { testUsers, sampleExpense } = require('../testHelpers');


describe('Expense Model', () => {
    let user;

    beforeEach(async () => {
        user = await User.create(testUsers.user1);
    });

    describe('Validation', () => {
        test('should create expense with valid data', async () => {
            const expense = await Expense.create({
                ...sampleExpense,
                user: user._id
            });

            expect(expense._id).toBeDefined();
            expect(expense.title).toBe(sampleExpense.title);
            expect(expense.user.toString()).toBe(user._id.toString());
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
                    ...sampleExpense
                    // missing user field
                });
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined();
            expect(error.errors.user).toBeDefined();
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