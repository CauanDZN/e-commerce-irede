const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/login', async (req, res) => {
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

module.exports = router;
