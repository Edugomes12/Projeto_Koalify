const API_URL = "http://localhost:5243";

document.getElementById("formCadastro").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos.");
    return;
  }

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem.");
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha })
    });

    if (resposta.status === 409) {
      alert("Este e-mail já está cadastrado.");
      return;
    }

    if (!resposta.ok) {
      alert("Não foi possível criar a conta. Tente novamente.");
      return;
    }

    alert("Conta criada com sucesso! Faça login para continuar.");
    window.location.href = "login.html";
  } catch (erro) {
    alert("Não foi possível conectar à API. Ela está rodando?");
    console.error(erro);
  }
});