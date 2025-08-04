const ExpenseSchema = require("../models/expenseModel");
const CategorySchema = require("../models/categoryModel");
const { validateExpenseFields, validateExistingCategory, createExpenseWithCategory, findCategoryBy } = require("./helpers/expenseControlHelper")

// Main endpoint - expenses with existing category
exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date} = req.body;

    try {
        // Validate expense fields
        const validationError = validateExpenseFields(title, amount, category, description, date);
        if(validationError) {
            return res.status(400).json({ message: validationError });
        }

        // Validate and get existing category
        const categoryId = await validateExistingCategory("_id", category, req.user.id);

        if (!categoryId) {
            return res.status(400).json({message: 'Invalid category. Category must exist and belong to the user.'});
        }

        // Create expense
        const expense = await createExpenseWithCategory(
            { title, amount, description, date },
            categoryId,
            req.user.id
        );

        res.status(200).json(expense);
    } catch (error) {
        // Handle validation vs server error
        if(error.message.includes('Category must be')) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({message: error});
    }
}

// Create expense with new category
exports.addExpenseWithNewCategory = async (req, res) => {
    const {title, amount, categoryName, description, date} = req.body;

    try {
        // Validations
        const validationError = validateExpenseFields(title, amount, categoryName, description, date);
        if(validationError) {
            return res.status(400).json({ message: validationError });
        }
        
        const trimmedName = categoryName.trim();
        let categoryId;
        try {
            // find if existing category exists
            const existingCategory = await validateExistingCategory("name", trimmedName, req.user.id);
            
            if(existingCategory) {
                categoryId = existingCategory._id;
            } else {
                // new category with default budget
                const newCategory = new CategorySchema({
                    user: req.user.id,
                    name: trimmedName,
                    budget_per_year: 0,
                    budget_per_month: 0,
                    budget_per_week: 0
                });

                await newCategory.save();
                categoryId = newCategory._id;
            }
        } catch (categoryError) {
            if (categoryError.code === 11000) {
                // duplicate key error - another request created the same category (race condition)
                // find existing category and use instead
                const existingCategory = await findCategoryBy("name", trimmedName, req.user.id);
                categoryId = existingCategory._id;
            } else {
                throw categoryError;
            }
        }

        const expense = await createExpenseWithCategory(
            { title, amount, description, date },
            categoryId,
            req.user.id
        );
        res.status(200).json(expense);
    } catch (error) {
        // Handle validation errors vs server errors
        if (error.message.includes('Category name must be')) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({message: error.message});
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