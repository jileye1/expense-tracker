const ExpenseSchema = require("../models/expenseModel");
const mongoose = require('mongoose');
const { validateExpenseFields, createExpenseWithCategory, findCategoryBy, findOrCreateCategory } = require("./helpers/expenseControlHelper")

// Main endpoint - expenses with existing category
exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date} = req.body;
    console.log(req.body);

    try {
        // Validate expense fields
        const validationError = validateExpenseFields(title, amount, category, description, date);
        if(validationError) {
            return res.status(400).json({ message: validationError });
        }

        let categoryDoc;

        // if category is a valid ObjectId
        if (mongoose.Types.ObjectId.isValid(category)){
                // get existing category
                categoryDoc = await findCategoryBy('_id', category, req.user.id);
                if(!categoryDoc) {
                    return res.status(400).json({message: 'Invalid category. Category must exist and belong to the user.'});
                }
        } else {
            try {
                categoryDoc = await findOrCreateCategory(category.trim(), req.user.id);
            } catch (categoryError) {
                if (categoryError.code === 11000) {
                    // duplicate key error - another request created the same category (race condition)
                    // find existing category and use instead
                    categoryDoc = await findCategoryBy("name", category.trim(), req.user.id);
                } else {
                    throw categoryError;
                }
            }
        }

        // Create expense
        const expense = await createExpenseWithCategory(
            { title, amount, description, date },
            categoryDoc._id,
            req.user.id
        );

        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({message: error});
    }
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