const ExpenseSchema = require("../models/expenseModel");
const CategorySchema = require("../models/categoryModel");


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
}

// // Create expense with new category
// exports.addExpenseWithNewCategory = async (req, res) => {
//     const {title, amount, categoryName, description, date} = req.body;

//     try {
//         // Validations
//         if(!title) {
//             return res.status(400).json({message: 'Title required.'});
//         }
//         if(!categoryName) {
//             return res.status(400).json({message: 'Category name required.'});
//         }
//         if(!amount) {
//             return res.status(400).json({message: 'Amount required.'});
//         }
//         if(!description) {
//             return res.status(400).json({message: 'Description required.'});
//         }
//         if(!date) {
//             return res.status(400).json({message: 'Date required.'});
//         }
//         if(!title || !categoryName || !amount || !description || !date) {
//             return res.status(400).json({message: 'All fields required.'});
//         }
//         if(amount <= 0) {
//             return res.status(400).json({message: 'Amount must be a positive number.'});
//         }

//         // Validate category name
//         if (typeof categoryName !== 'string' || categoryName.trim().length === 0) {
//             return res.status(400).json({message: 'Category name must be a non-empty string.'});
//         }

//         let categoryId;

//         try {
//             // Try to find existing category with same name
//             let existingCategory = await CategorySchema.findOne({
//                 user: req.user.id,
//                 name: categoryName.trim()
//             });

//             if (existingCategory) {
//                 // Use existing category
//                 categoryId = existingCategory._id;
//             } else {
//                 // Create new category with default budget
//                 const newCategory = new CategorySchema({
//                     user: req.user.id,
//                     name: categoryName.trim(),
//                     budget_per_year: 0,
//                     budget_per_month: 0,
//                     budget_per_week: 0
//                 });

//                 await newCategory.save();
//                 categoryId = newCategory._id;
//             }
//         } catch (categoryError) {
//             if (categoryError.code === 11000) {
//                 // Duplicate key error - should not happen due to our check above, but handle gracefully
//                 const existingCategory = await CategorySchema.findOne({
//                     user: req.user.id,
//                     name: categoryName.trim()
//                 });
//                 categoryId = existingCategory._id;
//             } else {
//                 throw categoryError;
//             }
//         }

//         const expense = ExpenseSchema({
//             user: req.user.id,
//             title,
//             amount,
//             category: categoryId,
//             description,
//             date
//         });

//         await expense.save();
        
//         // Populate the category information before sending response
//         await expense.populate('category', 'name budget_per_month budget_per_week budget_per_year');
        
//         res.status(200).json(expense);
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }

//     console.log(expense);
// }

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