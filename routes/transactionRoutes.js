const router = require("express").Router();
const transactionController = require("../controllers/transactionController");
const authMiddleware = require("../middlewares/authMiddleware");
const validateRequest = require("../middlewares/validateRequest");
const transactionSchema = require("../validators/transactionValidator");

/**
 * @swagger
 * tags:
 *   name: Transações
 *   description: Endpoints para gerenciar transações financeiras
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Criar uma nova transação
 *     tags: [Transações]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - amount
 *               - category
 *               - date
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 description: Tipo da transação (receita ou despesa)
 *                 example: "income"
 *               amount:
 *                 type: number
 *                 description: Valor da transação
 *                 example: 1500
 *               category:
 *                 type: string
 *                 description: Categoria da transação
 *                 example: "Salário"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Data da transação
 *                 example: "2024-03-01"
 *     responses:
 *       201:
 *         description: Transação criada com sucesso
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro ao criar transação
 */

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Listar todas as transações do usuário
 *     tags: [Transações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número da página para paginação
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número de itens por página
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *         description: Filtrar por tipo de transação
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filtrar por categoria
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de início para filtrar transações
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de fim para filtrar transações
 *     responses:
 *       200:
 *         description: Lista de transações retornada com sucesso
 *       500:
 *         description: Erro ao listar transações
 */

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Buscar uma transação por ID
 *     tags: [Transações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da transação a ser buscada
 *     responses:
 *       200:
 *         description: Transação encontrada com sucesso
 *       404:
 *         description: Transação não encontrada
 *       500:
 *         description: Erro ao buscar transação
 */

/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary: Atualizar uma transação por ID
 *     tags: [Transações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da transação a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 description: Tipo da transação
 *               amount:
 *                 type: number
 *                 description: Novo valor da transação
 *               category:
 *                 type: string
 *                 description: Nova categoria da transação
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Nova data da transação
 *     responses:
 *       200:
 *         description: Transação atualizada com sucesso
 *       404:
 *         description: Transação não encontrada
 *       500:
 *         description: Erro ao atualizar transação
 */

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Deletar uma transação por ID
 *     tags: [Transações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da transação a ser deletada
 *     responses:
 *       200:
 *         description: Transação deletada com sucesso
 *       404:
 *         description: Transação não encontrada
 *       500:
 *         description: Erro ao deletar transação
 */

router.use('/transactions', authMiddleware);

router.post('/transactions', validateRequest(transactionSchema) ,transactionController.createTransaction)
router.get('/transactions', transactionController.getTransactions)
router.get('/transactions/:id', transactionController.getTransactionByID)
router.put('/transactions/:id', transactionController.updateTransaction)
router.delete('/transactions/:id', transactionController.deleteTransaction)

module.exports = router;
