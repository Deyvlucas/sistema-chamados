const API_BASE = "http://localhost:5000/api";

export const getToken = () => {
  const user = JSON.parse(localStorage.getItem("usuario"));
  return user?.token || "";
};

export const api = {
  async getPerfil() {
    const token = getToken();
    const res = await fetch(`${API_BASE}/usuarios/perfil`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Erro ao buscar perfil");

    return await res.json();
  },
};
