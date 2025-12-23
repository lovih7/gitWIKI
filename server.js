const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// pasta pública (conteúdo do site)
const PUBLIC_DIR = path.join(__dirname, 'public');
app.use(express.static(PUBLIC_DIR));

// caminho para o arquivo de dados (pode ficar dentro do public ou na raiz)
const DATA_PATH = path.join(__dirname, 'commands.json');
// se você colocou commands.json em public/assets/data, use:
// const DATA_PATH = path.join(PUBLIC_DIR, 'assets', 'data', 'commands.json');

function loadCommands() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}

// API: GET /commands  -> lista todos ou filtra por category e/ou q (busca)
app.get('/commands', (req, res) => {
  const { category, q } = req.query;
  let commands = loadCommands();

  if (category) {
    const cat = category.toLowerCase();
    commands = commands.filter(c => (c.category || '').toLowerCase() === cat);
  }

  if (q) {
    const term = q.toLowerCase();
    commands = commands.filter(c =>
      (c.command && c.command.toLowerCase().includes(term)) ||
      (c.description && c.description.toLowerCase().includes(term)) ||
      (c.example && c.example.toLowerCase().includes(term))
    );
  }

  res.json(commands);
});

// GET /commands/:name -> retorna comando pelo nome (slug ou exato)
app.get('/commands/:name', (req, res) => {
  const name = req.params.name.toLowerCase();
  const commands = loadCommands();
  const found = commands.find(c =>
    c.command.toLowerCase() === name ||
    c.command.toLowerCase() === name.replace(/-/g, ' ')
  );
  if (found) return res.json(found);
  const partial = commands.filter(c => c.command.toLowerCase().includes(name));
  if (partial.length) return res.json(partial);
  return res.status(404).json({ error: 'Comando não encontrado' });
});

app.get('/categories', (req, res) => {
  const commands = loadCommands();
  const cats = Array.from(new Set(commands.map(c => c.category))).sort();
  res.json(cats);
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando — site + API: http://localhost:${PORT}`);
});