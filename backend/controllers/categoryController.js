const CategorySchema = require("../models/categoryModel");


exports.addCategory = async (req, res) => {
    const {name, budget_per_year, budget_per_month, budget_per_week} = req.body;

    const category = CategorySchema({
        name,
        budget_per_year,
        budget_per_month,
        budget_per_week
    });

    try {
        // Validations
        if(!name || !budget_per_year || !budget_per_month || !budget_per_week) {
            return res.status(400).json({message: 'All fields required.'});
        }
        if(budget_per_year <= 0 || budget_per_month <= 0 || budget_per_week <= 0) {
            return res.status(400).json({message: 'Budget amount must be a positive number.'});
        }
        await category.save();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({message: error});
    }

    console.log(category);
}

exports.getCategories = async (req, res) => {
    try {
        const categories = await CategorySchema.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

exports.deleteCategory = async (req, res) => {
    const {id} = req.params;
    CategorySchema.findByIdAndDelete(id).then((category) => {
        res.status(200).json(category);
    }).catch((error) => {
        res.status(500).json({message: error});
    });
}