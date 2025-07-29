const IncomeSchema = require("../models/incomeModel");


exports.addIncome = async (req, res) => {
    const {amount, date, weekday_hours, weekend_hours, tax} = req.body;

    const income = IncomeSchema({
        user: req.user.id,
        amount,
        date,
        weekday_hours,
        weekend_hours,
        tax,
    });

    try {
        // Validations
        if(!amount || !date || !weekday_hours || !weekend_hours || !tax) {
            return res.status(400).json({message: 'All fields required.'});
        }
        if(amount < 0 || weekday_hours < 0 || weekend_hours < 0 || tax < 0) {
            return res.status(400).json({message: 'Values must be positive.'});
        }
        await income.save();
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({message: error});
    }

    console.log(income);
}

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find({ user: req.user.id }).sort({date: -1});
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

exports.deleteIncome = async (req, res) => {
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id).then((income) => {
        if(!income){
            return res.status(404).json({message: "Income not found"});
        }
        if(income.user != req.user.id){
            return res.status(403).json({message: "Not authorised"});
        }
        res.status(200).json(income);
    }).catch((error) => {
        res.status(500).json({message: error});
    });
}