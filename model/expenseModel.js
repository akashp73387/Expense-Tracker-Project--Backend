const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    expenseDoneBy: {
        type: String,
        required: true
    },
    description: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String,
        enum: ['Clothes', 'Grocery', 'Entertainment', 'Electronics', 'Food & Beverages', 'Others'],
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;