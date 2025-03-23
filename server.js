const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const path = './manifesto.json';

// Rota GET
app.get('/manifesto', (_, res) => {
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  res.json(data);
});

// Rota POST
app.post('/manifesto', (req, res) => {
  fs.writeFileSync(path, JSON.stringify(req.body, null, 2));
  res.json({ status: 'Manifesto atualizado com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`🧠 TELMOS_API rodando em http://localhost:${PORT}/manifesto`);
});
// 🔁 Forçando re-redeploy Sun Mar 23 06:41:26 -03 2025
