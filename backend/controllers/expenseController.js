const ExpenseSchema = require("../models/expenseModel");


exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date} = req.body;

    const expense = ExpenseSchema({
        user: req.user.id,
        title,
        amount,
        category,
        description,
        date
    });

    try {
        // Validations
        if(!title) {
            return res.status(400).json({message: 'Title required.'});
        }
        if(!category) {
            return res.status(400).json({message: 'Category required.'});
        }
        if(!amount) {
            return res.status(400).json({message: 'Amount required.'});
        }
        if(!description) {
            return res.status(400).json({message: 'Description required.'});
        }
        if(!date) {
            return res.status(400).json({message: 'Date required.'});
        }
        if(!title || !category || !amount || !description || !date) {
            return res.status(400).json({message: 'All fields required.'});
        }
        if(amount <= 0) {
            return res.status(400).json({message: 'Amount must be a positive number.'});
        }
        await expense.save();
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({message: error});
    }

    console.log(expense);
}

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find({ user: req.user.id }).sort({date: -1});
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

exports.deleteExpense = async (req, res) => {
    const {id} = req.params;

    try {
        const expense = await ExpenseSchema.findById(id);

        if(!expense){
            return res.status(404).json({message: "Expense not found"});
        }
        if(expense.user != req.user.id){
            return res.status(403).json({message: "Not authorized"});
        }
        await ExpenseSchema.findByIdAndDelete(id);
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({message: error});
    }
}