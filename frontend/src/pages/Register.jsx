import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch(
        "http://localhost:5000/api/usuarios/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nome, email, senha }),
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.mensagem || "Erro ao registrar usuário");
        return;
      }

      // Salva o usuário no localStorage
      localStorage.setItem("usuario", JSON.stringify(dados));

      // Redireciona conforme o tipo de usuário
      if (dados.isAdmin) {
        navigate("/dashboard-admin");
      } else {
        navigate("/dashboard-user");
      }
    } catch (error) {
      setErro("Erro ao conectar com o servidor");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h2 className="text-2xl font-bold mb-4">Criar Conta</h2>

      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        {erro && <p className="text-red-500 mb-4">{erro}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Register;
