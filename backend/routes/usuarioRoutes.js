const express = require("express");
const router = express.Router();
const {
  registrarUsuario,
  loginUsuario,
} = require("../controllers/usuarioController");
const proteger = require("../middleware/authMiddleware");

// Rotas públicas
router.post("/register", registrarUsuario);
router.post("/login", loginUsuario);

// Rota protegida
router.get("/perfil", proteger, (req, res) => {
  res.status(200).json({
    mensagem: "Acesso autorizado!",
    usuario: req.usuario,
  });
});
router.post("/register", registrarUsuario);
router.post("/login", loginUsuario);

module.exports = router;
