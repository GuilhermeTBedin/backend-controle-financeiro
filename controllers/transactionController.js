const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");
const { date } = require("joi");

const createTransaction = async (req, res) => {
  try {
    const { type, amount, category, date } = req.body;
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const newTransaction = new Transaction({
      type,
      amount,
      category,
      date,
      userId,
    });
    await newTransaction.save();

    res.status(201).json({ message: "Transação criada com sucesso", transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar transação", error: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10, type, category, startDate, endDate } = req.query;

    //Criar um objeto de filtro baseado nos parâmetros passados
    let filter = { userId };

    if(type) filter.type = type;
    if(category) filter.category = category;
    if(startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    //Paginação
    const transactions = await Transaction.find(filter)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalTransaction = await Transaction.countDocuments(filter);
    const totalPages = Math.ceil(totalTransaction / limit);

    res.status(200).json({
      totalTransaction,
      totalPages,
      currentPage: Number(page),
      transactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar transações", error });
  }
};

const getTransactionByID = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const transaction = await Transaction.findOne({ _id: id, userId });

    if (!transaction) {
      return res.status(404).json({ message: "Transação não encontrada" });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter transação", error });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const transaction = await Transaction.findOne({ _id: id, userId });

    if (!transaction) {
      return res.status(404).json({ message: "Transação não encontrada" });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Transação atualiza com sucesso!", updatedTransaction});
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar transação", error });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const transaction = await Transaction.findOne({ _id: id, userId });

    if(!transaction) {
      return res.status(404).json({ message: "Transação não encontrada" });
    }

    await Transaction.findByIdAndDelete(id);
    res.status(200).json({ message: "Transação deletada com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar transação", error });
  }
}

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionByID,
  updateTransaction,
  deleteTransaction,
}