const CategorySchema = require("../models/categoryModel");


exports.addCategory = async (req, res) => {
    const { name, budget_per_year, budget_per_month, budget_per_week } = req.body;

    console.log("year: " + budget_per_year)
    console.log("month: " + budget_per_month)
    console.log("week: " + budget_per_week)

    const category = CategorySchema({
        name,
        budget_per_year,
        budget_per_month,
        budget_per_week
    });

    console.log("cat-year: " + category.budget_per_year)
    console.log("cat-month: " + category.budget_per_month)
    console.log("cat-week: " + category.budget_per_week)

    try {
        // Validations
        if (!name) {
            return res.status(400).json({ message: 'Name required.' });
        }
        if (!budget_per_year) {
            if (!budget_per_month) {
                if (!budget_per_week) {
                    return res.status(400).json({ message: 'One positive budget field required.' });
                }
                // Get budget from week
                category.budget_per_year = (parseFloat(budget_per_week) / 7) * 365.25;
                category.budget_per_month = category.budget_per_year / 12;
            } else {
                // get budget from month
                category.budget_per_year = parseFloat(budget_per_month) * 12;
                category.budget_per_week = (category.budget_per_year / 365.25) * 7;
            }
        } else {
            // get budget from year
            category.budget_per_month = parseFloat(budget_per_year) / 12;
            category.budget_per_week = (parseFloat(budget_per_year) / 365.25) * 7;
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
        res.status(200).json(category);
    }).catch((error) => {
        res.status(500).json({ message: error });
    });
}