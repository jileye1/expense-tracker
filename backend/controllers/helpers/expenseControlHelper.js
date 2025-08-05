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
    if(typeof category !== 'string' || category.trim().length === 0) {
        return 'Category must be a non-empty string.'
    }
    return null; // No validation errors
};


// Helpers function to find existing category by name or ID
const findCategoryBy = async (fieldName, value, userId) => {
    const query = { user: userId, [fieldName] : value };
    return await CategorySchema.findOne(query);
};

// Helper function to find existing category by name, or create if not already exists
const findOrCreateCategory = async (categoryName, userId) => {
    // find if existing category exists
    existingCategory = await findCategoryBy('name', categoryName, userId);
                    
    // if not existing category
    if(!existingCategory) {
        // create new category with default budget
        const newCategory = new CategorySchema({
            user: userId,
            name: categoryName,
            budget_per_year: 0,
            budget_per_month: 0,
            budget_per_week: 0
        });
    
        await newCategory.save();
        return newCategory;
    } else {
        return existingCategory;
    }
}

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


module.exports = { validateExpenseFields, createExpenseWithCategory, findCategoryBy, findOrCreateCategory };
