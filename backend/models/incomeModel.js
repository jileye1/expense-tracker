const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        default: "Last Piece Wages",
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    type: {
        type: String,
        default: "Income"
    },
    date: {
        type: Date,
        required: true
    },
    weekday_hours: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    weekend_hours: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    tax: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
}, {timestamps: true});

module.exports = mongoose.model('Income', IncomeSchema);