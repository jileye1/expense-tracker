const ExpenseSchema = require("../models/expenseModel");


// Main endpoint - expenses with existing category
exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date} = req.body;

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

        // Validate  category is valid ObjectId
        if (typeof category !== 'string' || !category.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({message: 'Category must be a valid category ID.'});
        }

        // Validate that category exists and belongs to user
        const categoryExists = await CategorySchema.findOne({
            _id: category,
            user: req.user.id
        });

        if (!categoryExists) {
            return res.status(400).json({message: 'Invalid category. Category must exist and belong to the user.'});
        }

        const expense = ExpenseSchema({
            user: req.user.id,
            title,
            amount,
            category,
            description,
            date
        });

        await expense.save();

        await expense.populate('category', 'name');

        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({message: error});
    }

    console.log(expense);
}

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseSchema
            .find({ user: req.user.id })
            .populate('category', 'name')
            .sort({date: -1});
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