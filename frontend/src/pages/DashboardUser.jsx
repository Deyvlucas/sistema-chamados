import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardUser = () => {
  const [usuario, setUsuario] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ordens, setOrdens] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const dados = localStorage.getItem("usuario");
    if (!dados) return navigate("/");

    const usuarioObj = JSON.parse(dados);
    setUsuario(usuarioObj);
    buscarOrdens(usuarioObj.token);
  }, [navigate]);

  const buscarOrdens = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/api/ordens/minhas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrdens(data);
    } catch (err) {
      console.error("Erro ao buscar ordens:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");

    try {
      const res = await fetch("http://localhost:5000/api/ordens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.token}`,
        },
        body: JSON.stringify({ titulo, descricao }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMensagem(data.mensagem || "Erro ao abrir chamado");
        return;
      }

      setTitulo("");
      setDescricao("");
      setMensagem("Chamado enviado com sucesso!");
      buscarOrdens(usuario.token);
    } catch (err) {
      setMensagem("Erro ao conectar com servidor");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Bem vindo "Adicionar nome do usuario"
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Sair
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6"
      >
        <h2 className="text-xl font-semibold mb-2">
          Formulario para abertura do chamado
        </h2>

        <input
          type="text"
          placeholder="Título do problema"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-2"
          required
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-2"
          rows="4"
          required
        />

        {mensagem && <p className="text-green-600">{mensagem}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Enviar Chamado
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Meus Chamados</h2>
        <ul className="divide-y">
          {ordens.map((ordem) => (
            <li key={ordem._id} className="py-2">
              <strong>{ordem.titulo}</strong>
              <p>{ordem.descricao}</p>
              <p>Status: {ordem.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardUser;
