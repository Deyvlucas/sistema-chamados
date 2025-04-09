const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const proteger = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = await Usuario.findById(decoded.id).select("-senha");
      next();
    } catch (error) {
      return res.status(401).json({ mensagem: "Token inválido" });
    }
  } else {
    return res.status(401).json({ mensagem: "Não autorizado, token ausente" });
  }
};

module.exports = proteger;
