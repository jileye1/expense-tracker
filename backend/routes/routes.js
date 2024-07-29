const { addCategory, getCategories, deleteCategory } = require('../controllers/categoryController');
const { addExpense, getExpenses, deleteExpense } = require('../controllers/expenseController');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/incomeController');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("Hello World")
})

router.post('/add-income', addIncome);
router.get('/get-incomes', getIncomes);
router.delete('/delete-income/:id', deleteIncome);

router.post('/add-expense', addExpense);
router.get('/get-expenses', getExpenses);
router.delete('/delete-expense/:id', deleteExpense);

router.post('/add-category', addCategory);
router.get('/get-categories', getCategories);
router.delete('/delete-category/:id', deleteCategory);

module.exports = router;