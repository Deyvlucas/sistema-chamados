const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const criarToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, { expiresIn: "2d" });
};

// @desc    Registrar novo usuário
exports.registrarUsuario = async (req, res) => {
  console.log("Body recebido no registro:", req.body);

  const { nome, email, senha } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensagem: "Usuário já existe" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash,
    });

    const token = criarToken(novoUsuario._id, novoUsuario.isAdmin);

    res.status(201).json({
      id: novoUsuario._id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      isAdmin: novoUsuario.isAdmin,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro ao registrar usuário", erro: error.message });
  }
};

// @desc    Login do usuário
exports.loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ mensagem: "Usuário não encontrado" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Senha incorreta" });
    }

    const token = criarToken(usuario._id, usuario.isAdmin);

    res.status(200).json({
      id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      isAdmin: usuario.isAdmin,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro ao fazer login", erro: error.message });
  }
};
