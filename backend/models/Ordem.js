const mongoose = require("mongoose");

const ordemSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    status: { type: String, default: "Aberta" },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ordem", ordemSchema);
