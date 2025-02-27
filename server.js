require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const setupSwagger = require("./swagger");

const app = express();
app.use(express.json());
app.use(cors());

//Conectar ao MongoDB local
if (process.env.NODE_ENV !== "test") {
  mongoose.connect("mongodb://localhost:27017/controle-financeiro")
    .then(() => console.log("MongoDB conectado"))
    .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));
}

//Rotas
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const transactionsRoutes = require("./routes/transactionRoutes");
app.use("/", transactionsRoutes);

app.get("/", (req, res) => {
  res.send("API Controle Financeiro Rodando...");
});

setupSwagger(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
