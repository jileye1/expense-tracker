const IncomeSchema = require("../models/incomeModel");


exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date} = req.body;

    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    });

    try {
        // Validations
        if(!title || !category || !amount || !description || !date) {
            return res.status(400).json({message: 'All fields required.'});
        }
        if(amount <= 0) {
            return res.status(400).json({message: 'Amount must be a positive number.'});
        }
        await income.save();
        res.status(200).json({message: 'Income saved to database.'});
    } catch (error) {
        res.status(500).json({message: error});
    }

    console.log(income);
}