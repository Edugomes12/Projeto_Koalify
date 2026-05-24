const API_URL = "http://localhost:5243";

document.getElementById("formLogin").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;

  if (!email || !senha) {
    alert("Preencha e-mail e senha.");
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    if (resposta.status === 401) {
      alert("E-mail ou senha inválidos.");
      return;
    }

    if (!resposta.ok) {
      alert("Algo deu errado. Tente novamente.");
      return;
    }

    const dados = await resposta.json();

    localStorage.setItem("token", dados.token);
    localStorage.setItem("usuario", JSON.stringify(dados.usuario));

    window.location.href = "mprojetos.html";
  } catch (erro) {
    alert("Não foi possível conectar à API. Ela está rodando?");
    console.error(erro);
  }
});