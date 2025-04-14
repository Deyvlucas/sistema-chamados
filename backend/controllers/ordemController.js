const Ordem = require("../models/Ordem");

exports.criarOrdem = async (req, res) => {
  const { titulo, descricao } = req.body;
  const usuarioId = req.usuario.id; // recebido pelo middleware de auth

  try {
    const novaOrdem = await Ordem.create({
      titulo,
      descricao,
      usuario: usuarioId,
    });

    res.status(201).json(novaOrdem);
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro ao criar ordem", erro: error.message });
  }
};

exports.getOrdensDoUsuario = async (req, res) => {
  try {
    const ordens = await Ordem.find({ usuario: req.usuario.id }).sort({
      createdAt: -1,
    });
    res.json(ordens);
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro ao buscar ordens", erro: error.message });
  }
};
