const btnEntrar = document.querySelector('.btn-outline');
const btnCadastrar = document.querySelector('.btn-solid');
const heroBtnEntrar = document.querySelector('.hero-btn-primary');
const heroBtnCriar = document.querySelector('.hero-btn-secondary');

btnEntrar.addEventListener('click', () => {
  window.location.href = 'login.html';
});

btnCadastrar.addEventListener('click', () => {
  window.location.href = 'conta.html';
});

heroBtnEntrar.addEventListener('click', () => {
  window.location.href = 'login.html';
});

heroBtnCriar.addEventListener('click', () => {
  window.location.href = 'conta.html';
});