// Category endpoint tests


const request = require('supertest');
const app = require('../testApp');
const Category = require('../../models/categoryModel');
const { createUserAndToken, sampleCategory, testUsers } = require('../testHelpers');

    //POST

    // AUTH
    // Create successfully


    // DATA VALIDATION
    // Name required 400
    // At least one budget field required 400

describe('Category Endpoints', () => {

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

    // ----------------- Add category endpoint -------------------
    describe('POST /api/v1/categories', () => {

        // SUCCESS Testing
        test('should create category with valid data and token', async () => {
            const response = await request(app)
                .post('/api/v1/categories')
                .set('Authorization', `Bearer ${token1}`)
                .send(sampleCategory)
                .expect(200);

            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('name', sampleCategory.name);
            expect(response.body).toHaveProperty('budget_per_month', sampleCategory.budget_per_month);
            expect(response.body).toHaveProperty('user', user1._id.toString());
        });

        test('should create year/week budgets with month input only (valid data and token)', async () => {
            const monthBudgetCategory = {
                name: "Monthly budget",
                budget_per_month: 500,
            };

            const response = await request(app)
                .post('/api/v1/categories')
                .set('Authorization', `Bearer ${token1}`)
                .send(monthBudgetCategory)
                .expect(200);

            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('name', monthBudgetCategory.name);
            expect(response.body).toHaveProperty('budget_per_month', monthBudgetCategory.budget_per_month);
            expect(response.body).toHaveProperty('budget_per_year');
            expect(response.body).toHaveProperty('budget_per_week');
            expect(response.body).toHaveProperty('user', user1._id.toString());

            // Check calculated values
            expect(parseFloat(response.body.budget_per_year)).toBe(6000); // 500 * 12
            expect(parseFloat(response.body.budget_per_week)).toBeCloseTo(115.38, 2);
        });

        test('should create month/week budgets with year input only (valid data and token)', async () => {
            const yearBudgetCategory = {
                name: "Yearly budget",
                budget_per_year: 600,
            };

            const response = await request(app)
                .post('/api/v1/categories')
                .set('Authorization', `Bearer ${token1}`)
                .send(yearBudgetCategory)
                .expect(200);

            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('name', yearBudgetCategory.name);
            expect(response.body).toHaveProperty('budget_per_month');
            expect(response.body).toHaveProperty('budget_per_year', yearBudgetCategory.budget_per_year);
            expect(response.body).toHaveProperty('budget_per_week');
            expect(response.body).toHaveProperty('user', user1._id.toString());

            // Check calculated values
            expect(parseFloat(response.body.budget_per_month)).toBe(500); // 6000 / 12
            expect(parseFloat(response.body.budget_per_week)).toBeCloseTo(115.38, 2);
        });

        test('should create year/month budgets with week input only (valid data and token)', async () => {
            const weekBudgetCategory = {
                name: "Weekly budget",
                budget_per_week: 20,
            };

            const response = await request(app)
                .post('/api/v1/categories')
                .set('Authorization', `Bearer ${token1}`)
                .send(weekBudgetCategory)
                .expect(200);

            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('name', weekBudgetCategory.name);
            expect(response.body).toHaveProperty('budget_per_month');
            expect(response.body).toHaveProperty('budget_per_year');
            expect(response.body).toHaveProperty('budget_per_week', weekBudgetCategory.budget_per_week);
            expect(response.body).toHaveProperty('user', user1._id.toString());

            // Check calculated values
            expect(parseFloat(response.body.budget_per_year)).toBeCloseTo(5217.86, 2); // (100 / 7) * 365.25
            expect(parseFloat(response.body.budget_per_month)).toBeCloseTo(434.82, 2);
        });


        // ERROR Testing
        // AUTH
        test('should not create category without authentication', async () => {
            const response = await request(app)
                .post('/api/v1/categories')
                .send(sampleCategory)
                .expect(401);

            expect(response.body.message).toContain('no token');
        });

        // MISSING FIELDS
        test('should not create category with missing required name', async () => {
            const incompleteCategory = {
                budget_per_month: 500,
                // missing name
            };

            const response = await request(app)
                .post('/api/v1/categories')
                .set('Authorization', `Bearer ${token1}`)
                .send(incompleteCategory)
                .expect(400);

            expect(response.body.message).toContain('Name required');
        });

        // DATA VALIDATION
        test('should not create category without at least one budget', async () => {
            const invalidCategory = {
                name: "sample",
                // missing any budgets
            };

            const response = await request(app)
                .post('/api/v1/categories')
                .set('Authorization', `Bearer ${token1}`)
                .send(invalidCategory)
                .expect(400);

            expect(response.body.message).toContain('budget field required');
        });

        test('should not create category with duplicate name for same user', async () => {
            // Create first category
            await request(app)
                .post('/api/v1/categories')
                .set('Authorization', `Bearer ${token1}`)
                .send(sampleCategory)
                .expect(200);

            // Try to create second category with same name
            const duplicateCategory = {
                ...sampleCategory,
                budget_per_month: 600 // Different budget, same name
            };

            const response = await request(app)
                .post('/api/v1/categories')
                .set('Authorization', `Bearer ${token1}`)
                .send(duplicateCategory)
                .expect(400);

            expect(response.body.message).toContain('already exists');
        });

        test('should allow same category name for different users', async () => {
            // User 1 creates category
            await request(app)
                .post('/api/v1/categories')
                .set('Authorization', `Bearer ${token1}`)
                .send(sampleCategory)
                .expect(200);

            // User 2 creates category with same name (should work)
            const response = await request(app)
                .post('/api/v1/categories')
                .set('Authorization', `Bearer ${token2}`)
                .send(sampleCategory)
                .expect(200);

            expect(response.body).toHaveProperty('name', sampleCategory.name);
            expect(response.body).toHaveProperty('user', user2._id.toString());
        });
    });


    // ----------------- Get categories endpoint -------------------
    describe('GET /api/v1/categories', () => {

        // Create categories for both users
        beforeEach(async () => {
            await Category.create({ ...sampleCategory, user: user1._id, name: 'User 1 category' });
            await Category.create({ ...sampleCategory, user: user2._id, name: 'User 2 category' });
        });

        test('should get categories for authenticated user only', async () => {
            const response = await request(app)
                .get('/api/v1/categories')
                .set('Authorization', `Bearer ${token1}`)
                .expect(200);

            expect(response.body).toHaveLength(1);
            expect(response.body[0]).toHaveProperty('name', 'User 1 category');
            expect(response.body[0]).toHaveProperty('user', user1._id.toString());
        });

        test('should not get categories without authentication', async () => {
            const response = await request(app)
                .get('/api/v1/categories')
                .expect(401);

            expect(response.body.message).toContain('no token');
        });

        test('should return empty array for user with no categories', async () => {
            // Clear all categories
            await Category.deleteMany({});

            const response = await request(app)
                .get('/api/v1/categories')
                .set('Authorization', `Bearer ${token1}`)
                .expect(200);

            expect(response.body).toHaveLength(0);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });


    // ----------------- Delete category endpoint -------------------
    describe('DELETE /api/v1/categories/:id', () => {
        let category1, category2;

        // Create categories for both users
        beforeEach(async () => {
            category1 = await Category.create({ ...sampleCategory, user: user1._id });
            category2 = await Category.create({ ...sampleCategory, user: user2._id });
        });

        test('should delete own category successfully', async () => {
            const response = await request(app)
                .delete(`/api/v1/categories/${category1._id}`)
                .set('Authorization', `Bearer ${token1}`)
                .expect(200);

            expect(response.body).toHaveProperty('_id', category1._id.toString());

            // Verify category is deleted
            const deletedCategory = await Category.findById(category1._id);
            expect(deletedCategory).toBeNull();
        });

        test('should not delete other user\'s category', async () => {
            const response = await request(app)
                .delete(`/api/v1/categories/${category2._id}`)
                .set('Authorization', `Bearer ${token1}`)
                .expect(403);

            expect(response.body.message).toContain('Not authorized');

            // Verify category still exists
            const stillExists = await Category.findById(category2._id);
            expect(stillExists).toBeTruthy();
        });

        test('should not delete category without authentication', async () => {
            const response = await request(app)
                .delete(`/api/v1/categories/${category1._id}`)
                .expect(401);

            expect(response.body.message).toContain('no token');
        });

        test('should return 404 for non-existent category', async () => {
            const fakeId = '507f1f77bcf86cd799439011'; // Valid ObjectId format

            const response = await request(app)
                .delete(`/api/v1/categories/${fakeId}`)
                .set('Authorization', `Bearer ${token1}`)
                .expect(404);

            expect(response.body.message).toContain('not found');
        });
    });
});