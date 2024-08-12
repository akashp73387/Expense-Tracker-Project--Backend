const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const expenseController = require('../controller/expenseController');
const router = express.Router();

router.post('/addExpense', authMiddleware, expenseController.addExpense);
router.get('/userExpense', authMiddleware, expenseController.getUserExpense);
router.get('/allExpense', authMiddleware, expenseController.getAllExpense);
router.put('/:id', authMiddleware, expenseController.updateExpense);
router.delete('/:id', authMiddleware, expenseController.deleteExpense);

module.exports = router;