const { addCategory, getCategories, deleteCategory } = require('../controllers/categoryController');
const { addExpense, getExpenses, deleteExpense } = require('../controllers/expenseController');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/incomeController');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("Hello World")
})

// Auth
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.get('/auth/profile', protect, getUserProfile);

// Protected routes
router.post('/incomes', protect, addIncome);
router.get('/incomes', protect, getIncomes);
router.delete('/incomes/:id', protect, deleteIncome);

router.post('/expenses', protect, addExpense);
router.get('/expenses', protect, getExpenses);
router.delete('/expenses/:id', protect, deleteExpense);

router.post('/categories', protect, addCategory);
router.get('/categories', protect, getCategories);
router.delete('/categories/:id', protect, deleteCategory);

module.exports = router;