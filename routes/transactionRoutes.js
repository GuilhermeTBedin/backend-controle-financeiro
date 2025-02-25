const router = require("express").Router();
const transactionController = require("../controllers/transactionController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use('/transactions', authMiddleware);

router.post('/transactions', transactionController.createTransaction)
router.get('/transactions', transactionController.getTransactions)
router.get('/transactions/:id', transactionController.getTransactionByID)
router.put('/transactions/:id', transactionController.updateTransaction)
router.delete('/transactions/:id', transactionController.deleteTransaction)

module.exports = router;
