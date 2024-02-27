const express = require('express');
const pool = require('./db');
const port = 3000;
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
      const result = await pool.query('SELECT * FROM usuarios WHERE email = $1 AND senha = $2', [email, senha]);

      if (result.rows.length > 0) {
          res.status(200).json({ message: 'Login bem-sucedido' });
      } else {
          res.status(401).json({ message: 'Credenciais inválidas' });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao tentar fazer login' });
  }
});

app.get('/produtos', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM produtos');
        res.status(200).send(data.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.post('/usuarios', async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        await pool.query('INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)', [nome, email, senha]);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.post('/vendas', async (req, res) => {
    const { data } = req.body;
    try {
        await pool.query('INSERT INTO vendas (data) VALUES ($1)', [data]);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.post('/vendas/:idVenda/itens', async (req, res) => {
    const { id_produto, quantidade, preco } = req.body;
    const { idVenda } = req.params;
    try {
        await pool.query('INSERT INTO itens (id_produto, quantidade, preco, id_venda) VALUES ($1, $2, $3, $4)', [id_produto, quantidade, preco, idVenda]);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.listen(port, () => console.log(`Server has started on port: ${port}`));
