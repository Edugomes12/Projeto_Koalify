const API_URL = "http://localhost:5243";

document.getElementById("formSenha").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const novaSenha = document.getElementById("novaSenha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;

  if (!email || !novaSenha) {
    alert("Preencha o e-mail e a nova senha.");
    return;
  }

  if (novaSenha !== confirmarSenha) {
    alert("As senhas não coincidem.");
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, novaSenha })
    });

    if (resposta.status === 404) {
      alert("E-mail não encontrado.");
      return;
    }

    if (!resposta.ok) {
      alert("Não foi possível redefinir a senha. Tente novamente.");
      return;
    }

    alert("Senha redefinida com sucesso! Faça login com a nova senha.");
    window.location.href = "login.html";
  } catch (erro) {
    alert("Não foi possível conectar à API. Ela está rodando?");
    console.error(erro);
  }
});