const express = require('express')
const cors = require('cors')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

app.get('/manifesto', (req, res) => {
  fs.readFile('manifesto.json', 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ erro: 'Erro ao ler manifesto' })
    res.setHeader('Content-Type', 'application/json')
    res.send(data)
  })
})

app.post('/manifesto', (req, res) => {
  const conteudo = req.body.conteudo
  if (!conteudo) return res.status(400).json({ erro: 'Campo conteudo obrigatório' })
  const data = JSON.stringify({ conteudo }, null, 2)
  fs.writeFile('manifesto.json', data, (err) => {
    if (err) return res.status(500).json({ erro: 'Erro ao salvar manifesto' })
    res.json({ status: 'Manifesto atualizado com sucesso' })
  })
})

app.listen(PORT, () => {
  console.log(`✅ TELMOS_API rodando em http://localhost:${PORT}/manifesto`)
})
// 🔁 Forçando redeploy TELMOS_API Sun Mar 23 06:06:57 -03 2025
