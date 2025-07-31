// Complete end-to-end user journey tests

const request = require('supertest');
const app = require('./testApp');
const { testUsers, sampleExpense, sampleCategory, sampleIncome } = require('./testHelpers');

describe('User Journey Integration Tests', () => {
    let token;
    let userId;

    describe('Complete User Workflow', () => {
        test('should complete full user journey: register -> login -> create data -> retrieve data', async () => {
            // STEP 1: Register new user
            const registerResponse = await request(app)
                .post('/api/v1/auth/register')
                .send(testUsers.user1)
                .expect(201);

            expect(registerResponse.body).toHaveProperty('token');
            expect(registerResponse.body).toHaveProperty('_id');
            expect(registerResponse.body).toHaveProperty('name', testUsers.user1.name);
            expect(registerResponse.body).toHaveProperty('email', testUsers.user1.email);
            expect(registerResponse.body).not.toHaveProperty('password');

            token = registerResponse.body.token;
            userId = registerResponse.body._id;

            // STEP 2: Create a category
            const categoryData = {
                name: 'Food & Dining',
                budget_per_month: 500
            };

            const categoryResponse = await request(app)
                .post('/api/v1/categories')
                .set('Authorization', `Bearer ${token}`)
                .send(categoryData)
                .expect(200);

            expect(categoryResponse.body).toHaveProperty('name', categoryData.name);
            expect(categoryResponse.body).toHaveProperty('budget_per_month', 500);
            expect(categoryResponse.body).toHaveProperty('budget_per_year');
            expect(categoryResponse.body).toHaveProperty('budget_per_week');
            expect(categoryResponse.body).toHaveProperty('user', userId);

            // STEP 3: Create an expense using the category
            const expenseData = {
                title: 'Grocery Shopping',
                amount: 75.50,
                category: categoryData.name,
                description: 'Weekly grocery shopping at supermarket',
                date: new Date('2024-01-15')
            };

            const expenseResponse = await request(app)
                .post('/api/v1/expenses')
                .set('Authorization', `Bearer ${token}`)
                .send(expenseData)
                .expect(200);

            expect(expenseResponse.body).toHaveProperty('title', expenseData.title);
            expect(expenseResponse.body).toHaveProperty('amount', expenseData.amount);
            expect(expenseResponse.body).toHaveProperty('category', expenseData.category);
            expect(expenseResponse.body).toHaveProperty('user', userId);
            expect(expenseResponse.body).toHaveProperty('_id');

            const expenseId = expenseResponse.body._id;

            // STEP 4: Create an income entry
            const incomeData = {
                amount: 2500,
                date: new Date('2024-01-01'),
                weekday_hours: 40,
                weekend_hours: 8,
                tax: 500
            };

            const incomeResponse = await request(app)
                .post('/api/v1/incomes')
                .set('Authorization', `Bearer ${token}`)
                .send(incomeData)
                .expect(200);

            expect(incomeResponse.body).toHaveProperty('amount', incomeData.amount);
            expect(incomeResponse.body).toHaveProperty('weekday_hours', incomeData.weekday_hours);
            expect(incomeResponse.body).toHaveProperty('user', userId);
            expect(incomeResponse.body).toHaveProperty('title', 'Last Piece Wages');

            // STEP 5: Retrieve user's expenses
            const getExpensesResponse = await request(app)
                .get('/api/v1/expenses')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(getExpensesResponse.body).toHaveLength(1);
            expect(getExpensesResponse.body[0]).toHaveProperty('title', expenseData.title);
            expect(getExpensesResponse.body[0]).toHaveProperty('user', userId);

            // STEP 6: Retrieve user's categories
            const getCategoriesResponse = await request(app)
                .get('/api/v1/categories')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(getCategoriesResponse.body).toHaveLength(1);
            expect(getCategoriesResponse.body[0]).toHaveProperty('name', categoryData.name);
            expect(getCategoriesResponse.body[0]).toHaveProperty('user', userId);

            // STEP 7: Retrieve user's incomes
            const getIncomesResponse = await request(app)
                .get('/api/v1/incomes')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(getIncomesResponse.body).toHaveLength(1);
            expect(getIncomesResponse.body[0]).toHaveProperty('amount', incomeData.amount);
            expect(getIncomesResponse.body[0]).toHaveProperty('user', userId);

            // STEP 8: Get user profile
            const profileResponse = await request(app)
                .get('/api/v1/auth/profile')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(profileResponse.body).toHaveProperty('email', testUsers.user1.email);
            expect(profileResponse.body).toHaveProperty('name', testUsers.user1.name);
            expect(profileResponse.body).not.toHaveProperty('password');

            // STEP 9: Delete the expense
            await request(app)
                .delete(`/api/v1/expenses/${expenseId}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            // STEP 10: Verify expense was deleted
            const finalExpensesResponse = await request(app)
                .get('/api/v1/expenses')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(finalExpensesResponse.body).toHaveLength(0);
        });

        test('should handle user login after registration', async () => {
            // STEP 1: Register user
            await request(app)
                .post('/api/v1/auth/register')
                .send(testUsers.user1)
                .expect(201);

            // STEP 2: Login with registered credentials
            const loginResponse = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: testUsers.user1.email,
                    password: testUsers.user1.password
                })
                .expect(200);

            expect(loginResponse.body).toHaveProperty('token');
            expect(loginResponse.body).toHaveProperty('email', testUsers.user1.email);
            expect(loginResponse.body).toHaveProperty('name', testUsers.user1.name);
            expect(loginResponse.body).not.toHaveProperty('password');

            // STEP 3: Use login token for protected route
            const token = loginResponse.body.token;
            const profileResponse = await request(app)
                .get('/api/v1/auth/profile')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(profileResponse.body).toHaveProperty('email', testUsers.user1.email);
            expect(profileResponse.body).toHaveProperty('name', testUsers.user1.name);
        });
    });

    describe('Data Isolation Between Users', () => {
        let user1Token, user2Token, user1Id, user2Id;

        beforeEach(async () => {
            // Create and register two users
            const user1Response = await request(app)
                .post('/api/v1/auth/register')
                .send(testUsers.user1)
                .expect(201);
            
            user1Token = user1Response.body.token;
            user1Id = user1Response.body._id;

            const user2Response = await request(app)
                .post('/api/v1/auth/register')
                .send(testUsers.user2)
                .expect(201);
            
            user2Token = user2Response.body.token;
            user2Id = user2Response.body._id;
        });

        test('should maintain expense isolation between users', async () => {
            // User 1 creates an expense
            const user1ExpenseData = {
                ...sampleExpense,
                title: 'User 1 Expense'
            };

            await request(app)
                .post('/api/v1/expenses')
                .set('Authorization', `Bearer ${user1Token}`)
                .send(user1ExpenseData)
                .expect(200);

            // User 2 creates an expense
            const user2ExpenseData = {
                ...sampleExpense,
                title: 'User 2 Expense'
            };

            await request(app)
                .post('/api/v1/expenses')
                .set('Authorization', `Bearer ${user2Token}`)
                .send(user2ExpenseData)
                .expect(200);

            // User 1 should only see their expense
            const user1Expenses = await request(app)
                .get('/api/v1/expenses')
                .set('Authorization', `Bearer ${user1Token}`)
                .expect(200);

            expect(user1Expenses.body).toHaveLength(1);
            expect(user1Expenses.body[0]).toHaveProperty('title', 'User 1 Expense');
            expect(user1Expenses.body[0]).toHaveProperty('user', user1Id);

            // User 2 should only see their expense
            const user2Expenses = await request(app)
                .get('/api/v1/expenses')
                .set('Authorization', `Bearer ${user2Token}`)
                .expect(200);

            expect(user2Expenses.body).toHaveLength(1);
            expect(user2Expenses.body[0]).toHaveProperty('title', 'User 2 Expense');
            expect(user2Expenses.body[0]).toHaveProperty('user', user2Id);
        });

        test('should maintain category isolation between users', async () => {
            // User 1 creates a category
            const user1CategoryData = {
                name: 'User 1 Food Category',
                budget_per_month: 400
            };

            await request(app)
                .post('/api/v1/categories')
                .set('Authorization', `Bearer ${user1Token}`)
                .send(user1CategoryData)
                .expect(200);

            // User 2 creates a category with same name (should be allowed)
            const user2CategoryData = {
                name: 'User 1 Food Category', // Same name, different user
                budget_per_month: 600
            };

            await request(app)
                .post('/api/v1/categories')
                .set('Authorization', `Bearer ${user2Token}`)
                .send(user2CategoryData)
                .expect(200);

            // User 1 should only see their category
            const user1Categories = await request(app)
                .get('/api/v1/categories')
                .set('Authorization', `Bearer ${user1Token}`)
                .expect(200);

            expect(user1Categories.body).toHaveLength(1);
            expect(user1Categories.body[0]).toHaveProperty('budget_per_month', 400);
            expect(user1Categories.body[0]).toHaveProperty('user', user1Id);

            // User 2 should only see their category
            const user2Categories = await request(app)
                .get('/api/v1/categories')
                .set('Authorization', `Bearer ${user2Token}`)
                .expect(200);

            expect(user2Categories.body).toHaveLength(1);
            expect(user2Categories.body[0]).toHaveProperty('budget_per_month', 600);
            expect(user2Categories.body[0]).toHaveProperty('user', user2Id);
        });

    });

    describe('Error Handling Integration', () => {
        let token;

        beforeEach(async () => {
            // Create a user for error handling tests
            const userResponse = await request(app)
                .post('/api/v1/auth/register')
                .send(testUsers.user1)
                .expect(201);
            
            token = userResponse.body.token;
        });

        test('should handle authentication edge cases', async () => {
            // Test invalid token format
            await request(app)
                .get('/api/v1/expenses')
                .set('Authorization', 'Bearer invalid_token_format')
                .expect(401);

            // Test malformed Authorization header
            await request(app)
                .get('/api/v1/expenses')
                .set('Authorization', 'NotBearer token_here')
                .expect(401);

            // Test missing Authorization header
            await request(app)
                .get('/api/v1/expenses')
                .expect(401);

            // Test empty token
            await request(app)
                .get('/api/v1/expenses')
                .set('Authorization', 'Bearer ')
                .expect(401);
        });
    });

    describe('API Response Format Consistency', () => {
        let token;

        beforeEach(async () => {
            const userResponse = await request(app)
                .post('/api/v1/auth/register')
                .send(testUsers.user1)
                .expect(201);
            
            token = userResponse.body.token;
        });

        test('should return consistent success response formats', async () => {
            // Test expense creation response format
            const expenseResponse = await request(app)
                .post('/api/v1/expenses')
                .set('Authorization', `Bearer ${token}`)
                .send(sampleExpense)
                .expect(200);

            expect(expenseResponse.body).toHaveProperty('_id');
            expect(expenseResponse.body).toHaveProperty('title');
            expect(expenseResponse.body).toHaveProperty('amount');
            expect(expenseResponse.body).toHaveProperty('user');
            expect(expenseResponse.body).toHaveProperty('createdAt');
            expect(expenseResponse.body).toHaveProperty('updatedAt');

            // Test category creation response format
            const categoryResponse = await request(app)
                .post('/api/v1/categories')
                .set('Authorization', `Bearer ${token}`)
                .send(sampleCategory)
                .expect(200);

            expect(categoryResponse.body).toHaveProperty('_id');
            expect(categoryResponse.body).toHaveProperty('name');
            expect(categoryResponse.body).toHaveProperty('budget_per_year');
            expect(categoryResponse.body).toHaveProperty('budget_per_month');
            expect(categoryResponse.body).toHaveProperty('budget_per_week');
            expect(categoryResponse.body).toHaveProperty('user');

            // Test income creation response format
            const incomeResponse = await request(app)
                .post('/api/v1/incomes')
                .set('Authorization', `Bearer ${token}`)
                .send(sampleIncome)
                .expect(200);

            expect(incomeResponse.body).toHaveProperty('_id');
            expect(incomeResponse.body).toHaveProperty('amount');
            expect(incomeResponse.body).toHaveProperty('weekday_hours');
            expect(incomeResponse.body).toHaveProperty('weekend_hours');
            expect(incomeResponse.body).toHaveProperty('tax');
            expect(incomeResponse.body).toHaveProperty('user');
            expect(incomeResponse.body).toHaveProperty('createdAt');
            expect(incomeResponse.body).toHaveProperty('updatedAt');
        });

        test('should return consistent error response formats', async () => {
            // Test validation error format
            const validationErrorResponse = await request(app)
                .post('/api/v1/expenses')
                .set('Authorization', `Bearer ${token}`)
                .send({}) // Empty body to trigger validation error
                .expect(400);

            expect(validationErrorResponse.body).toHaveProperty('message');
            expect(typeof validationErrorResponse.body.message).toBe('string');

            // Test authentication error format
            const authErrorResponse = await request(app)
                .get('/api/v1/expenses')
                .expect(401);

            expect(authErrorResponse.body).toHaveProperty('message');
            expect(typeof authErrorResponse.body.message).toBe('string');

            // Test not found error format
            const notFoundResponse = await request(app)
                .delete('/api/v1/expenses/507f1f77bcf86cd799439011')
                .set('Authorization', `Bearer ${token}`)
                .expect(404);

            expect(notFoundResponse.body).toHaveProperty('message');
            expect(typeof notFoundResponse.body.message).toBe('string');
        });
    });

    describe('Complex User Scenarios', () => {
        let token;
        let userId;

        beforeEach(async () => {
            const userResponse = await request(app)
                .post('/api/v1/auth/register')
                .send(testUsers.user1)
                .expect(201);
            
            token = userResponse.body.token;
            userId = userResponse.body._id;
        });

        test('should handle complete budget tracking workflow', async () => {
            // Create multiple categories
            const categories = [
                { name: 'Food', budget_per_month: 500 },
                { name: 'Transportation', budget_per_month: 200 },
                { name: 'Entertainment', budget_per_month: 150 }
            ];

            for (const category of categories) {
                await request(app)
                    .post('/api/v1/categories')
                    .set('Authorization', `Bearer ${token}`)
                    .send(category)
                    .expect(200);
            }

            // Create multiple expenses across categories
            const expenses = [
                { title: 'Groceries', amount: 120, category: 'Food', description: 'Weekly shopping', date: new Date() },
                { title: 'Gas', amount: 50, category: 'Transportation', description: 'Fill up tank', date: new Date() },
                { title: 'Movie tickets', amount: 25, category: 'Entertainment', description: 'Date night', date: new Date() }
            ];

            for (const expense of expenses) {
                await request(app)
                    .post('/api/v1/expenses')
                    .set('Authorization', `Bearer ${token}`)
                    .send(expense)
                    .expect(200);
            }

            // Add income
            await request(app)
                .post('/api/v1/incomes')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    amount: 3000,
                    date: new Date(),
                    weekday_hours: 40,
                    weekend_hours: 5,
                    tax: 600
                })
                .expect(200);

            // Verify all data is correctly associated with user
            const allCategories = await request(app)
                .get('/api/v1/categories')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            const allExpenses = await request(app)
                .get('/api/v1/expenses')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            const allIncomes = await request(app)
                .get('/api/v1/incomes')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(allCategories.body).toHaveLength(3);
            expect(allExpenses.body).toHaveLength(3);
            expect(allIncomes.body).toHaveLength(1);

            // Verify all items belong to the correct user
            allCategories.body.forEach(category => {
                expect(category).toHaveProperty('user', userId);
            });

            allExpenses.body.forEach(expense => {
                expect(expense).toHaveProperty('user', userId);
            });

            allIncomes.body.forEach(income => {
                expect(income).toHaveProperty('user', userId);
            });

            // Calculate total expenses
            const totalExpenses = allExpenses.body.reduce((sum, expense) => sum + expense.amount, 0);
            expect(totalExpenses).toBe(195); // 120 + 50 + 25
        });
    });
});