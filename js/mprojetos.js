const btnNovoProjeto  = document.getElementById('btnNovoProjeto');
const modalOverlay    = document.getElementById('modalOverlay');
const btnCancelModal  = document.getElementById('btnCancelModal');
const btnCriarProjeto = document.getElementById('btnCriarProjeto');
const projectNameInput = document.getElementById('projectName');
const projectsGrid    = document.getElementById('projectsGrid');
const emptyState      = document.getElementById('emptyState');
const searchInput     = document.getElementById('searchInput');
const navItems        = document.querySelectorAll('.nav-item');

let projects = JSON.parse(localStorage.getItem('koalify_projects') || '[]');

function saveProjects() {
  localStorage.setItem('koalify_projects', JSON.stringify(projects));
}

function getInitials(name) {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function render(filter = '') {
  const term = filter.toLowerCase().trim();
  const visible = projects.filter(p => p.name.toLowerCase().includes(term));

  projectsGrid.innerHTML = '';

  if (visible.length === 0) {
    emptyState.style.display = 'flex';
    projectsGrid.style.display = 'none';
  } else {
    emptyState.style.display = 'none';
    projectsGrid.style.display = 'grid';

    visible.forEach((project) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.dataset.id = project.id;
      card.innerHTML = `
        <div class="card-initials">${getInitials(project.name)}</div>
        <div class="card-name">${escapeHtml(project.name)}</div>
        <div class="card-date">Criado em ${formatDate(project.createdAt)}</div>
        <button class="card-delete" title="Excluir projeto" data-id="${project.id}" aria-label="Excluir">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14H6L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4h6v2"/>
          </svg>
        </button>
      `;
      projectsGrid.appendChild(card);
    });
  }
}

function openModal() {
  projectNameInput.value = '';
  modalOverlay.classList.add('open');
  setTimeout(() => projectNameInput.focus(), 120);
}

function closeModal() {
  modalOverlay.classList.remove('open');
}

function createProject() {
  const name = projectNameInput.value.trim();
  if (!name) {
    projectNameInput.focus();
    projectNameInput.style.borderColor = '#cc2222';
    setTimeout(() => { projectNameInput.style.borderColor = ''; }, 1200);
    return;
  }
  projects.unshift({ id: Date.now().toString(), name, createdAt: new Date().toISOString() });
  saveProjects();
  render(searchInput.value);
  closeModal();
}

btnNovoProjeto.addEventListener('click', openModal);
btnCancelModal.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
btnCriarProjeto.addEventListener('click', createProject);
projectNameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') createProject();
  if (e.key === 'Escape') closeModal();
});

projectsGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.card-delete');
  if (!btn) return;
  e.stopPropagation();
  if (confirm('Deseja excluir este projeto?')) {
    projects = projects.filter(p => p.id !== btn.dataset.id);
    saveProjects();
    render(searchInput.value);
  }
});

searchInput.addEventListener('input', () => render(searchInput.value));

navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    navItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
  });
});

render();