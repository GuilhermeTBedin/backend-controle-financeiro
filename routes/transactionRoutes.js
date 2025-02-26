const router = require("express").Router();
const transactionController = require("../controllers/transactionController");
const authMiddleware = require("../middlewares/authMiddleware");
const validateRequest = require("../middlewares/validateRequest");
const transactionSchema = require("../validators/transactionValidator");

router.use('/transactions', authMiddleware);

router.post('/transactions', validateRequest(transactionSchema) ,transactionController.createTransaction)
router.get('/transactions', transactionController.getTransactions)
router.get('/transactions/:id', transactionController.getTransactionByID)
router.put('/transactions/:id', transactionController.updateTransaction)
router.delete('/transactions/:id', transactionController.deleteTransaction)

module.exports = router;
