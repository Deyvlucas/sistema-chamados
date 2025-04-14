import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardAdmin = () => {
  const [usuario, setUsuario] = useState(null);
  const [ordens, setOrdens] = useState([]); // futuro: buscar do backend
  const navigate = useNavigate();

  useEffect(() => {
    const dados = localStorage.getItem("usuario");
    if (dados) {
      setUsuario(JSON.parse(dados));
    } else {
      navigate("/"); // redireciona se não estiver logado
    }

    // Simulação de ordens
    setOrdens([
      { id: 1, titulo: "Computador não liga", status: "Aberta" },
      { id: 2, titulo: "Troca de cabo HDMI", status: "Aberta" },
    ]);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Painel do Técnico</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Sair
        </button>
      </div>

      {usuario && (
        <div className="mb-4 p-4 bg-white rounded shadow">
          <p>
            <strong>Nome:</strong> {usuario.nome}
          </p>
          <p>
            <strong>Email:</strong> {usuario.email}
          </p>
        </div>
      )}

      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-2">
          Ordens de Serviço Abertas
        </h2>
        <ul className="divide-y">
          {ordens.map((ordem) => (
            <li key={ordem.id} className="py-2">
              <p>
                <strong>{ordem.titulo}</strong>
              </p>
              <p>Status: {ordem.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardAdmin;
