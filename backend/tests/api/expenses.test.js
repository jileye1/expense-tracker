// Expense endpoint tests


const request = require('supertest');
const app = require('../testApp');
const Expense = require('../../models/expenseModel');
const { createUserAndToken, sampleExpense, testUsers } = require('../testHelpers');

describe('Expense Endpoints', () => {

    // Create two users for testing data isolation
    let user1, token1, user2, token2;
    beforeEach(async () => {
        const result1 = await createUserAndToken(testUsers.user1);
        const result2 = await createUserAndToken(testUsers.user2);
        
        user1 = result1.user;
        token1 = result1.token;
        user2 = result2.user;
        token2 = result2.token;
    });

    // ----------------- Add expense endpoint -------------------
    describe('POST /api/v1/expenses', () => {

        // SUCCESS Testing
        test('should create expense with valid data and token', async () => {
            const response = await request(app)
                .post('/api/v1/expenses')
                .set('Authorization', `Bearer ${token1}`)
                .send(sampleExpense)
                .expect(200);

            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('title', sampleExpense.title);
            expect(response.body).toHaveProperty('amount', sampleExpense.amount);
            expect(response.body).toHaveProperty('user', user1._id.toString());
        });

        // ERROR Testing
        // AUTH
        test('should not create expense without authentication', async () => {
            const response = await request(app)
                .post('/api/v1/expenses')
                .send(sampleExpense)
                .expect(401);

            expect(response.body.message).toContain('no token');
        });

        // MISSING FIELDS
        test('should not create expense with missing required fields', async () => {
            const incompleteExpense = {
                title: 'Test Expense',
                // missing amount, category, description, date
            };

            const response = await request(app)
                .post('/api/v1/expenses')
                .set('Authorization', `Bearer ${token1}`)
                .send(incompleteExpense)
                .expect(400);

            expect(response.body.message).toContain('required');
        });

        // DATA VALIDATION
        test('should not create expense with negative amount', async () => {
            const invalidExpense = {
                ...sampleExpense,
                amount: -50
            };

            const response = await request(app)
                .post('/api/v1/expenses')
                .set('Authorization', `Bearer ${token1}`)
                .send(invalidExpense)
                .expect(400);

            expect(response.body.message).toContain('positive number');
        });
    });


    // ----------------- Get expenses endpoint -------------------
    describe('GET /api/v1/expenses', () => {

        // Create expenses for both users
        beforeEach(async () => {
            await Expense.create({ ...sampleExpense, user: user1._id, title: 'User 1 Expense' });
            await Expense.create({ ...sampleExpense, user: user2._id, title: 'User 2 Expense' });
        });

        test('should get expenses for authenticated user only', async () => {
            const response = await request(app)
                .get('/api/v1/expenses')
                .set('Authorization', `Bearer ${token1}`)
                .expect(200);

            expect(response.body).toHaveLength(1);
            expect(response.body[0]).toHaveProperty('title', 'User 1 Expense');
            expect(response.body[0]).toHaveProperty('user', user1._id.toString());
        });

        test('should not get expenses without authentication', async () => {
            const response = await request(app)
                .get('/api/v1/expenses')
                .expect(401);

            expect(response.body.message).toContain('no token');
        });

        test('should return empty array for user with no expenses', async () => {
            // Clear all expenses
            await Expense.deleteMany({});

            const response = await request(app)
                .get('/api/v1/expenses')
                .set('Authorization', `Bearer ${token1}`)
                .expect(200);

            expect(response.body).toHaveLength(0);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });


    // ----------------- Delete expense endpoint -------------------
    describe('DELETE /api/v1/expenses/:id', () => {
        let expense1, expense2;

        // Create expenses for both users
        beforeEach(async () => {
            expense1 = await Expense.create({ ...sampleExpense, user: user1._id });
            expense2 = await Expense.create({ ...sampleExpense, user: user2._id });
        });

        test('should delete own expense successfully', async () => {
            const response = await request(app)
                .delete(`/api/v1/expenses/${expense1._id}`)
                .set('Authorization', `Bearer ${token1}`)
                .expect(200);

            expect(response.body).toHaveProperty('_id', expense1._id.toString());

            // Verify expense is deleted
            const deletedExpense = await Expense.findById(expense1._id);
            expect(deletedExpense).toBeNull();
        });

        test('should not delete other user\'s expense', async () => {
            const response = await request(app)
                .delete(`/api/v1/expenses/${expense2._id}`)
                .set('Authorization', `Bearer ${token1}`)
                .expect(403);

            expect(response.body.message).toContain('Not authorized');

            // Verify expense still exists
            const stillExists = await Expense.findById(expense2._id);
            expect(stillExists).toBeTruthy();
        });

        test('should not delete expense without authentication', async () => {
            const response = await request(app)
                .delete(`/api/v1/expenses/${expense1._id}`)
                .expect(401);

            expect(response.body.message).toContain('no token');
        });

        test('should return 404 for non-existent expense', async () => {
            const fakeId = '507f1f77bcf86cd799439011'; // Valid ObjectId format

            const response = await request(app)
                .delete(`/api/v1/expenses/${fakeId}`)
                .set('Authorization', `Bearer ${token1}`)
                .expect(404);

            expect(response.body.message).toContain('not found');
        });
    });
});