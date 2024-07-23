const { addIncome } = require('../controllers/incomeController');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("Hello World")
})

router.post('/add-income', addIncome);

module.exports = router;