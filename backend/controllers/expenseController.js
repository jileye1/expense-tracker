const ExpenseSchema = require("../models/expenseModel");


exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date} = req.body;

    const expense = ExpenseSchema({
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
        const expenses = await ExpenseSchema.find().sort({createdAt: -1});
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

exports.deleteExpense = async (req, res) => {
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id).then((expense) => {
        res.status(200).json(expense);
    }).catch((error) => {
        res.status(500).json({message: error});
    });
}