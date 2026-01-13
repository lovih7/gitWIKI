// js/commands.js

const COMANDOS = [
  {
    command: "git init",
    description: "Inicializa um novo repositório Git",
    category: "basico",
    example: "git init"
  },
  {
    command: "git clone",
    description: "Clona um repositório remoto para o seu computador",
    category: "basico",
    example: "git clone https://github.com/usuario/repositorio.git"
  },
  {
    command: "git add",
    description: "Adiciona arquivos ao staging (prepara para commit)",
    category: "basico",
    example: "git add arquivo.txt\ngit add ."
  },
  {
    command: "git status",
    description: "Mostra o estado atual do repositório (staged, unstaged, untracked)",
    category: "basico",
    example: "git status"
  },
  {
    command: "git commit",
    description: "Grava as mudanças staged no histórico com uma mensagem",
    category: "basico",
    example: "git commit -m \"Mensagem do commit\""
  },
  {
    command: "git log",
    description: "Exibe o histórico de commits",
    category: "basico",
    example: "git log --oneline --graph --all"
  },
  {
    command: "git diff",
    description: "Mostra diferenças entre commits, branches ou arquivos",
    category: "basico",
    example: "git diff HEAD~1 HEAD"
  },
  {
    command: "git rm",
    description: "Remove arquivos do repositório e do staging",
    category: "basico",
    example: "git rm arquivo.txt\ngit commit -m \"Remove arquivo\""
  },
  {
    command: "git mv",
    description: "Renomeia/move arquivos rastreados pelo Git",
    category: "basico",
    example: "git mv antigo.txt novo.txt\ngit commit -m \"Renomeia arquivo\""
  },
  {
    command: "git show",
    description: "Mostra informações (diff/metadata) sobre um commit ou objeto",
    category: "basico",
    example: "git show <commit>"
  },
  {
    command: "git tag",
    description: "Cria ou lista tags (marcadores de commits, geralmente releases)",
    category: "basico",
    example: "git tag -a v1.0 -m \"Versão 1.0\"\ngit tag --list"
  },
  {
    command: "git branch",
    description: "Lista, cria ou deleta branches locais",
    category: "intermediario",
    example: "git branch\ngit branch nova-feature\ngit branch -d antiga"
  },
  {
    command: "git checkout",
    description: "Muda de branch ou restaura arquivos (comportamento histórico)",
    category: "intermediario",
    example: "git checkout develop\ngit checkout -- arquivo.txt"
  },
  {
    command: "git switch",
    description: "Comando moderno para trocar/crear branches (mais claro que checkout)",
    category: "intermediario",
    example: "git switch -c nova-feature\ngit switch develop"
  },
  {
    command: "git merge",
    description: "Funde outro branch no branch atual (gera commit de merge se necessário)",
    category: "intermediario",
    example: "git checkout main\ngit merge feature-xyz"
  },
  {
    command: "git rebase",
    description: "Reaplica commits em cima de outro branch — reescreve histórico",
    category: "intermediario",
    example: "git checkout feature\ngit rebase main"
  },
  {
    command: "git remote",
    description: "Gerencia repositórios remotos (listar, adicionar, alterar URLs)",
    category: "intermediario",
    example: "git remote -v\ngit remote add origin <url>"
  },
  {
    command: "git fetch",
    description: "Baixa objetos e refs do remoto sem fazer merge automático",
    category: "intermediario",
    example: "git fetch origin"
  },
  {
    command: "git pull",
    description: "Busca e faz merge (ou rebase) automático do remoto para o local",
    category: "intermediario",
    example: "git pull origin main"
  },
  {
    command: "git push",
    description: "Envia commits locais para o repositório remoto",
    category: "intermediario",
    example: "git push origin main\ngit push --set-upstream origin nova-branch"
  },
  {
    command: "git stash",
    description: "Armazena temporariamente mudanças não commitadas para limpar a workspace",
    category: "intermediario",
    example: "git stash\ngit stash pop\ngit stash list"
  },
  {
    command: "git reset",
    description: "Move o HEAD para outro commit; modos: --soft, --mixed (padrão), --hard",
    category: "intermediario",
    example: "git reset --soft HEAD~1\ngit reset --hard <commit>"
  },
  {
    command: "git revert",
    description: "Cria um novo commit que desfaz as mudanças de um commit anterior (não reescreve histórico)",
    category: "intermediario",
    example: "git revert <commit>"
  },
  {
    command: "git cherry-pick",
    description: "Aplica mudanças de um commit específico em outro branch",
    category: "intermediario",
    example: "git cherry-pick <commit>"
  },
  {
    command: "git bisect",
    description: "Usa busca binária para encontrar o commit que introduziu um bug",
    category: "intermediario",
    example: "git bisect start\ngit bisect bad\ngit bisect good <commit>"
  },
  {
    command: "git blame",
    description: "Mostra linha a linha quem modificou cada parte de um arquivo e quando",
    category: "intermediario",
    example: "git blame arquivo.txt"
  },
  {
    command: "git reflog",
    description: "Registro dos movimentos do HEAD (útil para recuperar commits perdidos)",
    category: "intermediario",
    example: "git reflog"
  },
  {
    command: "git submodule",
    description: "Gerencia submódulos (repositórios aninhados) dentro de um repositório",
    category: "avancado",
    example: "git submodule add <url> caminho\ngit submodule update --init --recursive"
  },
  {
    command: "git worktree",
    description: "Cria múltiplas worktrees (checkouts) do mesmo repositório para trabalhar em vários branches simultaneamente",
    category: "avancado",
    example: "git worktree add ../worktree-branch nova-branch"
  },
  {
    command: "git filter-branch",
    description: "Reescreve histórico aplicando filtros (deprecated para grandes reescritas — use git filter-repo quando possível)",
    category: "avancado",
    example: "git filter-branch --tree-filter 'rm -f arquivo-sensivel' -- --all"
  },
  {
    command: "git replace",
    description: "Substitui objetos Git por outros (útil em manipulações avançadas de histórico)",
    category: "avancado",
    example: "git replace <old> <new>"
  },
  {
    command: "git gc",
    description: "Executa coleta de lixo e otimizações no repositório (garbage collection)",
    category: "avancado",
    example: "git gc --prune=now --aggressive"
  },
  {
    command: "git fsck",
    description: "Verifica integridade dos objetos no repositório",
    category: "avancado",
    example: "git fsck --full"
  },
  {
    command: "git prune",
    description: "Remove objetos não referenciados (usado com cautela)",
    category: "avancado",
    example: "git prune"
  },
  {
    command: "git archive",
    description: "Cria um arquivo compactado (tar/zip) com o conteúdo de um commit ou branch",
    category: "avancado",
    example: "git archive --format=zip -o release.zip v1.0"
  },
  {
    command: "git apply",
    description: "Aplica um patch gerado externamente (por exemplo, arquivo .patch)",
    category: "avancado",
    example: "git apply patch.diff"
  },
  {
    command: "git format-patch",
    description: "Gera patches em formato mbox para envio por e-mail (útil em fluxos baseados em e-mail)",
    category: "avancado",
    example: "git format-patch origin/main"
  },
  {
    command: "git am",
    description: "Aplica patches gerados por format-patch (mbox)",
    category: "avancado",
    example: "git am 0001-*.patch"
  },
  {
    command: "git notes",
    description: "Adiciona notas a commits sem alterar o commit em si (metadados adicionais)",
    category: "avancado",
    example: "git notes add -m \"Informação extra\" <commit>"
  },
  {
    command: "git rerere",
    description: "Reuse Recorded Resolution — ajuda a reaplicar resoluções de conflitos repetidos",
    category: "avancado",
    example: "git config --global rerere.enabled true"
  },
  {
    command: "git lfs",
    description: "Git Large File Storage — gerencia arquivos grandes externos ao objeto Git (requer instalação do Git LFS)",
    category: "avancado",
    example: "git lfs install\ngit lfs track \"*.psd\""
  },
  {
    command: "git rev-parse",
    description: "Interpreta e mostra objetos/refs — útil em scripts para obter hashes, caminhos, etc.",
    category: "avancado",
    example: "git rev-parse --abbrev-ref HEAD"
  },
  {
    command: "git describe",
    description: "Gera uma descrição legível para um commit, baseada em tags anotadas",
    category: "avancado",
    example: "git describe --tags --abbrev=0"
  },
  {
    command: "git clean",
    description: "Remove arquivos não rastreados do diretório de trabalho",
    category: "intermediario",
    example: "git clean -fd\n# usar com cuidado; verifique com -n antes"
  },
  {
    command: "git shortlog",
    description: "Resume o output de git log por autor (útil para changelogs)",
    category: "intermediario",
    example: "git shortlog -sn"
  },
  {
    command: "git fsck --lost-found",
    description: "Localiza objetos perdidos e os coloca em .git/lost-found (técnico/recuperação)",
    category: "avancado",
    example: "git fsck --lost-found"
  }
];
const SAMPLE_LIMIT = 6;

function $el(tag, opts = {}) {
  const e = document.createElement(tag);
  if (opts.className) e.className = opts.className;
  if (opts.text) e.textContent = opts.text;
  if (opts.html) e.innerHTML = opts.html;
  if (opts.attrs) {
    Object.entries(opts.attrs).forEach(([k, v]) => e.setAttribute(k, v));
  }
  return e;
}

function fallbackCopy(text) {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
}

function copyText(text, btn) {
  if (typeof window.copyCommand === 'function') {
    try {
      window.copyCommand(text, btn);
      return;
    } catch (err) {}
  }
  const prev = btn ? btn.innerHTML : null;
  const disableBtn = btn ? (() => { btn.disabled = true; }) : () => {};
  const restoreBtn = btn ? (() => {
    btn.innerHTML = prev;
    btn.disabled = false;
  }) : () => {};

  if (navigator.clipboard && navigator.clipboard.writeText) {
    disableBtn();
    navigator.clipboard.writeText(text).then(() => {
      if (btn) btn.innerHTML = 'Copiado';
      setTimeout(restoreBtn, 900);
    }).catch(() => {
      fallbackCopy(text).then(() => {
        if (btn) btn.innerHTML = 'Copiado';
        setTimeout(restoreBtn, 900);
      }).catch(() => {
        if (btn) alert('Não foi possível copiar automaticamente. Copie manualmente.');
        restoreBtn();
      });
    });
  } else {
    fallbackCopy(text).then(() => {
      if (btn) btn.innerHTML = 'Copiado';
      setTimeout(restoreBtn, 900);
    }).catch(() => {
      if (btn) alert('Não foi possível copiar automaticamente. Copie manualmente.');
      restoreBtn();
    });
  }
}

function createCommandCard(cmd, minimal = false) {
  const col = $el('div', { className: 'col-sm-6 col-md-4' });
  const card = $el('div', { className: 'card command-card h-100' });
  const body = $el('div', { className: 'card-body d-flex flex-column' });

  const titleText = minimal ? (cmd.command || '') : (cmd.title || cmd.command || '');
  const title = $el('h5', { className: 'card-title', text: titleText });

  const pre = $el('pre', { className: 'cmd-code mb-3' });
  const code = $el('code', { text: cmd.example ? cmd.example : (cmd.command || '') });
  pre.appendChild(code);

  body.appendChild(title);
  body.appendChild(pre);

  if (!minimal && cmd.description) {
    const desc = $el('p', { className: 'small text-muted mb-2', text: cmd.description });
    body.appendChild(desc);
  }

  const metaRow = $el('div', { className: 'mt-auto d-flex justify-content-between align-items-center' });
  const small = $el('small', { className: 'text-muted', text: cmd.category || '' });

  const btn = $el('button', { className: 'btn btn-sm btn-outline-secondary copy-btn', text: 'Copiar' });
  btn.type = 'button';
  btn.addEventListener('click', () => {
    const toCopy = cmd.example ? cmd.example : cmd.command;
    copyText(toCopy, btn);
  });

  metaRow.appendChild(small);
  metaRow.appendChild(btn);

  body.appendChild(metaRow);
  card.appendChild(body);
  col.appendChild(card);
  return col;
}

function renderSamples(container, commands) {
  const basics = commands.filter(c => (c.category || '').toLowerCase() === 'basico');
  const samples = basics.slice(0, SAMPLE_LIMIT);
  container.innerHTML = '';
  if (samples.length === 0) {
    container.appendChild($el('div', { className: 'col-12 text-muted', text: 'Nenhum comando básico disponível.' }));
    return;
  }
  samples.forEach(c => container.appendChild(createCommandCard(c, true)));
}

function renderAllWithControls(container, commands) {
  // Se já existe um elemento com id="commands-controls" e ele contém um input#commands-search,
  // vamos reutilizá-lo. Caso contrário, criamos os controles aqui.
  const existingControls = document.getElementById('commands-controls');
  let searchInput;
  let cardsRow;

  // Se existir o wrapper de controles, usamos o próprio container para os cards
  if (existingControls) {
    cardsRow = container;
    cardsRow.innerHTML = '';
  } else {
    container.innerHTML = '';
    cardsRow = $el('div', { className: 'row g-4', attrs: { id: 'commands-cards-row' } });
  }

  function applyFilter({ category = '', q = '' } = {}) {
    let list = commands.slice();
    if (category) {
      list = list.filter(c => (c.category || '').toLowerCase() === category.toLowerCase());
    }
    if (q) {
      const term = q.toLowerCase();
      list = list.filter(c =>
        (c.command && c.command.toLowerCase().includes(term)) ||
        (c.description && c.description.toLowerCase().includes(term)) ||
        (c.example && c.example.toLowerCase().includes(term))
      );
    }
    cardsRow.innerHTML = '';
    if (list.length === 0) {
      cardsRow.appendChild($el('div', { className: 'col-12 text-muted', text: 'Nenhum comando encontrado.' }));
    } else {
      list.forEach(c => cardsRow.appendChild(createCommandCard(c, false)));
    }
  }

  if (existingControls) {
    // Reutiliza o input de busca existente
    searchInput = existingControls.querySelector('#commands-search');
    
    // Vincula os botões de filtro existentes (.filter-btn)
    const filterBtns = existingControls.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-cat') || '';
        if (searchInput) searchInput.value = '';
        // Atualiza estado visual dos botões
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilter({ category: cat });
      });
    });
  } else {
    // cria controles aqui (caso não exista wrapper)
    const controlsWrap = $el('div', { className: 'mb-4 d-flex flex-wrap gap-2 align-items-center' });

    searchInput = $el('input', { className: 'form-control me-2', attrs: { type: 'search', id: 'commands-search', placeholder: 'Buscar comando ou descrição...' } });
    searchInput.style.maxWidth = '360px';

    const btnAll = $el('button', { className: 'btn btn-sm btn-outline-secondary', text: 'Todos' });
    const btnBasico = $el('button', { className: 'btn btn-sm btn-outline-secondary', text: 'Básico' });
    const btnInter = $el('button', { className: 'btn btn-sm btn-outline-secondary', text: 'Intermediário' });
    const btnAv = $el('button', { className: 'btn btn-sm btn-outline-secondary', text: 'Avançado' });
    const clearBtn = $el('button', { className: 'btn btn-sm btn-outline-danger ms-2', text: 'Limpar' });

    controlsWrap.appendChild(searchInput);
    controlsWrap.appendChild(btnAll);
    controlsWrap.appendChild(btnBasico);
    controlsWrap.appendChild(btnInter);
    controlsWrap.appendChild(btnAv);
    controlsWrap.appendChild(clearBtn);

    container.appendChild(controlsWrap);
    container.appendChild(cardsRow);

    // listeners para botões criados localmente
    btnAll.addEventListener('click', () => { searchInput.value = ''; applyFilter({}); });
    btnBasico.addEventListener('click', () => { searchInput.value = ''; applyFilter({ category: 'basico' }); });
    btnInter.addEventListener('click', () => { searchInput.value = ''; applyFilter({ category: 'intermediario' }); });
    btnAv.addEventListener('click', () => { searchInput.value = ''; applyFilter({ category: 'avancado' }); });
    clearBtn.addEventListener('click', () => { searchInput.value = ''; applyFilter({}); });
  }

  // se searchInput criada/reutilizada, ligamos o listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => applyFilter({ 
      category: document.querySelector('.filter-btn.active') ? document.querySelector('.filter-btn.active').getAttribute('data-cat') || '' : '',
      q: e.target.value }));
  }

  // render inicial
  applyFilter({});
}

function init() {
  const container = document.getElementById('commands-container');
  if (!container) return;

  const commands = COMANDOS.slice();
  // força modo "página completa" se existir wrapper commands-controls (ou se path contém 'comandos')
  const hasControlsEl = !!document.getElementById('commands-controls');
  const pathContainsComandos = window.location.pathname.toLowerCase().includes('comandos');

  if (hasControlsEl || pathContainsComandos) {
    renderAllWithControls(container, commands);
  } else {
    renderSamples(container, commands);
  }
}

document.addEventListener('DOMContentLoaded', init);