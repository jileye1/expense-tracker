const CategorySchema = require("../models/categoryModel");


exports.addCategory = async (req, res) => {
    const { name, budget_per_year, budget_per_month, budget_per_week } = req.body;

    const category = CategorySchema({
        name,
        budget_per_year,
        budget_per_month,
        budget_per_week
    });

    try {
        // Validations
        if (!name) {
            return res.status(400).json({ message: 'Name required.' });
        }
        if(budget_per_year){
            // get budget from year
            category.budget_per_month = parseFloat(budget_per_year) / 12;
            category.budget_per_week = (parseFloat(budget_per_year) / 365.25) * 7;
        } else if(budget_per_month) {
            // get budget from month
            category.budget_per_year = parseFloat(budget_per_month) * 12;
            category.budget_per_week = (category.budget_per_year / 365.25) * 7;
        } else if(budget_per_week) {
            // Get budget from week
            category.budget_per_year = (parseFloat(budget_per_week) / 7) * 365.25;
            category.budget_per_month = category.budget_per_year / 12;
        } else {
            return res.status(400).json({ message: 'One positive budget field required.' });
        }

        category.budget_per_year = category.budget_per_year.toFixed(2)
        category.budget_per_month = category.budget_per_month.toFixed(2)
        category.budget_per_week = category.budget_per_week.toFixed(2)

        await category.save();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error });
    }

    console.log(category);
}

exports.getCategories = async (req, res) => {
    try {
        const categories = await CategorySchema.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    CategorySchema.findByIdAndDelete(id).then((category) => {
        if(!category){
            return res.status(404).json({message: "Category not found"});
        }
        res.status(200).json(category);
    }).catch((error) => {
        res.status(500).json({ message: error });
    });
}