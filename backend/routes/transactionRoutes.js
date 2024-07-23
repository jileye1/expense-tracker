const { addIncome, getIncomes, deleteIncome } = require('../controllers/incomeController');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("Hello World")
})

router.post('/add-income', addIncome);
router.get('/get-incomes', getIncomes);
router.delete('/delete-income/:id', deleteIncome);

module.exports = router;