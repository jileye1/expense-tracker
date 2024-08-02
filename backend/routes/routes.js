const { addCategory, getCategories, deleteCategory } = require('../controllers/categoryController');
const { addExpense, getExpenses, deleteExpense } = require('../controllers/expenseController');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/incomeController');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("Hello World")
})

router.post('/incomes', addIncome);
router.get('/incomes', getIncomes);
router.delete('/incomes/:id', deleteIncome);

router.post('/expenses', addExpense);
router.get('/expenses', getExpenses);
router.delete('/expenses/:id', deleteExpense);

router.post('/categories', addCategory);
router.get('/categories', getCategories);
router.delete('/categories/:id', deleteCategory);

module.exports = router;