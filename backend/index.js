const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());
const port = 3000;

const pool = new Pool({
  user: 'cauan',
  host: 'localhost',
  database: 'irede',
  password: 'cauan',
  port: 5432,
});

app.get('/usuarios', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar usuários', error);
    res.status(500).send('Erro ao buscar usuários');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
