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
        default: 0,
        maxLength: 20,
        trim: true
    },
    budget_per_month: {
        type: Number,
        default: 0,
        maxLength: 20,
        trim: true
    },
    budget_per_week: {
        type: Number,
        default: 0,
        maxLength: 20,
        trim: true
    }
});

// Enforce unique category names per user
CategorySchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Category', CategorySchema);