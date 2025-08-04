// Complete end-to-end user journey tests

const request = require('supertest');
const app = require('./testApp');
const { testUsers } = require('./testHelpers');

describe('Integration Tests', () => {

    describe('Full Authentication and CRUD Workflow', () => {
        let token;
        let userId;
        let categoryId;

        test('should handle complete user registration, authentication, and CRUD operations', async () => {
            // STEP 1: Register a new user
            const registerResponse = await request(app)
                .post('/api/v1/auth/register')
                .send(testUsers.user1)
                .expect(201);

            expect(registerResponse.body).toHaveProperty('token');
            expect(registerResponse.body).toHaveProperty('_id');
            expect(registerResponse.body).toHaveProperty('name', testUsers.user1.name);
            expect(registerResponse.body).toHaveProperty('email', testUsers.user1.email);

            token = registerResponse.body.token;
            userId = registerResponse.body._id;

            // STEP 2: Create a category first (required for expenses)
            const categoryData = {
                name: 'Food & Dining',
                budget_per_month: 400
            };

            const categoryResponse = await request(app)
                .post('/api/v1/categories')
                .set('Authorization', `Bearer ${token}`)
                .send(categoryData)
                .expect(200);

            expect(categoryResponse.body).toHaveProperty('name', categoryData.name);
            expect(categoryResponse.body).toHaveProperty('budget_per_month', categoryData.budget_per_month);
            expect(categoryResponse.body).toHaveProperty('user', userId);
            expect(categoryResponse.body).toHaveProperty('_id');

            categoryId = categoryResponse.body._id;

            // STEP 3: Create an expense using the category ID (existing category endpoint)
            const expenseData = {
                title: 'Grocery Shopping',
                amount: 85.50,
                category: categoryId, // Using category ID
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
            expect(expenseResponse.body).toHaveProperty('category');
            expect(expenseResponse.body.category).toHaveProperty('_id', categoryId);
            expect(expenseResponse.body.category).toHaveProperty('name', categoryData.name);
            expect(expenseResponse.body).toHaveProperty('user', userId);
            expect(expenseResponse.body).toHaveProperty('_id');

            const expenseId = expenseResponse.body._id;

            // STEP 4: Create another expense using new category endpoint
            const newCategoryExpenseData = {
                title: 'Coffee',
                amount: 12.50,
                categoryName: 'Dining Out', // Using category name to create new category
                description: 'Morning coffee at cafe',
                date: new Date('2024-01-16')
            };

            const newCategoryExpenseResponse = await request(app)
                .post('/api/v1/expenses/with-new-category')
                .set('Authorization', `Bearer ${token}`)
                .send(newCategoryExpenseData)
                .expect(200);

            expect(newCategoryExpenseResponse.body).toHaveProperty('title', newCategoryExpenseData.title);
            expect(newCategoryExpenseResponse.body.category).toHaveProperty('name', 'Dining Out');

            // STEP 5: Create an income entry
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

            // STEP 6: Retrieve user's expenses (should include populated categories)
            const getExpensesResponse = await request(app)
                .get('/api/v1/expenses')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(getExpensesResponse.body).toHaveLength(2);
            
            const groceryExpense = getExpensesResponse.body.find(exp => exp.title === 'Grocery Shopping');
            const coffeeExpense = getExpensesResponse.body.find(exp => exp.title === 'Coffee');
            
            expect(groceryExpense).toHaveProperty('user', userId);
            expect(groceryExpense.category).toHaveProperty('name', 'Food & Dining');
            
            expect(coffeeExpense).toHaveProperty('user', userId);
            expect(coffeeExpense.category).toHaveProperty('name', 'Dining Out');

            // STEP 7: Retrieve user's categories
            const getCategoriesResponse = await request(app)
                .get('/api/v1/categories')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(getCategoriesResponse.body).toHaveLength(2); // Food & Dining + Dining Out
            const categoryNames = getCategoriesResponse.body.map(cat => cat.name).sort();
            expect(categoryNames).toEqual(['Dining Out', 'Food & Dining']);

            // STEP 8: Retrieve user's incomes
            const getIncomesResponse = await request(app)
                .get('/api/v1/incomes')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(getIncomesResponse.body).toHaveLength(1);
            expect(getIncomesResponse.body[0]).toHaveProperty('amount', incomeData.amount);
            expect(getIncomesResponse.body[0]).toHaveProperty('user', userId);

            // STEP 9: Try to delete category with existing expense (should fail)
            const deleteCategoryResponse = await request(app)
                .delete(`/api/v1/categories/${categoryId}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(400);

            expect(deleteCategoryResponse.body.message).toContain('Cannot delete category');

            // STEP 10: Delete the expense first
            await request(app)
                .delete(`/api/v1/expenses/${expenseId}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            // STEP 11: Now delete the category (should succeed)
            await request(app)
                .delete(`/api/v1/categories/${categoryId}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            // STEP 12: Verify category is deleted
            const finalCategoriesResponse = await request(app)
                .get('/api/v1/categories')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(finalCategoriesResponse.body).toHaveLength(1); // Only 'Dining Out' should remain
            expect(finalCategoriesResponse.body[0].name).toBe('Dining Out');
        });
    });

    describe('Multi-User Data Isolation', () => {
        test('should properly isolate data between different users', async () => {
            // Create two users
            const user1Response = await request(app)
                .post('/api/v1/auth/register')
                .send(testUsers.user1)
                .expect(201);

            const user2Response = await request(app)
                .post('/api/v1/auth/register')
                .send(testUsers.user2)
                .expect(201);

            const user1Token = user1Response.body.token;
            const user1Id = user1Response.body._id;
            const user2Token = user2Response.body.token;
            const user2Id = user2Response.body._id;

            // User 1 creates a category
            const user1CategoryData = {
                name: 'User 1 Food Category',
                budget_per_month: 400
            };

            const user1CategoryResponse = await request(app)
                .post('/api/v1/categories')
                .set('Authorization', `Bearer ${user1Token}`)
                .send(user1CategoryData)
                .expect(200);

            const user1CategoryId = user1CategoryResponse.body._id;

            // User 2 creates a category with same name (should be allowed)
            const user2CategoryData = {
                name: 'User 1 Food Category', // Same name, different user
                budget_per_month: 600
            };

            const user2CategoryResponse = await request(app)
                .post('/api/v1/categories')
                .set('Authorization', `Bearer ${user2Token}`)
                .send(user2CategoryData)
                .expect(200);

            const user2CategoryId = user2CategoryResponse.body._id;

            // Create expenses for each user using existing categories
            const user1ExpenseData = {
                title: 'User 1 Expense',
                amount: 50,
                category: user1CategoryId,
                description: 'User 1 expense description',
                date: new Date()
            };

            const user2ExpenseData = {
                title: 'User 2 Expense',
                amount: 75,
                category: user2CategoryId,
                description: 'User 2 expense description',
                date: new Date()
            };

            await request(app)
                .post('/api/v1/expenses')
                .set('Authorization', `Bearer ${user1Token}`)
                .send(user1ExpenseData)
                .expect(200);

            await request(app)
                .post('/api/v1/expenses')
                .set('Authorization', `Bearer ${user2Token}`)
                .send(user2ExpenseData)
                .expect(200);

            // Create expenses using new category endpoint
            await request(app)
                .post('/api/v1/expenses/with-new-category')
                .set('Authorization', `Bearer ${user1Token}`)
                .send({
                    title: 'User 1 New Category Expense',
                    amount: 30,
                    categoryName: 'Shared Category Name',
                    description: 'User 1 new category expense',
                    date: new Date()
                })
                .expect(200);

            await request(app)
                .post('/api/v1/expenses/with-new-category')
                .set('Authorization', `Bearer ${user2Token}`)
                .send({
                    title: 'User 2 New Category Expense',
                    amount: 40,
                    categoryName: 'Shared Category Name', // Same name but different user
                    description: 'User 2 new category expense',
                    date: new Date()
                })
                .expect(200);

            // User 1 should only see their data
            const user1Categories = await request(app)
                .get('/api/v1/categories')
                .set('Authorization', `Bearer ${user1Token}`)
                .expect(200);

            const user1Expenses = await request(app)
                .get('/api/v1/expenses')
                .set('Authorization', `Bearer ${user1Token}`)
                .expect(200);

            expect(user1Categories.body).toHaveLength(2); // Original + Shared Category Name
            expect(user1Categories.body.some(cat => cat.budget_per_month === 400)).toBe(true);
            expect(user1Categories.body.every(cat => cat.user === user1Id)).toBe(true);

            expect(user1Expenses.body).toHaveLength(2);
            expect(user1Expenses.body.every(exp => exp.user === user1Id)).toBe(true);

            // User 2 should only see their data
            const user2Categories = await request(app)
                .get('/api/v1/categories')
                .set('Authorization', `Bearer ${user2Token}`)
                .expect(200);

            const user2Expenses = await request(app)
                .get('/api/v1/expenses')
                .set('Authorization', `Bearer ${user2Token}`)
                .expect(200);

            expect(user2Categories.body).toHaveLength(2); // Original + Shared Category Name
            expect(user2Categories.body.some(cat => cat.budget_per_month === 600)).toBe(true);
            expect(user2Categories.body.every(cat => cat.user === user2Id)).toBe(true);

            expect(user2Expenses.body).toHaveLength(2);
            expect(user2Expenses.body.every(exp => exp.user === user2Id)).toBe(true);

            // User 1 should not be able to create expense with User 2's category
            const invalidExpenseData = {
                title: 'Invalid Expense',
                amount: 100,
                category: user2CategoryId, // User 2's category
                description: 'This should fail',
                date: new Date()
            };

            await request(app)
                .post('/api/v1/expenses')
                .set('Authorization', `Bearer ${user1Token}`)
                .send(invalidExpenseData)
                .expect(400);
        });
    });

    describe('Flexible Category Creation Workflow', () => {
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

        test('should handle flexible category creation in expense workflow', async () => {
            // Create initial categories using category endpoint
            const categories = [
                { name: 'Food', budget_per_month: 500 },
                { name: 'Transportation', budget_per_month: 200 }
            ];

            const categoryIds = [];
            for (const category of categories) {
                const response = await request(app)
                    .post('/api/v1/categories')
                    .set('Authorization', `Bearer ${token}`)
                    .send(category)
                    .expect(200);
                categoryIds.push(response.body._id);
            }

            // Create expenses using different methods
            const expenses = [
                // Method 1: Use existing category ObjectId
                { 
                    title: 'Groceries', 
                    amount: 120, 
                    category: categoryIds[0], // ObjectId 
                    description: 'Weekly shopping', 
                    date: new Date() 
                },
                // Method 2: Use existing category name via new endpoint
                { 
                    title: 'Gas', 
                    amount: 50, 
                    categoryName: 'Transportation', // Existing category name
                    description: 'Fill up tank', 
                    date: new Date() 
                },
                // Method 3: Create new category with name string
                { 
                    title: 'Coffee', 
                    amount: 15, 
                    categoryName: 'Dining Out', // New category name
                    description: 'Morning coffee', 
                    date: new Date() 
                }
            ];

            // Create first expense using existing category endpoint
            await request(app)
                .post('/api/v1/expenses')
                .set('Authorization', `Bearer ${token}`)
                .send(expenses[0])
                .expect(200);

            // Create second and third expenses using new category endpoint
            for (let i = 1; i < expenses.length; i++) {
                await request(app)
                    .post('/api/v1/expenses/with-new-category')
                    .set('Authorization', `Bearer ${token}`)
                    .send(expenses[i])
                    .expect(200);
            }

            // Verify all data is correctly created
            const allCategories = await request(app)
                .get('/api/v1/categories')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            const allExpenses = await request(app)
                .get('/api/v1/expenses')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            // Should have 3 categories: Food, Transportation, Dining Out
            expect(allCategories.body).toHaveLength(3);
            expect(allExpenses.body).toHaveLength(3);

            // Check that new category was created
            const categoryNames = allCategories.body.map(cat => cat.name).sort();
            expect(categoryNames).toEqual(['Dining Out', 'Food', 'Transportation']);

            // Verify expenses have correct category relationships
            const groceryExpense = allExpenses.body.find(exp => exp.title === 'Groceries');
            expect(groceryExpense.category.name).toBe('Food');

            const gasExpense = allExpenses.body.find(exp => exp.title === 'Gas');
            expect(gasExpense.category.name).toBe('Transportation');

            const coffeeExpense = allExpenses.body.find(exp => exp.title === 'Coffee');
            expect(coffeeExpense.category.name).toBe('Dining Out');

            // Calculate total expenses
            const totalExpenses = allExpenses.body.reduce((sum, expense) => sum + expense.amount, 0);
            expect(totalExpenses).toBe(185); // 120 + 50 + 15
        });

        test('should handle category name conflicts during expense creation', async () => {
            // Create initial category
            const categoryResponse = await request(app)
                .post('/api/v1/categories')
                .set('Authorization', `Bearer ${token}`)
                .send({ name: 'Food', budget_per_month: 500 })
                .expect(200);

            const originalCategoryId = categoryResponse.body._id;

            // Try to create expense with existing category name (should use existing)
            const expenseResponse = await request(app)
                .post('/api/v1/expenses/with-new-category')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Lunch',
                    amount: 25,
                    categoryName: 'Food', // Should use existing category
                    description: 'Lunch at restaurant',
                    date: new Date()
                })
                .expect(200);

            expect(expenseResponse.body.category._id).toBe(originalCategoryId);
            expect(expenseResponse.body.category.name).toBe('Food');

            // Verify no duplicate category was created
            const allCategories = await request(app)
                .get('/api/v1/categories')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(allCategories.body).toHaveLength(1);
            expect(allCategories.body[0]._id).toBe(originalCategoryId);
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

        test('should return consistent error response formats', async () => {
            // Test validation error format for regular expense endpoint
            const validationErrorResponse = await request(app)
                .post('/api/v1/expenses')
                .set('Authorization', `Bearer ${token}`)
                .send({}) // Empty body to trigger validation error
                .expect(400);

            expect(validationErrorResponse.body).toHaveProperty('message');
            expect(typeof validationErrorResponse.body.message).toBe('string');

            // Test validation error format for new category expense endpoint
            const newCategoryValidationErrorResponse = await request(app)
                .post('/api/v1/expenses/with-new-category')
                .set('Authorization', `Bearer ${token}`)
                .send({}) // Empty body to trigger validation error
                .expect(400);

            expect(newCategoryValidationErrorResponse.body).toHaveProperty('message');
            expect(typeof newCategoryValidationErrorResponse.body.message).toBe('string');

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

        test('should validate proper data relationships across endpoints', async () => {
            // Create a category
            const categoryResponse = await request(app)
                .post('/api/v1/categories')
                .set('Authorization', `Bearer ${token}`)
                .send({ name: 'Test Category', budget_per_month: 500 })
                .expect(200);

            const categoryId = categoryResponse.body._id;

            // Test creating expense with invalid category format on regular endpoint
            await request(app)
                .post('/api/v1/expenses')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Test Expense',
                    amount: 100,
                    category: 'invalid_id_format',
                    description: 'Test description',
                    date: new Date()
                })
                .expect(400);

            // Test creating expense with non-existent category on regular endpoint
            await request(app)
                .post('/api/v1/expenses')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Test Expense',
                    amount: 100,
                    category: '507f1f77bcf86cd799439011', // Valid ObjectId but doesn't exist
                    description: 'Test description',
                    date: new Date()
                })
                .expect(400);

            // Test creating valid expense on regular endpoint
            await request(app)
                .post('/api/v1/expenses')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Test Expense',
                    amount: 100,
                    category: categoryId,
                    description: 'Test description',
                    date: new Date()
                })
                .expect(200);

            // Test creating valid expense on new category endpoint
            await request(app)
                .post('/api/v1/expenses/with-new-category')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Another Test Expense',
                    amount: 150,
                    categoryName: 'New Category',
                    description: 'Another test description',
                    date: new Date()
                })
                .expect(200);
        });
    });
});