const ExpenseSchema = require("../../models/expenseModel");
const CategorySchema = require("../../models/categoryModel");

// Helper function to validate common expense fields
const validateExpenseFields = (title, amount, category, description, date) => {
    if (!title) {
        return 'Title required.';
    }
    if (!amount) {
        return 'Amount required.';
    }
    if (!description) {
        return 'Description required.';
    }
    if (!date) {
        return 'Date required.';
    }
    if (!category) {
        return 'Category required.';
    }
    if (!title || !amount || !category || !description || !date) {
        return 'All fields required.';
    }
    if (amount <= 0) {
        return 'Amount must be a positive number.';
    }
    return null; // No validation errors
};


// Helpers function to find existing category by name or ID
const findCategoryBy = async (fieldName, value, userId) => {
    const query = { user: userId, [fieldName] : value };
    return await CategorySchema.findOne(query);
};


// Helper function to validate and get existing category by ObjectId
const validateExistingCategory = async (fieldName, value, userId) => {
    // Validate that category is a valid ObjectId
    if (fieldName == "_id" && (typeof value !== 'string' || !value.match(/^[0-9a-fA-F]{24}$/))){
        throw new Error('Category must be a valid category ID.');
    } else if (fieldName == "name" && (typeof value !== 'string' || value.length === 0)) {
        throw new Error('Category name must be a non-empty string.');
    }

    return await findCategoryBy(fieldName, value, userId);
};



// Helper function to create and populate expense
const createExpenseWithCategory = async (expenseData, categoryId, userId) => {
    const expense = ExpenseSchema({
        user: userId,
        title: expenseData.title,
        amount: expenseData.amount,
        category: categoryId,
        description: expenseData.description,
        date: expenseData.date
    });

    await expense.save();
    
    // populate the category information before returning
    await expense.populate('category', 'name');
    
    return expense;
};


module.exports = { validateExpenseFields, validateExistingCategory, createExpenseWithCategory, findCategoryBy };
