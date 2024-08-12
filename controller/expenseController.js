const Expense = require('../model/expenseModel');

const expenseController = {
    addExpense: async (req, res) => {
        try {
            const { description, category, amount } = req.body;
            const response = await Expense.create({user: req.user._id, expenseDoneBy: req.user.name, description, category, amount});
            res.status(201).json({ message: "Expense added successfully", data: response});
        } catch (error) {
            res.status(500).json({message: "Internal server error", error});
        }
    },
    getUserExpense: async (req, res) => {
        try {
            const userId = req.user._id;
            const response = await Expense.find({ user: userId });
            res.status(200).json({ message: "Expense fetched successfully", data: response });
        } catch (error) {
            res.status(500).json({message: "Internal server error", error});
        }
    },
    getAllExpense: async (req, res) => {
        try {
            const response = await Expense.find();
            res.status(200).json({ message: "Expense fetched successfully", data: response });
        } catch (error) {
            res.status(500).json({message: "Internal server error", error});
        }
    },
    updateExpense: async (req, res) => {
        try {
            const userId = req.user._id;
            const expenseId = req.params.id;
            const expense = await Expense.findById(expenseId);
            if(userId.toString() !== expense.user.toString()) return res.status(401).json({ message: "You are not authorized to update others expense"});
            const response = await Expense.findByIdAndUpdate(expenseId, req.body, {new: true});
            res.status(200).json({ message: "Your expense is updated", data: response });
        } catch (error) {
            res.status(500).json({message: "Internal server error", error});
        }
    },
    deleteExpense: async (req, res) => {
        try {
            const userId = req.user._id;
            const expenseId = req.params.id;
            const expense = await Expense.findById(expenseId);
            if(userId.toString() !== expense.user.toString()) return res.status(401).json({ message: "You are not authorized to delete others expense"});
            await Expense.findByIdAndDelete(expenseId);
            res.status(200).json({ message: "Expense deleted successfully", data: expense });
        } catch (error) {
            res.status(500).json({message: "Internal server error", error});
        }
    }
}

module.exports = expenseController;