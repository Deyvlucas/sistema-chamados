const express = require("express");
const router = express.Router();
const {
  criarOrdem,
  getOrdensDoUsuario,
} = require("../controllers/ordemController");
const verificarToken = require("../middleware/auth");

router.post("/", verificarToken, criarOrdem);
router.get("/minhas", verificarToken, getOrdensDoUsuario);

module.exports = router;
