// Expense endpoint tests


const request = require('supertest');
const app = require('../testApp');
const Expense = require('../../models/expenseModel');
const Category = require('../../models/categoryModel');
const { createUserAndToken, createTestCategoryForUser, sampleCategory, sampleExpense, testUsers } = require('../testHelpers');

describe('Expense Endpoints', () => {

    // Create two users for testing data isolation
    let user1, token1, category1, user2, token2, category2;
    beforeEach(async () => {
        const result1 = await createUserAndToken(testUsers.user1);
        const result2 = await createUserAndToken(testUsers.user2);
        
        user1 = result1.user;
        token1 = result1.token;
        user2 = result2.user;
        token2 = result2.token;

        category1 = await createTestCategoryForUser(user1._id, sampleCategory);
        category2 = await createTestCategoryForUser(user2._id, sampleCategory);
    });

    // ----------------- Add expense endpoint (existing category) -------------------
    describe('POST /api/v1/expenses', () => {

        // SUCCESS Testing
        test('should create expense with valid data and token', async () => {

            const expenseData = {
                ...sampleExpense,
                category: category1._id.toString()
            }

            const response = await request(app)
                .post('/api/v1/expenses')
                .set('Authorization', `Bearer ${token1}`)
                .send(expenseData)
                .expect(200);

            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('title', sampleExpense.title);
            expect(response.body).toHaveProperty('amount', sampleExpense.amount);
            expect(response.body).toHaveProperty('category');
            expect(response.body.category).toHaveProperty('_id', category1._id.toString());
            expect(response.body.category).toHaveProperty('name', category1.name);
            expect(response.body).toHaveProperty('user', user1._id.toString());
        });

        test('should not accept invalid ObjectId format', async () => {
            const expenseData = {
                ...sampleExpense,
                category: 'invalid_id_format'
            };

            const response = await request(app)
                .post('/api/v1/expenses')
                .set('Authorization', `Bearer ${token1}`)
                .send(expenseData)
                .expect(400);

            expect(response.body.message).toContain('valid category ID');
        });
    
        test('should not accept category from another user', async () => {
            const expenseData = {
                ...sampleExpense,
                category: category2._id.toString() // User2's category
            };

            const response = await request(app)
                .post('/api/v1/expenses')
                .set('Authorization', `Bearer ${token1}`)
                .send(expenseData)
                .expect(400);

            expect(response.body.message).toContain('Invalid category');
        });

        test('should not accept non-existent category ID', async () => {
            const expenseData = {
                ...sampleExpense,
                category: '507f1f77bcf86cd799439011' // Valid ObjectId format but non-existent
            };

            const response = await request(app)
                .post('/api/v1/expenses')
                .set('Authorization', `Bearer ${token1}`)
                .send(expenseData)
                .expect(400);

            expect(response.body.message).toContain('Invalid category');
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
                category: category1._id.toString(),
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


    // ----------------- Add expense with new category endpoint -------------------
    describe('POST /api/v1/expenses/with-new-category', () => {

        test('should create expense with new category name', async () => {
            const expenseData = {
                ...sampleExpense,
                categoryName: 'New Category'
            };

            const response = await request(app)
                .post('/api/v1/expenses/with-new-category')
                .set('Authorization', `Bearer ${token1}`)
                .send(expenseData)
                .expect(200);

            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('title', sampleExpense.title);
            expect(response.body).toHaveProperty('amount', sampleExpense.amount);
            expect(response.body.category).toHaveProperty('name', 'New Category');
            expect(response.body.category).toHaveProperty('budget_per_month', 0);
            expect(response.body).toHaveProperty('user', user1._id.toString());
            
            // verify category created
            const categories = await Category.find({ user: user1._id });
            expect(categories).toHaveLength(2); // original + new
            const newCategory = categories.find(cat => cat.name === 'New Category');
            expect(newCategory).toBeTruthy();
        });

        test('should use existing category when name already exists', async () => {
            const expenseData = {
                ...sampleExpense,
                categoryName: category1.name // use existing category name
            };

            const response = await request(app)
                .post('/api/v1/expenses/with-new-category')
                .set('Authorization', `Bearer ${token1}`)
                .send(expenseData)
                .expect(200);

            expect(response.body.category).toHaveProperty('_id', category1._id.toString());
            expect(response.body.category).toHaveProperty('name', category1.name);
            expect(response.body.category).toHaveProperty('budget_per_month', category1.budget_per_month);
            
            // verify no new category created
            const categories = await Category.find({ user: user1._id });
            expect(categories).toHaveLength(1); // only original
        });

        test('should trim category names', async () => {
            const expenseData = {
                ...sampleExpense,
                categoryName: '  Entertainment  ' // w spaces
            };

            const response = await request(app)
                .post('/api/v1/expenses/with-new-category')
                .set('Authorization', `Bearer ${token1}`)
                .send(expenseData)
                .expect(200);

            expect(response.body.category).toHaveProperty('name', 'Entertainment');
            
            // verify category created w trimmed name
            const category = await Category.findById(response.body.category._id);
            expect(category.name).toBe('Entertainment');
        });

        test('should not create expense with empty category name', async () => {
            const expenseData = {
                ...sampleExpense,
                categoryName: '   ' 
            };

            const response = await request(app)
                .post('/api/v1/expenses/with-new-category')
                .set('Authorization', `Bearer ${token1}`)
                .send(expenseData)
                .expect(400);

            expect(response.body.message).toContain('non-empty string');
        });

        test('should not create expense without categoryName', async () => {
            const expenseData = {
                ...sampleExpense
                // missing categoryName
            };

            const response = await request(app)
                .post('/api/v1/expenses/with-new-category')
                .set('Authorization', `Bearer ${token1}`)
                .send(expenseData)
                .expect(400);

            expect(response.body.message).toContain('Category name required');
        });

        test('should not create expense without authentication', async () => {
            const response = await request(app)
                .post('/api/v1/expenses/with-new-category')
                .send({
                    ...sampleExpense,
                    categoryName: 'New Category'
                })
                .expect(401);

            expect(response.body.message).toContain('no token');
        });

        test('should not create expense with missing required fields', async () => {
            const incompleteExpense = {
                title: 'Test Expense',
                categoryName: 'New Category'
                // missing amount, description, date
            };

            const response = await request(app)
                .post('/api/v1/expenses/with-new-category')
                .set('Authorization', `Bearer ${token1}`)
                .send(incompleteExpense)
                .expect(400);

            expect(response.body.message).toContain('required');
        });

        test('should not create expense with negative amount', async () => {
            const invalidExpense = {
                ...sampleExpense,
                categoryName: 'New Category',
                amount: -50
            };

            const response = await request(app)
                .post('/api/v1/expenses/with-new-category')
                .set('Authorization', `Bearer ${token1}`)
                .send(invalidExpense)
                .expect(400);

            expect(response.body.message).toContain('positive number');
        });

        test('should handle race condition gracefully', async () => {
            // simulates two requests trying to create the same category simultaneously
            const expenseData1 = {
                ...sampleExpense,
                title: 'Expense 1',
                categoryName: 'Race Category'
            };

            const expenseData2 = {
                ...sampleExpense,
                title: 'Expense 2', 
                categoryName: 'Race Category'
            };

            // both should succeed one creates category, other uses existing
            const [response1, response2] = await Promise.all([
                request(app)
                    .post('/api/v1/expenses/with-new-category')
                    .set('Authorization', `Bearer ${token1}`)
                    .send(expenseData1),
                request(app)
                    .post('/api/v1/expenses/with-new-category')
                    .set('Authorization', `Bearer ${token1}`)
                    .send(expenseData2)
            ]);

            expect(response1.status).toBe(200);
            expect(response2.status).toBe(200);
            
            // both should reference same category
            expect(response1.body.category.name).toBe('Race Category');
            expect(response2.body.category.name).toBe('Race Category');
            expect(response1.body.category._id).toBe(response2.body.category._id);

            // only one category should be created
            const categories = await Category.find({ 
                user: user1._id, 
                name: 'Race Category' 
            });
            expect(categories).toHaveLength(1);
        });

        test('should allow different users to create categories with same name', async () => {
            const expenseData1 = {
                ...sampleExpense,
                categoryName: 'Shared Category Name'
            };

            const expenseData2 = {
                ...sampleExpense,
                categoryName: 'Shared Category Name'
            };

            // user 1 creates expense with new category
            const response1 = await request(app)
                .post('/api/v1/expenses/with-new-category')
                .set('Authorization', `Bearer ${token1}`)
                .send(expenseData1)
                .expect(200);

            // user 2 creates expense with same category name
            const response2 = await request(app)
                .post('/api/v1/expenses/with-new-category')
                .set('Authorization', `Bearer ${token2}`)
                .send(expenseData2)
                .expect(200);

            expect(response1.body.category.name).toBe('Shared Category Name');
            expect(response2.body.category.name).toBe('Shared Category Name');
            expect(response1.body.category._id).not.toBe(response2.body.category._id);

            // verify both users have own category
            const user1Categories = await Category.find({ user: user1._id, name: 'Shared Category Name' });
            const user2Categories = await Category.find({ user: user2._id, name: 'Shared Category Name' });
            
            expect(user1Categories).toHaveLength(1);
            expect(user2Categories).toHaveLength(1);
        });
    });


    // ----------------- Get expenses endpoint -------------------
    describe('GET /api/v1/expenses', () => {

        // Create expenses for both users
        beforeEach(async () => {
            await Expense.create({ ...sampleExpense, user: user1._id, category: category1._id, title: 'User 1 Expense' });
            await Expense.create({ ...sampleExpense, user: user2._id, category: category2._id, title: 'User 2 Expense' });
        });

        test('should get expenses for authenticated user only', async () => {
            const response = await request(app)
                .get('/api/v1/expenses')
                .set('Authorization', `Bearer ${token1}`)
                .expect(200);

            expect(response.body).toHaveLength(1);
            expect(response.body[0]).toHaveProperty('title', 'User 1 Expense');
            expect(response.body[0]).toHaveProperty('user', user1._id.toString());
            expect(response.body[0]).toHaveProperty('category');
            expect(response.body[0].category).toHaveProperty('name', category1.name);
        });

        test('should not get expenses without authentication', async () => {
            const response = await request(app)
                .get('/api/v1/expenses')
                .expect(401);

            expect(response.body.message).toContain('no token');
        });

        test('should return expenses with populated category information', async () => {
            const response = await request(app)
                .get('/api/v1/expenses')
                .set('Authorization', `Bearer ${token1}`)
                .expect(200);

            expect(response.body).toHaveLength(1);
            const expense = response.body[0];
            expect(expense.category).toHaveProperty('_id');
            expect(expense.category).toHaveProperty('name');
            expect(expense.category).not.toHaveProperty('user'); // Should not populate user field of category
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
        let expenseId;

        beforeEach(async () => {
            const expense = await Expense.create({
                ...sampleExpense,
                user: user1._id,
                category: category1._id
            });
            expenseId = expense._id;
        });

        test('should delete own expense successfully', async () => {
            const response = await request(app)
                .delete(`/api/v1/expenses/${expenseId}`)
                .set('Authorization', `Bearer ${token1}`)
                .expect(200);

            expect(response.body).toHaveProperty('_id', expenseId.toString());

            // Verify expense is deleted
            const deletedExpense = await Expense.findById(expenseId);
            expect(deletedExpense).toBeNull();
        });

        test('should not delete other user\'s expense', async () => {
            const response = await request(app)
                .delete(`/api/v1/expenses/${expenseId}`)
                .set('Authorization', `Bearer ${token2}`)
                .expect(403);

            expect(response.body.message).toContain('Not authorized');

            // Verify expense still exists
            const stillExists = await Expense.findById(expenseId);
            expect(stillExists).toBeTruthy();
        });

        test('should not delete expense without authentication', async () => {
            const response = await request(app)
                .delete(`/api/v1/expenses/${expenseId}`)
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

        test('should return 500 for invalid expense ID format', async () => {
            const invalidId = 'invalid_id';
            const response = await request(app)
                .delete(`/api/v1/expenses/${invalidId}`)
                .set('Authorization', `Bearer ${token1}`)
                .expect(500);

            expect(response.body).toHaveProperty('message');
        });
    });
});