const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    budget_per_year: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    budget_per_month: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    budget_per_week: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    }
});

module.exports = mongoose.model('Category', CategorySchema);