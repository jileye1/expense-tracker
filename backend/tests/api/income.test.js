// Income endpoint tests


const request = require('supertest');
const app = require('../testApp');
const Income = require('../../models/incomeModel');
const { createUserAndToken, sampleIncome, testUsers } = require('../testHelpers');

describe('Income Endpoints', () => {

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

    // ----------------- Add income endpoint -------------------
    describe('POST /api/v1/incomes', () => {

        // SUCCESS Testing
        test('should create income with valid data and token', async () => {
            const response = await request(app)
                .post('/api/v1/incomes')
                .set('Authorization', `Bearer ${token1}`)
                .send(sampleIncome)
                .expect(200);

            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('title'); // edit when incomes are changes
            expect(response.body).toHaveProperty('amount', sampleIncome.amount);
            expect(response.body).toHaveProperty('user', user1._id.toString());
        });

        // ERROR Testing
        // AUTH
        test('should not create income without authentication', async () => {
            const response = await request(app)
                .post('/api/v1/incomes')
                .send(sampleIncome)
                .expect(401);

            expect(response.body.message).toContain('no token');
        });

        // MISSING FIELDS
        test('should not create income with missing required fields', async () => {
            const incompleteIncome = {
                amount: 200,
                // missing fields
            };

            const response = await request(app)
                .post('/api/v1/incomes')
                .set('Authorization', `Bearer ${token1}`)
                .send(incompleteIncome)
                .expect(400);

            expect(response.body.message).toContain('required');
        });

        // DATA VALIDATION
        test('should not create income with negative amounts', async () => {
            const invalidIncome = {
                ...sampleIncome,
                amount: -50
            };

            const response = await request(app)
                .post('/api/v1/incomes')
                .set('Authorization', `Bearer ${token1}`)
                .send(invalidIncome)
                .expect(400);

            expect(response.body.message).toContain('must be positive');
        });
    });


    // ----------------- Get incomes endpoint -------------------
    describe('GET /api/v1/incomes', () => {

        // Create incomes for both users
        beforeEach(async () => {
            await Income.create({ ...sampleIncome, user: user1._id });
            await Income.create({ ...sampleIncome, user: user2._id });
        });

        test('should get incomes for authenticated user only', async () => {
            const response = await request(app)
                .get('/api/v1/incomes')
                .set('Authorization', `Bearer ${token1}`)
                .expect(200);

            expect(response.body).toHaveLength(1);
            expect(response.body[0]).toHaveProperty('user', user1._id.toString());
        });

        test('should not get incomes without authentication', async () => {
            const response = await request(app)
                .get('/api/v1/incomes')
                .expect(401);

            expect(response.body.message).toContain('no token');
        });

        test('should return empty array for user with no incomes', async () => {
            // Clear all incomes
            await Income.deleteMany({});

            const response = await request(app)
                .get('/api/v1/incomes')
                .set('Authorization', `Bearer ${token1}`)
                .expect(200);

            expect(response.body).toHaveLength(0);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });


    // ----------------- Delete income endpoint -------------------
    describe('DELETE /api/v1/incomes/:id', () => {
        let income1, income2;

        // Create incomes for both users
        beforeEach(async () => {
            income1 = await Income.create({ ...sampleIncome, user: user1._id });
            income2 = await Income.create({ ...sampleIncome, user: user2._id });
        });

        test('should delete own income successfully', async () => {
            const response = await request(app)
                .delete(`/api/v1/incomes/${income1._id}`)
                .set('Authorization', `Bearer ${token1}`)
                .expect(200);

            expect(response.body).toHaveProperty('_id', income1._id.toString());

            // Verify income is deleted
            const deletedIncome = await Income.findById(income1._id);
            expect(deletedIncome).toBeNull();
        });

        test('should not delete other user\'s income', async () => {
            const response = await request(app)
                .delete(`/api/v1/incomes/${income2._id}`)
                .set('Authorization', `Bearer ${token1}`)
                .expect(403);

            expect(response.body.message).toContain('Not authorized');

            // Verify income still exists
            const stillExists = await Income.findById(income2._id);
            expect(stillExists).toBeTruthy();
        });

        test('should not delete income without authentication', async () => {
            const response = await request(app)
                .delete(`/api/v1/incomes/${income1._id}`)
                .expect(401);

            expect(response.body.message).toContain('no token');
        });

        test('should return 404 for non-existent income', async () => {
            const fakeId = '507f1f77bcf86cd799439011'; // Valid ObjectId format

            const response = await request(app)
                .delete(`/api/v1/incomes/${fakeId}`)
                .set('Authorization', `Bearer ${token1}`)
                .expect(404);

            expect(response.body.message).toContain('not found');
        });
    });
});