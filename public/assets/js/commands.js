// assets/js/commands.js
// Renderiza comandos a partir de ../assets/data/commands.json (ou altere DATA_PATH para '/commands' se usar a API)
const DATA_PATH = '../assets/data/commands.json'; // ou '/commands' quando usar a API
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
  container.innerHTML = '';

  // Se já existe um elemento com id="commands-controls" e ele contém um input#commands-search,
  // vamos reutilizá-lo. Caso contrário, criamos os controles aqui.
  const existingControls = document.getElementById('commands-controls');
  let searchInput;

  const cardsRow = $el('div', { className: 'row g-4', attrs: { id: 'commands-cards-row' } });

  if (existingControls) {
    // Se dentro do wrapper já existir um input com id commands-search, reutilizamos.
    searchInput = existingControls.querySelector('#commands-search');
    if (!searchInput) {
      // cria input com id fixo (para acessibilidade — label da página aponta para esse id)
      searchInput = $el('input', { className: 'form-control me-2', attrs: { type: 'search', id: 'commands-search', placeholder: 'Buscar comando ou descrição...' } });
      searchInput.style.maxWidth = '360px';
      existingControls.appendChild(searchInput);
    }
    // adicionamos também os botões se não houver
    if (!existingControls.querySelector('.btn')) {
      const wrap = $el('div', { className: 'mt-3' });
      wrap.appendChild($el('button', { className: 'btn btn-sm btn-outline-secondary me-2', text: 'Todos' }));
      wrap.appendChild($el('button', { className: 'btn btn-sm btn-outline-secondary me-2', text: 'Básico' }));
      wrap.appendChild($el('button', { className: 'btn btn-sm btn-outline-secondary me-2', text: 'Intermediário' }));
      wrap.appendChild($el('button', { className: 'btn btn-sm btn-outline-secondary me-2', text: 'Avançado' }));
      existingControls.appendChild(wrap);
    }
    // adiciona cardsRow logo após existingControls se ainda não houver um
    if (!existingControls.nextElementSibling || existingControls.nextElementSibling.id !== 'commands-cards-row') {
      existingControls.insertAdjacentElement('afterend', cardsRow);
    } else {
      // se já existe, usamos ele
      cardsRow = existingControls.nextElementSibling;
    }
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

  // se searchInput criada/reutilizada, ligamos o listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => applyFilter({ q: e.target.value }));
  }

  // render inicial
  applyFilter({});
}

function init() {
  const container = document.getElementById('commands-container');
  if (!container) return;

  fetch(DATA_PATH)
    .then(res => {
      if (!res.ok) throw new Error('Falha ao carregar commands.json: ' + res.status);
      return res.json();
    })
    .then(commands => {
      // força modo "página completa" se existir wrapper commands-controls (ou se path contém 'comandos')
      const hasControlsEl = !!document.getElementById('commands-controls');
      const pathContainsComandos = window.location.pathname.toLowerCase().includes('comandos');

      if (hasControlsEl || pathContainsComandos) {
        renderAllWithControls(container, commands);
      } else {
        renderSamples(container, commands);
      }
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = '<div class="col-12 text-danger">Erro ao carregar comandos.</div>';
    });
}

document.addEventListener('DOMContentLoaded', init);