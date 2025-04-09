import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardUser = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dados = localStorage.getItem("usuario");
    if (!dados) {
      navigate("/");
      return;
    }

    const user = JSON.parse(dados);
    setUsuario(user);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Painel do Usuário</h1>

      {usuario ? (
        <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
          <p>
            <strong>Nome:</strong> {usuario.nome}
          </p>
          <p>
            <strong>Email:</strong> {usuario.email}
          </p>
          <p>
            <strong>Tipo:</strong>{" "}
            {usuario.isAdmin ? "Administrador" : "Usuário"}
          </p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default DashboardUser;
