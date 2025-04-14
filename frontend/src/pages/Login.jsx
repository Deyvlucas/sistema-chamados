import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const res = await fetch("http://localhost:5000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.mensagem || "Erro ao fazer login");
        return;
      }

      // Salva dados no localStorage
      localStorage.setItem("usuario", JSON.stringify(data));

      // Redireciona baseado no tipo de usuário
      if (data.isAdmin) {
        navigate("/dashboard-admin");
      } else {
        navigate("/dashboard-user");
      }
    } catch (err) {
      console.error("Erro no login:", err);
      setErro("Erro ao conectar com o servidor");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2 mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Senha</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2 mt-1"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
