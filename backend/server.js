const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json()); // ESSENCIAL para funcionar com JSON

// Rotas
app.use("/api/usuarios", require("./routes/usuarioRoutes"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado ao MongoDB");
    app.listen(process.env.PORT, () =>
      console.log(`Servidor rodando na porta ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("Erro ao conectar no MongoDB:", err));
