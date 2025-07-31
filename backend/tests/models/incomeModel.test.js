// Expense model validation and method tests

const User = require('../../models/userModel');
const Income = require('../../models/incomeModel');
const { testUsers, sampleIncome } = require('../testHelpers');


describe('Income Model', () => {
    let user;

    beforeEach(async () => {
        user = await User.create(testUsers.user1);
    });

    describe('Validation', () => {
        test('should create income with valid data', async () => {
            const income = await Income.create({
                ...sampleIncome,
                user: user._id
            });

            expect(income._id).toBeDefined();
            expect(income.title).toBe("Last Piece Wages"); // TO BE CHANGED
            expect(income.user.toString()).toBe(user._id.toString());
            expect(income.type).toBe('Income'); // Default value
        });

        test('should require all mandatory fields', async () => {
            const income = new Income({ user: user._id });
            
            let error;
            try {
                await income.save();
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined();
            expect(error.errors.amount).toBeDefined();
            expect(error.errors.weekday_hours).toBeDefined();
            expect(error.errors.weekend_hours).toBeDefined();
            expect(error.errors.tax).toBeDefined();
            expect(error.errors.date).toBeDefined();
        });

        test('should require user reference', async () => {
            let error;
            try {
                await Income.create({
                    ...sampleIncome
                    // missing user field
                });
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined();
            expect(error.errors.user).toBeDefined();
        });

        test('should set timestamps automatically', async () => {
            const income = await Income.create({
                ...sampleIncome,
                user: user._id
            });

            expect(income.createdAt).toBeDefined();
            expect(income.updatedAt).toBeDefined();
            expect(income.createdAt).toBeInstanceOf(Date);
        });
    });
});